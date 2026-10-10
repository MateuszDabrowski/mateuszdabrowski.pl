# MCE SQL JSON Functions

> Read, change and use JSON stored in Data Extensions with Salesforce Marketing Cloud Engagement SQL.

Source: https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-json-functions/  
Author: Mateusz Dąbrowski  
Last updated: 2026-10-10  
Licence: CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)

JSON ends up in Data Extensions more often than you would think: API payloads, CloudPages form submissions, product feeds or recommendations pushed from other systems. Most of us reach for SSJS or AMPscript to read it. However, the SQL behind MCE (Marketing Cloud Engagement, formerly Salesforce Marketing Cloud) Query Activities understands JSON as well, so you can pull a single value, grab a whole object, change the JSON or even build it without leaving your query.

> **Note: You Should Know**
>
> SQL Server usually expects Unicode text with an `N` prefix (`N'Łódź'`). Not in MCE, which adds the `N` to every text value itself. Add your own, and the doubled `NN'Łódź'` fails the syntax check with an "Incorrect syntax" error. Worry not - as [Salesforce's SQL Reference](https://help.salesforce.com/s/articleView?id=mktg.mc_as_sql_reference.htm\&type=5) says, you do not need the prefix. Plain strings keep Unicode characters, and `JSON_VALUE('{"city":"Łódź"}', '$.city')` returns `Łódź` intact. The same `N` is also why [apostrophes in comments](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-style-guide/#apostrophes-in-comments) can break your query.

## ISJSON

`ISJSON` checks whether a text is valid JSON. It returns `1` for valid JSON and `0` for anything else, which makes it the first step whenever you are not sure what sits in your Data Extension field:

```sql title="Check whether a value is valid JSON"
SELECT
      ISJSON('{"orderId":"ORD-1042"}')  AS IsCompleteJsonValid  /* Output: 1 */
    , ISJSON('{"orderId":"ORD-1042"')   AS IsBrokenJsonValid    /* Output: 0 */
```

Why is that so important? Because one broken record can stop your whole query, as you will see in the [`JSON_VALUE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-json-functions/#json_value) part.

`ISJSON` also takes an optional second argument: `VALUE`, `ARRAY`, `OBJECT` or `SCALAR`. It checks the kind of JSON, which is handy before you read keys from something that should be an object. Note that without it, a bare number does not count as JSON:

```sql title="Check the kind of JSON"
SELECT
      ISJSON('{"orderId":"ORD-1042"}', OBJECT)  AS IsOrderAnObject      /* Output: 1 */
    , ISJSON('["music","wood"]', OBJECT)        AS IsTagListAnObject    /* Output: 0 */
    , ISJSON('["music","wood"]', ARRAY)         AS IsTagListAnArray     /* Output: 1 */
    , ISJSON('49.99', SCALAR)                   AS IsPriceAScalar       /* Output: 1 */
    , ISJSON('49.99', VALUE)                    AS IsPriceAJsonValue    /* Output: 1 */
    , ISJSON('49.99')                           AS IsPriceJson          /* Output: 0 */
```

## JSON\_VALUE

`JSON_VALUE` pulls a single value - text, number or boolean - out of JSON. It takes the JSON and a path that starts with `$`, the root of the document. From there, you name each key after a dot, pick array items by their position (counting from zero) and wrap keys with spaces in double quotes:

```sql title="Read values from nested JSON"
SELECT
      JSON_VALUE('{"customer":{"email":"anna@example.com"}}', '$.customer.email')           AS CustomerEmail    /* Output: 'anna@example.com' */
    , JSON_VALUE('{"items":[{"name":"Ukulele"},{"name":"Łódź tour"}]}', '$.items[1].name')  AS SecondItemName   /* Output: 'Łódź tour' */
    , JSON_VALUE('{"First Name":"Anna"}', '$."First Name"')                                 AS FirstName        /* Output: 'Anna' */
```

Whatever it finds comes back as text, including numbers and booleans. If you need a number for a calculation or a comparison, wrap the value in [`TRY_CAST`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-conversion-functions/):

```sql title="Turn the text into the type you need"
SELECT
      JSON_VALUE('{"isGift":true}', '$.isGift')                     AS GiftFlagAsText   /* Output: 'true' */
    , TRY_CAST(JSON_VALUE('{"quantity":2}', '$.quantity') AS INT)   AS Quantity         /* Output: 2 */
```

There are three cases where `JSON_VALUE` returns `NULL` instead of a value:

1. The path points to an object or an array. Use [`JSON_QUERY`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-json-functions/#json_query) for those.
2. The path does not exist, for example because of a typo or a key missing in some records.
3. The pulled value is longer than 4000 characters. In my test, a 4000-character value came back whole, while a 4001-character one returned `NULL`, even though the JSON around it was perfectly valid.

```sql title="JSON_VALUE returns NULL for objects and missing paths"
SELECT
      JSON_VALUE('{"customer":{"email":"anna@example.com"}}', '$.customer') AS CustomerAsValue      /* Output: NULL */
    , JSON_VALUE('{"orderId":"ORD-1042"}', '$.couponCode')                  AS MissingCouponCode    /* Output: NULL */
```

> **Note: You Should Know**
>
> The 4000-character limit comes from the `JSON_VALUE` function itself, which always returns `nvarchar(4000)`. Microsoft offers two ways around the limit, [`OPENJSON`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-json-functions/#openjson) and SQL Server 2025's `RETURNING nvarchar(max)`, but both fail in MCE.

If a missing path should raise an error, add `strict` in front of the path. With constant JSON, MCE reports the problem already during the syntax check:

```sql title="❌ Strict mode fails on a missing path"
SELECT JSON_VALUE('{"orderId":"ORD-1042"}', 'strict $.couponCode') AS StrictCouponCode /* Error: Property cannot be found on the specified JSON path. */
```

In most Marketing Automation cases, I would stay with the default lax mode and check for `NULL`, as a single record with a missing key would stop the whole query.

> **Note: You Should Know**
>
> Broken JSON can still return values. `JSON_VALUE` reads only as far as it needs to find your path, so when a payload arrives cut off, for example by a system that limits its length, the keys before the cut still come back. Ask for a key after the cut, or one that is not there at all, and you get "JSON text is not properly formatted" in place of `NULL`. With JSON from a Data Extension, that error stops the whole query when it runs, and the Action Log in Automation Studio says only "Automation failed due to system error."
>
> **Read values only from records where `ISJSON` returns `1`:**
>
> ```sql {3} title="✅ Read values only from valid JSON"
> SELECT
>       orderEvent.EventId                                                                        AS EventId
>     , IIF(ISJSON(orderEvent.Payload) = 1, JSON_VALUE(orderEvent.Payload, '$.orderId'), NULL)    AS OrderId
> FROM OrderEvents AS orderEvent
> ```
>
> For a broken record, [`IIF`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-case/#iif-shorthand) returns `NULL` and the query keeps running. Turn the check around (`WHERE ISJSON(orderEvent.Payload) = 0`), and you get the list of broken records, which makes a good regular health check for any Data Extension storing JSON.

### JSON\_PATH\_EXISTS

Checking for `NULL` has one catch. A key holding `null` returns the same `NULL` as a key that is not there at all, so the output alone will not tell you which one you got. `JSON_PATH_EXISTS` will, as it returns `1` for the first and `0` for the second:

```sql title="Missing key or null value?"
SELECT
      JSON_VALUE('{"couponCode":null}', '$.couponCode')             AS NullCouponCode               /* Output: NULL */
    , JSON_VALUE('{"orderId":"ORD-1042"}', '$.couponCode')          AS MissingCouponCode            /* Output: NULL */
    , JSON_PATH_EXISTS('{"couponCode":null}', '$.couponCode')       AS DoesNullCouponCodeExist      /* Output: 1 */
    , JSON_PATH_EXISTS('{"orderId":"ORD-1042"}', '$.couponCode')    AS DoesMissingCouponCodeExist   /* Output: 0 */
```

## JSON\_QUERY

`JSON_QUERY` does what `JSON_VALUE` does, for objects and arrays. It returns them as JSON text, which you can store in a Data Extension or pass to another JSON function. Unlike `JSON_VALUE`, it has no 4000-character limit - in my test, it returned a 5004-character array without a problem.

```sql title="Read objects and arrays"
SELECT
      JSON_QUERY('{"customer":{"email":"anna@example.com"}}', '$.customer') AS CustomerObject   /* Output: '{"email":"anna@example.com"}' */
    , JSON_QUERY('{"tags":["music","wood"]}', '$.tags')                     AS TagArray         /* Output: '["music","wood"]' */
```

## JSON\_MODIFY

`JSON_MODIFY` returns a copy of your JSON with one change. The path decides where the change goes, and the third argument is the new value:

```sql title="Update, insert, delete and append"
SELECT
      JSON_MODIFY('{"status":"pending"}', '$.status', 'shipped')                        AS UpdatedStatus            /* Output: '{"status":"shipped"}' */
    , JSON_MODIFY('{"status":"shipped"}', '$.trackingNumber', 'PL1234')                 AS InsertedTrackingNumber   /* Output: '{"status":"shipped","trackingNumber":"PL1234"}' */
    , JSON_MODIFY('{"status":"shipped","couponCode":"SUMMER10"}', '$.couponCode', NULL) AS DeletedCouponCode        /* Output: '{"status":"shipped"}' */
    , JSON_MODIFY('{"tags":["music","wood"]}', 'append $.tags', 'gift')                 AS AppendedTag              /* Output: '{"tags":["music","wood","gift"]}' */
```

> **Note: You Should Know**
>
> Passing `NULL` as the new value removes the key, so keep that in mind when the value comes from a field that can be empty.

## OPENJSON

In SQL Server, `OPENJSON` turns a JSON array into rows, which is exactly what you want for order lines or a list of recommended products. Unfortunately, MCE does not let you use it. Its syntax check takes `OPENJSON` for a Data Extension name, so it fails before the query even runs, with and without a `WITH` schema. Notice the `N` in the error, which MCE added to the text on its own:

```sql {6} title="❌ OPENJSON fails the syntax check"
SELECT
      orderItem.[key]   AS ItemKey
    , orderItem.[value] AS ItemValue
    , orderItem.[type]  AS ItemType
FROM (SELECT TOP 1 sub.SubscriberID FROM _Subscribers AS sub) AS oneRow
    CROSS APPLY OPENJSON('["Ukulele","Łódź tour"]') AS orderItem
/* Error: OPENJSON(N'["Ukulele","Łódź tour"]' is not a known data extension or system data view. You can only query existing data extensions or system data views. */
```

However, there is a workaround. MCE accepts a JSON path built while the query runs (older answers online say the path must be fixed text, which was true in SQL Server 2016 but changed in SQL Server 2017). Thanks to that, you can ask for the first, second and third item yourself. All you need is a list of numbers to join, and `ROW_NUMBER` over any [Data View](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/) gives you one. Each number becomes a position in the array, and the join keeps only the positions that exist:

```sql {4,8,12} title="✅ Turn a JSON array into rows without OPENJSON"
SELECT
      orderEvent.EventId                                                                    AS EventId
    , itemPosition.Position                                                                 AS ItemPosition
    , JSON_VALUE(orderEvent.Payload, CONCAT('$.items[', itemPosition.Position, '].name'))   AS ItemName
FROM OrderEvents AS orderEvent
    INNER JOIN (
        SELECT TOP 10
              ROW_NUMBER() OVER (ORDER BY sub.SubscriberID) - 1 AS Position
        FROM _Subscribers AS sub
        ORDER BY Position
    ) AS itemPosition
        ON JSON_QUERY(orderEvent.Payload, CONCAT('$.items[', itemPosition.Position, ']')) IS NOT NULL

/* Payload: {"orderId":"ORD-1042","items":[{"name":"Ukulele"},{"name":"Łódź tour"}]}
Output:
EventId | ItemPosition | ItemName
1       | 0            | Ukulele
1       | 1            | Łódź tour
*/
```

The `- 1` is there because JSON counts array positions from zero, while `ROW_NUMBER` starts at one.

`TOP 10` sets the maximum number of items you read, so raise it if your arrays are longer (and make sure the Data View has at least that many rows). The `JSON_QUERY` in the join fits arrays of objects. For an array of plain values, like `["music","wood"]`, use `JSON_VALUE` in the join, as `JSON_QUERY` returns `NULL` for anything that is not an object or an array.

## JSON\_OBJECT and JSON\_ARRAY

So far, we have been reading and changing JSON. `JSON_OBJECT` and `JSON_ARRAY` go the other way, which you need whenever the next step expects JSON. The most important case is a file export to SFTP, where an external system picks up data from your Data Extension, and a query is the natural place to prepare it. A Script Activity that sends records to an external API could build the JSON in SSJS on its own. However, on larger volumes it gets slow and risks the [30-minute auto-kill](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/licence-limits/#limits-and-guardrails) in Automation Studio, so preparing the JSON with a query first helps there as well.

Both functions take any expression as a value, so in a real query you pass the fields of your Data Extension or Data View:

```sql {3} title="Build JSON from Data View fields"
SELECT
      sub.SubscriberKey                                             AS SubscriberKey
    , JSON_OBJECT('email': sub.EmailAddress, 'status': sub.Status)  AS SubscriberJson
FROM _Subscribers AS sub

/* Output:
SubscriberKey | SubscriberJson
anna-1042     | {"email":"anna@example.com","status":"active"}
*/
```

They also take care of the quotes and escape the text, so you no longer concatenate strings, and a value with quotes inside still gives you valid JSON. You can nest one function in another as well:

```sql title="Build JSON from values"
SELECT
      JSON_OBJECT('sku': 'UKU-01', 'price': 49.99)                      AS ProductObject    /* Output: '{"sku":"UKU-01","price":49.99}' */
    , JSON_ARRAY('music', 'wood')                                       AS TagArray         /* Output: '["music","wood"]' */
    , JSON_OBJECT('fullName': 'Anna "Ania" Nowak')                      AS EscapedQuotes    /* Output: '{"fullName":"Anna \"Ania\" Nowak"}' */
    , JSON_OBJECT('customer': JSON_OBJECT('email': 'anna@example.com')) AS NestedObject     /* Output: '{"customer":{"email":"anna@example.com"}}' */
```

Watch out for empty fields, as the two functions treat `NULL` in opposite ways. By default, `JSON_OBJECT` keeps the key with a `null` value. Add `ABSENT ON NULL` after the values to drop it, for example for a cart without a coupon code:

```sql {3} title="Drop the keys of empty fields"
SELECT
      JSON_OBJECT('cartId': cart.CartId, 'couponCode': cart.CouponCode)                 AS KeepEmptyKey
    , JSON_OBJECT('cartId': cart.CartId, 'couponCode': cart.CouponCode ABSENT ON NULL)  AS DropEmptyKey
FROM AbandonedCarts AS cart

/* Output:
KeepEmptyKey                             | DropEmptyKey
{"cartId":"CART-1042","couponCode":null} | {"cartId":"CART-1042"}
*/
```

`JSON_ARRAY` works the other way round. It drops an empty field from the list by default, and `NULL ON NULL` after the values keeps it as `null`.

## FOR JSON PATH

`JSON_OBJECT` and `JSON_ARRAY` build JSON from the values of a single row. However, emails often show a whole list: the products left in a cart, the latest orders or the upcoming bookings. Your sendable Data Extension has one row per subscriber, so the list has to fit into a single field on that row. Put it there as JSON, and your email reads it in one go, for example with `BuildRowsetFromJSON` in AMPscript, without a lookup for every item.

`FOR JSON PATH` builds such a list. Add it at the end of a subquery, and its rows come back as a JSON array with your column aliases as keys. The alias of the whole subquery becomes the field in your target Data Extension:

```sql {8-9} title="Put each abandoned cart into one field"
SELECT
      cart.SubscriberKey AS SubscriberKey
    , (
        SELECT
              cartItem.Sku          AS sku
            , cartItem.ProductName  AS name
        FROM CartItems AS cartItem
        WHERE cartItem.CartId = cart.CartId
        FOR JSON PATH
      ) AS CartItems
FROM AbandonedCarts AS cart

/* AbandonedCarts row: CartId = CART-1042, SubscriberKey = anna-1042
CartItems rows:
CartId    | Sku      | ProductName
CART-1042 | UKU-01   | Ukulele
CART-1042 | TOUR-LDZ | Łódź tour
Output:
SubscriberKey | CartItems
anna-1042     | [{"sku":"UKU-01","name":"Ukulele"},{"sku":"TOUR-LDZ","name":"Łódź tour"}]
*/
```

> **Note: You Should Know**
>
> Why the subquery? It looks like MCE runs your query inside a table named `Qry`, where every column needs a name. `FOR JSON` on the main `SELECT` returns a single column without one, so the syntax check stops it:
>
> ```sql {5} title="❌ FOR JSON on the main SELECT fails the syntax check"
> SELECT TOP 1
>       sub.SubscriberKey AS subscriberKey
>     , sub.EmailAddress  AS email
> FROM _Subscribers AS sub
> FOR JSON PATH /* Error: No column name was specified for column 1 of 'Qry'. */
> ```

The cart example assumes your e-commerce platform sends carts to Data Extensions. If you use [Behavioral Triggers](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/behavioral-triggers/) for abandoned carts, you will not need it, as their Data Extension stores the cart encrypted and the email pulls the items from the Einstein backend on its own.

Even a cart with a single item comes back as an array, so your email can always loop over it. If you need a single object, use [`JSON_OBJECT`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-json-functions/#json_object-and-json_array).

Does the system reading your list expect nested objects in each item? Use dots in the aliases. Everything before the dot becomes the name of the object, and it does not matter whether you wrap such an alias in square brackets or double quotes:

```sql {6-7} title="Group the price details of each item"
SELECT
      cart.SubscriberKey AS SubscriberKey
    , (
        SELECT
              cartItem.Sku      AS sku
            , cartItem.Price    AS [price.amount]
            , cartItem.Currency AS "price.currency"
        FROM CartItems AS cartItem
        WHERE cartItem.CartId = cart.CartId
        FOR JSON PATH
      ) AS CartItems
FROM AbandonedCarts AS cart

/* AbandonedCarts row: CartId = CART-1042, SubscriberKey = anna-1042
CartItems rows:
CartId    | Sku      | Price | Currency
CART-1042 | UKU-01   | 49.99 | EUR
CART-1042 | TOUR-LDZ | 24.99 | EUR
Output:
SubscriberKey | CartItems
anna-1042     | [{"sku":"UKU-01","price":{"amount":49.99,"currency":"EUR"}},{"sku":"TOUR-LDZ","price":{"amount":24.99,"currency":"EUR"}}]
*/
```

Keep an eye on empty fields. Unlike `JSON_OBJECT`, `FOR JSON` leaves out keys with a `NULL` value by default, so an item without a discount gets no `discount` key at all. If the system reading your list expects every key, add `INCLUDE_NULL_VALUES` after `FOR JSON PATH`, and the item gets `"discount":null`.
