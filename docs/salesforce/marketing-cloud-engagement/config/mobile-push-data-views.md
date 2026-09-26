# MCE MobilePush Data Views

> Push past the docs. The undocumented MobilePush Data Views in Marketing Cloud Engagement (MCE), and where push engagement data lives.

Source: https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/mobile-push-data-views/  
Author: Mateusz Dąbrowski  
Last updated: 2026-09-26  
Licence: CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)

## Data Views Basics

MobilePush Data Views work the same way as the [System Data Views](https://mateuszdabrowski.pldocs/salesforce/marketing-cloud-engagement/config/system-data-views/#data-views-basics) you know from emails, journeys and automations. They are built-in backend tables that you **cannot change**, but can freely use in SQL queries for quick reports or to feed your own Data Extensions.

Below you can find the MobilePush Data Views. The SMS channel ones are in the [Mobile Connect Data Views article](https://mateuszdabrowski.pldocs/salesforce/marketing-cloud-engagement/config/mobile-connect-data-views/), and the [Email Studio](https://mateuszdabrowski.pldocs/salesforce/marketing-cloud-engagement/config/system-data-views/#subscriber-data-views), [Journey Builder](https://mateuszdabrowski.pldocs/salesforce/marketing-cloud-engagement/config/system-data-views/#journey-data-views) and [Automation Studio](https://mateuszdabrowski.pldocs/salesforce/marketing-cloud-engagement/config/system-data-views/#automation-data-views) ones in the [System Data Views article](https://mateuszdabrowski.pldocs/salesforce/marketing-cloud-engagement/config/system-data-views/).

> **Note: You Should Know**
>
> Be sure to check the excellent [Dataviews.io](https://dataviews.io) - an interactive system tables relationship diagram created by [Zuzanna Jarczyńska](https://sfmarketing.cloud/author/zjarczynska/). It will for sure help you with multi-view [`JOIN`s](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/).
>
> There is also a more detailed [System Tables relationship diagram](https://dbdiagram.io/d/5ff259ed80d742080a34e3c3) created by [Cameron Roberts](https://cameronrobert.com.au) that contains SQL Database structure along with field lengths.
>
> [Zuza's DataViews.io](https://dataviews.io) | [Cam's Detailed Diagram](https://dbdiagram.io/d/5ff259ed80d742080a34e3c3)

## Devices and Contacts

MobilePush data is assigned to a device, not to a Contact. Every app installation registers its own device with a unique Device ID. It means one Contact can have several of them - a phone, a tablet, or the same phone after reinstalling the app or a factory reset. It also works the other way around. A device moves to another Contact whenever the app sets a different Contact Key, for example after a family member logs in on the same phone. And old devices stay for good, as Salesforce doesn't let you delete them and doesn't clean up inactive ones on its own.

Until the app sets a Contact Key, the SDK registers the device under a GUID-formatted one. Once the app sends the real key, the device moves to that Contact, and the GUID one stays behind without any channel address. Setting a key never renames a Contact either. It links the device to an existing Contact or creates a new one, so an app that sends ten different keys from one device creates ten Contacts. Salesforce covers all of it in [its MobilePush key behaviors article](https://help.salesforce.com/s/articleView?id=000388835\&type=1), and my [Contact Deletion](https://mateuszdabrowski.pldocs/salesforce/marketing-cloud-engagement/config/contact-deletion/#contactless-contacts) article shows how to clean up the contactless leftovers. Just never delete a Contact that still has a MobilePush device - it blocks that device from push until the user reinstalls the app.

Keep it in mind when you count your push audience. Rows in [`_PushAddress`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/mobile-push-data-views/#_pushaddress) are devices, so to get people, count distinct Contacts with at least one opted-in and active device:

```sql title="Push-reachable Contacts and devices per app"
SELECT
      pushAddress._APID                       AS APID
    , COUNT(DISTINCT pushAddress._ContactID)  AS ReachableContacts
    , COUNT(*)                                AS ReachableDevices
FROM _PushAddress AS pushAddress
WHERE
    pushAddress._OptInStatusID = '2'
    AND pushAddress._Status = '1'
GROUP BY pushAddress._APID
```

The same device logic is also why [your send counts](https://help.salesforce.com/s/articleView?id=005336059\&type=1) rarely match the number of Contacts in your audience. MCE (Marketing Cloud Engagement, formerly Salesforce Marketing Cloud) sends a push notification to every opted-in device of each Contact for the target app. Inbox and In-App messages are different, as the app downloads them by itself, so they reach opted-out devices too. [Salesforce's overview of message types](https://help.salesforce.com/s/articleView?id=000392250\&type=1) adds one more difference - Inbox messages belong to the device, while In-App ones follow the Contact and show only once per Contact.

## MobilePush Data Views

MobilePush is the odd one out, as Salesforce does not document a single Data View for it. The official list stops at Email, Journeys, Automations, MobileConnect SMS and GroupConnect LINE. Two undocumented Data Views still hold the push contact data, though: `_PushAddress` and `_PushTag`. Just like [`_MobileAddress`](https://mateuszdabrowski.pldocs/salesforce/marketing-cloud-engagement/config/mobile-connect-data-views/#_mobileaddress), MCE fills and uses them under the hood, so you can query them, but there is no guarantee about their fields or how long they will be around. Salesforce says so openly - [its FAQ on MobilePush data](https://help.salesforce.com/s/articleView?id=005232874\&type=1) calls `_PushAddress` unsupported and sends you to community resources instead. Yet it is the only way to get MobilePush Demographics into an automation. The supported alternative, a MobilePush Filtered List, can only be exported by hand, and without the push tokens.

There is no Data View for push sends, opens or deliveries, so for engagement data jump to [Push Send and Engagement Data](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/mobile-push-data-views/#push-send-and-engagement-data) below.

### \_PushAddress

`_PushAddress` Data View stores one row per registered device. It is also the backend for the MobilePush Demographics attribute set that you can see in the MobilePush Data attribute group of Contact Builder's Data Designer.

Unlike the tracking Data Views, it shows only the current state of each device. When a user opts out and back in, you will find the dates of the latest opt-in and opt-out, but not the full history. If you need it, copy `_PushAddress` to your own Data Extension with a scheduled Automation. Salesforce describes the same logic in [a knowledge article on MobilePush statuses](https://help.salesforce.com/s/articleView?id=005314329\&type=1) - whichever of the two dates is newer tells you the current status.

Salesforce does not document its fields, so the list below comes from the community diagrams linked in [Data Views Basics](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/mobile-push-data-views/#data-views-basics), [an excellent Salesforce Stack Exchange answer by Adam Spriggs](https://salesforce.stackexchange.com/questions/174179/attributes-in-pushaddress-and-pushtag-data-views), and my checks against a live account with the query below.

**Fields**

| Name              | Description                                                                                                       | Data Type    | Nullable |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- | ------------ | -------- |
| \_ContactID       | Global Contact ID (not Contact Key). Stored as Text here, while `_MobileAddress` stores it as Number              | Text         |          |
| \_DeviceID        | Unique ID of the app installation, generated by the MobilePush SDK                                                | Text(200)    |          |
| \_APID            | ID of the MobilePush app the device registered with                                                               | Text(38)     |          |
| \_Status          | Whether the device is active. Inactive devices get no messages at all. See Field Picklist Values                  | Text         | X        |
| \_Source          | Source of the device record. See Field Picklist Values                                                            | Text         | X        |
| \_SourceObjectId  | ID of the source object                                                                                           | Text(200)    | X        |
| \_Platform        | Operating system of the device, for example iOS or Android                                                        | Text(100)    | X        |
| \_PlatformVersion | Version of the operating system                                                                                   | Text(100)    | X        |
| \_Alias           | Alias set by the app through the SDK                                                                              | Text(100)    | X        |
| \_OptOutStatusID  | Current opt-out status of the device. See Field Picklist Values                                                   | Text         | X        |
| \_OptOutMethodID  | How the device opted out. See Field Picklist Values                                                               | Text         | X        |
| \_OptOutDate      | Date of the opt-out                                                                                               | Date         | X        |
| \_OptInStatusID   | Current opt-in status of the device. Defaults to 0. See Field Picklist Values                                     | Text         |          |
| \_OptInMethodID   | How the device opted in. See Field Picklist Values                                                                | Text         | X        |
| \_OptInDate       | Date of the opt-in                                                                                                | Date         | X        |
| \_Channel         | Communication channel, `Push`                                                                                     | Text(20)     | X        |
| \_CreatedDate     | Date the device record was created. Defaults to the time of writing                                               | Date         |          |
| \_CreatedBy       | Who or what created the device record. `-1000` for the system                                                     | Text         | X        |
| \_ModifiedDate    | Date the device record was last modified. Defaults to the time of writing                                         | Date         |          |
| \_ModifiedBy      | Who or what last modified the device record. `-1000` for the system                                               | Text         | X        |
| \_City            | Contact's City                                                                                                    | Text(200)    | X        |
| \_State           | Contact's State                                                                                                   | Text(200)    | X        |
| \_ZipCode         | Contact's Zip Code                                                                                                | Text(20)     | X        |
| \_FirstName       | Contact's First Name                                                                                              | Text(100)    | X        |
| \_LastName        | Contact's Last Name                                                                                               | Text(100)    | X        |
| \_UTCOffset       | Hours between the device's time zone and UTC. Defaults to 0                                                       | Decimal(4,2) | X        |
| \_IsHonorDST      | Whether the device's time zone observes Daylight Saving Time. Defaults to false                                   | Boolean      | X        |
| \_SystemToken     | Push token from Apple (APNS) or Google (FCM) used to deliver notifications. Empty for devices that never opted in | Text(4000)   | X        |
| \_ProviderToken   | Provider token for the device                                                                                     | Text(200)    | X        |
| \_Badge           | Badge number shown on the app icon                                                                                | Number       | X        |
| \_LocationEnabled | Whether the user allowed location tracking for geofence and beacon messages                                       | Boolean      | X        |
| \_TimeZone        | Time zone reported by the device                                                                                  | Text(50)     | X        |
| \_Device          | Device name, usually empty                                                                                        | Text(100)    | X        |
| \_HardwareId      | Device manufacturer and model, for example `Google Pixel 8`                                                       | Text(100)    | X        |
| \_DeviceType      | Device type, usually empty                                                                                        | Text(20)     | X        |

**Field Picklist Values**

`_OptInStatusID` - 2 values

| Value | Meaning                |
| ----- | ---------------------- |
| 0     | Not opted in (default) |
| 2     | Opted in               |

`_OptInMethodID` - 14 values

| Value | Meaning            |
| ----- | ------------------ |
| 0     | Unspecified        |
| 1     | WebCollect         |
| 2     | API                |
| 3     | FTAF               |
| 4     | Import             |
| 5     | MoveCopy           |
| 6     | Application        |
| 7     | SalesForce         |
| 8     | Segmentation       |
| 9     | GenericExtension   |
| 10    | CustomObject       |
| 11    | RMM                |
| 12    | Mobile Opt-In      |
| 13    | DeviceRegistration |

The values come from [a Salesforce Stack Exchange answer](https://salesforce.stackexchange.com/questions/431007/values-for-optoutmethodid-in-pushaddress-data-view-in-sfmc). Every device in the account I checked opted in through DeviceRegistration (`13`).

`_OptOutStatusID` - 2 values

| Value | Meaning       |
| ----- | ------------- |
| 0     | Not opted out |
| 1     | Opted out     |

`_OptOutMethodID` - 18 values

| Value | Meaning                         |
| ----- | ------------------------------- |
| 0     | Unspecified                     |
| 1     | WebCollect                      |
| 2     | API                             |
| 3     | FTAF                            |
| 4     | Import                          |
| 5     | MoveCopy                        |
| 6     | Application                     |
| 7     | SalesForce                      |
| 8     | Segmentation                    |
| 9     | GenericExtension                |
| 10    | CustomObject                    |
| 11    | RMM                             |
| 13    | ServiceFeedback                 |
| 14    | MobileOriginated                |
| 15    | Contacts Suppression            |
| 16    | User Disabled Push              |
| 17    | Missing or Invalid Device Token |
| 18    | GlobalStop                      |

The values come from [a Salesforce Stack Exchange answer](https://salesforce.stackexchange.com/questions/431007/values-for-optoutmethodid-in-pushaddress-data-view-in-sfmc). The opt-outs in the account I checked were either User Disabled Push (`16`) or Missing or Invalid Device Token (`17`). ServiceFeedback (`13`) is the third one you will meet, as Salesforce uses it for uninstalled apps and long inactivity.

`_Status` - 2 values

| Value | Meaning          |
| ----- | ---------------- |
| 1     | Active (default) |
| 2     | Inactive         |

`_Status` is the Status you see in the MobilePush Demographics of a Contact. According to [Salesforce](https://help.salesforce.com/s/articleView?id=005314329\&type=1), Inactive devices are excluded from all sends regardless of their opt-in status. A device usually becomes Inactive only when an administrator sets it with [an import](https://help.salesforce.com/s/articleView?id=000387254\&type=1), as it is the only status an import can change. The numbers are the ones I saw in a live account, where the only Inactive device was also the only one last modified by a user.

`_Source` - undocumented

`_Source` was always `13` in the account I checked, which is the value of DeviceRegistration in `_OptInMethodID`. Salesforce does not document it, so I would not build any logic on it.

---

**SQL Query**

```sql
SELECT
      pushAddress._ContactID        AS ContactID
    , pushAddress._DeviceID         AS DeviceID
    , pushAddress._APID             AS APID
    , pushAddress._Status           AS Status
    , pushAddress._Source           AS Source
    , pushAddress._SourceObjectId   AS SourceObjectId
    , pushAddress._Platform         AS Platform
    , pushAddress._PlatformVersion  AS PlatformVersion
    , pushAddress._Alias            AS Alias
    , pushAddress._OptOutStatusID   AS OptOutStatusID
    , pushAddress._OptOutMethodID   AS OptOutMethodID
    , pushAddress._OptOutDate       AS OptOutDate
    , pushAddress._OptInStatusID    AS OptInStatusID
    , pushAddress._OptInMethodID    AS OptInMethodID
    , pushAddress._OptInDate        AS OptInDate
    , pushAddress._Channel          AS Channel
    , pushAddress._CreatedDate      AS CreatedDate
    , pushAddress._CreatedBy        AS CreatedBy
    , pushAddress._ModifiedDate     AS ModifiedDate
    , pushAddress._ModifiedBy       AS ModifiedBy
    , pushAddress._City             AS City
    , pushAddress._State            AS State
    , pushAddress._ZipCode          AS ZipCode
    , pushAddress._FirstName        AS FirstName
    , pushAddress._LastName         AS LastName
    , pushAddress._UTCOffset        AS UTCOffset
    , pushAddress._IsHonorDST       AS IsHonorDST
    , pushAddress._SystemToken      AS SystemToken
    , pushAddress._ProviderToken    AS ProviderToken
    , pushAddress._Badge            AS Badge
    , pushAddress._LocationEnabled  AS LocationEnabled
    , pushAddress._TimeZone         AS TimeZone
    , pushAddress._Device           AS Device
    , pushAddress._HardwareId       AS HardwareId
    , pushAddress._DeviceType       AS DeviceType
FROM _PushAddress AS pushAddress
```

When working with `_PushAddress` Data View:

1. There is no guarantee of how long it will work and how long the data will be correct. Be sure you are checking it periodically or - even better - have validation in your code.
2. `_ContactID` is stored as Text here, while [`_MobileAddress`](https://mateuszdabrowski.pldocs/salesforce/marketing-cloud-engagement/config/mobile-connect-data-views/#_mobileaddress) keeps it as a Number. Cast one side when joining the two, for example with `CAST(pushAddress._ContactID AS BIGINT)`.
3. If your Business Unit has more than one app, always filter by `_APID`, as the same Contact can be opted in for one app and opted out for another. Together with `_OptInStatusID`, it is the SQL version of the Opt-In Status and Application criteria [Salesforce recommends for MobilePush Filtered Lists](https://help.salesforce.com/s/articleView?id=000384157\&type=1).
4. Don't treat every opt-out as the user's decision. MCE opts the device out on its own once it goes inactive - no app opens, no delivery receipts and no sync calls. The same happens after three failed sends in a row or when Apple or Google reject the push token. Once the app updates or registers again, the device is opted back in. Such opt-outs usually come with `_OptOutMethodID` `13` (ServiceFeedback), which Salesforce ties to an uninstalled app or a long period of inactivity. Don't expect it right after an uninstall, though. The timing depends on Apple and Google, and MCE never learns about the uninstall itself.
5. Don't be surprised to see an opt-out date on opted-in devices. A device that registers before the user allows notifications starts as opted out with `_OptOutMethodID` `16` (User Disabled Push). A few minutes later it switches to opted in, so the row keeps both dates. If there is no opt-in date at all, the user never allowed notifications.
6. Keep an eye on `_OptOutMethodID` `17` (Missing or Invalid Device Token). Salesforce links it to SDK implementation or push configuration errors, mostly during development. A sudden wave of them across many devices usually means an expired APNs certificate or a wrong FCM key.
7. If you ever need to import MobilePush Contacts, build the source file with a query on `_PushAddress`, as [Salesforce recommends](https://help.salesforce.com/s/articleView?id=000387254\&type=1). The import needs the Contact Key, Platform, Device ID and System Token, and a stale `_SystemToken` overwrites the current one, which makes the device unsendable. Imports also treat every record as opted in, so filter out the opted-out devices first.
8. `_SystemToken` changes every time Apple or Google rotate it, which makes it useless as a device identifier. Use `_DeviceID` instead.

---

### \_PushTag

`_PushTag` Data View stores the tags your app sets on a device through the MobilePush SDK - simple text labels, for example interests the user picked in the app settings. Next to your own tags, you will find the ones the SDK adds by itself, such as `ALL`, the platform name (`Android`) and `DEBUG` on test builds. Each row is a single tag on a single device and, just like with `_PushAddress`, Salesforce does not document its fields, so the list below comes from [Adam Spriggs' answer on Salesforce Stack Exchange](https://salesforce.stackexchange.com/questions/174179/attributes-in-pushaddress-and-pushtag-data-views) as well.

**Fields**

| Name           | Description                                                     | Data Type | Nullable |
| -------------- | --------------------------------------------------------------- | --------- | -------- |
| \_DeviceID     | ID of the device the tag belongs to                             | Text(200) |          |
| \_APID         | ID of the MobilePush app                                        | Text(38)  |          |
| \_Value        | The tag                                                         | Text(128) | X        |
| \_CreatedDate  | Date the tag was added. Defaults to the time of writing         | Date      |          |
| \_CreatedBy    | Who or what added the tag                                       | Text      | X        |
| \_ModifiedDate | Date the tag was last modified. Defaults to the time of writing | Date      |          |
| \_ModifiedBy   | Who or what last modified the tag                               | Text      | X        |

**SQL Query**

```sql
SELECT
      pushTag._DeviceID      AS DeviceID
    , pushTag._APID          AS APID
    , pushTag._Value         AS Tag
    , pushTag._CreatedDate   AS CreatedDate
    , pushTag._CreatedBy     AS CreatedBy
    , pushTag._ModifiedDate  AS ModifiedDate
    , pushTag._ModifiedBy    AS ModifiedBy
FROM _PushTag AS pushTag
```

When working with `_PushTag` Data View:

1. Tags belong to devices, not Contacts. To find Contacts with a given tag, [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) it with `_PushAddress` on both `_DeviceID` and `_APID`. The `JOIN` works even though `_PushTag` stores `_APID` in uppercase and `_PushAddress` in lowercase, as SQL in MCE ignores the case. Outside of SQL, normalise the case first - with `Uppercase()` in AMPscript or `toUpperCase()` in SSJS.
2. Tag values are whatever the app sends, so agree on the list with the app developers upfront. Otherwise, your segmentation will depend on their spelling.

---

## Push Send and Engagement Data

As MCE has no Data View for push sends, opens or deliveries, you have to reach for one of these sources instead.

### Analytics Builder Reports

For a quick look without any SQL, Reports offer three MobilePush reports: Push Account Summary, Push Message Detail (with individual send status) and Push Message Summary. Inbox messages show up in Push Message Detail only after a device downloads them, so a fresh Inbox campaign will look smaller there than it really is. Push Message Summary, on the other hand, counts every tap on an Inbox message as a new open, so when users come back to the same message, [its Inbox Open % can go above 100%](https://help.salesforce.com/s/articleView?id=005386407\&type=1). For anything beyond a quick look, Salesforce itself [recommends the Detail Extract](https://help.salesforce.com/s/articleView?id=005134946\&type=1) described below, as the Analytics Builder reports tend to time out on large data.

The Sends tab in MobilePush has its own traps. [All its numbers count devices](https://help.salesforce.com/s/articleView?id=005336059\&type=1), Sendable Audience leaves out opted-out devices, and Failed includes messages that broke on AMPscript before the send. Inbox messages count differently there. Sendable Audience shows the devices that can download the message, while Failed most likely counts only the push that comes with it - the alert of an Inbox + Alert send or the silent push that updates the iOS badge. The Inbox message itself stays available to those devices, so the downloads can end up higher than Delivered.

### Push Send Log

The closest thing to a Data View is the Push Send Log - a [Feature on Demand](https://mateuszdabrowski.pldocs/salesforce/marketing-cloud-engagement/config/features-on-demand/) that writes a row for every push notification and inbox message you send. Ask for both of its parts - the PushSendLog template and the backend Business Rule that fills it, as without the rule the log stays empty. Then create a Data Extension from the template in Contact Builder and keep it non-sendable.

The template comes with these fields:

| Name                     | Description                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| PushJobID                | ID of the job that included the push notification                                        |
| PushTriggeredSendRequest | Token returned by the API call. For list and data extension sends, the same as PushJobID |
| PushBatchID              | ID of the batch for batched sends                                                        |
| SubID                    | ID of the subscriber who got the message                                                 |
| DeviceID                 | ID of the device that got the message                                                    |
| AppID                    | ID of the app                                                                            |
| LogDate                  | Date the row was written                                                                 |

You can also add your own fields to log more. Whenever a field name matches a Contact attribute or a field of the sending Data Extension, MCE writes its value at send time. The email Send Log works the same way, so my [Enhanced Send Log](https://mateuszdabrowski.pldocs/salesforce/marketing-cloud-engagement/config/enhanced-send-log/) article has ideas worth trying here, especially the [Custom Send Log](https://mateuszdabrowski.pldocs/salesforce/marketing-cloud-engagement/config/enhanced-send-log/#custom-send-log) part on choosing extra fields. However, the push documentation mentions only Contact attributes and Data Extension fields, so test AMPscript variables with a push send before you rely on them. From there, you can query the Push Send Log like any other Data Extension.

### MobilePush Detail Extract

If you need tracking data in bulk, use the **MobilePush Detail Extract Report** type of the Data Extract activity in Automation Studio. It creates a ZIP file with MobilePush tracking data that you then move with a File Transfer activity. You can narrow it down by app, campaign, message and platform. Keep in mind it counts only unique opens. Its `MessageOpened` field gives one open per device, while the MobilePush screen counts every single open, so [the two numbers rarely match](https://help.salesforce.com/s/articleView?id=005131481\&type=1). The report is not enabled by default, so if you don't see the type in your account, open a support case for your MID.

For a regular feed, put the Data Extract and a File Transfer (Move a File From Safehouse) into one scheduled Automation, with exactly the same file naming pattern in both. [Salesforce's walkthrough](https://help.salesforce.com/s/articleView?id=005239066\&type=1) covers every step. Use a Rolling Range of at least a week, as opens arrive late. The SDK sends them in batches when the app goes to the background, and after a failed upload only at the next launch, so [engagement data can lag by days](https://help.salesforce.com/s/articleView?id=005134946\&type=1). Keep Apply Time Zone checked, so that both the timestamps and the extracted period follow your time zone.

If you import the CSV back into a Data Extension, keep only the fields and dates you need, as large push extracts easily hit the 30-minute Query Activity timeout. With overlapping ranges, also give the Data Extension a primary key and import with Add and Update, so repeated rows update the existing ones.

When reading the MobilePush Detail Extract (Salesforce's [troubleshooting guide](https://help.salesforce.com/s/articleView?id=002628213\&type=1) and [FAQ on the report's data](https://help.salesforce.com/s/articleView?id=005223889\&type=1) go deeper):

1. A `Success` status only means MCE handed the message over to Apple or Google. Even an uninstalled app or disabled notifications can return it, so when a notification doesn't show up, check the device and the app next.
2. A `Fail` comes with the reason in the ServiceResponse column. Most are invalid tokens (`NotRegistered` or `Requested entity was not found` on Android and `InvalidToken` on iOS), and during development usually a provisioning problem.
3. No record at all means the Device ID was left out of the send. It was opted out or Inactive, it wasn't linked to a Contact in your audience, or the message failed on AMPscript or SSJS before it went out.
4. A blank `Status` marks an Inbox download. Inbox-only rows appear only once a device downloads the message, while an Inbox + Alert message gets its row as soon as the alert goes out. In-App rows are just the silent pushes announcing a new message, as no report shows In-App displays or clicks.
5. Opens depend on the date range, so an open after the range ends leaves the message looking unopened. `MessageOpened` records a tap on the push, `InboxMessageOpened` an open from the Inbox list, and `TimeInApp` the seconds spent in the app after the tap. As each device gets one row per message, an Inbox message opened many times shows only [the earliest open within the range](https://help.salesforce.com/s/articleView?id=005386407\&type=1).
6. `ContactKey` is frozen at send time for push notifications, but for Inbox-only rows it shows the Contact Key from the moment you generate the report, as [Salesforce explains](https://help.salesforce.com/s/articleView?id=005322024\&type=1). Join the extract with `_PushAddress` on the Device ID, which stays the same.
7. Every column in the CSV is text. The types and lengths in [Salesforce's column list](https://help.salesforce.com/s/articleView?id=000395722\&type=1) are only a suggestion for your Data Extension, and dates may need converting.

### Journey Builder

[`_JourneyActivity`](https://mateuszdabrowski.pldocs/salesforce/marketing-cloud-engagement/config/system-data-views/#_journeyactivity) Data View lists push activities with `ActivityType` = `PUSHNOTIFICATIONACTIVITY`. [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) it with [`_Journey`](https://mateuszdabrowski.pldocs/salesforce/marketing-cloud-engagement/config/system-data-views/#_journey) on `VersionID` to see which journeys, and which of their versions, send push messages:

```sql title="Journeys sending push messages"
SELECT
      journey.JourneyName
    , journey.VersionNumber
    , journey.JourneyStatus
    , journeyActivity.ActivityName
    , journeyActivity.ActivityExternalKey
FROM _JourneyActivity AS journeyActivity
    INNER JOIN _Journey AS journey
        ON journey.VersionID = journeyActivity.VersionID
WHERE journeyActivity.ActivityType = 'PUSHNOTIFICATIONACTIVITY'
```

That is as far as SQL goes, though. For emails, `JourneyActivityObjectID` matches `TriggererSendDefinitionObjectID` in the send Data Views, but neither the Push Send Log nor the MobilePush Detail Extract holds a journey or activity ID. So you can list the journeys that send push, but no ID ties a specific push send back to one of them. The closest you get is the `MessageName` column of the MobilePush Detail Extract, which [Salesforce fills with the name of the push message in Journey Builder](https://help.salesforce.com/s/articleView?id=000395722\&type=1).

### Data 360

If your MCE is connected to Data 360 (formerly Data Cloud), you can get push engagement without the extract. The MobilePush starter data bundle of the Marketing Cloud Engagement connector creates a set of data streams for each Business Unit. They bring the push engagement events (sends, opens, displays, undelivers, and geofence entries and exits), Einstein Engagement Scores for push, the app contact points and the push templates.

Salesforce [maps them to the data model for you](https://help.salesforce.com/s/articleView?id=data.c360_a_starter_data_bundles.htm\&type=5), so each event lands as a row in the [Device Application Engagement](https://developer.salesforce.com/docs/data/data-cloud-dmo-mapping/guide/c360dm-mce-engagement.html) object, linked to the Individual through the Subscriber Key and to the device through its app contact point. From there, you can segment on push engagement or build calculated insights on it, with no Data Extract, FTP or File Transfer in between.

### Event Notification Service

Finally, MobilePush can send install, inactive device and push delivery events straight to your own system through the Event Notification Service. You turn them on per app in Setup, under MobilePush Administration, but push delivery events require SDK 9.0 or later.
