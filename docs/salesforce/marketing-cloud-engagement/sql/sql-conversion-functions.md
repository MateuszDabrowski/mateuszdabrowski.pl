# MCE SQL Conversion Functions

> Break from the limits of Data Extension data types. Use full power of SQL to control your values.

Source: https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-conversion-functions/  
Author: Mateusz Dąbrowski  
Last updated: 2026-10-22  
Licence: CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)

Break from the limits of source data types. Use the full power of SQL to transform your values.

Salesforce Marketing Cloud Engagement (MCE, formerly Salesforce Marketing Cloud) SQL implementation does not support user-defined functions. There are, however, multiple built-in functions that are useful on a day-to-day basis when working with queries.

Here, I will cover only selected conversion functions, that I find most useful for Marketing Automation purposes. They will help you change the value types to enable the use of type-based MCE User Interface elements and type-specific functions.

## CAST & CONVERT

In Marketing Cloud Engagement, you can use two universal conversion functions - `CAST` and `CONVERT`.

### CAST

The first one, `CAST`, is straightforward and available in all SQL dialects:

```sql {3} title="Find all subscribers that joined after the given date"
SELECT SubscriberKey
FROM Ent._Subscribers
WHERE DateJoined > CAST('2020-10-30' AS DATE)
```

It takes a value and expected datatype with `AS` operator in between.

However, in MCE, it is much better to use `CONVERT` function instead. It covers all features of `CAST` plus adds quite a lot more. Whichever you use, [SQL Studio](https://mateuszdabrowski.pl/sql-studio/), my free SQL editor that runs inside your own MCE account, flags a `DECIMAL` with no precision, which rounds every value to a whole number, and adds `(18, 2)` with one click.

### CONVERT

The basic form of `CONVERT` is nearly the same as the `CAST` with reversed order of arguments:

```sql {3} title="Find all subscribers that joined after the given date"
SELECT SubscriberKey
FROM Ent._Subscribers
WHERE DateJoined > CONVERT(DATE, '2020-10-30')
```

With both functions you can stack functions within for more complex calculations:

```sql {2} title="Calculate the end of the trial period and output date only"
SELECT CONVERT(DATE, DATEADD(MONTH, 1, GETUTCDATE())) AS TrialPeriodEndDate
```

Up to this point, `CAST` and `CONVERT` seem similar in the features.

However, only `CONVERT` have an additional third optional argument - [style](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-conversion-functions/#convert-date-style-codes). Thanks to it, you can convert even from non-standard (for the server) formats that would result in an error:

```sql {3} title="Converting dd/MM/yyyy format throws 'Could not convert date and/or time from string data type'"
SELECT SubscriberKey
FROM _Subscribers
WHERE DateJoined > CONVERT(DATE, '30/10/2019') /* Error */
```

With [style codes](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-conversion-functions/#convert-date-style-codes), we can make it work with minimal change:

```sql {3} title="Converting dd/MM/yyyy format with appropriate style code"
SELECT SubscriberKey
FROM _Subscribers
WHERE DateJoined > CONVERT(DATE, '30/10/2019', 103)
```

It is not possible with `CAST`.

> **Note: You Should Know**
>
> You can also leverage [style codes](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-conversion-functions/#convert-date-style-codes) to format your dates during conversion to string, without the need to use [`FORMAT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-date-functions/#format-with-dates) function on top.
>
> ```sql
> SELECT
>       CONVERT(NVARCHAR, GETDATE(), 101) AS DateFormat1  /* Output: 10/30/2020 */
>     , CONVERT(NVARCHAR, GETDATE(), 102) AS DateFormat2  /* Output: 2020.10.30 */
>     , CONVERT(NVARCHAR, GETDATE(), 107) AS DateFormat3  /* Output: Oct 30, 2020 */
> ```

### Data Types

There are over 30 data types available for conversion, but there are only a few that are useful on a day-to-day basis in MCE:

| Data Type       | Description                                 | Comment                                                                                                                                                 |
| --------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CHAR            | Fixed-length string                         |                                                                                                                                                         |
| NCHAR           | Fixed-length string with Unicode support    |                                                                                                                                                         |
| VARCHAR         | Variable-length string                      |                                                                                                                                                         |
| NVARCHAR        | Variable-length string with Unicode support | Best option for most MCE string use cases                                                                                                               |
| DECIMAL/NUMERIC | Decimal number with big precision           | Best option if you need a decimal number                                                                                                                |
| INT             | Integer number                              | Best option if your number is not decimal                                                                                                               |
| BIGINT          | Big integer number                          | When your number is bigger than 2,147,483,647, you need BIGINT                                                                                          |
| DATETIME        | Legacy date and time                        | More friendly default formatting                                                                                                                        |
| DATETIME2       | Modern date and time                        | Best when you need both date and time                                                                                                                   |
| DATETIMEOFFSET  | Date with offset                            | When you need timezone offset                                                                                                                           |
| DATE            | Only date                                   | Best when you need date only                                                                                                                            |
| TIME            | Only time                                   | Best when you need time only                                                                                                                            |
| BIT             | 1, 0 or `NULL`                              | What Boolean fields hold, see [Booleans](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-conversion-functions/#booleans) |

> **Note: You Should Know**
>
> There are also two more data types: `FLOAT` and `REAL`. Don't use them. Both are **Approximate** Numeric Data Types and can lead to unpredicted behaviour, especially when used for equality-based conditions in [`WHERE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-where/). `DECIMAL`/`NUMERIC` is the way to go.

When converting values to the selected data type, you can have even more control by passing optional argument right after type to declare the length of the output.

It is instrumental with `DECIMAL` as it allows you to provide expected precision (number of digits in a number) and scale (number of digits to the right of the decimal point in a number).

For example, you may have a string field containing a product price - `'123.99'`. If you convert it to `DECIMAL` without any arguments, it will round to `124`. However, you can provide precision and scale to keep the current format:

```sql
SELECT
      CONVERT(DECIMAL, '123.99')        AS RoundedConversion    /* Output: 124 */
    , CONVERT(DECIMAL(5, 2), '123.99')  AS FullConversion       /* Output: 123.99 */
```

Be sure to add correct precision. If it is smaller then the values in your source, it will lead to an error. It's better to have too big precision than too small.

As for scale - if your scale is smaller than in your source, the value is rounded.

You can also use the single argument with `DATETIME`, `DATETIME2`, `DATETIMEOFFSET` (to control precision of the output) and string data types (`CHAR`, `NCHAR`, `VARCHAR`, `NVARCHAR`). The latter won't directly limit the number of characters, but rather the number of bytes (which might be equal or not to the number of characters depending on what characters you are using).

`CHAR` allows for 1-8000 bytes range, whereas `NCHAR` due to Unicode support allows for only 1-4000. `VARCHAR` and `NVARCHAR` support the same ranges respectively and have an additional possible option - `max` that you can use if some values might exceed the range.

> **Note: You Should Know**
>
> Always double-check the choice of data type you want to convert to, as it might have a massive impact into outcome.
>
> ```sql title="Different outcomes depending on the output data type"
> SELECT
>       CAST(6.9 AS INT)      AS CastToInt        /* Output: 6 */
>     , CAST(6.9 AS DECIMAL)  AS CastToNumeric    /* Output: 7 */
>     , CONVERT(INT, 6.9)     AS ConvertToInt     /* Output: 6 */
>     , CONVERT(DECIMAL, 6.9) AS ConvertToNumeric /* Output: 7 */
> ```
>
> It is happening because conversions from `DECIMAL` or `FLOAT` to `INT` are truncated. The rest is rounded if no specific precision/scale argument is available.

### Data Extension Field Types

Behind each Data Extension field type, there is one of the SQL Server types above. It tells you what your query gets when it reads the field, and what fits when the query writes into it:

| Field type   | SQL Server type        | What it means for your queries                                                                                                                |
| ------------ | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Text         | NVARCHAR(length)       | Unicode text up to the length you set                                                                                                         |
| Number       | INT                    | Whole numbers up to 2,147,483,647, so no Unix timestamps in milliseconds                                                                      |
| Decimal      | DECIMAL(length, scale) | Exact decimals, with the scale as the digits after the point                                                                                  |
| Date         | DATETIME               | Always has a time, which is 00\:00 when you load a date alone                                                                                 |
| Boolean      | BIT                    | 1, 0 or `NULL`, see [Booleans](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-conversion-functions/#booleans) |
| EmailAddress | NVARCHAR(254)          | Unicode text up to 254 characters                                                                                                             |
| Phone        | NVARCHAR(50)           | Unicode text up to 50 characters                                                                                                              |
| Locale       | VARCHAR(5)             | Codes such as `en-GB`, without Unicode                                                                                                        |

Data Views follow their own types. In `_Subscribers`, `DateJoined` is a `SMALLDATETIME`, which has no seconds, and `Status` is a `VARCHAR`, while `EventDate` of `_Sent` is a `DATETIME` with milliseconds.

### CONVERT Date Style Codes

Just as with data types - there are many style codes available. Here I will cover just the most popular ones (if you don't understand some formats codes, check [date formats guide](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-date-functions/#custom-date-formats)):

| Date format                         | Style code |
| ----------------------------------- | ---------- |
| MMM dd yyyy hh:mmtt                 | 100        |
| MM/dd/yyyy                          | 101        |
| yyyy.mm.dd                          | 102        |
| dd/mm/yyyy                          | 103        |
| dd.mm.yyyy                          | 104        |
| dd-mm-yyyy                          | 105        |
| dd MMM yyyy                         | 106        |
| MMM dd, yyyy                        | 107        |
| HH\:mm:ss                           | 108        |
| MM-dd-yyyy                          | 110        |
| yyyy/MM/dd                          | 111        |
| yyyyMMdd                            | 112        |
| yyyy-MM-dd HH\:mm:ss                | 120        |
| yyyy-MM-dd HH\:mm:ss.fff            | 121        |
| yyyy-MM-ddTHH\:mm:ss.fff (ISO 8601) | 126        |
| MM/dd/yy hh\:mm:ss tt               | 22         |
| yyyy-mm-dd                          | 23         |

Use it by adding the style code as the third argument of the [`CONVERT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-conversion-functions/#convert) function:

```sql
SELECT
      CONVERT(NVARCHAR, GETDATE(), 101)                 AS DateAsString
    , CONVERT(DATETIME2, '2020-12-31 19:00:00', 120)    AS StringAsDate
```

You can find the full list of style codes on [Microsoft .Net Doc Pages](https://docs.microsoft.com/en-us/sql/t-sql/functions/cast-and-convert-transact-sql?view=sql-server-ver15#date-and-time-styles).

> **Note: You Should Know**
>
> Date style codes should cover most scenarios, but it is possible to encounter a non-supported date format (for example: `27/12/2021 07:31:01`). In such a case, you have two options:
>
> 1. **Change the format in the source** - if possible, aligning the format to one of the supported date styles will be the best solution from the performance point of view.
> 2. **Split conversion trick** - if changing the format in the source is not possible, you can still enforce the conversion by splitting the string date and converting its parts.
>
> For the second option, you have to find Date Style Codes within your string date and convert each separately. This can be easily done with [LEFT & RIGHT](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-string-functions/#left--right) functions.
>
> For example, the `27/12/2021 07:31:01` string does not have a matching Date Style Code, but we can see that the date part matches Style Code 103 and the time part fits 108. With that, we can do the conversion:
>
> ```sql
> CONVERT(DATETIME, LEFT('27/12/2021 07:31:01', 10), 103) + CONVERT(DATETIME, RIGHT('27/12/2021 07:31:01', 8), 108) AS ConvertedDate
> ```
>
> With [LEFT & RIGHT](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-string-functions/#left--right) functions we split the datetime on the space, then [CONVERT](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-conversion-functions/#convert) each part to finally sum it into a single date that is equal to our original string.
>
> If you have specific parts of your date stored in separte fields, you can leverage [`DATETIMEFROMPARTS`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-date-functions/#datefromparts--datetimefromparts) function as well.

## TRY_CONVERT

`CONVERT` stops the whole query when a single value does not fit the target type, such as a birth date typed as `31/02/1990` in a web form. In MCE, it happens during the run, and the Action Log in Automation Studio gives the reason for only some types. A conversion to `DATE` gets ["Could not convert date and/or time from string data type."](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-errors/#could-not-convert-date), and one to `INT`, `SMALLINT`, `TINYINT` or `BIT` [quotes the value that failed](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-errors/#conversion-failed-when-converting). A conversion to `DATETIME`, `DECIMAL` or `BIGINT` gets only ["Automation failed due to system error."](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-errors/#automation-failed-due-to-system-error) In every case, one bad row out of a million is enough.

`TRY_CONVERT` takes the same arguments, [style code](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-conversion-functions/#convert-date-style-codes) included, but returns `NULL` for a value it cannot convert, so the query keeps running:

```sql {3} title="Birth dates from a web form, with NULL for the invalid ones"
SELECT
      SubscriberKey
    , TRY_CONVERT(DATE, BirthDateText, 103) AS BirthDate
FROM WebFormLeads
/* BirthDateText: '31/12/1990', Output: 1990-12-31 */
/* BirthDateText: '31/02/1990', Output: NULL */
```

The same function finds the values you need to fix at the source:

```sql {5-6} title="Birth dates that will not convert"
SELECT
      SubscriberKey
    , BirthDateText
FROM WebFormLeads
WHERE TRY_CONVERT(DATE, BirthDateText, 103) IS NULL
    AND BirthDateText IS NOT NULL
```

`TRY_CAST` does the same for `CAST`.

## Booleans

Boolean fields hold `BIT` values: 1 for true, 0 for false, or `NULL` when empty. SQL Server also converts the text `'True'` and `'False'`, so `WHERE IsVip = 1` and `WHERE IsVip = 'True'` return the same rows.

The trap is the empty value. `WHERE IsVip != 'True'` looks like it returns everyone who is not a VIP, but it skips the customers with an empty field, as any comparison with [`NULL`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-null-functions/#null-with-relational-operators) is neither true nor false. Treat empty as false with [`ISNULL`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-null-functions/#isnull):

```sql {3} title="Everyone who is not a VIP, empty values included"
SELECT SubscriberKey
FROM Customers
WHERE ISNULL(IsVip, 0) = 0
```

To write a Boolean field from text, `CONVERT(BIT, ...)` understands `'True'`, `'False'`, `'1'` and `'0'`. Form answers such as `'Yes'` make it fail the whole run, with a [message that quotes the value](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-errors/#conversion-failed-when-converting), so translate them with [`CASE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-case/):

```sql {3-6} title="Text answers into a Boolean field"
SELECT
      SubscriberKey
    , CASE
        WHEN NewsletterOptIn IN ('Yes', 'Y', 'True', '1') THEN 1
        ELSE 0
      END AS IsOptedIn
FROM WebFormLeads
```

`IN` compares text without regard to case in MCE, so `'yes'` matches as well.
