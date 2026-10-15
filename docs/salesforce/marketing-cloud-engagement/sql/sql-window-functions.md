# MCE SQL Window Functions

> A row with a view. Use PARTITION BY and ROW_NUMBER to deduplicate, rank and compare rows in Salesforce Marketing Cloud Engagement SQL.

Source: https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/  
Author: Mateusz Dąbrowski  
Last updated: 2026-10-15  
Licence: CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)

Queries in MCE (Marketing Cloud Engagement, formerly Salesforce Marketing Cloud) have no variables, no loops and no temporary tables. So whenever a row needs to know something about its neighbours - is this the latest order of the subscriber, how many days passed since the previous one, how much did they spend in total - the classic answer is a chain of Query Activities with a staging Data Extension or two in between. Window functions answer it in a single query. They look at a group of related rows, called the window, calculate a value for each row and, unlike [`GROUP BY`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/#group-by), keep every row in the output.

All examples below use one small `Orders` Data Extension with one row per order:

**Orders Data Extension**

| SubscriberKey | OrderId  | OrderDate  | OrderTotal | Category | CouponCode |
| ------------- | -------- | ---------- | ---------- | -------- | ---------- |
| anna-1042     | ORD-1042 | 2026-03-02 | 74.98      | Music    | SPRING10   |
| anna-1042     | ORD-1187 | 2026-04-15 | 24.99      | Travel   | NULL       |
| anna-1042     | ORD-1305 | 2026-06-01 | 120.00     | Books    | NULL       |
| ben-2077      | ORD-1100 | 2026-03-20 | 59.00      | Books    | WELCOME5   |
| ben-2077      | ORD-1250 | 2026-05-10 | 59.00      | Books    | NULL       |
| ben-2077      | ORD-1311 | 2026-06-03 | 15.50      | Books    | NULL       |
| ben-2077      | ORD-1312 | 2026-06-03 | 9.99       | Music    | NULL       |
| chloe-3101    | ORD-1199 | 2026-04-18 | 210.00     | Travel   | NULL       |

**Create It with SQL**

Want to run the examples in your own account? Run this query in [SQL Studio](https://mateuszdabrowski.pl/sql-studio/) and keep its results with [Save to DE](https://mateuszdabrowski.pl/sql-studio/#save-to-de) as a Data Extension named `Orders`. In the form, make sure `OrderDate` is a Date and `OrderTotal` a Decimal with 2 decimal places before you save, as `SUM`, `AVG` and the percentiles need numbers.

```sql title="Orders, ready for Save to DE"
SELECT
      'anna-1042'   AS SubscriberKey
    , 'ORD-1042'    AS OrderId
    , '2026-03-02'  AS OrderDate
    , 74.98         AS OrderTotal
    , 'Music'       AS Category
    , 'SPRING10'    AS CouponCode
UNION ALL SELECT 'anna-1042', 'ORD-1187', '2026-04-15', 24.99, 'Travel', NULL
UNION ALL SELECT 'anna-1042', 'ORD-1305', '2026-06-01', 120.00, 'Books', NULL
UNION ALL SELECT 'ben-2077', 'ORD-1100', '2026-03-20', 59.00, 'Books', 'WELCOME5'
UNION ALL SELECT 'ben-2077', 'ORD-1250', '2026-05-10', 59.00, 'Books', NULL
UNION ALL SELECT 'ben-2077', 'ORD-1311', '2026-06-03', 15.50, 'Books', NULL
UNION ALL SELECT 'ben-2077', 'ORD-1312', '2026-06-03', 9.99, 'Music', NULL
UNION ALL SELECT 'chloe-3101', 'ORD-1199', '2026-04-18', 210.00, 'Travel', NULL
```

Anna is a returning customer with a different category each time, Ben buys often and placed two orders on the same day, and Chloe placed one big order. Each of them sets off a different trap, so keep the table at hand.

## OVER and PARTITION BY

**`OVER` turns an aggregate function into a window function, and `PARTITION BY` decides which rows it looks at.**

Take an order confirmation that also shows how many orders the subscriber placed with you and how much they spent in total. `GROUP BY` gets you the totals, but it collapses the orders into one row per subscriber, so you would need a second query and a join to put them back together. Add `OVER` to the same [aggregate functions](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/), and every order keeps its row with the totals next to it:

```sql {5-6} title="Totals per subscriber next to every order"
SELECT
      SubscriberKey
    , OrderId
    , OrderTotal
    , COUNT(*) OVER (PARTITION BY SubscriberKey)        AS OrdersPerSubscriber
    , SUM(OrderTotal) OVER (PARTITION BY SubscriberKey) AS SpendPerSubscriber
FROM Orders

/* Output:
SubscriberKey | OrderId  | OrderTotal | OrdersPerSubscriber | SpendPerSubscriber
anna-1042     | ORD-1042 | 74.98      | 3                   | 219.97
anna-1042     | ORD-1187 | 24.99      | 3                   | 219.97
anna-1042     | ORD-1305 | 120.00     | 3                   | 219.97
ben-2077      | ORD-1100 | 59.00      | 4                   | 143.49
ben-2077      | ORD-1250 | 59.00      | 4                   | 143.49
ben-2077      | ORD-1311 | 15.50      | 4                   | 143.49
ben-2077      | ORD-1312 | 9.99       | 4                   | 143.49
chloe-3101    | ORD-1199 | 210.00     | 1                   | 210.00
*/
```

`PARTITION BY SubscriberKey` splits the orders into one window per subscriber, so `COUNT` and `SUM` see only the orders of that subscriber. Leave `PARTITION BY` out, as in `SUM(OrderTotal) OVER ()`, and the window covers every row of the result, so each order gets the total of all orders, 573.46. Divide the total of an order by it, and you get its share of all sales:

```sql {4-5} title="Share of each order in all sales"
SELECT
      OrderId
    , OrderTotal
    , SUM(OrderTotal) OVER () AS AllOrdersTotal
    , CAST(100 * OrderTotal / SUM(OrderTotal) OVER () AS DECIMAL(5, 2)) AS SalesShare
FROM Orders

/* Output:
OrderId  | OrderTotal | AllOrdersTotal | SalesShare
ORD-1042 | 74.98      | 573.46         | 13.08
ORD-1187 | 24.99      | 573.46         | 4.36
ORD-1305 | 120.00     | 573.46         | 20.93
ORD-1100 | 59.00      | 573.46         | 10.29
ORD-1250 | 59.00      | 573.46         | 10.29
ORD-1311 | 15.50      | 573.46         | 2.70
ORD-1312 | 9.99       | 573.46         | 1.74
ORD-1199 | 210.00     | 573.46         | 36.62
*/
```

Chloe's single order brings in over a third of all sales. Rounded to two decimal places, the shares add up to 100.01, so keep the unrounded value for any further calculation.

When does SQL Server calculate all that? In the [order of operations](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-basics/#order-of-operations), after `WHERE`, `GROUP BY` and `HAVING`, but before [`DISTINCT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-select/#distinct). Window functions see only the rows your filters left, and they can work on the results of `GROUP BY`, which you will use to [rank your customers](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#rank-grouped-results).

It would be handy to write a window shared by several columns only once. SQL Server 2022 added the `WINDOW` clause for that: you name the window at the end of the query, and each `OVER` refers to the name. Unfortunately, MCE stops it during the syntax check:

```sql {5} title="❌ The WINDOW clause fails the syntax check"
SELECT
      OrderId
    , COUNT(*) OVER subscriberOrders AS OrdersPerSubscriber
FROM Orders
WINDOW subscriberOrders AS (PARTITION BY SubscriberKey) /* Error: Incorrect syntax near 'WINDOW'. */
```

Referring to the name inside the brackets, as in `OVER (subscriberOrders)`, fails as well. The engine is not to blame. MCE runs SQL Server 2022 at compatibility level 160, which is the level `WINDOW` [needs](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-window-transact-sql), and other 2022 additions, such as [`IGNORE NULLS`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#ignore-nulls), work fine. It looks like the clause clashes with the way MCE wraps every query before it runs it, the same wrapper that [refuses `ORDER BY` without `TOP`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-select/#order-by-without-top). So whenever several columns share a window, write it out in each `OVER`.

### Count Distinct Values per Window

**`COUNT(DISTINCT ...)` does not work with `OVER`, so count in a subquery and join the counts back.**

A cross-sell campaign might target subscribers who bought from a single category and show them their past orders. That needs every order, with the number of categories of its subscriber next to it. `COUNT(DISTINCT Category) OVER (PARTITION BY SubscriberKey)` looks like the answer, but SQL Server stops it with "Use of DISTINCT is not allowed with the OVER clause." So for distinct values, you are back to the `GROUP BY` and the join that `OVER` saves you elsewhere. Count the categories of each subscriber in a subquery, and join the counts to the orders:

```sql {7-14} title="Every order with the number of categories its subscriber bought from"
SELECT
      ord.SubscriberKey
    , ord.OrderId
    , ord.Category
    , categories.CategoryCount
FROM Orders AS ord
    INNER JOIN (
        SELECT
              SubscriberKey
            , COUNT(DISTINCT Category) AS CategoryCount
        FROM Orders
        GROUP BY SubscriberKey
    ) AS categories
        ON categories.SubscriberKey = ord.SubscriberKey

/* Output:
SubscriberKey | OrderId  | Category | CategoryCount
anna-1042     | ORD-1042 | Music    | 3
anna-1042     | ORD-1187 | Travel   | 3
anna-1042     | ORD-1305 | Books    | 3
ben-2077      | ORD-1100 | Books    | 2
ben-2077      | ORD-1250 | Books    | 2
ben-2077      | ORD-1311 | Books    | 2
ben-2077      | ORD-1312 | Music    | 2
chloe-3101    | ORD-1199 | Travel   | 1
*/
```

For the campaign itself, add `HAVING COUNT(DISTINCT Category) = 1` to the subquery. The `INNER JOIN` then keeps only the orders of single-category buyers, here the Travel order of Chloe.

Search for that error, and you will find a trick with two [`DENSE_RANK`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#rank-and-dense_rank)s instead: `DENSE_RANK() OVER (PARTITION BY SubscriberKey ORDER BY Category) + DENSE_RANK() OVER (PARTITION BY SubscriberKey ORDER BY Category DESC) - 1`. It works in MCE, but I do not recommend it. Each `DENSE_RANK` sorts all the rows on its own, which adds up on a large Data Extension, and the trick counts `NULL` as one more category, which takes a third window function to correct. The join reads like the question it answers and counts exactly as `COUNT(DISTINCT ...)` does.

## ROW_NUMBER

**`ROW_NUMBER` numbers the rows of each window, which makes it the tool for keeping one row per subscriber.**

Sendable Data Extensions need one row per subscriber, while order data has one row per order, so Anna comes with three rows. Say you want to ask for a review of the latest order only. Number the orders of each subscriber from the newest one, then keep number 1:

```sql {10-13,16} title="Keep the latest order of each subscriber"
SELECT
      SubscriberKey
    , OrderId
    , OrderDate
FROM (
    SELECT
          SubscriberKey
        , OrderId
        , OrderDate
        , ROW_NUMBER() OVER (
            PARTITION BY SubscriberKey
            ORDER BY OrderDate DESC, OrderId DESC
          ) AS OrderRecency
    FROM Orders
) AS latestOrder
WHERE OrderRecency = 1

/* Output:
SubscriberKey | OrderId  | OrderDate
anna-1042     | ORD-1305 | 2026-06-01
ben-2077      | ORD-1312 | 2026-06-03
chloe-3101    | ORD-1199 | 2026-04-18
*/
```

`PARTITION BY` restarts the numbering for each subscriber, and `ORDER BY ... DESC` gives number 1 to the newest order. The outer query then keeps only those rows. Change `= 1` to `<= 3`, and you get the three latest orders of each subscriber. Keep the `ORDER BY` even when you do not care which row wins, as `ROW_NUMBER` refuses to work without it ("The function 'ROW_NUMBER' must have an OVER clause with ORDER BY.").

> **Note: You Should Know**
>
> Why the subquery? Window functions run after `WHERE`, so `WHERE ROW_NUMBER() OVER (...) = 1` cannot work and fails with "Windowed functions can only appear in the SELECT or ORDER BY clauses." In SQL Server, you would usually name such a step with `WITH` (a common table expression). MCE does not accept that either, as its syntax check wants `SELECT` as the first word of every query ("Only SELECT queries are valid. Select must be the first word of the query."). So a subquery in `FROM` is the way to filter on a window function. If you write your queries in [SQL Studio](https://mateuszdabrowski.pl/sql-studio/), it catches the `WITH` before MCE does and offers to rewrite it into a subquery for you.

### Ties in ROW_NUMBER

**End the `ORDER BY` of `ROW_NUMBER` with a column that is unique, so ties cannot happen.**

Ben placed two orders on 3 June, and dates in Data Extensions often come without the time. Order by the date alone, and both orders tie for number 1. `ROW_NUMBER` still has to give it to one of them, and SQL Server picks either, so the same query can keep `ORD-1311` in one run and `ORD-1312` in the next. That is hard to spot and harder to debug once the result lands in a sendable Data Extension. `OrderId` is unique, so adding it after the date settles every tie:

```sql title="Break the ties yourself"
/* ❌ Ben gets ORD-1311 or ORD-1312, depending on the run */
ROW_NUMBER() OVER (PARTITION BY SubscriberKey ORDER BY OrderDate DESC)

/* ✅ OrderId settles the tie, so Ben always gets ORD-1312 */
ROW_NUMBER() OVER (PARTITION BY SubscriberKey ORDER BY OrderDate DESC, OrderId DESC)
```

The same goes for every window function that depends on the order of rows, which includes all the remaining sections of this article.

### Latest Open with Its Email

**On Data Views, `ROW_NUMBER` keeps the whole row of the latest event, not only its date.**

The same pattern works on [Data Views](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/). If you need only the date of the last open, [`MAX`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/#min-and-max) with `GROUP BY` is enough. `ROW_NUMBER` comes in when you also need other fields of that open, for example the `JobID` that tells you which email it was:

```sql {10-13} title="The last open of each subscriber, with its JobID"
SELECT
      SubscriberKey
    , JobID     AS LastOpenedJobId
    , EventDate AS LastOpenDate
FROM (
    SELECT
          SubscriberKey
        , JobID
        , EventDate
        , ROW_NUMBER() OVER (
            PARTITION BY SubscriberKey
            ORDER BY EventDate DESC, JobID DESC
          ) AS OpenRecency
    FROM _Open
    WHERE EventDate >= DATEADD(DAY, -30, GETDATE())
) AS lastOpen
WHERE OpenRecency = 1
```

The `WHERE` inside the subquery is there for a reason. On a busy account, [`_Open`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_open) holds millions of rows, and numbering all of them takes time. Narrow it down before `ROW_NUMBER` gets to work, and the query stays far from the [30-minute limit](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/licence-limits/#limits-and-guardrails) of Automation Studio.

## RANK and DENSE_RANK

**`RANK` and `DENSE_RANK` number rows like `ROW_NUMBER`, but they give tied rows the same number.**

Ties are everywhere in marketing data: the same order value, the same score, the same date. Take a year-in-review email that shows the two biggest orders of each subscriber. Ben has two orders for exactly 59.00, so which one comes second? Compare how the three functions handle it:

```sql {4-6} title="Three ways to number the orders of Ben by value"
SELECT
      OrderId
    , OrderTotal
    , ROW_NUMBER() OVER (ORDER BY OrderTotal DESC)  AS OrderRowNumber
    , RANK() OVER (ORDER BY OrderTotal DESC)        AS OrderRank
    , DENSE_RANK() OVER (ORDER BY OrderTotal DESC)  AS OrderDenseRank
FROM Orders
WHERE SubscriberKey = 'ben-2077'

/* Output:
OrderId  | OrderTotal | OrderRowNumber | OrderRank | OrderDenseRank
ORD-1100 | 59.00      | 1              | 1         | 1
ORD-1250 | 59.00      | 2              | 1         | 1
ORD-1311 | 15.50      | 3              | 3         | 2
ORD-1312 | 9.99       | 4              | 4         | 3
*/
```

`ROW_NUMBER` splits the tie in any order it likes, so the 1 and 2 of the two 59.00 orders can swap between runs. `RANK` gives both of them 1 and skips 2, like a sports league table. `DENSE_RANK` skips nothing, so the next value gets 2.

The difference matters once you filter. Keep the rows numbered 2 or lower, and `RANK` returns the two 59.00 orders, while `DENSE_RANK` adds `ORD-1311` as well. For "top N" lists, I prefer `RANK`: tied rows stay together, and the list grows past N only when a tie crosses the cut-off.

### Rank Grouped Results

**Window functions run after `GROUP BY`, so they can rank the groups themselves.**

A VIP campaign needs your top customers by lifetime spend, not your top orders. Group the orders by subscriber and rank the sums in the same query:

```sql {4} title="Rank subscribers by lifetime spend"
SELECT
      SubscriberKey
    , SUM(OrderTotal) AS LifetimeSpend
    , RANK() OVER (ORDER BY SUM(OrderTotal) DESC) AS SpendRank
FROM Orders
GROUP BY SubscriberKey

/* Output:
SubscriberKey | LifetimeSpend | SpendRank
anna-1042     | 219.97        | 1
chloe-3101    | 210.00        | 2
ben-2077      | 143.49        | 3
*/
```

The `ORDER BY` inside `OVER` reads the sum of each group, as `GROUP BY` has already done its work. Wrap the query in a subquery with `WHERE SpendRank <= 100`, and you have the list for your top 100 customers.

## NTILE

**`NTILE` splits the rows into the number of groups you ask for, as equal in size as the rows allow.**

Segmentation often needs tiers: the top half of your customers, quintiles for an RFM model or test groups of equal size. `NTILE(2)` over the lifetime spend from the previous example puts each subscriber into the top or the bottom half:

```sql {4} title="Split subscribers into two halves by spend"
SELECT
      SubscriberKey
    , SUM(OrderTotal) AS LifetimeSpend
    , NTILE(2) OVER (ORDER BY SUM(OrderTotal) DESC) AS SpendHalf
FROM Orders
GROUP BY SubscriberKey

/* Output:
SubscriberKey | LifetimeSpend | SpendHalf
anna-1042     | 219.97        | 1
chloe-3101    | 210.00        | 1
ben-2077      | 143.49        | 2
*/
```

Three subscribers do not split evenly into two groups, so `NTILE` gives the extra row to the first group. With real volumes, the groups differ by one row at most.

### Random Test Groups

**Order by `NEWID()`, and `NTILE` assigns subscribers to random test groups.**

Journey Builder has a Random Split activity for A/B tests. However, when you need the same groups across several sends or channels, or want to report on them later, the split should live in a Data Extension. `NEWID()` returns a new random value for every row, so ordering by it shuffles the subscribers before `NTILE` cuts them into groups:

```sql {3} title="Assign subscribers to three random test groups"
SELECT
      SubscriberKey
    , NTILE(3) OVER (ORDER BY NEWID()) AS TestGroup
FROM _Subscribers
```

Every run shuffles the subscribers again. Run the query once, then use the stored groups. If it runs on a schedule, subscribers keep moving between groups, and your test compares nothing.

> **Note: You Should Know**
>
> `NTILE` also looks like a good way to split a huge query into several Query Activities, each safely below the [30-minute limit](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/licence-limits/#limits-and-guardrails) of Automation Studio. I do not recommend it, as its groups move here too. If new rows arrive between the activities, the group boundaries shift, so some rows land in two parts and others in none. On top of that, every part has to number all the rows before `WHERE` can drop the other groups, so each Query Activity still orders the whole source.
>
> Split by a value calculated from each row instead. `CHECKSUM` turns the key into a number, and the remainder of dividing it by the number of parts picks the part:
>
> ```sql {5} title="The first of four parts of a large Data Extension"
> SELECT
>       SubscriberKey
>     , EmailAddress
> FROM ContactMasterDE
> WHERE ABS(CHECKSUM(SubscriberKey) % 4) = 0
> ```
>
> The next three Query Activities take 1, 2 and 3. `ABS` is there because `CHECKSUM` can return a negative number. A subscriber always lands in the same part, whatever happens to the other rows, and no part has to order the whole source first. The parts are not exactly equal, as my 181 test subscribers split into 45, 31, 48 and 57, so leave some headroom when you pick the number of parts. On Data Views, ranges of `EventDate` split the rows just as well.

## Running Totals and Frames

**Add `ORDER BY` to the `OVER` of an aggregate function, and the total runs row by row.**

Loyalty programmes often promote subscribers once their spend crosses a threshold, say 100.00, and send a welcome-to-VIP email right after the order that crossed it. The lifetime total tells you who is a VIP today, but not which order made them one. For that, each order needs the total of all orders up to and including it. `SUM` with an ordered window gives you exactly that:

```sql {5-9} title="Spend so far at each order"
SELECT
      SubscriberKey
    , OrderId
    , OrderTotal
    , SUM(OrderTotal) OVER (
        PARTITION BY SubscriberKey
        ORDER BY OrderDate, OrderId
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
      ) AS SpendSoFar
FROM Orders

/* Output:
SubscriberKey | OrderId  | OrderTotal | SpendSoFar
anna-1042     | ORD-1042 | 74.98      | 74.98
anna-1042     | ORD-1187 | 24.99      | 99.97
anna-1042     | ORD-1305 | 120.00     | 219.97
ben-2077      | ORD-1100 | 59.00      | 59.00
ben-2077      | ORD-1250 | 59.00      | 118.00
ben-2077      | ORD-1311 | 15.50      | 133.50
ben-2077      | ORD-1312 | 9.99       | 143.49
chloe-3101    | ORD-1199 | 210.00     | 210.00
*/
```

With the 100.00 threshold, Anna gets there with her third order (after the second, she was 0.03 short), Ben with his second and Chloe with her first.

The `ROWS BETWEEN` line sets the frame: the part of the window that `SUM` adds up for each row. Here, it runs from the first row of the window (`UNBOUNDED PRECEDING`) to the current one. Count a fixed number of rows back instead, for example with `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW`, and `AVG` gives you a moving average of the last three orders.

> **Note: You Should Know**
>
> **Write the frame yourself whenever the window has an `ORDER BY`.** Leave it out, and SQL Server uses `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`, which treats rows with the same `ORDER BY` value as one. Order the orders of Ben by date alone, and his two orders from 3 June both show the total after the second one:
>
> ```sql {3} title="❌ The default frame with two orders on one day"
> SELECT
>       OrderId
>     , SUM(OrderTotal) OVER (PARTITION BY SubscriberKey ORDER BY OrderDate) AS SpendSoFar
> FROM Orders
> WHERE SubscriberKey = 'ben-2077'
>
> /* Output:
> OrderId  | SpendSoFar
> ORD-1100 | 59.00
> ORD-1250 | 118.00
> ORD-1311 | 143.49
> ORD-1312 | 143.49
> */
> ```
>
> `ROWS` is also the faster of the two in SQL Server, which matters on large Data Extensions.

## LAG and LEAD

**`LAG` reads a value from an earlier row of the window, and `LEAD` from a later one.**

Replenishment and win-back campaigns depend on how often a subscriber buys. With `LAG`, each order can see the order before it, for example its date and category:

```sql {5-12} title="The previous order next to each order"
SELECT
      SubscriberKey
    , OrderId
    , OrderDate
    , LAG(OrderDate) OVER (
        PARTITION BY SubscriberKey
        ORDER BY OrderDate, OrderId
      ) AS PreviousOrderDate
    , LAG(Category, 1, 'First order') OVER (
        PARTITION BY SubscriberKey
        ORDER BY OrderDate, OrderId
      ) AS PreviousCategory
FROM Orders

/* Output:
SubscriberKey | OrderId  | OrderDate  | PreviousOrderDate | PreviousCategory
anna-1042     | ORD-1042 | 2026-03-02 | NULL              | First order
anna-1042     | ORD-1187 | 2026-04-15 | 2026-03-02        | Music
anna-1042     | ORD-1305 | 2026-06-01 | 2026-04-15        | Travel
ben-2077      | ORD-1100 | 2026-03-20 | NULL              | First order
ben-2077      | ORD-1250 | 2026-05-10 | 2026-03-20        | Books
ben-2077      | ORD-1311 | 2026-06-03 | 2026-05-10        | Books
ben-2077      | ORD-1312 | 2026-06-03 | 2026-06-03        | Books
chloe-3101    | ORD-1199 | 2026-04-18 | NULL              | First order
*/
```

`LAG` returns [`NULL`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-null-functions/) for the first order of each subscriber, as there is no order before it. If you prefer a value, pass it as the third argument, after the number of rows to go back. That is how `PreviousCategory` says "First order", which also makes category switches easy to spot: Anna went from Music to Travel to Books. The default gets the data type of the column, length included, so keep it within the field length, or it gets cut off.

Now for the timing of the reminder. [`DATEDIFF`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-date-functions/) turns the two dates into the number of days between orders, and [`AVG`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/#avg) averages them per subscriber. Put `LAG` straight into `AVG` with a `GROUP BY`, and you get an error saying that `OrderDate` "is invalid in the select list because it is not contained in either an aggregate function or the GROUP BY clause." The message is confusing, as `OrderDate` sits inside `AVG`. The reason is the order of operations: window functions run after `GROUP BY`, so by the time `LAG` wants the dates, the orders are already grouped. Calculate `LAG` in a subquery first, and `AVG` works on its output:

```sql {3,8-11} title="Average number of days between orders"
SELECT
      SubscriberKey
    , AVG(DATEDIFF(DAY, PreviousOrderDate, OrderDate)) AS AverageDaysBetweenOrders
FROM (
    SELECT
          SubscriberKey
        , OrderDate
        , LAG(OrderDate) OVER (
            PARTITION BY SubscriberKey
            ORDER BY OrderDate, OrderId
          ) AS PreviousOrderDate
    FROM Orders
) AS orderGap
GROUP BY SubscriberKey

/* Output:
SubscriberKey | AverageDaysBetweenOrders
anna-1042     | 45
ben-2077      | 25
chloe-3101    | NULL
*/
```

Anna orders every 45 days on average, which tells you when to send her a reminder. SQL Server averages whole numbers into a whole number, so her 45.5 days show as 45. Write `AVG(1.0 * DATEDIFF(...))` if you need the decimals. Chloe has a single order and no gap to average, so she gets `NULL`. And Ben? His two orders from 3 June add a gap of 0 days, which pulls his average down. If same-day orders are split shipments in your data, leave such gaps out with a `WHERE` in the subquery.

`LEAD` looks forward the same way. An order with no next order is the latest one of its subscriber, so [`IIF`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-case/#iif-shorthand) around `LEAD(OrderId) OVER (...) IS NULL`, with the same window, flags it with `1`. That is another way to get what [`ROW_NUMBER`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#row_number) did earlier.

## FIRST_VALUE and LAST_VALUE

**`FIRST_VALUE` and `LAST_VALUE` return a value from the first or the last row of the frame.**

The category of the first order tells you what brought a subscriber to you, which makes a good segment for a welcome series or a cohort report. `FIRST_VALUE` returns it on every order of the subscriber, and `DISTINCT` leaves one row each:

```sql {3-6} title="The category of the first order"
SELECT DISTINCT
      SubscriberKey
    , FIRST_VALUE(Category) OVER (
        PARTITION BY SubscriberKey
        ORDER BY OrderDate, OrderId
      ) AS FirstCategory
FROM Orders

/* Output:
SubscriberKey | FirstCategory
anna-1042     | Music
ben-2077      | Books
chloe-3101    | Travel
*/
```

`LAST_VALUE` looks like its mirror image, so you would expect Books, the category of Anna's latest order, in all three rows. With the same window, however, you get the category of each order itself, and no error tells you something is wrong:

```sql {4-7} title="❌ The default frame makes LAST_VALUE return the current row"
SELECT
      OrderId
    , Category
    , LAST_VALUE(Category) OVER (
        PARTITION BY SubscriberKey
        ORDER BY OrderDate, OrderId
      ) AS LastCategory
FROM Orders
WHERE SubscriberKey = 'anna-1042'

/* Output:
OrderId  | Category | LastCategory
ORD-1042 | Music    | Music
ORD-1187 | Travel   | Travel
ORD-1305 | Books    | Books
*/
```

Remember the default frame from the [running totals](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#running-totals-and-frames)? It ends at the current row, so for every row, the last row of the frame is the row itself. Stretch the frame to the end of the window, and `LAST_VALUE` does what its name says:

```sql {7} title="✅ LAST_VALUE with the whole window as the frame"
SELECT
      OrderId
    , Category
    , LAST_VALUE(Category) OVER (
        PARTITION BY SubscriberKey
        ORDER BY OrderDate, OrderId
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
      ) AS LastCategory
FROM Orders
WHERE SubscriberKey = 'anna-1042'

/* Output:
OrderId  | Category | LastCategory
ORD-1042 | Music    | Books
ORD-1187 | Travel   | Books
ORD-1305 | Books    | Books
*/
```

Drop the `WHERE` and add `DISTINCT`, as with `FIRST_VALUE`, and you get the last category of every subscriber: Books for Anna, Music for Ben and Travel for Chloe. Ben shows once more why ties matter. His last two orders share a date, so without `OrderId` in the `ORDER BY`, his last category could be Books or Music, depending on the run.

### IGNORE NULLS

**Since SQL Server 2022, `IGNORE NULLS` makes `FIRST_VALUE`, `LAST_VALUE`, `LAG` and `LEAD` skip empty values.**

Not every order has a coupon code, and the latest order often has none. To avoid offering the same coupon again, you need the last coupon each subscriber used, not the empty value of their latest order. Add `IGNORE NULLS` between the function and `OVER`:

```sql {8} title="The last coupon each subscriber used"
SELECT DISTINCT
      SubscriberKey
    , LAST_VALUE(CouponCode) OVER (
        PARTITION BY SubscriberKey
        ORDER BY OrderDate, OrderId
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
      ) AS LatestOrderCoupon
    , LAST_VALUE(CouponCode) IGNORE NULLS OVER (
        PARTITION BY SubscriberKey
        ORDER BY OrderDate, OrderId
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
      ) AS LastUsedCoupon
FROM Orders

/* Output:
SubscriberKey | LatestOrderCoupon | LastUsedCoupon
anna-1042     | NULL              | SPRING10
ben-2077      | NULL              | WELCOME5
chloe-3101    | NULL              | NULL
*/
```

Chloe never used a coupon, so even `IGNORE NULLS` has nothing to return for her.

`LAG` and `LEAD` take `IGNORE NULLS` the same way. With it, `LAG(CouponCode)` returns the last coupon used before each order, skipping orders without one, so ORD-1305 of Anna gets SPRING10, even though ORD-1187 in between had none.

## PERCENTILE_CONT and PERCENTILE_DISC

**`PERCENTILE_CONT(0.5)` returns the median, which describes a typical order better than the average does.**

Say you plan a free shipping offer above an amount that a typical order almost reaches. The average order value looks like the right base, but a single large order pulls it up, and the 210.00 order of Chloe does exactly that in our data:

```sql {3} title="Median and average order value"
SELECT DISTINCT
      CAST(AVG(OrderTotal) OVER () AS DECIMAL(10, 2)) AS AverageOrderValue
    , CAST(PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY OrderTotal) OVER () AS DECIMAL(10, 2)) AS MedianOrderValue
FROM Orders

/* Output:
AverageOrderValue | MedianOrderValue
71.68             | 59.00
*/
```

Half of the orders are 59.00 or less, while the average suggests over 70.00. `PERCENTILE_CONT` takes the percentile as a fraction (`0.5` for the median) and the column to sort in `WITHIN GROUP`. It is a window function only, so it always needs `OVER`, which is why the query uses `DISTINCT` to keep a single row. It also returns a float, hence the [`CAST`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-conversion-functions/#cast) to two decimal places. Leave `OVER` out, and you get "The function 'PERCENTILE_CONT' must have an OVER clause."

`PERCENTILE_DISC` works the same way, with one difference that shows with an even number of rows. `PERCENTILE_CONT` returns the midpoint between the two middle values, while `PERCENTILE_DISC` returns a value that exists in the data:

```sql {3-4} title="Median order value of each subscriber"
SELECT DISTINCT
      SubscriberKey
    , PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY OrderTotal) OVER (PARTITION BY SubscriberKey) AS MedianOrderValue
    , PERCENTILE_DISC(0.5) WITHIN GROUP (ORDER BY OrderTotal) OVER (PARTITION BY SubscriberKey) AS MedianExistingOrderValue
FROM Orders

/* Output:
SubscriberKey | MedianOrderValue | MedianExistingOrderValue
anna-1042     | 74.98            | 74.98
ben-2077      | 37.25            | 15.50
chloe-3101    | 210              | 210.00
*/
```

Ben has four orders, so his middle two are 15.50 and 59.00. Chloe shows the float again: without a `CAST`, her median comes back as 210, with no decimals. `PERCENTILE_CONT` returns 37.25, an amount he never spent, and `PERCENTILE_DISC` returns 15.50, the lower of the two.

SQL Server has two more distribution functions, `PERCENT_RANK` and `CUME_DIST`, which return the position of each row as a fraction between 0 and 1. Both work in MCE. For segmentation, I find [`NTILE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#ntile) simpler, as it gives you the groups directly.

---

## Sum Up

1. Add `OVER` to an aggregate function to keep every row and get the totals next to it [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#over-and-partition-by)
2. Write the window out in each `OVER`, as MCE rejects the `WINDOW` clause [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#over-and-partition-by)
3. Count distinct values in a `GROUP BY` subquery and join them back, as `COUNT(DISTINCT ...)` fails with `OVER` [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#count-distinct-values-per-window)
4. Keep one row per subscriber with `ROW_NUMBER` in a subquery [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#row_number)
5. End every `ORDER BY` inside `OVER` with a unique column [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#ties-in-row_number)
6. Narrow Data Views down before numbering their rows [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#latest-open-with-its-email)
7. Use `RANK` for top N lists with ties [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#rank-and-dense_rank)
8. Split subscribers into tiers with `NTILE`, and into random test groups with `NEWID()` - stored once [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#ntile)
9. Write the `ROWS BETWEEN` frame yourself whenever the window has an `ORDER BY` [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#running-totals-and-frames)
10. Measure the time between orders with `LAG` [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#lag-and-lead)
11. Stretch the frame of `LAST_VALUE` to the end of the window, and skip empty values with `IGNORE NULLS` [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#first_value-and-last_value)
12. Describe a typical order with the median from `PERCENTILE_CONT` [🔗](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-window-functions/#percentile_cont-and-percentile_disc)
