# MCE SQL Errors

> Only SELECT queries are valid. What each Marketing Cloud Engagement SQL error means, and how to fix the query behind it.

Source: https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-errors/  
Author: Mateusz Dąbrowski  
Last updated: 2026-10-21  
Licence: CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)

Write SQL in MCE (Marketing Cloud Engagement, formerly Salesforce Marketing Cloud) long enough, and you will get an error that points somewhere else entirely. "Error while processing square brackets" for a query without a single bracket. "Old style JOIN (ANSI JOINs) syntax is not allowed" for a query without a join. Or no message at all, just "Automation failed due to system error." in Automation Studio.

Below, you will find every error I hit while testing the queries on this site, with what it means and how to fix the query behind it. Each heading names the error, so search this page for the first words of your message.

## How MCE Checks Your Query

**MCE checks your query three times, and passing one check tells you little about the next.**

Why does it matter? Because each check stops different mistakes, so knowing which one failed tells you where to look:

1. **The syntax check** reads your query before anything runs. MCE's own text check goes first and lists every problem it finds in one message. Only a query that passes it reaches SQL Server, which compiles it and stops at the first error. You get this check from the Validate Syntax button on the Query step of a Query Activity in Automation Studio, and from Validate in [SQL Studio](https://mateuszdabrowski.pl/sql-studio/). Its messages start with "An error occurred while checking the query syntax. Errors:".
2. **The save** happens when MCE stores your query as a Query Activity. It checks the query once more, this time together with its target Data Extension and data action. Comments and the target cause most of its errors.
3. **The run** is the moment your query meets the data, and its errors are the hardest to read. The run status, which [SQL Studio](https://mateuszdabrowski.pl/sql-studio/) and other tools read, says only that the run failed. The Action Log of the Query Activity in Automation Studio gives the reason for some failures, such as a value too long for its field, and only "Automation failed due to system error." for others, such as a division by zero.

So a syntax error points at the text of your query, a save error at its comments, target or data action, and a run error at the values in your data.

> **Note: You Should Know**
>
> The syntax check passes some queries that the save or the run then refuse. A `--` comment is the most common case. For the check, the comment ends with its line. For the save, it never closes, so everything below it becomes part of the comment, as in [Errors from Line Comments](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-errors/#errors-from-line-comments). So a green check in Automation Studio does not mean your Query Activity will work. My [SQL Studio](https://mateuszdabrowski.pl/sql-studio/) runs all three checks on every run. Its lint flagged 98% of the syntax check errors in my tests before anything ran, along with line comments and several of the run errors.

---

## MCE SQL Syntax Check Errors

**Syntax check errors stop the query before it touches any data, so the fix is always in the text of the query.**

The examples below use the `Orders` Data Extension from my [window functions article](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/), with one row per order, and the [System Data Views](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/).

### Only SELECT Queries Are Valid

**"Only SELECT queries are valid. Select must be the first word of the query."**

MCE runs only `SELECT` queries, and its syntax check makes sure of it by looking at the first word. So it refuses a common table expression that opens with `WITH`, a query with a `;` in front of it, and even a first `SELECT` wrapped in parentheses. A common table expression gets two more errors on top, as the check also misreads what follows its body. It takes the comma in the main `SELECT` for an [old style join](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-errors/#old-style-join-syntax-is-not-allowed) and the name of the expression for a Data Extension:

```sql {1} title="❌ A common table expression fails the syntax check"
WITH latestOrder AS (
    SELECT
          SubscriberKey
        , OrderId
        , ROW_NUMBER() OVER (
            PARTITION BY SubscriberKey
            ORDER BY OrderDate DESC, OrderId DESC
          ) AS OrderRecency
    FROM Orders
)
SELECT
      SubscriberKey
    , OrderId
FROM latestOrder
WHERE OrderRecency = 1
/* Error: Only SELECT queries are valid.  Select must be the first word of the query.
Old style JOIN (ANSI JOINs) syntax is not allowed. Please use standard syntax.
latestOrder is not a known data extension or system data view. You can only query existing data extensions or system data views. */
```

Move the body of the common table expression into a subquery after `FROM`, as in my [latest order example](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#row_number). `INSERT`, `UPDATE` and `DELETE` fail for the same reason. To change the rows of a Data Extension, write a `SELECT` and pick Overwrite, Update or Append as the data action of the Query Activity.

### Must Declare the Scalar Variable

**"Must declare the scalar variable "@X"."**

MCE SQL has no variables. A query that opens with `DECLARE` fails the first-word check [above](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-errors/#only-select-queries-are-valid), and a variable used without it gets this error from SQL Server:

```sql {4} title="❌ A variable in a Query Activity"
SELECT
      OrderId
FROM Orders
WHERE OrderTotal > @MinTotal
/* Error: Must declare the scalar variable "@MinTotal". */
```

Write the value into the query, as in `WHERE OrderTotal > 50`, or keep it in a Data Extension and join it. For a value that changes with every run, such as today's date, use a function like [`GETDATE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-date-functions/#getdate--getutcdate).

### Not a Known Data Extension or System Data View

**"X is not a known data extension or system data view. You can only query existing data extensions or system data views."**

Most often, X is a misspelled name, or a Data Extension from another Business Unit. A shared Data Extension, for example, needs the [`Ent.` prefix](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-from/#enterprise-data-extension) when you query it from a child Business Unit. `Ent.` reaches only what the parent shares with its child Business Units, such as shared Data Extensions and Data Views. A Data Extension in the parent's own folders stays unknown from a child, with "Ent.Orders is not a known data extension or system data view."

The confusing cases are the ones where X is not a table at all. The syntax check reads the word after every `FROM` as a table name, even inside an expression, and the same goes for anything after `JOIN` or `APPLY`:

1. The name of a common table expression, see [above](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-errors/#only-select-queries-are-valid).
2. `VALUES` in a table built with `FROM (VALUES ...)`. Build it with `SELECT ... UNION ALL SELECT ...` instead.
3. Table functions, such as [`OPENJSON`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-json-functions/#openjson), [`STRING_SPLIT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-string-functions/#string_split) or `GENERATE_SERIES`.
4. The text after `FROM` in `TRIM(LEADING '0' FROM '007')`. Use [`LTRIM` with characters](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-string-functions/#ltrim-rtrim-and-trim) instead.
5. The value after `IS DISTINCT FROM`, a comparison SQL Server 2022 added for values that can be `NULL`:

```sql {4} title="❌ IS DISTINCT FROM reads as a table"
SELECT
      OrderId
FROM Orders
WHERE CouponCode IS DISTINCT FROM 'SPRING10'
/* Error: N'SPRING10' is not a known data extension or system data view. You can only query existing data extensions or system data views. */
```

The `N` in front of the value is not yours. MCE adds it to every text value in the query. Spell the comparison out to include the empty coupons:

```sql {4-5} title="✅ Orders without the SPRING10 coupon, empty coupons included"
SELECT
      OrderId
FROM Orders
WHERE CouponCode != 'SPRING10'
    OR CouponCode IS NULL
```

### Table Has a Multi-Part Specification

**"The X table has a multi-part specification. This is not allowed."**

The syntax check expects a plain name after `FROM`, `JOIN` and `APPLY`, and this error means it found a name with dots in it. You get it for a table function that reads a column, as in `STRING_SPLIT(preference.Interests, ',')`, which the check cuts at the first comma. You also get it for system views, such as `sys.databases` or `INFORMATION_SCHEMA.COLUMNS`. MCE lets you query only Data Extensions and Data Views, so system views are out of reach. For splitting text into rows, use the [JSON workaround](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-string-functions/#string_split).

### Old Style JOIN Syntax Is Not Allowed

**"Old style JOIN (ANSI JOINs) syntax is not allowed. Please use standard syntax."**

The check refuses tables separated by commas, as in `FROM Orders, _Subscribers`. Join them with [`INNER JOIN ... ON`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/), or with `CROSS JOIN` when you really want every combination.

The surprising case is a subquery in the `SELECT` list. Without a `WHERE`, the check reads past its closing bracket and takes the comma after it for a comma join:

```sql {3} title="❌ A subquery without WHERE before a comma"
SELECT
      SubscriberKey
    , (SELECT COUNT(*) FROM Orders) AS AllOrders
    , EmailAddress
FROM _Subscribers
/* Error: Old style JOIN (ANSI JOINs) syntax is not allowed. Please use standard syntax. */
```

Any `WHERE` inside the subquery ends the misreading, even one that filters nothing:

```sql {3} title="✅ The same subquery with WHERE 1 = 1"
SELECT
      SubscriberKey
    , (SELECT COUNT(*) FROM Orders WHERE 1 = 1) AS AllOrders
    , EmailAddress
FROM _Subscribers
```

### Reserved Word May Not Appear in Your Query

**"'X' is a reserved word and may not appear in your query."**

The most common X is `;`. Other SQL tools end each query with a semicolon, and MCE refuses it, even inside a text value, so leave it out. If you need it in a text, write `CHAR(59)`.

The check also refuses some system functions, such as `OBJECT_ID`, `DB_NAME`, `SERVERPROPERTY`, `CURRENT_USER` and `SYSTEM_USER`, and any name that starts with `fn_`. `CURRENT_USER` and `SYSTEM_USER` fail even as a bracketed alias, so pick another name for such a column.

### Ent. Prefix Only from a Child Account

**"The 'Ent.' prefix can only be used to query data in a parent account from a child account."**

`Ent.` reaches up from a child Business Unit to the parent, so in the parent Business Unit itself, there is nothing to reach. Remove the prefix there. Many examples on this site use `Ent._Subscribers`, as they are written for a child Business Unit.

### Incorrect Syntax Near

**"Incorrect syntax near 'X'."**

This is SQL Server's general syntax error, and X is the first word where the query stopped making sense to it. The mistake is usually right before X, or X itself is something SQL Server 2022 does not know:

| You wrote                      | Error                                             | Fix                                                                                                                                                 |
| ------------------------------ | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `LIMIT 10` at the end          | Incorrect syntax near 'LIMIT'.                    | [`TOP 10`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-select/#order-by-without-top) after `SELECT`              |
| `WINDOW` clause                | Incorrect syntax near 'WINDOW'.                   | The window in each [`OVER`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#over-and-partition-by) |
| `OPTION (MAXDOP 1)` at the end | Incorrect syntax near the keyword 'OPTION'.       | Remove it                                                                                                                                           |
| `N'Łódź tour'`                 | Incorrect syntax near the keyword 'AS'.           | `'Łódź tour'`, as MCE adds the `N` on its own                                                                                                       |
| `CURRENT_DATE`                 | Incorrect syntax near the keyword 'CURRENT_DATE'. | `CONVERT(DATE, GETDATE())`                                                                                                                          |
| `FirstName \|\| LastName`      | Incorrect syntax near '\|'.                       | [`CONCAT(FirstName, LastName)`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-string-functions/#concat)            |
| `AS Key` or `AS Order`         | Incorrect syntax near the keyword 'Key'.          | The name in brackets, `AS [Key]`, or another name                                                                                                   |

`CURRENT_DATE` and `||` come from other SQL dialects and from SQL Server 2025, which MCE does not run.

Right after a table name, SQL Server reads the next word as the alias of that table. So `FROM Orders LIMIT 10` fails near '10', not near 'LIMIT', and a `WINDOW` clause right after `FROM Orders` fails near the name of the window. The mistake then sits one word before the one the error names.

### Not a Recognized Built-in Function Name

**"'X' is not a recognized built-in function name."**

SQL Server 2022 does not know the function X. It is either from SQL Server 2025, such as `REGEXP_LIKE` or `JSON_CONTAINS`, from another SQL dialect, such as `NOW()`, `IFNULL` or `NVL`, or from AMPScript. `GETDATE()` does the job of `NOW()`, and [`ISNULL` or `COALESCE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-null-functions/#isnull) the job of `IFNULL` and `NVL`. `GUID()` is the classic case, as it works in AMPScript, while SQL needs [`NEWID()`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-string-functions/#newid). For patterns, use [`LIKE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-like/) or [`PATINDEX`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-string-functions/#patindex) in place of the 2025 regular expressions. Some 2025 additions fail differently: `JSON_OBJECTAGG` gets "Incorrect syntax near 'JSON_OBJECTAGG'."

### ORDER BY Clause Is Invalid in Views

**"The ORDER BY clause is invalid in views, inline functions, derived tables, subqueries, and common table expressions, unless TOP, OFFSET or FOR XML is also specified."**

Your query has an `ORDER BY` without `TOP`. MCE wraps every query in a derived table, where SQL Server sorts only to pick rows. A Data Extension does not keep the order anyway, so remove the `ORDER BY`, or [add `TOP`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-select/#order-by-without-top) when the order decides which rows you keep.

### No Column Name Was Specified

**"No column name was specified for column 1 of 'Qry'."**

Every column of your query needs a name, as it becomes a field of the target Data Extension. A plain field has its own, but an expression needs an alias, and the number in the error tells you which column misses it:

```sql {3} title="❌ An expression without an alias"
SELECT
      SubscriberKey
    , COUNT(*)
FROM Orders
GROUP BY SubscriberKey
/* Error: No column name was specified for column 2 of 'Qry'. */
```

Add `AS OrderCount` after `COUNT(*)`, and the query runs. `Qry` is the name of the derived table MCE wraps your query in. The same error comes from [`FOR JSON PATH`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-json-functions/#for-json-path) on the query itself, as it returns one column without a name.

### Column Was Specified Multiple Times

**"The column 'X' was specified multiple times for 'Qry'."**

Two columns of your query share one name. It usually happens after a `JOIN`, when both tables have the field:

```sql {2,4} title="❌ SubscriberKey from both tables"
SELECT
      ord.SubscriberKey
    , ord.OrderId
    , sub.SubscriberKey
FROM Orders AS ord
    INNER JOIN _Subscribers AS sub
        ON sub.SubscriberKey = ord.SubscriberKey
/* Error: The column 'SubscriberKey' was specified multiple times for 'Qry'. */
```

Keep one of them, or give the other an alias of its own.

### Column Is Invalid in the Select List

**"Column 'X' is invalid in the select list because it is not contained in either an aggregate function or the GROUP BY clause."**

With [`GROUP BY`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/#group-by), every row of the result stands for a group. A column that is neither grouped nor aggregated has many values per group, and SQL Server cannot pick one:

```sql {3} title="❌ OrderId is neither grouped nor aggregated"
SELECT
      SubscriberKey
    , OrderId
    , SUM(OrderTotal) AS LifetimeSpend
FROM Orders
GROUP BY SubscriberKey
/* Error: Column 'C<account ID>.Orders.OrderId' is invalid in the select list because it is not contained in either an aggregate function or the GROUP BY clause. */
```

The `C` and the number in front of the table name are your account's schema in SQL Server, so expect your own account ID there. Add the column to `GROUP BY`, aggregate it, for example with [`MAX`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/#min-and-max), or keep all the rows and get the totals with [`OVER`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#over-and-partition-by).

### Invalid Column Name

**"Invalid column name 'X'."**

SQL Server found no column X in the tables of your query. Besides a typo, two causes are specific to MCE:

1. Text in double quotes. SQL Server reads `"Music"` as the name of a column, so `WHERE Category = "Music"` fails with "Invalid column name 'Music'." Write text in single quotes, `'Music'`.
2. A `--` comment, as the save comments out everything after it, see [Errors from Line Comments](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-errors/#errors-from-line-comments).

### Ambiguous Column Name

**"Ambiguous column name 'X'."**

After a `JOIN`, both tables have a column X, and your query names it without saying which one. Prefix it with the alias of its table, as in `ord.SubscriberKey`. My [style guide](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-style-guide/#table-aliases) prefixes every column of a query with a `JOIN`, which rules this error out.

### Multi-Part Identifier Could Not Be Bound

**"The multi-part identifier "x.Y" could not be bound."**

The prefix `x` names no table in that part of the query. Usually, it is a typo in the alias, an alias of a table you forgot to join, or an alias from inside a subquery used outside it:

```sql {2} title="❌ The prefix does not match the alias"
SELECT
      o.SubscriberKey
    , ord.OrderId
FROM Orders AS ord
/* Error: The multi-part identifier "o.SubscriberKey" could not be bound. */
```

If your prefixes look right, check for a `--` comment. The save comments out everything after one, `FROM` included, and then complains about the column, see [Errors from Line Comments](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-errors/#errors-from-line-comments).

### Window Function Errors

**Window functions have errors of their own, and each points at a rule of how they work.**

| Error                                                                                                 | Cause                                        | Fix                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Windowed functions can only appear in the SELECT or ORDER BY clauses.                                 | A window function in `WHERE`                 | Number the rows in a [subquery](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#row_number), and filter outside it    |
| Use of DISTINCT is not allowed with the OVER clause.                                                  | `COUNT(DISTINCT x) OVER (...)`               | A [`GROUP BY` subquery joined back](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#count-distinct-values-per-window) |
| The function 'ROW_NUMBER' must have an OVER clause with ORDER BY.                                     | `ROW_NUMBER` without `ORDER BY`              | Add `ORDER BY`, ending with a unique column                                                                                                                            |
| The function 'PERCENTILE_CONT' must have an OVER clause.                                              | `PERCENTILE_CONT` without `OVER`             | [Add `OVER (...)`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#percentile_cont-and-percentile_disc)               |
| The function 'ROW_NUMBER' may not have a window frame.                                                | `ROWS BETWEEN` in the `OVER` of `ROW_NUMBER` | Remove the frame                                                                                                                                                       |
| Window frame with ROWS or RANGE must have an ORDER BY clause.                                         | A frame without `ORDER BY`                   | Add [`ORDER BY`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#running-totals-and-frames)                           |
| RANGE is only supported with UNBOUNDED and CURRENT ROW window frame delimiters.                       | `RANGE BETWEEN 1 PRECEDING AND CURRENT ROW`  | `ROWS` for a number of rows                                                                                                                                            |
| The function 'STRING_AGG' is not a valid windowing function, and cannot be used with the OVER clause. | `STRING_AGG(...) OVER (...)`                 | [`STRING_AGG`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-string-functions/#string_agg) with `GROUP BY`                            |

### Aggregate, UNION and ORDER BY Errors

**SQL Server's rules for grouping, combining and sorting produce errors of their own, and MCE passes them on word for word.**

| Error                                                                                                                                                                            | Cause                                                                                                                                                | Fix                                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| An aggregate may not appear in the WHERE clause unless it is in a subquery contained in a HAVING clause or a select list, and the column being aggregated is an outer reference. | `WHERE OrderTotal > AVG(OrderTotal)`                                                                                                                 | `WHERE OrderTotal > (SELECT AVG(OrderTotal) FROM Orders)`, or [`HAVING`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/#having) for groups |
| Cannot perform an aggregate function on an expression containing an aggregate or a subquery.                                                                                     | `SUM(COUNT(*))`                                                                                                                                      | Aggregate in a subquery, then aggregate its result                                                                                                                                              |
| All queries combined using a UNION, INTERSECT or EXCEPT operator must have an equal number of expressions in their target lists.                                                 | A [`UNION`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/#union) of queries with different numbers of columns | The same columns in every query, with `NULL` where one has nothing                                                                                                                              |
| Only one expression can be specified in the select list when the subquery is not introduced with EXISTS.                                                                         | Two columns in a subquery after `IN`                                                                                                                 | One column, or `EXISTS`                                                                                                                                                                         |
| Each GROUP BY expression must contain at least one column that is not an outer reference.                                                                                        | `GROUP BY 1`                                                                                                                                         | The names of the columns                                                                                                                                                                        |
| The ORDER BY position number 3 is out of range of the number of items in the select list.                                                                                        | `ORDER BY 3` with two columns                                                                                                                        | The name of the column                                                                                                                                                                          |
| A constant expression was encountered in the ORDER BY list, position 1.                                                                                                          | `ORDER BY 'OrderTotal'`, in quotes                                                                                                                   | The name without quotes                                                                                                                                                                         |
| ORDER BY items must appear in the select list if SELECT DISTINCT is specified.                                                                                                   | `SELECT DISTINCT TOP 3 SubscriberKey ... ORDER BY OrderTotal`                                                                                        | Add the column, or drop `DISTINCT`                                                                                                                                                              |
| The correlation name 'X' is specified multiple times in a FROM clause.                                                                                                           | One alias for two tables                                                                                                                             | An alias of its own for each table                                                                                                                                                              |

### STRING_AGG Argument Data Type

**"Argument data type nvarchar is invalid for argument 2 of string_agg function."**

You joined the values of a `VARCHAR` field, such as `Status` of `_Subscribers`, with `STRING_AGG`. MCE adds an `N` to your separator, which makes it `NVARCHAR`, and the two types do not match. [Convert the field to `NVARCHAR(MAX)`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-string-functions/#string_agg) first.

### JSON Text Is Not Properly Formatted

**"JSON text is not properly formatted. Unexpected character 'X' is found at position N."**

You read JSON from a fixed text that is not valid JSON, and the syntax check evaluated it. A strict path that is missing in such a text, as in `JSON_VALUE('{"orderId":"ORD-1042"}', 'strict $.couponCode')`, gets "Property cannot be found on the specified JSON path." the same way. Other fixed values are not evaluated: `CAST('abc' AS INT)` or `1 / 0` pass the check and fail the run. On a field of a Data Extension, the same mistake passes the check and fails the run without a reason, see [Automation Failed Due to System Error](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-errors/#automation-failed-due-to-system-error). Either way, check the value with [`ISJSON`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-json-functions/#isjson) before you read it.

---

## MCE Query Activity Save Errors

**Save errors come after the syntax check has passed your query, when MCE stores it as a Query Activity.**

You see them when you finish a Query Activity in Automation Studio. [SQL Studio](https://mateuszdabrowski.pl/sql-studio/) saves a Query Activity behind every run, so it shows them as "Could not start the query:" followed by MCE's words.

### Error While Processing Square Brackets

**"Error while processing square brackets"**

Your query has no square brackets? It does not need any. The usual cause is a single apostrophe in a comment, like the one in `don't`. MCE looks for apostrophes to find the text values in your query, comments included, and an apostrophe without a pair leaves a text value open:

```sql {4} title="❌ A single apostrophe in a comment fails the save"
SELECT
      OrderId
FROM Orders
WHERE CouponCode IS NOT NULL /* orders with a coupon, don't count gift cards */
/* Error: Error while processing square brackets */
```

Leave apostrophes out of comments, or keep them in pairs, as described in my [style guide](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-style-guide/#apostrophes-in-comments).

### Errors from Line Comments

**"Invalid column name 'X'.", "The multi-part identifier "x.Y" could not be bound." or "Cannot find table 0."**

All three can come from one `--` line comment. In the syntax check, as in any SQL editor, the comment ends with its line. When MCE saves the query, the comment never closes, so everything below it becomes part of it:

```sql {2} title="❌ What you write"
SELECT
      OrderId -- the order to review
    , OrderTotal
FROM Orders
/* Error: Invalid column name 'OrderId'. */
```

```sql {2-4} title="What the save reads"
SELECT
      OrderId /* the order to review
    , OrderTotal
FROM Orders */
```

Without `FROM`, `OrderId` belongs to no table, so the save fails on it. A line comment before `SELECT` comments out the whole query, which gives "Cannot find table 0.", and one at the very end passes the save but fails the run without any reason. Use block comments, `/* */`, everywhere, even for a note at the end of a line. My [style guide](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-style-guide/#line-comments) has the details.

### Update Type Must Be Update

**"Error saving the Query field.Update Type must be 'Update' or the target data extension 'X' cannot appear in the query."**

Your query reads its own target Data Extension, and the data action is Overwrite or Append. MCE refuses that wherever the read sits, even in a subquery. It also rules out the usual way to add only new rows, an Append with `NOT EXISTS` on the target:

```sql {5-10} title="❌ Append of new orders that reads its own target, OrdersHistory"
SELECT
      ord.OrderId
    , ord.OrderTotal
FROM Orders AS ord
WHERE
    NOT EXISTS (
        SELECT history.OrderId
        FROM OrdersHistory AS history
        WHERE history.OrderId = ord.OrderId
    )
```

A `JOIN` to the target counts as a read, and so does a later branch of a `UNION`. The name of the target in a comment or a text value does not.

Switch the data action to Update, which may read its own target. Update needs a primary key in the target, here `OrderId`. It adds the rows with new keys and updates the rows whose keys the target already holds. In this query, the `NOT EXISTS` already leaves out the orders the target holds, so only the new ones arrive.

### Target Must Have a Non-Primary-Key Field

**"Error saving the Query field.The Target Data Extension must have at least one non-primary-key field."**

Update matches rows by the primary key and then changes the other fields. A target whose every field is part of the primary key has nothing to change, so MCE refuses the save. Use Overwrite or Append there, or add a field outside the key. Through the API, the error comes with a `<br />` at the end, which is part of MCE's message.

A target without any primary key fails Update as well, with "Error saving the Query field.The Target Data Extension must have at least one primary key field." Add a primary key to the target, or use Overwrite or Append.

### Field Is Required for the Target Data Extension

**"Error saving the Query field.Field 'X' is a required for the Target Data Extension. Ensure this field is specified in your query text."**

The target has a required field, and your query has no column of that name. Add the column, with a value in every row. A column that is there but empty in some rows passes the save and fails the run, see [Cannot Insert a NULL Value](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-errors/#cannot-insert-a-null-value).

---

## MCE Query Activity Run Errors

**Run errors come once your query meets the data, and only the Action Log of the Query Activity explains some of them.**

The Action Log can take a minute or two to show a failed run, so refresh it before you decide there is no entry.

### Automation Failed Due to System Error

**"Automation failed due to system error."**

The Action Log of the Query Activity says this when the run fails and MCE passes no reason on. Tools that read the run status, SQL Studio included, see even less: a fatal error with an empty message. These causes fail without a reason, each passing the syntax check and the save:

| Cause                                                                           | Example                                                                | Fix                                                                                                                                                              |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Text that is not a date, converted to `DATETIME` or going into a Date field     | `'31/12/2026'`, read month first                                       | [`TRY_CONVERT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-conversion-functions/#try_convert) with a style code in the query |
| Text that is not a number, converted to `DECIMAL` or going into a Decimal field | `'n/a'`                                                                | [`TRY_CONVERT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-conversion-functions/#try_convert)                                |
| A date that does not exist                                                      | `DATEFROMPARTS(2026, 2, 30)`                                           | Check the parts before you build the date                                                                                                                        |
| JSON that is not valid                                                          | `JSON_VALUE(Payload, '$.orderId')` on a cut payload                    | [`ISJSON`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-json-functions/#isjson) first                                          |
| A division by zero                                                              | `SUM(OrderTotal) / COUNT(CouponCode)` for a subscriber without coupons | `NULLIF(COUNT(CouponCode), 0)` as the divisor                                                                                                                    |
| A number too big for `INT`                                                      | Unix milliseconds in `DATEADD`                                         | [Seconds and milliseconds apart](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-date-functions/#unix-timestamps)                 |
| A date difference too big for `INT`                                             | `DATEDIFF(SECOND, '1900-01-01', DateJoined)`                           | [`DATEDIFF_BIG`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-date-functions/#datediff)                                        |
| A negative length                                                               | `LEFT(EmailAddress, CHARINDEX('@', EmailAddress) - 1)` without an `@`  | [`SUBSTRING`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-string-functions/#substring) or a `LIKE '%@%'` filter               |
| A style code SQL Server does not have                                           | `CONVERT(VARCHAR(10), DateJoined, 999)`                                | A [listed style code](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-conversion-functions/#convert-date-style-codes)             |
| A list longer than 4,000 characters                                             | `STRING_AGG(EmailAddress, ', ')` over many rows                        | [`CONVERT(NVARCHAR(MAX), ...)`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-string-functions/#string_agg) first               |
| A `--` comment at the very end                                                  | `FROM Orders -- all orders`                                            | [Block comments](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-style-guide/#line-comments)                                      |

One bad row is enough to fail the whole run, so a query that worked for months can fail on the first odd value from a web form. A failed Append or Overwrite writes none of its rows, so the target keeps what it had. A failed Update can keep some of its changes, see [Violation of PRIMARY KEY Constraint](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-errors/#violation-of-primary-key-constraint). To find the column, run the query again with half of its columns, and keep halving the half that fails. The one you are left with has the value to guard.

### Conversion Failed When Converting

**"Query failed during execution. Error: Conversion failed when converting the nvarchar value 'X' to data type int."**

A text value has to become a whole number and is not one, either in a `CAST` or `CONVERT` to `INT` or on its way into a Number field. The reason quotes the value that failed. That value can be personal data, such as an email address, which then sits in the Action Log for everyone who can open Automation Studio.

Convert with [`TRY_CONVERT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-conversion-functions/#try_convert), which returns `NULL` for such a value, and check the [types of the target fields](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-conversion-functions/#data-extension-field-types). Text converted to `DECIMAL`, or going into a Decimal field, fails as well, but the Action Log says only "Automation failed due to system error." In SQL Studio, both show as a run without a reason.

### Could Not Convert Date

**"Could not convert date and/or time from string data type."**

A `CONVERT` or `CAST` to `DATE` met text that is not a date in the style you gave, such as `CONVERT(DATE, BirthDateText, 103)` on `31/02/1990` or on an email address typed into the wrong field. The Action Log adds "Automation failed due to system error." under this line. Switch to [`TRY_CONVERT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-conversion-functions/#try_convert), which returns `NULL` for such a value, and check that the [style code](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-conversion-functions/#convert-date-style-codes) matches the format of your data.

Only a conversion to `DATE` gets this reason. A conversion to `DATETIME` fails with [no reason at all](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-errors/#automation-failed-due-to-system-error), and so does text that goes straight into a Date field, which SQL Server stores as `DATETIME`. So convert text dates to `DATE` in the query, where you also choose the style.

### Cannot Insert a NULL Value

**"Cannot insert a NULL value into a non-nullable column."**

A row of your query has no value for a required field of the target, or for its primary key. The save does not look at the values, so the run fails, and the Action Log adds "Automation failed due to system error." under this line. Give every row a value, for example with [`COALESCE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-null-functions/#coalesce) and a default, or leave out the rows without one.

### String or Binary Data Would Be Truncated

**"Query failed during execution. Error: String or binary data would be truncated in table 'X', column 'Y'. Truncated value: 'Z'."**

A value is longer than its field in the target. The message names the field and shows the start of the value, cut at the length of the field. Shorten the value with [`LEFT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-string-functions/#left--right), make the field longer, or find the long values first with my [value length snippet](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/snippets/sql-debugging-value-length/).

### Query Failed: Timeout

**"Query failed: Timeout"**

The query ran for 30 minutes, the [limit of Automation Studio](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/licence-limits/#limits-and-guardrails), and MCE stopped it. Narrow Data Views down by `EventDate` or `JobID` before you join them, keep only the rows you need in large Data Extensions with retention periods, and when nothing else helps, [split the query into parts](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#random-test-groups) that run in separate Query Activities.

### Violation of PRIMARY KEY Constraint

**"Violation of PRIMARY KEY constraint. Cannot insert duplicate key."**

The Action Log shows this line and a second one that names the Data Extension and the key: "Query failed during execution. Error: Violation of PRIMARY KEY constraint. Cannot insert duplicate key in object 'X'. The duplicate key value is (Y)." Two different mistakes lead here.

The first is an Append of a key that the target already holds. Switch to Update, which updates the rows the target already has and adds the new ones.

The second is a key that your query returns more than once, such as a `SubscriberKey` from `Orders`. Append fails on it even into an empty target, and so does Update when the key is new. Overwrite does not fail at all: it writes one row per key, and Update does the same for a key the target already holds. In my test, Overwrite kept the last of the three rows of `anna-1042` and Update the first, but nothing in the query decides which row comes first. Pick the row yourself with [`ROW_NUMBER`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#row_number) before the data reaches the target.

When Update fails on a new key, it does not undo the rest. The rows whose keys the target already held keep their new values, and only the new keys are lost.

---

## MCE Query Activity Silent Errors

**Silent errors pass all three checks, and the run completes, but the target ends up holding something you did not mean.**

The Action Log stays empty, so you find them only when you read the data.

### Overwrite With No Rows

An Overwrite whose query returns no rows completes and leaves the target empty. That is what you asked for, but rarely what you meant. When an import fails and leaves a source Data Extension empty, the next Overwrite wipes the target your sends read from. Where the target must never be empty, put a Verification Activity before the query in the automation, which stops it when the source has no rows.

### Overwrite With Duplicate Keys

A key that your query returns more than once [fails an Append, and an Update when the key is new](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-errors/#violation-of-primary-key-constraint), but an Overwrite takes it and writes one row per key. Nothing in the query decides which of the rows stays, so pick it yourself with [`ROW_NUMBER`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#row_number).

### Number Fields Cut Decimals

`1.9` written into a Number field lands as `1`. A Number field is an `INT`, and SQL Server [cuts the decimals](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-conversion-functions/#data-types) when it converts to one, without rounding. Use a Decimal field, or [round the value](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-numeric-functions/#round) in the query first.

### EmailAddress Fields Take Any Text

A query can write `not-an-email` into an EmailAddress field, as MCE does not check the format when a query writes it. Check the values in the query, for example with `LIKE '%_@_%._%'`, before they reach the field your sends use.

### String Dates Read Month First

A string date that goes into a Date field is read as month, day and year. `12/31/2026` and `2026-12-31` land as 31 December 2026, while `31/12/2026` [fails the whole run](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-errors/#automation-failed-due-to-system-error). The dangerous one is `01/02/2026`, which lands as 2 January even when it meant 1 February, and nothing tells you. Convert day-first dates in the query with [`TRY_CONVERT(DATE, x, 103)`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-conversion-functions/#convert-date-style-codes).

### Columns the Target Lacks

A column with no field of its name in the target is left out without a word, and so is a column whose name starts with an underscore. Names match regardless of case, so `subscriberkey` fills `SubscriberKey`. A typo in an alias therefore leaves its field empty, where you would expect an error. Compare the column names of your query with the fields of the target before the first run.

---

## How to Avoid MCE SQL Errors

The easiest way is to let a tool check for you. [SQL Studio](https://mateuszdabrowski.pl/sql-studio/) lints your query before you run it, and my [SF MCE SQL skill](https://mateuszdabrowski.pl/sql-studio/#claude-skill) gives Claude the same lint, so the queries it writes avoid these errors from the start.

Without either, five habits rule out many of them:

1. Start every query with `SELECT`, and write common table expressions as subqueries [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-errors/#only-select-queries-are-valid)
2. Write comments as `/* */`, with no single apostrophes inside [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-errors/#errors-from-line-comments)
3. Give every expression an alias, and every column a name of its own [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-errors/#no-column-name-was-specified)
4. Guard conversions, JSON and divisions with `TRY_CONVERT`, `ISJSON` and `NULLIF`, as most run errors give no reason [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-errors/#automation-failed-due-to-system-error)
5. Return one row per primary key, picked with `ROW_NUMBER` [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-errors/#violation-of-primary-key-constraint)
