# MCE SQL Style Guide

> Query with style. Readable, bug-free code is a few shifts & spaces away.

Source: https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-style-guide/  
Author: Mateusz Dąbrowski  
Last updated: 2026-09-24  
Licence: CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)

First things first: this Salesforce Marketing Cloud Engagement (MCE, formerly Salesforce Marketing Cloud) SQL style guide is highly subjective. You may use it as it is, implement only some parts of it, or ignore it altogether. There are only two rules that I believe are a must-have:

1. Be consistent across your codebase.
2. Strive for good readability.

Everything else is preference. And you are just about to learn about mine.

## Letter Case

SQL gives you much freedom regarding the type of letter case you will be using for parts of your query. Let's use this freedom to create queries that are readable and aligned in convention to other MCE programmatic languages operating on the same data.

### SQL Syntax Case

**Use `UPPERCASE` for all elements of SQL syntax.**

This approach helps visually differentiate query language from Tables (data extensions, data views) and Columns (fields) to improve readability.

```sql
/* ✅ Upper Case for SQL Syntax */
SELECT
      SubscriberKey
    , EmailAddress
FROM Ent._Subscribers
WHERE DateJoined >= DATEADD(MONTH, -1, GETDATE())

/* ❌ Pascal Case for SQL Syntax */
Select
      SubscriberKey
    , EmailAddress
From Ent._Subscribers
Where DateJoined >= DateAdd(Month, -1, GetDate())

/* ❌ Lower Case for SQL Syntax */
select
      SubscriberKey
    , EmailAddress
from Ent._Subscribers
where DateJoined >= dateadd(month, -1, getdate())
```

### Column & Table Names Case

**Use `PascalCase` for all Table and Column names.**

Treat it as a soft recommendation, as it is highly connected to your organisation's conventions. If other connected systems are using a different style, it might be best to follow it in MCE.

It is especially true for Tables, as you might be using mixed convention leveraging lowercase, uppercase and underscores for Data Extension names. However, try not to use hyphens, as those will require you to use square brackets around the name and might interfere in query syntax highlighting, leading to worse readability.

The most popular SQL convention for Table and Column names is `snake_case`. However, in MCE, the Table and Column names will share the case between your queries and the User Interface. It is essential to make them as readable and human friendly as possible. Additionally, in many cases, you will also leverage those names in AMPScript and SSJS.

Due to the above, I believe `PascalCase` - especially for Column names - is the best choice for MCE SQL.

```sql
/* ✅ Pascal Case for Table and Column names */
SELECT
      wel.SubscriberKey
    , wel.EmailAddress
    , o.EventDate AS OpenDate
FROM WelcomeCampaignSegment AS wel
    INNER JOIN _Open AS o
        ON o.SubscriberKey = wel.SubscriberKey

/* ✅ Pascal Case for Column names and custom consistent covention for Table names */
SELECT
      wel.SubscriberKey
    , wel.EmailAddress
    , o.EventDate AS OpenDate
FROM WEL_WelcomeCampaignSegment_20201011_OTH AS wel
    INNER JOIN _Open AS o
        ON o.SubscriberKey = wel.SubscriberKey

/* ❌ Lower Case for Table and Column names */
SELECT
      wel.subscriberkey
    , wel.emailaddress
    , o.eventdate AS opendate
FROM welcomecampaignsegment AS wel
    INNER JOIN _open AS o
        ON o.subscriberkey = wel.subscriberkey

/* ❌ Upper Case for Table and Column names */
SELECT
      WEL.SUBSCRIBERKEY
    , WEL.EMAILADDRESS
    , O.EVENTDATE AS OPENDATE
FROM WELCOMECAMPAIGNSEGMENT AS WEL
    INNER JOIN _OPEN AS O
        ON O.SUBSCRIBERKEY = WEL.SUBSCRIBERKEY
```

> **Note: You Should Know**
>
> If you want to make your Style Guide even safer, you can decide on writing all Columns and Table names in square brackets. As MCE is not checking whether you use SQL's reserved keywords, this approach will protect you from potential silent issue. The cost, however, is much more characters and less readable queries.
>
> ```sql title="You need to decide how hard you want to leverage the square brackets"
> SELECT
>       [wel].[SubscriberKey]
>     , [wel].[EmailAddress]
>     , [o].[EventDate] AS [OpenDate]
> FROM [WelcomeCampaignSegment] AS [wel]
>     INNER JOIN [_Open] AS [o]
>         ON [o].[SubscriberKey] = [wel].[SubscriberKey]
> ```

---

## Alignment and Indentation

SQL is very flexible when it comes to alignment and indentation of the query. Writing everything in one line creates a valid code that will run. But just because it is correct, it doesn't mean it is good. Generous use of new lines and indents has close to no impact on performance but a massive impact on readability. Enter and Space keys are your friends.

There are many styles out there, and I decided to follow those that merge good writing speed with excellent readability.

### Single Information per Line

**Limit information per line to one.**

I recommend keeping one information per line, as it allows for much easier scanning. The four most important examples of this approach are:

1. Each [`SELECT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-select/) Column in a separate line
2. Each [`WHERE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-where/) condition in a separate line
3. Each [`CASE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-case/) condition in a separate line
4. Each [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) and [`ON`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/#joining-on) relationship in a separate line

```sql
/* ✅ Single information per line  */
SELECT
      s.SubscriberKey AS SubscriberKey
    , j.EmailName     AS EmailName
    , s.EventDate     AS SentDate
    , j.DeliveredTime AS DeliveryDate
    , o.EventDate     AS OpenDate
FROM _Sent AS s
    LEFT JOIN _Job AS j
        ON j.JobID = s.JobID
    LEFT JOIN _Open AS o
        ON o.JobID = s.JobID
        AND o.ListID = s.ListID
        AND o.BatchID = s.BatchID
        AND o.SubscriberID = s.SubscriberID
        AND o.IsUnique = 1
WHERE
    1 = CASE
        WHEN j.EmailName LIKE 'UPS_%' THEN 1
        WHEN j.EmailName LIKE 'CRS_%' THEN 1
        ELSE 0
    END

/* ❌ Multiple pieces of information per line */
SELECT s.SubscriberKey AS SubscriberKey, j.EmailName AS EmailName, s.EventDate AS SentDate, j.DeliveredTime AS DeliveryDate, o.EventDate AS OpenDate
FROM _Sent AS s
    LEFT JOIN _Job AS j ON j.JobID = s.JobID
    LEFT JOIN _Open AS o ON o.JobID = s.JobID AND o.ListID = s.ListID AND o.BatchID = s.BatchID AND o.SubscriberID = s.SubscriberID AND o.IsUnique = 1
WHERE 1 = CASE WHEN j.EmailName LIKE 'UPS_%' THEN 1 WHEN j.EmailName LIKE 'CRS_%' THEN 1 ELSE 0 END
```

As you can see, the [`SELECT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-select/) and [`WHERE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-where/) keywords have their separate line to mark respective block starting. For readability reasons, I make an exception if there is only one Column or condition to be used:

```sql
/* ✅ Single Column in SELECT and single condition in WHERE lines */
SELECT SubscriberKey
FROM _Subscribers
WHERE Domain = 'mateuszdabrowski.pl'

/* ❌ Separate lines with single SELECT Column and WHERE condition */
SELECT
      SubscriberKey
FROM _Subscribers
WHERE
    Domain = 'mateuszdabrowski.pl'
```

> **Note: You Should Know**
>
> If you are using `DISTINCT` or `TOP`, put it into the same line as [`SELECT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-select/). In such a case, even if you work on a single Column, move it to a separate row for better readability.
>
> ```sql
> /* ✅ Single Column in SELECT and single condition in WHERE lines */
> SELECT DISTINCT TOP 10
>       SubscriberKey
> FROM ContenstSubmissions
>
> /* ❌ Separate lines for single SELECT Column and WHERE condition */
> SELECT DISTINCT TOP 10 SubscriberKey
> FROM ContenstSubmissions
> ```

### Left Aligned Keywords

**Align main SQL keywords to the left.**

This rule focuses on writing speed. While I prefer the Vertically Aligned Space approach's aesthetics, I don't see any significant readability gains. On the other hand, writing in this style in MCE is a pain, as there is no autoformatter supporting it in the Query Studio or Query Activity. We would have to add all those additional spaces manually. It's just not worth it.

```sql
/* ✅ Left Aligned Keywords */
SELECT
      SubscriberKey
    , EmailAddress
FROM Ent._Subscribers
WHERE DateJoined >= DATEADD(MONTH, -1, GETDATE())

/* ❌ Post Keyword Space Aligned Vertically */
SELECT SubscriberKey,
       EmailAddress
  FROM Ent._Subscribers
 WHERE DateJoined >= DATEADD(MONTH, -1, GETDATE())
```

### Consistent Indentation

**Use indentation to highlight SQL keyword relationships.**

This rule focuses on readability. The logic, in short, is to indent whenever the line is dependent on the previous line (child line), for example:

- Selected Column Names are children of [`SELECT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-select/)
- [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) keywords are children of the initial Table referenced with [`FROM`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-from/)
- Joining relationships ([`ON`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/#joining-on)) are children of [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/)
- Case conditions are children of the [`CASE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-case/)
- Where conditions are children of the [`WHERE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-where/)
- Sub-queries follow the same rules in respective indentation level.

For simplicity I use 4-spaces indent, as it is both standard and can be added in MCE Query with a single click of the Tab key.

```sql
/* ✅ Dependency based indentation */
SELECT
      s.SubscriberKey AS SubscriberKey
    , j.EmailName     AS EmailName
    , s.EventDate     AS SentDate
    , j.DeliveredTime AS DeliveryDate
    , o.EventDate     AS OpenDate
FROM _Sent AS s
    LEFT JOIN _Job AS j
        ON j.JobID = s.JobID
    LEFT JOIN _Open AS o
        ON o.JobID = s.JobID
        AND o.ListID = s.ListID
        AND o.BatchID = s.BatchID
        AND o.SubscriberID = s.SubscriberID
        AND o.IsUnique = 1
WHERE
    1 = CASE
        WHEN j.EmailName LIKE 'UPS_%' THEN 1
        WHEN j.EmailName LIKE 'CRS_%' THEN 1
        ELSE 0
    END

/* ❌ Lack of indentation */
SELECT
s.SubscriberKey   AS SubscriberKey
, j.EmailName     AS EmailName
, s.EventDate     AS SentDate
, j.DeliveredTime AS DeliveryDate
, o.EventDate     AS OpenDate
FROM _Sent AS s
LEFT JOIN _Job AS j ON j.JobID = s.JobID
LEFT JOIN _Open AS o ON o.JobID = s.JobID
AND o.ListID = s.ListID
AND o.BatchID = s.BatchID
AND o.SubscriberID = s.SubscriberID
AND o.IsUnique = 1
WHERE 1 = CASE
WHEN j.EmailName LIKE 'UPS_%' THEN 1
WHEN j.EmailName LIKE 'CRS_%' THEN 1
ELSE 0
END
```

### Intentional Spacing

**Use spaces wherever it makes the query more readable.**

The must-have is spacing around any [operators](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-where/#basic-operators) (equality or comparison) and after commas.

However, there is another place where spacing is beneficial for readability but might require an exception in some scenarios. Spacing for [aliases](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-select/#aliasing-with-as) and `THEN` keywords of the [`CASE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-case/) statement.

I try to use it whenever possible, but when there is huge imbalance in length (for example one Column requires multi-function calculation or there is a single complex `WHEN` in [`CASE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-case/)) equal spacing might make the query harder to read. Always decide which approach works best for your query from readability perspective.

```sql
/* ✅ Spacing around operators plus equalizing aliases and THEN */
SELECT
      s.SubscriberKey AS SubscriberKey
    , j.EmailName     AS EmailName
    , s.EventDate     AS SentDate
    , j.DeliveredTime AS DeliveryDate
    , o.EventDate     AS OpenDate
FROM _Sent AS s
    LEFT JOIN _Job AS j
        ON j.JobID = s.JobID
    LEFT JOIN _Open AS o
        ON o.JobID = s.JobID
        AND o.ListID = s.ListID
        AND o.BatchID = s.BatchID
        AND o.SubscriberID = s.SubscriberID
        AND o.IsUnique = 1
WHERE
    1 = CASE
        WHEN j.EmailName LIKE 'UPS_%'     THEN 1
        WHEN j.EmailName LIKE 'CRS_%'     THEN 1
        WHEN j.EmailName = 'OTH_SeedList' THEN 1
        ELSE 0
    END

/* ✅ Spacing around operators plus equalizing aliases with exceptions */
SELECT
      s.SubscriberKey AS SubscriberKey
    , j.EmailName     AS EmailName
    , s.EventDate     AS SentDate
    , j.DeliveredTime AS DeliveryDate
    , o.EventDate     AS OpenDate
    , DATEDIFF(HOUR, s.EventDate, o.EventDate) AS TimeToOpen
FROM _Sent AS s
    LEFT JOIN _Job AS j
        ON j.JobID = s.JobID
    LEFT JOIN _Open AS o
        ON o.JobID = s.JobID
        AND o.ListID = s.ListID
        AND o.BatchID = s.BatchID
        AND o.SubscriberID = s.SubscriberID
        AND o.IsUnique = 1
WHERE
    1 = CASE
        WHEN j.EmailName LIKE 'UPS_%' OR j.EmailName LIKE 'CRS_%' THEN 1
        WHEN j.EmailName = 'OTH_SeedList' THEN 1
        ELSE 0
    END

/* ❌ Lack of spacing */
SELECT
    s.SubscriberKey AS SubscriberKey
    ,j.EmailName AS EmailName
    ,s.EventDate AS SentDate
    ,j.DeliveredTime AS DeliveryDate
    ,o.EventDate AS OpenDate
    ,DATEDIFF(HOUR,s.EventDate,o.EventDate) AS TimeToOpen
FROM _Sent AS s
    LEFT JOIN _Job AS j
        ON j.JobID=s.JobID
    LEFT JOIN _Open AS o
        ON o.JobID=s.JobID
        AND o.ListID=s.ListID
        AND o.BatchID=s.BatchID
        AND o.SubscriberID=s.SubscriberID
        AND o.IsUnique=1
WHERE
    1=CASE
        WHEN j.EmailName LIKE 'UPS_%' THEN 1
        WHEN j.EmailName LIKE 'CRS_%' THEN 1
        WHEN j.EmailName='OTH_SeedList' THEN 1
        ELSE 0
    END
```

### Commas Placement

**Use commas at the beginning of the line.**

There are few approaches related to comma placement. Initially, I favoured commas at the end of the line, as I found them more accessible to use due to their similarity to natural language. However, there are strong reasons to use the comma at the beginning of the line. Here is what convinced me to change my style:

1. Adding or deleting a Column requires a change in only one line. It's easier, faster and minimises the risk of a crash due to the trailing comma.
2. Above is also very beneficial during difference checking and when leveraging git for query version control. With a comma at the beginning of the line, the Column addition or deletion is displayed correctly as a single line change.
3. Having a comma in the beginning makes it easier to assess where a new Column definition starts quickly. It is a vast readability improvement when you are using more complex structures, like [`CASE` in `SELECT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-case/#conditional-values-with-case).
4. It's also easier to quickly assess whether you have a comma for each Column. With lines of various length, it is much harder with the comma at the end.

For the sake of readability, I indent the first Column by two spaces so that it is in line with the following ones. Similarly, I indent `END` after [`CASE` in `SELECT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-case/#conditional-values-with-case) by two spaces for the same reason.

```sql {3-5,10-12}
/* ✅ Commas at the beginning */
SELECT
      SubscriberKey
    , EmailAddress
    , DateJoined
FROM Ent._Subscribers

/* ❌ Commas in the end */
SELECT
    SubscriberKey,
    EmailAddress,
    DateJoined
FROM Ent._Subscribers
```

---

## Explicit vs Implicit

Many things in SQL can be done in multiple ways - using various functions, symbols or shortcuts. While all those options may work, not all are a good idea. Whenever you are choosing the approach, go for the explicit and straightforward. Even if it means writing a few characters more.

### Date Parts

**Use full [Date Parts](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-date-functions/#date-parts) names.**

Yes, abbreviations let you save few characters, but they kill the readability unless someone is fluent in those shortcuts. For MCE purposes, the time saved during writing is not worth the time lost when reading. Go with the full version.

```sql {6,13}
/* ✅ Full Date Part */
SELECT
      SubscriberKey
    , EmailAddress
FROM Ent._Subscribers
WHERE DateJoined >= DATEADD(MONTH, -1, GETDATE())

/* ❌ Abbreviated Date Part */
SELECT
      SubscriberKey
    , EmailAddress
FROM Ent._Subscribers
WHERE DateJoined >= DATEADD(M, -1, GETDATE())
```

### JOIN and ON

**Use [`INNER JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) name and reference Column from the new Table first after [`ON`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/#joining-on).**

Instead of just [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/), write [`INNER JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/#inner-join) - it's longer but explicit and in line with the rest of [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) keywords. It makes it easier to scan queries with [multiple various `JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/#multiple-various-joins) statements.

Additionally, when defining [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) relationships after [`ON`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/#joining-on), firstly reference the Column from the joined Table. The previous Table should be on the right side. It will improve consistency and reading speed.

```sql {7-8,16-17}
/* ✅ Explicit Inner Join and Column from new Table on the left side of the ON condition */
SELECT
      wel.SubscriberKey
    , wel.EmailAddress
    , o.EventDate AS OpenDate
FROM WelcomeCampaignSegment AS wel
    INNER JOIN _Open AS o
        ON o.SubscriberKey = wel.SubscriberKey

/* ❌ Implicit Inner Join and Column from new Table on the right side of the ON condition */
SELECT
      wel.SubscriberKey
    , wel.EmailAddress
    , o.EventDate AS OpenDate
FROM WelcomeCampaignSegment AS wel
    JOIN _Open AS o
        ON wel.SubscriberKey = o.SubscriberKey
```

### Table Aliases

**When using `JOIN`, add meaningful aliases for Tables and prefix all Columns with them.**

There are a few points:

1. If you are working on only one Table without [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) - don't use [aliases](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/#table-name-prefix) at all. They are not needed and would make the query less readable.
2. If you have any [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) - always use [aliases and prefixes](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/#table-name-prefix). SQL doesn't always require it, but it is much easier to read the query when the Columns have an explicit Table mention in the prefix.
3. When you create an alias for a Table, make it meaningful. Using subsequent letters of the alphabet is not a good idea. Instead, use something that will remind the reader of the full name - for example, abbreviation using the first letter of each word in the Table. It will allow for much easier reading.
4. Always use `AS` keyword between the Table name and the alias.

```sql
/* ✅ No aliasing in single Table query */
SELECT
      SubscriberKey
    , EmailAddress
FROM Ent._Subscribers

/* ❌ Aliasing in single Table query */
SELECT
      s.SubscriberKey
    , s.EmailAddress
FROM Ent._Subscribers AS s

/* ✅ Meaningful aliasing and prefixes in multi Table query */
SELECT
      wel.SubscriberKey
    , wel.EmailAddress
    , o.EventDate AS OpenDate
FROM WelcomeCampaignSegment AS wel
    INNER JOIN _Open AS o
        ON o.SubscriberKey = wel.SubscriberKey

/* ❌ No aliasing and no prefix in multi Table query */
SELECT
      SubscriberKey
    , EmailAddress
    , EventDate AS OpenDate
FROM WelcomeCampaignSegment
    INNER JOIN _Open
        ON _Open.SubscriberKey = WelcomeCampaignSegment.SubscriberKey

/* ❌ Not meaningful aliasing and no AS keyword in multi Table query */
SELECT
      a.SubscriberKey
    , a.EmailAddress
    , b.EventDate AS OpenDate
FROM WelcomeCampaignSegment a
    INNER JOIN _Open b
        ON a.SubscriberKey = b.SubscriberKey
```

### Not Equal To Symbol

**Use `!=` instead of `<>`.**

The `!=` symbol is much more popular and used in many languages. Using it makes the query more readable to people not experienced in SQL.

```sql {4,9}
/* ✅ Use of != for negation */
SELECT SubscriberKey
FROM Ent._Subscribers
WHERE CONVERT(DATE, DateJoined) != CONVERT(DATE, GETDATE())

/* ❌ Use of <> for negation */
SELECT SubscriberKey
FROM Ent._Subscribers
WHERE CONVERT(DATE, DateJoined) <> CONVERT(DATE, GETDATE())
```

### Meaningful Column Names

**Use Column names that suggest the data type.**

Just as with a letter case, you might have your hands tied by cross-system dependencies. But whenever possible, strive for meaningful names:

1. Use descriptive Column names. It is better to have a long explicit one (`IsTrackingSuppressed`) than a short mysterious abbreviation (`trk`).
2. When the Column is a boolean, prefix it with `Is` (or `Has`/`Does` depending on the underlying data).
3. When the Column is a date, suffix it with `Date`.

```sql {3-8,17-22}
/* ✅ Meaningful and consistent Column Names */
SELECT
      s.SubscriberKey    AS SubscriberKey
    , j.EmailName        AS EmailName
    , s.EventDate        AS SentDate
    , j.DeliveredTime    AS DeliveryDate
    , o.EventDate        AS OpenDate
    , j.SuppressTracking AS IsTrackingSuppressed
FROM _Sent AS s
    LEFT JOIN _Job AS j
        ON j.JobID = s.JobID
    LEFT JOIN _Open AS o
        ON o.JobID = s.JobID

/* ❌ No consistency and type alignment in Column Names */
SELECT
      s.SubscriberKey    AS SubscriberKey
    , j.EmailName        AS EmailName
    , s.EventDate        AS SentDate
    , j.DeliveredTime    AS DeliveryTime
    , o.EventDate        AS OpenedAt
    , j.SuppressTracking AS SuppressTracking
FROM _Sent AS s
    LEFT JOIN _Job AS j
        ON j.JobID = s.JobID
    LEFT JOIN _Open AS o
        ON o.JobID = s.JobID
```

## Sum Up

It is a long article, so let's gather all the recommendations in one place:

1. Be consistent
2. Strive for readability
3. Use comments to provide required context to your query
4. Use `UPPERCASE` for SQL syntax [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-style-guide/#sql-syntax-case)
5. Use `PascalCase` for Table & Column names [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-style-guide/#column--table-names-case)
6. Limit information per line to one [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-style-guide/#single-information-per-line)
7. Align main SQL keywords to the left [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-style-guide/#left-aligned-keywords)
8. Use indentation to highlight the relationship between SQL keywords [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-style-guide/#consistent-indentation)
9. Use spaces wherever it makes the query more readable [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-style-guide/#intentional-spacing)
10. Use commas at the beginning of the line [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-style-guide/#commas-placement)
11. Use full Date Parts names [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-style-guide/#date-parts)
12. Use `INNER JOIN` name over `JOIN` [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-style-guide/#join-and-on)
13. In `JOIN ON` reference Column from newly joined Table on the left [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-style-guide/#join-and-on)
14. When using `JOIN`, add meaningful aliases for Tables and prefix all Columns [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-style-guide/#join-and-on)
15. Always use `AS` keyword between the Table name and the alias [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-style-guide/#join-and-on)
16. Use `!=` instead of `<>` [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-style-guide/#not-equal-to-symbol)
17. Use Column names that suggest the data type [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-style-guide/#meaningful-column-names)

If you want to share something I'm missing or have arguments for a different recommendation - [let me know](https://www.linkedin.com/in/mateusz-dabrowski-pl/).

Looking for more MCE style? Check out my:

- [SSJS Style Guide](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/ssjs/ssjs-style-guide/)
- [AMPScript Style Guide](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/ampscript/ampscript-style-guide/)
