# MCE SQL Aggregate Functions

> Group rows and apply aggregate functions to see the big picture in your data extensions.

Source: https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/  
Author: Mateusz Dąbrowski  
Last updated: 2026-09-24  
Licence: CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)

Group rows and apply aggregate functions to see the big picture in your data.

## GROUP BY

`GROUP BY` allows you to create aggregation by grouping the input data on selected column(s).

It limits the data you can [`SELECT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-select/) to either `GROUP BY` column(s) or aggregate functions.

Let's say you want to check which email domains are most popular in your database.

**Query**

```sql {5}
SELECT
      Domain
    , COUNT(*) AS SubscriberCount
FROM _Subscribers
GROUP BY Domain
```

**Outcome**

| Domain              | SubscriberCount |
| ------------------- | --------------- |
| mateuszdabrowski.pl | 1               |
| gmail.com           | 1234            |
| yahoo.com           | 987             |
| outlook.com         | 1111            |
| ...                 | ...             |

With this simple query, you have all subscribers grouped by their domain with the number of matching rows thanks to the [`COUNT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/#count) function.

You can quickly improve this query by limiting the records with [`TOP`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-select/#top) and sorting [`ORDER BY`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-select/#top-with-order-by) to leverage Pareto's principle and pick 20% of the records responsible for 80% of the results. In this case - 20% domains covering approximately 80% subscribers.

**Query**

```sql {5}
SELECT TOP 20 PERCENT
      Domain
    , COUNT(*) AS SubscriberCount
FROM _Subscribers
GROUP BY Domain
ORDER BY COUNT(*) DESC
```

**Outcome**

| Domain      | SubscriberCount |
| ----------- | --------------- |
| gmail.com   | 1234            |
| outlook.com | 1111            |
| yahoo.com   | 987             |

With such data, you can assess your mailing list and decide, for example, whether using AMP for Email will be worth the effort for your business.

It is, however, just the beginning of what you can do with `GROUP BY`. The real magic happens with multiple columns used for the grouping.

Let's check how the domain numbers are changing in years with the help of the [`DATEPART` function](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_subscribers).

**Query**

```sql {6-8}
SELECT TOP 20 PERCENT
      Domain
    , DATEPART(YEAR, DateJoined) AS YearJoined
    , COUNT(*) AS SubscriberCount
FROM _Subscribers
GROUP BY
      Domain
    , DATEPART(YEAR, DateJoined)
ORDER BY COUNT(*) DESC
```

**Outcome**

| Domain      | YearJoined | SubscriberCount |
| ----------- | ---------- | --------------- |
| gmail.com   | 2021       | 642             |
| outlook.com | 2021       | 578             |
| gmail.com   | 2020       | 567             |
| outlook.com | 2020       | 456             |
| yahoo.com   | 2021       | 432             |
| yahoo.com   | 2020       | 345             |

As you can see, by just adding more columns after a comma (order is irrelevant), we can make even more exciting groupings. In this case, we will have a separate row for each domain and year. Easy to see how many Subscribers using Gmail joined your database in 2021 vs 2020.

> **Note: You Should Know**
>
> `GROUP BY` will group [`NULL`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-null-functions/#null) values as if they are equal.

### GROUP BY ROLLUP

`ROLLUP` takes the multi-column grouping to the next level by showing totals and subtotals in the outcomes. Not useful for campaign segmentation, but excellent for quick analysis and reporting.

To use it - add the `ROLLUP` keyword and wrap grouping columns in parentheses.

**Query**

```sql {6-9}
SELECT TOP 20 PERCENT
      Domain
    , DATEPART(YEAR, DateJoined) AS YearJoined
    , COUNT(*) AS SubscriberCount
FROM _Subscribers
GROUP BY ROLLUP (
          Domain
        , DATEPART(YEAR, DateJoined)
    )
ORDER BY COUNT(*) DESC
```

**Outcome**

| Domain      | YearJoined | SubscriberCount |
| ----------- | ---------- | --------------- |
| null        | null       | 12304           |
| gmail.com   | null       | 1234            |
| outlook.com | null       | 1111            |
| yahoo.com   | null       | 987             |
| gmail.com   | 2021       | 642             |
| outlook.com | 2021       | 578             |
| gmail.com   | 2020       | 567             |
| outlook.com | 2020       | 456             |
| yahoo.com   | 2021       | 432             |
| yahoo.com   | 2020       | 345             |

In the outcomes, you will see some rows with `NULL` as columns - those are rows for total and subtotals.

Notice that the `NULL`s are either in all columns (total) or the `YearJoined` column (subtotals). There are no rows with `NULL` only in `Domain`. It is because the `ROLLUP` rolls columns provided in parentheses from right to left when calculating subtotals.

Order of columns will have a massive impact on outcomes!

> **Note: You Should Know**
>
> You can also perform partial rollup by keeping some columns outside of the `ROLLUP` operator. In the example below, I excluded `Domain` from the `ROLLUP` resulting in the lack of total in the outcomes.
>
> **Query**
>
> ```sql {6-8}
> SELECT TOP 20 PERCENT
>       Domain
>     , DATEPART(YEAR, DateJoined) AS YearJoined
>     , COUNT(*) AS SubscriberCount
> FROM _Subscribers
> GROUP BY
>       Domain
>     , ROLLUP(DATEPART(YEAR, DateJoined))
> ORDER BY COUNT(*) DESC
> ```
>
> **Outcome**
>
> | Domain      | YearJoined | SubscriberCount |
> | ----------- | ---------- | --------------- |
> | gmail.com   | null       | 1234            |
> | outlook.com | null       | 1111            |
> | yahoo.com   | null       | 987             |
> | gmail.com   | 2021       | 642             |
> | outlook.com | 2021       | 578             |
> | gmail.com   | 2020       | 567             |
> | outlook.com | 2020       | 456             |
> | yahoo.com   | 2021       | 432             |
> | yahoo.com   | 2020       | 345             |

### GROUP BY CUBE

If you thought that right-to-left execution of the `ROLLUP` is not helping your use case and instead you would rather have all possible groupings - `CUBE` is here to help.

**Query**

```sql {6-9}
SELECT TOP 20 PERCENT
      Domain
    , DATEPART(YEAR, DateJoined) AS YearJoined
    , COUNT(*) AS SubscriberCount
FROM _Subscribers
GROUP BY CUBE (
          Domain
        , DATEPART(YEAR, DateJoined)
    )
ORDER BY COUNT(*) DESC
```

**Outcome**

| Domain      | YearJoined | SubscriberCount |
| ----------- | ---------- | --------------- |
| null        | null       | 12304           |
| null        | 2021       | 6201            |
| null        | 2020       | 4321            |
| gmail.com   | null       | 1234            |
| outlook.com | null       | 1111            |
| yahoo.com   | null       | 987             |
| gmail.com   | 2021       | 642             |
| outlook.com | 2021       | 578             |
| gmail.com   | 2020       | 567             |
| outlook.com | 2020       | 456             |
| yahoo.com   | 2021       | 432             |
| yahoo.com   | 2020       | 345             |

It rolls data like [`ROLLUP`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/#group-by-rollup), but for all combinations of columns. Notice in the outcomes the second and third rows with `NULL`s in first column and count for the whole year.

## COUNT

`COUNT` function allows you to count the number of rows that matches a query. It is excellent for both *ad hoc* data exploration and creating administrative queries that help maintain your instance. It's also a must-have for [`GROUP BY`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/#group-by).

Let's get the count of our Subscribers in Master Data Extension.

```sql {1} title="Count all rows in the _Subscribers Data View"
SELECT COUNT(*)
FROM ContactMasterDE
```

Nice, but it does not give us any information that we couldn't find more comfortable in the User Interface. So, where is the added value?

For example, in seeing whether you have potential duplicate contacts. Instead of looking for all rows with `COUNT(*)`, we will change the function argument to the specific column to count only its [non-`NULL`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-null-functions/#null) values.

```sql {3,6} title="This query will show you which Email Addresses exists on more than one subscriber"
SELECT
      EmailAddress
    , COUNT(EmailAddress) AS EmailCount
FROM ContactMasterDE
GROUP BY EmailAddress
HAVING COUNT(EmailAddress) > 1
```

With [`GROUP BY`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/#group-by) and [`HAVING`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/#having) above, we can simplify the output by showing only the duplicate values with corresponding counts.

> **Note: You Should Know**
>
> You can take it to the next level with the subquery approach:
>
> ```sql {11-12} title="Returns Subscriber Key, Email Address and Duplicate Count of your database"
> SELECT
>       subscribers.SubscriberKey
>     , subscribers.EmailAddress
>     , counted.EmailCount
> FROM ContactMasterDE AS subscribers
>     INNER JOIN (
>         SELECT
>               contacts.EmailAddress        AS EmailAddress
>             , COUNT(contacts.EmailAddress) AS EmailCount
>         FROM ContactMasterDE AS contacts
>         GROUP BY contacts.EmailAddress
>         HAVING COUNT(contacts.EmailAddress) > 1
>     ) AS counted
>         ON counted.EmailAddress = subscribers.EmailAddress
> ```
>
> This extended query will not only tell you that there are potential duplicates. It will also give you Subscriber Keys of duplicate contacts so that you can investigate the reason and clean up records after fixing the underlying issue.
>
> Pack it into Automation with Verification Activity on top and keep your database clean with ease.

### COUNT \*, ALL and DISTINCT

There are three approaches to using `COUNT` that differ slightly from each other.

- `COUNT(*)` will return the number of items, including [`NULL`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-null-functions/#null) values and duplicates.
- `COUNT(FieldName)` / `COUNT(ALL FieldName)` will return the number on [non-`NULL`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-null-functions/#null) values including duplicates.
- `COUNT(DISTINCT FieldName)` will return the number of [non-`NULL`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-null-functions/#null) and non-duplicate values.

```sql {2-4} title="Let's find out whether we have multiple Subscribers with the same Email Address"
SELECT
      COUNT(EmailAddress) AS EmailCount
    , COUNT(DISTINCT EmailAddress) AS UniqueEmailCount
FROM _Subscribers
```

## HAVING

`HAVING` works nearly the same as [`WHERE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-where/) and allows you to filter outcomes of your [`GROUP BY`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/#group-by).

```sql {6} title="This query will show you which Email Addresses exists on more than one subscriber"
SELECT
      EmailAddress
    , COUNT(EmailAddress) AS EmailCount
FROM _Subscribers
GROUP BY EmailAddress
HAVING COUNT(EmailAddress) > 1
```

You can leverage all filtering tricks from [`WHERE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-where/). In practice, I mostly use it along with aggregate functions like [`COUNT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/#count).

### HAVING vs WHERE

I just wrote that `HAVING` and [`WHERE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-where/) work similarly, and both filter the outcomes. What is the difference?

1. `WHERE` filters individual data (rows before [`GROUP BY`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/#group-by) is applied)
2. `HAVING` filters aggregated data (rows after [`GROUP BY`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/#group-by) is applied)

```sql {5,7} title="This query will show you which Email Addresses exists on more than one active subscriber"
SELECT
      EmailAddress
    , COUNT(EmailAddress) AS EmailCount
FROM _Subscribers
WHERE Status = 'active'
GROUP BY EmailAddress
HAVING COUNT(EmailAddress) > 1
```

Thanks to using both `WHERE` and `HAVING` in this query, we will look only for duplicate active Subscribers. If we have two subscribers with the same email, but one is inactive, this query won't output it.

> **Note: You Should Know**
>
> You can use both in the same query and even mix it with [`DISTINCT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-select/#distinct).
>
> However, when building such layered filters, keep in mind the SQL's order of execution for clauses:
>
> [`FROM`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-from/) > [`WHERE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-where/) > [`GROUP BY`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/#group-by) > [`HAVING`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/#having) > [`DISTINCT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-select/#distinct) > [`ORDER BY`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-select/#top-with-order-by)
>
> It means that rows filtered with `WHERE` will not be taken into consideration for `GROUP BY` and that `DISTINCT` deduplication will be applied to results grouped and filtered by `HAVING` - not the source data.

## MIN and MAX

`MIN` and `MAX` functions can help you find the minimum and maximum values within a group.

As they are aggregate functions, we can use them in both the [`SELECT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-select/) part of the query and for filtering with [`WHERE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-where/) or [`HAVING`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/#having).

**Query**

```sql {3-4,7} title="Let's find domains that are no longer getting new subscribers"
SELECT TOP 10
      Domain
    , MIN(DATEDIFF(DAY, DateJoined, GETDATE())) AS YoungestSubscriberDaysOfService
    , MAX(DATEDIFF(DAY, DateJoined, GETDATE())) AS OldestSubscriberDaysOfService
FROM _Subscribers
GROUP BY Domain
ORDER BY MIN(DATEDIFF(DAY, DateJoined, GETDATE())) DESC
```

**Outcome**

| Domain              | YoungestSubscriberDaysOfService | OldestSubscriberDaysOfService |
| ------------------- | ------------------------------- | ----------------------------- |
| mateuszdabrowski.pl | 784                             | 784                           |
| test.com            | 530                             | 743                           |
| yahoo.com           | 253                             | 723                           |
| ...                 | ...                             | ...                           |

Learn more about `MIN` and `MAX` in [Numeric Functions documentation](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-numeric-functions/#min-and-max).

## AVG

`AVG` function allows you to find the average of values within the group.

It ignores `NULL` values for the calculation and we can use it in [`SELECT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-select/), [`WHERE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-where/) or [`HAVING`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/#having) part of the query.

**Query**

```sql {3,6,7} title="Let's find domain that are bouncing for most users"
SELECT TOP 10
      Domain
    , AVG(BounceCount) AS AverageBounceCount
FROM _Subscribers
GROUP BY Domain
HAVING AVG(BounceCount) > 0
ORDER BY AVG(BounceCount) DESC
```

**Outcome**

| Domain      | AverageBounceCount |
| ----------- | ------------------ |
| test.com    | 164                |
| yahoo.com   | 2                  |
| outlook.com | 1                  |
| gmail.com   | 1                  |
| ...         | ...                |

Learn more about `AVG` in [Numeric Functions documentation](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-numeric-functions/#avg).

> **Note: You Should Know**
>
> `AVG` will ignore rows with [`NULL`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-null-functions/), which can skew your results. [`COALESCE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-null-functions/#coalesce) will be your best friend to make sense out of imperfect data.

## SUM

`SUM` function allows you to find the sum of values within the group.

It ignores `NULL` values for the calculation and we can use it in [`SELECT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-select/), [`WHERE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-where/) or [`HAVING`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/#having) part of the query.

**Query**

```sql {4,8-9} title="Let's find product categories responsible for the highest income"
SELECT TOP 3
      ProductCategory
    , COUNT(Orders) AS TotalOrders
    , SUM(Price) AS TotalIncome
FROM Purchases
WHERE Status = 'Complete'
GROUP BY ProductCategory
HAVING SUM(Price) > 1000
ORDER BY SUM(Price) DESC
```

**Outcome**

| ProductCategory | TotalOrders | TotalIncome |
| --------------- | ----------- | ----------- |
| Course          | 12          | 5500        |
| Webinar         | 76          | 5120        |
| Ebook           | 136         | 3450        |
