# MCE System Data Views

> Dive deep into System Data Views - the backend Marketing Cloud Engagement data. Actionable pearls await.

Source: https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/  
Author: Mateusz Dąbrowski  
Last updated: 2026-09-24  
Licence: CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)

## Data Views Basics

System Data Views are **built-in backend Data Extensions** that you can use to find information about your subscribers and sends. You **cannot change them**, but you can leverage their data in SQL queries for quick reports in [Query Studio](https://mateuszdabrowski.pldocs/salesforce/marketing-cloud-engagement/config/appexchange-solutions/#query-studio) or outputting to the standard Data Extension. They are excellent fuel for SSJS logic.

Data Views have **data retention settings set to 6 months**. If you want to store any data for a more extended period, you must create an Automation that will be copying data to your Data Extension.

Be careful, however, as some of the System Data Views can get absurdly big quick, and making copies within your MCE (Marketing Cloud Engagement, formerly Salesforce Marketing Cloud) Instance may lead to performance issues. In such cases, a much better idea might be to export that data on a scheduled basis to an external Data Warehouse.

Another important point related to Data Views is always knowing which Data View you genuinely want to use. For example, in most cases, you will be interested in parent-level [`_Subscribers`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_subscribers) Data View, which means you will need to use the [`Ent.`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-from/#enterprise-data-extension) prefix in your query.

> **Note: You Should Know**
>
> Below you can find selected Salesforce Marketing Cloud Engagement Data Views focused on Subscribers, Emails, Journeys and Automations. You can find the SMS Channel Data Views in [Mobile Connect Data Views article](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/mobile-connect-data-views/).
>
> Be sure to check the excellent [Dataviews.io](https://dataviews.io) - an interactive system tables relationship diagram created by [Zuzanna Jarczyńska](https://sfmarketing.cloud/author/zjarczynska/). It will for sure help you with multi-view [`JOIN`s](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/).
>
> There is also a more detailed [System Tables relationship diagram](https://dbdiagram.io/d/5ff259ed80d742080a34e3c3) created by [Cameron Roberts](https://cameronrobert.com.au) that contains SQL Database structure along with field lengths.
>
> [Zuza's DataViews.io](https://dataviews.io) | [Cam's Detailed Diagram](https://dbdiagram.io/d/5ff259ed80d742080a34e3c3)

---

## Subscriber Data Views

### \_Subscribers

Stores information about your Subscribers. Great for high-level perspective or adding Email Address field to other more detailed Data Views.

**Fields**

| Name              | Description                                                                                                     | Data Type | Nullable |
| ----------------- | --------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| SubscriberID      | The subscriber ID for the affected subscriber. This number represents the unique ID for each subscriber record. | Number    |          |
| DateUndeliverable | The date an email for the subscriber was returned as undeliverable                                              | Date      | X        |
| DateJoined        | The Date, the subscriber, joined your list                                                                      | Date      | X        |
| DateUnsubscribed  | The Date, the subscriber, unsubscribed from your list                                                           | Date      | X        |
| Domain            | The domain of the subscriber                                                                                    | Text      | X        |
| EmailAddress      | The subscriber's email address                                                                                  | Email     |          |
| BounceCount       | The total number of bounces accrued by the subscriber                                                           | Number    |          |
| SubscriberKey     | A potential alternate identifier for subscribers.                                                               | Text      |          |
| SubscriberType    | The subscriber type for the affected subscriber                                                                 | Text      |          |
| Status            | The status of the subscriber                                                                                    | Text      | X        |
| Locale            | The locale code for the subscriber                                                                              | Locale    | X        |

**Field Picklist Values**

`Status` possible values:

- active
- held
- unsubscribed
- bounced

`SubscriberType` possible values:

- ExactTarget
- Unknown External System
  In most cases you will see only `Exact Target` in your database.

---

**SQL Query**

```sql
SELECT
      sub.SubscriberID
    , sub.DateUndeliverable
    , sub.DateJoined
    , sub.DateUnsubscribed
    , sub.Domain
    , sub.EmailAddress
    , sub.BounceCount
    , sub.SubscriberKey
    , sub.SubscriberType
    , sub.Status
    , sub.Locale
FROM _Subscribers AS sub
```

When working with `_Subscribers` Data View:

1. If you are using the query in the child Business Unit, use [`Ent.`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-from/#enterprise-data-extension) prefix, as the data is stored on Parent BU level.
2. If you need high-level data on your subscribers, this Data View might be enough. If you want to learn more (for example, why a subscriber bounced, where did he unsubscribe), you will need to [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) other Data Views.
3. Use `SubscriberID` to [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) data from different engagement-based Data Views like [`_Sent`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_sent), [`_Open`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_open), [`_Click`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_click) or [`_Bounce`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_bounce).
4. The `Status` field is excellent for a quick check of your database quality. It is also nice to manage multiple records. Pull the selection of your subscribers with SQL Query, add a new status with [custom value](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-select/#custom-values) (for example, `'unsubscribed' AS Status`) and leverage Automation to export-transfer-import the Data Extension to All Subscribers.
5. This Data View, along with [`_EnterpriseAttribute`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_enterpriseattribute), [`_BusinessUnitUnsubscribes`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_businessunitunsubscribes) and [`_ListSubscribers`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_listsubscribers), does not have six-month data retention.

---

### \_EnterpriseAttribute

Stores information about your Profile and Preference Attributes from Email Studio.

**Fields**

| Name           | Description                                                                                                            | Data Type | Nullable |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| \_SubscriberID | The subscriber ID for the affected subscriber. This number represents the unique ID for each subscriber record stored. | Number    |          |

**SQL Query**

```sql
SELECT
      ea._SubscriberID                     AS SubscriberID
    , ea.ProfileAttributeWithoutSpaces
    , ea.[Profile Attribute With Spaces]   AS ProfileAttributeWithSpace
    , ea.PreferenceAttributeWithoutSpaces
    , ea.[Preference Attribute With Spaces]   AS PreferenceAttributeWithSpace
FROM _EnterpriseAttribute AS ea
```

When working with `_EnterpriseAttribute` Data View:

1. If you are using the query in the child Business Unit, always use `ENT.` prefix as it is enterprise-level only Data View.
2. When querying or joining `_EnterpriseAttribute`, always include the underscore before SubscriberID - this is the only Data View that requires it.
3. Despite the `Email Address` field is visible in the Salesforce MCE UI when you go to Profile Attributes, it is not part of the `_EnterpriseAttribute` Data View. To get the Email Address of your Subscriber, query the `_Subscribers` Data View.
4. Unfortunately, the default Preference Attribute `HTML Email` is not accessible via query.
5. `_EnterpriseAttribute` Data View is unique, as it might contain spaces in field names. You build it by creating the Profile Attributes in Email Studio. If your profile attribute name contains space, you will have to use the square bracket notation to capture it: `SELECT [Attribute With Spaces] FROM _EnterpriseAttribute`.
6. This Data View, along with [`_Subscribers`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_subscribers), [`_BusinessUnitUnsubscribes`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_businessunitunsubscribes) and [`_ListSubscribers`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_listsubscribers) , does not have six-month data retention.

---

## Email Data Views

### \_Job

Stores information about your Email Sends Jobs. Great for capturing detailed data about your communication, especially when paired with Send Log. Must-have for extending your engagement-based Email Data Views.

**Fields**

| Name                            | Description                                                                         | Data Type | Nullable |
| ------------------------------- | ----------------------------------------------------------------------------------- | --------- | -------- |
| JobID                           | The job ID number for the email send                                                | Number    |          |
| EmailID                         | The email ID for the job                                                            | Number    | X        |
| AccountID                       | The ID number for the account that performed the job                                | Number    | X        |
| AccountUserID                   | The ID number for the account user that performed the job                           | Number    | X        |
| FromName                        | The from name in the email send                                                     | Text      | X        |
| FromEmail                       | The from email address in the email send                                            | Email     | X        |
| SchedTime                       | The time the job was scheduled                                                      | Date      | X        |
| PickupTime                      | The time the MCE application started the job                                        | Date      | X        |
| DeliveredTime                   | The time the email was delivered                                                    | Date      | X        |
| EventID                         | The ID for the job event                                                            | Text      | X        |
| IsMultipart                     | Whether the job was sent as multi-part MIME or not                                  | Boolean   |          |
| JobType                         | The type of job                                                                     | Text      | X        |
| JobStatus                       | The status of the job                                                               | Text      | X        |
| ModifiedBy                      | If modified, the user who modified the job                                          | Number    | X        |
| ModifiedDate                    | The date the job was modified                                                       | Date      | X        |
| EmailName                       | The name of the email sent by the job                                               | Text      | X        |
| EmailSubject                    | The subject of the email send                                                       | Text      | X        |
| IsWrapped                       | Whether the links in the email were wrapped for tracking                            | Boolean   |          |
| TestEmailAddr                   | The test email address used in the job                                              | Email     | X        |
| Category                        | The job category                                                                    | Text      |          |
| BccEmail                        | Any email address send in the BCC field                                             | Email     | X        |
| OriginalSchedTime               | The initially scheduled time for the job                                            | Date      | X        |
| CreatedDate                     | The date the job was created                                                        | Date      |          |
| CharacterSet                    | The character set used in the job                                                   | Text      | X        |
| IPAddress                       | This value will always be a null value.                                             | Text      | X        |
| SalesForceTotalSubscriberCount  | The total number of Salesforce subscribers included in the job                      | Number    |          |
| SalesForceErrorSubscriberCount  | The total number of Salesforce subscribers included in the job that received errors | Number    |          |
| SendType                        | The type of send used in the job                                                    | Text      |          |
| DynamicEmailSubject             | The dynamic email subject included in the job                                       | Text      | X        |
| SuppressTracking                | If tracking information for this job was suppressed                                 | Boolean   |          |
| SendClassificationType          | The type of send classification for the job                                         | Text      | X        |
| SendClassification              | The custom name of send classification for the job                                  | Text      | X        |
| ResolveLinksWithCurrentData     | If the job resolved links with current data                                         | Boolean   |          |
| EmailSendDefinition             | The email send definition used in the job                                           | Text      | X        |
| DeduplicateByEmail              | Whether the email addresses in the job are used to deduplicate subscribers          | Boolean   |          |
| TriggererSendDefinitionObjectID | The object ID for the triggered send definition                                     | Number    | X        |
| TriggeredSendCustomerKey        | The customer key for the triggered send                                             | Text      | X        |

**Field Picklist Values**

`JobType` possible values:

- `null`
- MULTIPLE\_SEND

`JobStatus` possible values:

- Deleted
- New

`Category` possible values:

- Test Send Emails
- Triggered Sends
- Version XX (where XX is a number)
- GUID\_VXX (36 character hyphen separated GUID followed by underscore and VXX where XX is a number)

`CharacterSet` possible values:

- Unicode - UTF-8

`SendType` possible values:

- ExactTargetSend

`SendClassificationType` possible values:

- Default Commercial
- Default Transactional

---

**SQL Query**

```sql
SELECT
      job.JobID
    , job.EmailID
    , job.AccountID
    , job.AccountUserID
    , job.FromName
    , job.FromEmail
    , job.SchedTime
    , job.PickupTime
    , job.DeliveredTime
    , job.EventID
    , job.IsMultipart
    , job.JobType
    , job.JobStatus
    , job.ModifiedBy
    , job.ModifiedDate
    , job.EmailName
    , job.EmailSubject
    , job.IsWrapped
    , job.TestEmailAddr
    , job.Category
    , job.BccEmail
    , job.OriginalSchedTime
    , job.CreatedDate
    , job.CharacterSet
    , job.IPAddress
    , job.SalesForceTotalSubscriberCount
    , job.SalesForceErrorSubscriberCount
    , job.SendType
    , job.DynamicEmailSubject
    , job.SuppressTracking
    , job.SendClassificationType
    , job.SendClassification
    , job.ResolveLinksWithCurrentData
    , job.EmailSendDefinition
    , job.DeduplicateByEmail
    , job.TriggererSendDefinitionObjectID
    , job.TriggeredSendCustomerKey
FROM _Job AS job
```

When working with `_Job` Data View:

1. `JobID` field will be your bread and butter to [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) with other engagement-based Data Views.
2. `EmailName`, `FromName`, and `FromEmail` are handy data points missing in the [`_Sent`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_sent), [`_Open`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_open), [`_Click`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_click), [`_Bounce`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_bounce) Data Views and are worth checking for reporting needs.
3. If you are performing A/B tests or want to analyse the subject line's impact on performance, be sure to pick `EmailSubject`. Pair it with [`CASE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-case/#conditional-values-with-case) to create a great knowledge source for your content team.
4. For debugging purposes, be sure to check out `IsWrapped` and `SuppressTracking` - if you are missing tracking data, `CharacterSet` - if you have problems with formatting, `SendClassification` - if you have issues with unsubscribers or spam complaints.
5. `AccountUserID` field is fantastic for `_Job`-based Audit Log creation. Unfortunately, there is no UI-based easy way to determine which user has which UserID. You can either use SOAP API or match based on these SQL results.

> **Note: You Should Know**
>
> `_Job` Data View is unique among other Email-focused Data Views, as it shows data limited to a specific Business Unit. Your parent Business Unit has access to [`_Sent`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_sent), [`_Open`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_open), [`_Click`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_click) and other data from all Business Units, but this is not the case with `_Job`. You can query only those jobs that occurred in the Business Unit where you execute your SQL snippet.
>
> Always consider this when choosing Business Unit to execute the query and the type of [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) statement.

---

### \_Sent

Stores information about your Email Sends. Great for understanding who had a chance to receive your message and whose communication did not leave your system.

**Fields**

| Name                            | Description                                                                                                                      | Data Type | Nullable |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| AccountID                       | Your parent account ID (MID) number                                                                                              | Number    |          |
| OYBAccountID                    | The account ID (MID) number of the child Business Unit that owns the data. If queried on parent Business Unit, it will be `Null` | Number    | X        |
| JobID                           | The job ID number for the email send                                                                                             | Number    |          |
| ListID                          | The list ID number for the list used in the send                                                                                 | Number    |          |
| BatchID                         | The batch ID number for any batches used in the send                                                                             | Number    |          |
| SubscriberID                    | The subscriber ID for the affected subscriber. This number represents the unique ID for each subscriber record.                  | Number    |          |
| SubscriberKey                   | The subscriber key for the affected subscriber                                                                                   | Text      |          |
| EventDate                       | The date the send took place                                                                                                     | Date      |          |
| Domain                          | The domain at which the send occurred                                                                                            | Text      |          |
| TriggererSendDefinitionObjectID | The object ID for the triggered send definition                                                                                  | Text      | X        |
| TriggeredSendCustomerKey        | The customer key for the triggered send                                                                                          | Text      | X        |

**SQL Query**

```sql
SELECT
      sent.AccountID
    , sent.OYBAccountID
    , sent.JobID
    , sent.ListID
    , sent.BatchID
    , sent.SubscriberID
    , sent.SubscriberKey
    , sent.EventDate
    , sent.Domain
    , sent.TriggererSendDefinitionObjectID
    , sent.TriggeredSendCustomerKey
FROM _Sent AS sent
```

When working with `_Sent` Data View:

1. Use `JobID`, `ListID`, `BatchID` and `SubscriberId` or `SubscriberKey` to match various events from multiple Data Views like [`_Open`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_open), [`_Click`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_click), [`_Bounce`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_bounce) for a single engagement with a particular subscriber. Example: [Query for Debugging Email Sends](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/snippets/sql-debugging-email-sends/#solution).
2. The most valuable data here is the `EventDate` field that lets you know when the email was sent (and whether that happened at all).
3. If you have triggered a send for an email and after a few minutes you don't see it here, in most cases, it means that the send was blocked and never left MCE. Check [enhanced Send Log](https://mateuszdabrowski.pldocs/salesforce/marketing-cloud-engagement/config/enhanced-send-log/), applied personalisation, data source, `RaiseError` scripts.

---

### \_ReconcilableDispositionView

Stores infomation about your Email and SMS final delivery status for transactional sends.

- It's **reconcilable**, because using this feature allows you to reconcile (match) your transactional sends in MCE with the source system (e.g. e-commerce platform) based on the MessageKey and limit duplicate sends in case there is retriggering issue.
- It's **disposition view**, because it shows the final disposition (status) of your transactional messages - whether they were delivered, are still in queue or were not sent at all. Remember that delivered doesn't mean delivered to the main inbox. Spam placement technically is also successful delivery.

**Fields**

| Name             | Description                                                                                                     | Data Type | Nullable |
| ---------------- | --------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| JobId            | The job ID number for the email or SMS send                                                                     | Number    |          |
| Channel          | Identifies the channel of the send, either Email or SMS                                                         | Number    |          |
| Disposition      | Stores final delivery status for the transactional message                                                      | Number    |          |
| MessageKey       | Stores unique message key for the send                                                                          | Text      |          |
| SubscriberKey    | The subscriber key for the affected subscriber                                                                  | Text      |          |
| SubscriberID     | The subscriber ID for the affected subscriber. This number represents the unique ID for each subscriber record. | Number    | X        |
| ErrorCodeID      | The error code ID for the send                                                                                  | Number    | X        |
| ErrorName        | The error name for the send                                                                                     | Text      | X        |
| ErrorDescription | The error description for the send                                                                              | Text      | X        |
| StartTime        | The datetime of transactional message trigger                                                                   | Date      |          |

**Field Picklist Values**

`Channel` possible values:

- 0 (for Email channel)
- 1 (for SMS channel)

`Disposition` possible values:

- 0 (for Queued)
- 1 (for Sent)
- 2 (for NotSent)

---

**SQL Query**

```sql
SELECT
      delivery.JobId
    , delivery.Channel
    , delivery.Disposition
    , delivery.MessageKey
    , delivery.SubscriberKey
    , delivery.SubscriberID
    , delivery.ErrorCodeID
    , delivery.ErrorName
    , delivery.ErrorDescription
    , delivery.StartTime
FROM _ReconcilableDispositionView AS delivery
```

When working with `_ReconcilableDispositionView` Data View:

1. To leverage this Data View you first need to send **transactional** message using a Sendable Reconcilable Data Extension:
   - Create a new Data Extension, use `Create from Template` Creation Method and select `Sendable_Reconcilable_Data_Extension` template.
   - Add any additional fields you need for your transactional send.
   - Use this Data Extension as a sendable data source for your transactional sends.
   - Configure Transactional Reconciliation expiration window to wait between 1 and 72 hours for the final delivery status of your messages. Messages still in queue after that time will be expired and marked as NotSent.
   - Only after that you will be able to see this Data View and the delivery status of your transactional messages in it.
2. Alternatively just use Transactional Journey and set its Email/SMS to use Reconciliation to skip all that mess.
3. When triggering transactional message provide a MessageKey (up to 100 characters) along with other data to allow for matching with your transactional source system (e.g. e-commerce platform). Thanks to the reconciliation feature, even if source system triggers multiple messages with the same MessageKey, MCE will only process the first one protecting recipients from duplicate messaging. If you do not provide a MessageKey, MCE will generate the MessageKey for you.
4. Extend [Email and SMS Send Logs](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/enhanced-send-log/) with the MessageKey to simplify the process of matching transactional sends delivery status with various events from multiple Data Views like [`_Open`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_open), [`_Click`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_click), [`_Bounce`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_bounce).
5. The message will get Disposition `0` (Queued) when it is triggered and stay in this state until it is processed for delivery and left MCE (then it will get updated to `1` (Sent)) or if it was not sent at all or is still in queue after the expiration window (then it will get updated to `2` (NotSent)).
6. `ErrorCodeID`, `ErrorName`, and `ErrorDescription` will be populated only if `Disposition` is equal to `2` (NotSent). If your transactional messages are not being delivered, check these fields to understand why.
7. `StartTime` field allows you to track trigger time for transactional messages. For Data Extension sends, it will be the time when the job started. For API sends, it will be the time when the API call was received. It's fun data point to compare against [`_Sent`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_sent) `EventDate` to check the time it took for the message to be sent after the trigger.
8. `SubscriberID` field might be null if there are issues with the subscriber record.
9. Data retention for this Data View is only 7 days.

---

### \_Open

Stores information about your Email Opens. For when you need to know when someone opened your email. Kind of.

**Fields**

| Name                            | Description                                                                                                                      | Data Type | Nullable |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| AccountID                       | Your parent account ID (MID) number                                                                                              | Number    |          |
| OYBAccountID                    | The account ID (MID) number of the child Business Unit that owns the data. If queried on parent Business Unit, it will be `Null` | Number    | X        |
| JobID                           | The job ID number for the email send                                                                                             | Number    |          |
| ListID                          | The list ID number for the list used in the send                                                                                 | Number    |          |
| BatchID                         | The batch ID number for any batches used in the send                                                                             | Number    |          |
| SubscriberID                    | The subscriber ID for the affected subscriber. This number represents the unique ID for each subscriber record.                  | Number    |          |
| SubscriberKey                   | The subscriber key for the affected subscriber                                                                                   | Text      |          |
| EventDate                       | The date the open took place                                                                                                     | Date      |          |
| Domain                          | The domain at which the open occurred                                                                                            | Text      |          |
| IsUnique                        | Whether the event is unique or repeated                                                                                          | Boolean   | X        |
| TriggererSendDefinitionObjectID | The object ID for the triggered send definition                                                                                  | Text      | X        |
| TriggeredSendCustomerKey        | The customer key for the triggered send                                                                                          | Text      | X        |

**SQL Query**

```sql
SELECT
      opened.AccountID
    , opened.OYBAccountID
    , opened.JobID
    , opened.ListID
    , opened.BatchID
    , opened.SubscriberID
    , opened.SubscriberKey
    , opened.EventDate
    , opened.Domain
    , opened.IsUnique
    , opened.TriggererSendDefinitionObjectID
    , opened.TriggeredSendCustomerKey
FROM _Open AS opened
```

When working with `_Open` Data View:

1. Use `JobID`, `ListID`, `BatchID` and `SubscriberId` or `SubscriberKey` to match various events from multiple Data Views like [`_Sent`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_sent), [`_Click`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_click), [`_Bounce`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_bounce) for a single engagement with a particular subscriber. Example: [Query for Debugging Email Sends](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/snippets/sql-debugging-email-sends/#solution).
2. Use `_open.IsUnique = 1` in [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) or [`WHERE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-where/) to focus on the the first occurence of each event. Example: [Query for Debugging Email Sends](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/snippets/sql-debugging-email-sends/#solution).
3. The most valuable data here is the `EventDate` field that lets you know when the email was opened (and whether that happened at all). But with email opens, it's not that easy. In many cases, the lack of open data in this Data View doesn't mean that your recipient for sure did not open the email. And in some instances, tracked open might not mean he did.

> **Note: You Should Know**
>
> There is **no official engagement feedback loop** that informs MCE (or any other Marketing Automation Platform) that your recipient opened the email.
>
> All Marketing Automation Platforms put an **invisible 1px wide image in the email** body that is unique for every email you send. When someone opens an email, its images are downloaded from the server. MCE treats the download of this 1px wide image as proof that the recipient opened the email. And in most cases, it is correct. But...
>
> The **images don't always render** (that's why you should always use alt-text). Some recipients opt-in on a per-email basis to download email graphics. Government audiences might not even have this option. Because of the admin policy, the privacy concerns over engagement tracking or limited internet bandwidth. In such a case, even if the user opens an email, you won't have information about it.
>
> It might lead to weird data, like clicks visible for contacts that did not open. Marketing Automation Platforms track Clicks via a different, more confident approach.
>
> It can also lead to cases where a user has both click and open data, but click data is earlier than the open. Why? Your recipient clicked something in your email and only after that decided to allow his email program to load the images in it.
>
> There might be cases where the data is wrong the other way - when you see that email as opened, but in reality, the user didn't engage with it. It sometimes happens for B2B sends when your recipient's administrator uses bots that automatically check the emails for malicious or spammy content. You can recognise such things by checking the EventDate on `_Open` and `_Click` Data Views, as those bots will open the email and click all its links within a second. Something not possible for an actual human.

---

### \_Click

**Fields**

Stores information about your Email Clicks. Detailed click reporting and behavioural logic are possible, thanks to this one.

| Name                            | Description                                                                                                                      | Data Type | Nullable |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| AccountID                       | Your parent account ID (MID) number                                                                                              | Number    |          |
| OYBAccountID                    | The account ID (MID) number of the child Business Unit that owns the data. If queried on parent Business Unit, it will be `Null` | Number    | X        |
| JobID                           | The job ID number for the email send                                                                                             | Number    |          |
| ListID                          | The list ID number for the list used in the send                                                                                 | Number    |          |
| BatchID                         | The batch ID number for any batches used in the send                                                                             | Number    |          |
| SubscriberID                    | The subscriber ID for the affected subscriber. This number represents the unique ID for each subscriber record.                  | Number    |          |
| SubscriberKey                   | The subscriber key for the affected subscriber                                                                                   | Text      |          |
| EventDate                       | The date the click took place                                                                                                    | Date      |          |
| Domain                          | The domain at which the click occurred                                                                                           | Text      |          |
| URL                             | The URL for the link clicked. Dynamic elements are shown as code: `www.example.com?id=%%SubID%%`                                 | Text      | X        |
| LinkName                        | The link name assigned in the email send                                                                                         | Text      | X        |
| LinkContent                     | The link content assigned in the email send. Dynamic elements are shown as result: `www.example.com?id=12345`                    | Text      | X        |
| IsUnique                        | Whether the event is unique or repeated                                                                                          |           |          |
| TriggererSendDefinitionObjectID | The object ID for the triggered send definition                                                                                  | Text      | X        |
| TriggeredSendCustomerKey        | The customer key for the triggered send                                                                                          | Text      | X        |

**SQL Query**

```sql
SELECT
      click.AccountID
    , click.OYBAccountID
    , click.JobID
    , click.ListID
    , click.BatchID
    , click.SubscriberID
    , click.SubscriberKey
    , click.EventDate
    , click.Domain
    , click.URL
    , click.LinkName
    , click.LinkContent
    , click.IsUnique
    , click.TriggererSendDefinitionObjectID
    , click.TriggeredSendCustomerKey
FROM _Click AS click
```

When working with `_Click` Data View:

1. Use `JobID`, `ListID`, `BatchID` and `SubscriberId` or `SubscriberKey` to match various events from multiple Data Views like [`_Sent`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_sent), [`_Open`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_open), [`_Bounce`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_bounce) for a single engagement with a particular subscriber. Example: [Query for Debugging Email Sends](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/snippets/sql-debugging-email-sends/#solution).
2. Use `_click.IsUnique = 1` in [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) or [`WHERE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-where/) to focus on the first occurence of each event. Example: [Query for Debugging Email Sends](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/snippets/sql-debugging-email-sends/#solution).
3. The most valuable data here is the `EventDate` field that lets you know when the email was clicked (and whether that happened at all).
4. You can significantly improve the value of that information by checking the `LinkName` and `LinkContent` fields to understand which links proved interesting for your customers.
5. Suppose you want to create an extensive report on link clicks. In that case, you might want to use the `URL` field instead of `LinkContent` due to the former not showing final personalisation values. It will be much easier to group clicks or even cleanly delete all AMPScript from them.

> **Note: You Should Know**
>
> There might be cases where the click data is wrong - when you see that email as clicked, but in reality, the user didn't engage with it. It sometimes happens for B2B sends when your recipient's administrator uses bots that automatically check the emails for malicious or spammy content. You can recognise such things by checking the EventDate on `_Open` and `_Click` Data Views, as those bots will open the email and click all its links within a second. Something not possible for a actual human.

---

### \_Bounce

**Fields**

Stores information about your Email Bounces. Best place in MCE to understand why your messages are not getting delivered.

This Data View, along with [`_Complaint`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_complaint), should be monitored regularly to assess the health of your email marketing.

| Name                            | Description                                                                                                                                         | Data Type | Nullable |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| AccountID                       | Your parent account ID (MID) number                                                                                                                 | Number    |          |
| OYBAccountID                    | The account ID (MID) number of the child Business Unit that owns the data. If queried on parent Business Unit, it will be `Null`                    | Number    | X        |
| JobID                           | The job ID number for the email send                                                                                                                | Number    |          |
| ListID                          | The list ID number for the list used in the send                                                                                                    | Number    |          |
| BatchID                         | The batch ID number for any batches used in the send                                                                                                | Number    |          |
| SubscriberID                    | The subscriber ID for the affected subscriber                                                                                                       | Number    |          |
| SubscriberKey                   | The subscriber key for the affected subscriber                                                                                                      | Text      |          |
| EventDate                       | The date the bounce took place                                                                                                                      | Date      |          |
| IsUnique                        | Whether the event is unique or repeated - 1 for the first occurrence, 0 for subsequent                                                              | Boolean   |          |
| Domain                          | The domain at which the bounce occurred                                                                                                             | Text      |          |
| BounceCategoryID                | The ID number for the bounce category                                                                                                               | Number    |          |
| BounceCategory                  | The category of the bounce                                                                                                                          | Text      | X        |
| BounceSubcategoryID             | The ID number for the bounce subcategory                                                                                                            | Number    | X        |
| BounceSubcategory               | The subcategory of the bounce                                                                                                                       | Text      | X        |
| BounceTypeID                    | The ID number for the bounce type                                                                                                                   | Number    |          |
| BounceType                      | The type of bounce that occurred                                                                                                                    | Text      | X        |
| SMTPBounceReason                | The reason for the bounce relayed by the mail system                                                                                                | Text      | X        |
| SMTPMessage                     | The message regarding the bounce from the mail system                                                                                               | Text      | X        |
| SMTPCode                        | The error code for the bounce from the mail system                                                                                                  | Number    | X        |
| TriggererSendDefinitionObjectID | The object ID for the triggered send definition                                                                                                     | Text      | X        |
| TriggeredSendCustomerKey        | The customer key for the triggered send                                                                                                             | Text      | X        |
| IsFalseBounce                   | Indicates a false bounce if [MCE received delivery receipt after receiving bounce](https://help.salesforce.com/s/articleView?id=000390396\&type=1). | Boolean   | X        |

**Field Picklist Values**

`BounceCategoryID` possible values:

| Value | Meaning                |
| ----- | ---------------------- |
| 1     | Hard Bounce            |
| 2     | Soft Bounce            |
| 3     | Block Bounce           |
| 4     | Unknown Bounce         |
| 5     | Technical/Other Bounce |

`BounceCategory` possible values:

- Hard Bounce
- Soft Bounce
- Block Bounce
- Unknown Bounce
- Technical/Other Bounce

`BounceSubcategoryID` possible values:

| Value | Meaning            | Bounce Type                                                                    |
| ----- | ------------------ | ------------------------------------------------------------------------------ |
| 1001  | Complaints         | Block Bounce                                                                   |
| 1002  | Blocked            | Block Bounce                                                                   |
| 1004  | Content            | Block Bounce                                                                   |
| 1010  | Authentication     | Block Bounce                                                                   |
| 1999  | Other              | Soft Bounce, Block Bounce                                                      |
| 2001  | User Unknown       | Hard Bounce                                                                    |
| 2002  | Domain Unknown     | Hard Bounce                                                                    |
| 2003  | Bad Address Syntax | Hard Bounce                                                                    |
| 3001  | Mailbox Full       | Soft Bounce                                                                    |
| 3002  | Inactive Account   | Hard Bounce, Soft Bounce                                                       |
| 4001  | Server Too Busy    | Technical/Other Bounce                                                         |
| 4002  | Data Format Error  | Technical/Other Bounce                                                         |
| 4003  | Network Error      | Technical/Other Bounce                                                         |
| 4999  | Other              | Hard Bounce, Soft Bounce, Technical/Other Bounce                               |
| 9999  | Unknown            | Hard Bounce, Soft Bounce, Block Bounce, Unknown Bounce, Technical/Other Bounce |

`BounceSubcategory` possible values:

- Complaints
- Blocked
- Content
- Authentication
- User Unknown
- Domain Unknown
- Bad Address Syntax
- Mailbox Full
- Inactive Account
- Server Too Busy
- Data Format Error
- Network Error
- Other
- Unknown

`BounceTypeId` possible values:

| Value | Meaning   |
| ----- | --------- |
| 0     | immediate |
| 1     | delayed   |

`BounceType` possible values:

- immediate
- delayed

---

**SQL Query**

```sql
SELECT
      bounce.AccountID
    , bounce.OYBAccountID
    , bounce.JobID
    , bounce.ListID
    , bounce.BatchID
    , bounce.SubscriberID
    , bounce.SubscriberKey
    , bounce.EventDate
    , bounce.IsUnique
    , bounce.Domain
    , bounce.BounceCategoryID
    , bounce.BounceCategory
    , bounce.BounceSubcategoryID
    , bounce.BounceSubcategory
    , bounce.BounceTypeID
    , bounce.BounceType
    , bounce.SMTPBounceReason
    , bounce.SMTPMessage
    , bounce.SMTPCode
    , bounce.TriggererSendDefinitionObjectID
    , bounce.TriggeredSendCustomerKey
FROM _Bounce AS bounce
```

When working with `_Bounce` Data View:

1. Use `JobID`, `ListID`, `BatchID` and `SubscriberId` or `SubscriberKey` to match various events from multiple Data Views like [`_Sent`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_sent), [`_Open`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_open), [`_Click`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_click) for a single engagement with a particular subscriber. Example: [Query for Debugging Email Sends](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/snippets/sql-debugging-email-sends/#solution).
2. Use `_bounce.IsUnique = 1` in [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) or [`WHERE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-where/) to focus on the first occurence of each event. Example: [Query for Debugging Email Sends](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/snippets/sql-debugging-email-sends/#solution).
3. The `Domain` helps aggregate the bounce data to see any domain-specific problem with deliverability.
4. `SMTPBounceReason` is the most helpful information when you want to understand what happened to your send. Be careful - this value can be configured to a custom string by the server owner. Some administrators are using this to inform you about a specific issue. Some are even faking the information to limit the emails coming to their servers from selected sources.
5. `SMTPCode` is useful for getting additional data on the Bounce Reason. Watch especially for 541 and 554. In most cases, it means you are considered a spammer by the server or already blocklisted. I recommend you to create an Automation with Verification Activity to get an automated warning whenever there are more than a few occurrences. Triage immediately.
6. If you get errors when trying to select `IsFalseBounce` - it might be missing on the MCE backend. Create a Support Ticket to resolve it.

> **Note: You Should Know**
>
> `SMTPBounceReason` field is `nvarchar(max)` SQL type, and due to that might be longer than the 4000 characters limit for the Data Extension string length in Salesforce MCE. If you want to save this data outside of Data View, be sure to use [`LEFT(SMTPBounceReason, 4000)`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-string-functions/#left--right).

### \_Complaint

`_Complaint` Data View stores Email Service Providers Feedback Loop (FBL) data. It means that if someone clicks the `Report Spam` button for your email and there is FBL in place, this information will be added to the Data View. It will also result in an unsubscribe event and be visible in the [`_Unsubscribe`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_unsubscribe).

Currently, Salesforce MCE [supports Feedback Loops](https://help.salesforce.com/s/articleView?id=000353531\&type=1) for Bluetie (Excite), Comcast, Cox, Fastmail, Microsoft Hotmail, Italia Online, La Poste, Liberty Global, Locaweb, Mail.ru, OpenSRS (Tucows), Rackspace (Mailtrust), Seznam, Synacor, Telenor, Telstra, Terra, UOL (Brazil), USA.net, XS4ALL and Yandex.

You can additionally [register for the Yahoo Feedback Loop](https://help.salesforce.com/s/articleView?id=000312472\&type=1). Gmail also has a [Feedback Loop system](https://help.salesforce.com/s/articleView?id=000353530\&type=1), but it works differently and won't be in `_Complaint` Data View.

This Data View, along with [`_Bounce`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_bounce), should be monitored regularly to assess the health of your email marketing.

**Fields**

| Name          | Description                                                                                                                      | Data Type | Nullable |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| AccountID     | Your parent account ID (MID) number                                                                                              | Number    |          |
| OYBAccountID  | The account ID (MID) number of the child Business Unit that owns the data. If queried on parent Business Unit, it will be `Null` | Number    | X        |
| JobID         | The job ID number for the email send                                                                                             | Number    |          |
| ListID        | The list ID number for the list used in the send                                                                                 | Number    |          |
| BatchID       | The batch ID number for any batches used in the send                                                                             | Number    |          |
| SubscriberID  | The subscriber ID for the affected subscriber                                                                                    | Number    |          |
| SubscriberKey | The subscriber key for the affected subscriber                                                                                   | Text      |          |
| EventDate     | The date the send took place                                                                                                     | Date      |          |
| IsUnique      | Whether the event is unique or repeated - 1 for the first occurrence, 0 for subsequent                                           | Boolean   |          |
| Domain        | The domain at which the send occurred                                                                                            | Text      |          |

**SQL Query**

```sql
SELECT
      complaint.AccountID
    , complaint.OYBAccountID
    , complaint.JobID
    , complaint.ListID
    , complaint.BatchID
    , complaint.SubscriberID
    , complaint.SubscriberKey
    , complaint.EventDate
    , complaint.IsUnique
    , complaint.Domain
FROM _Complaint AS complaint
```

When working with `_Complaint` Data View:

1. Use `JobID`, `ListID`, `BatchID` and `SubscriberId` or `SubscriberKey` to match various events from multiple Data Views like [`_Sent`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_sent), [`_Open`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_open), [`_Click`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_click) for a single engagement with a particular subscriber.
2. Use `_complaint.IsUnique = 1` in [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) or [`WHERE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-where/) to focus on the first occurence of each event.
3. The `Domain` helps aggregate the Complaint data to see any domain-specific problem with targeting your communication.

---

## Subscription Data Views

Subscription management in Salesforce MCE is complex. Very complex.

It starts with four levels of unsubscriptions:

1. List unsubscribe = no more sends from a particular list or publication list.
2. Business Unit unsubscribe = no more sends from a particular business unit.
3. Master unsubscribe = no more sends from your MCE.
4. Global unsubscribe = no more sends from MCE. Any, globally.

And it gets even more interesting when you consider that triggering specific unsubscription level depends on email configuration, Email Studio configuration, preference center configuration and subscriber's behaviour.

Oh, and there is no out-of-the-box unsubscription from Data Extensions, which are currently the most popular segmentation and targeting tool.

To give us at least a chance to make sense of that mess, Salesforce created multiple System Data Views related to (un)subscriptions.

> **Note: You Should Know**
>
> Spam Complaint and List-Unsubscribe Header are pretty particular unsubscription use cases. They are added to [`_Unsubscribe`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_unsubscribe) and [`_BusinessUnitUnsubscribe`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_businessunitunsubscribes) as unsubscriptions from a list used in send (for example, ID of Publication List selected for the send). In reality, MCE will perform automatic unsubscribe from the All Subscriber list (depending on Email Studio settings - Child BU's or Enterprise one), not the list mentioned in `ListID`.
>
> As a result, when querying, you will see the list-specific unsubscribe that doesn't result in unsubscription from the list but instead blocks all commercial communication as a Business Unit or Master unsubscribe.
>
> Custom solution (Automation with Query and Script Activities) will be necessary to perform the list-specific unsubscribe.

### \_Unsubscribe

`_Unsubscribe` Data View stores data about unsubscribe events. The wording here is crucial, as it explains the difference from [`_Subscribers`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_subscribers) Data View unsubsrciption counts.

In `_Subscribers`, you can check what is the **current subscription status** for the All Subscribers list. In `_Unsubscribe`, you see the **unsubscription events** happening from List-Unsubscribe Header, `LogUnsubEvent` API call, Reply Mail Management responses, Complaints and out-of-the-box Preference Center - all linked to a specific [`_Job`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_job). It is also not limited to All Subscribers but also covers unsubscribes from other types of lists.

It means that status changes like Import Activity, direct API change, manual change in the Email Studio (not Job-specific) will be reflected in the `_Subscribers` Data View, but not in the `_Unsubscribe`. On the other hand, `UnsubEvents` does not necessarily change the Status in the `_Subscribers`. For example, taking care of List-Unsubscribe Header clicks require dedicated Automation to get this data from `_Unsubscribe` Data View and push it to other parts of your consent data model.

This Data View stores data only for six-months, so retention-less `_Subscribers` Data View might show more unsubscribed records if you are not cleaning them from MCE regularly.

All of this makes `_Unsubscribe` a much better source of knowledge about unsubscription.

**Fields**

| Name          | Description                                                                                                                      | Data Type | Nullable |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| AccountID     | Your account ID number                                                                                                           | Number    |          |
| OYBAccountID  | The account ID (MID) number of the child Business Unit that owns the data. If queried on parent Business Unit, it will be `Null` | Number    | X        |
| JobID         | The job ID number for the email send                                                                                             | Number    |          |
| ListID        | The list ID number for the list used in the send                                                                                 | Number    |          |
| BatchID       | The batch ID number for any batches used in the send                                                                             | Number    |          |
| SubscriberID  | The subscriber ID for the affected subscriber                                                                                    | Number    |          |
| SubscriberKey | The subscriber key for the affected subscriber                                                                                   | Text      |          |
| EventDate     | The date the unsubscribe took place                                                                                              | Date      |          |
| IsUnique      | Whether the event is unique or repeated - 1 for the first occurrence, 0 for subsequent                                           | Boolean   |          |
| Domain        | The domain at which the unsubscribe occurred                                                                                     | Text      |          |

**SQL Query**

```sql
SELECT
      unsub.AccountID
    , unsub.OYBAccountID
    , unsub.JobID
    , unsub.ListID
    , unsub.BatchID
    , unsub.SubscriberID
    , unsub.SubscriberKey
    , unsub.EventDate
    , unsub.IsUnique
    , unsub.Domain
FROM _Unsubscribe AS unsub
```

When working with `_Unsubscribe` Data View:

1. Use `JobID`, `ListID`, `BatchID` and `SubscriberId` or `SubscriberKey` to match various events from multiple Data Views like [`_Job`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_job) and [`_Subscribers`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_subscribers) to check unsubscription context.
2. Use `_unsubscribe.IsUnique = 1` in [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) or [`WHERE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-where/) to focus on the first occurence of each event.
3. If you query this Data View on the child Business Unit, it will return only unsubscribe events from that specific BU.
4. The most valuable data here are:
   - `EventDate` field that lets you know when the unsubscription happened
   - `ListID` field that tells you which list is impacted by the unsubscription

> **Note: You Should Know**
>
> If the subscriber clicks "Unsubscribe from All" on the out-of-the-box unsubscription center, it will perform Master Unsubscribe from all Lists. As it is a single event, it will be stored as a single record in the `_Unsubscribe` Data View with random ListID assigned to it. For a complete picture, you will need to check [`_ListSubscribers`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_listsubscribers) Data View.

---

### \_BusinessUnitUnsubscribes

[`_Subscribers`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_subscribers) Data View might give you information about the current state of subscriptions on the All Subscribers list. But if in Email Studio you configure Business Unit Level unsubscribes, this information will not be helpful, as the data stored there will not reflect the subscription status in a specific Business Unit.

Here comes the fresh `_BusinessUnitUnsubscribes` Data View. It shows you the only unsubscribed contacts for each Business Unit. If the contact resubscribes - it will disappear from this Data View.

`_BusinessUnitUnsubscribes` Data View will work differently depending on your MCE [unsubscription configuration](https://help.salesforce.com/s/articleView?id=sf.mc_es_unsubscribe_settings.htm\&type=5). You will be able to query it from the Child BU level only for Business Units set to "unsubscribe from this business unit only".

**Fields**

| Name           | Description                                                           | Data Type | Nullable |
| -------------- | --------------------------------------------------------------------- | --------- | -------- |
| BusinessUnitID | The Account ID for the Business Unit                                  | Number    |          |
| SubscriberID   | The subscriber ID for the affected subscriber                         | Number    |          |
| SubscriberKey  | The subscriber key for the affected subscriber                        | Text      |          |
| UnsubDateUTC   | The date the subscriber unsubscribed on the BU.                       | Date      | X        |
| UnsubReason    | The reason listed is a custom value configured by your administrator. | Text      | X        |

**Field Picklist Values**

`UnsubReason` possible values:

- Spam Complaint
- Unsubscribed from list details on subscriber properties dialog.
- Unsubscribed by Salesforce MCE RMM service based on subscriber Leave/Reply email.
- Unsubscribed by subscriber edit API call.
- Unsubscribed from the Subscription Center
- Unsubscribed via Import

---

**SQL Query**

```sql
SELECT
      buUnsub.BusinessUnitID
    , buUnsub.SubscriberID
    , buUnsub.SubscriberKey
    , buUnsub.UnsubDateUTC
    , buUnsub.UnsubReason
FROM _BusinessUnitUnsubscribes AS buUnsub
```

When working with `_BusinessUnitUnsubscribes` Data View:

1. Remember that it stores only currently unsubscribed contacts. Not unsubscribe event data (that's in [`_Unsubscribe`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_unsubscribe)) and not other statuses (like bounced, held). It will also not show unsubscribed users after they resubscribed or got deleted.
2. `SubscriberID` or `SubscriberKey` along with `UnsubDateUTC` might fuzzy match the data in this data view with [`_Unsubscribe`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_unsubscribe).
3. `UnsubDateUTC`, as name suggests, is in UTC instead of the MCE-standard UTC-6. Remember to use [`DATEADD`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-date-functions/#dateadd) to normalize it before comparing to other system dates.
4. The real treat in this data view (apart from finally having an easy option to see Business Unit unsubscribes) is the `UnsubReason` field that can tell you more about the unsubscribe.
5. This Data View, along with [`_Subscribers`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_subscribers), [`_EnterpriseAttribute`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_enterpriseattribute) and [`_ListSubscribers`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_listsubscribers), does not have six-month data retention.

> **Note: You Should Know**
>
> `UnsubDateUTC` not only uses a different timezone from the rest of the system dates. It differs by a few milliseconds from [`_Unsubscribe`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_unsubscribe) `EventDate`. When querying (MCE doesn't show seconds for date fields), you won't see it, but the comparison is using the full datetime value.
>
> Because of it, you cannot match it out-of-the-box. [`DATEDIFF`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-date-functions/#datediff) is here to save the day:
>
> ```sql title="DATEDIFF will allow you to compare despite the difference"
> DATEDIFF(MINUTE, _Unsubscribe.EventDate, DATEADD(HOUR, -6, _BusinessUnitUnsubscribes.UnsubDateUTC)) < 1
> ```

---

### \_ListSubscribers

`_ListSubscribers` Data View stores data about the current status of the subscription. It might sound similar to [`_Subscribers`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_subscribers) and [`_BusinessUnitUnsubscribes`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_businessunitunsubscribes), but there are significant differences:

- `_Subscribers` has data about All Subscribers list only. `_ListSubscribers` shows status for all Lists available in Salesforce MCE.
- `_BusinessUnitUnsubscribes` has data about contacts unsubscribed from All Subscribers on every Business Unit. `_ListSubscribers` doesn't show Business Unit information, but it covers all Lists and all Statuses.

**Fields**

| Name             | Description                                                                                     | Data Type | Nullable |
| ---------------- | ----------------------------------------------------------------------------------------------- | --------- | -------- |
| AddedBy          | The ID of the user who ran the process that added the subscriber (might also be `0` or `-1000`) | Number    |          |
| AddMethod        | The method by which the subscriber was added                                                    | Text      |          |
| CreatedDate      | The date the subscriber was added to the specific list                                          | Date      | X        |
| DateUnsubscribed | The date the subscriber unsubscribed                                                            | Date      | X        |
| EmailAddress     | The subscriber's email address                                                                  | Text      | X        |
| ListID           | The list ID number for the list used in the send                                                | Number    | X        |
| ListName         | The name of the list containing the subscribers                                                 | Text      | X        |
| ListType         | Shows whether the type is list or group                                                         | Text      |          |
| Status           | The status of the subscriber                                                                    | Text      | X        |
| SubscriberID     | The subscriber ID for the affected subscriber                                                   | Number    |          |
| SubscriberKey    | The subscriber key for the affected subscriber                                                  | Text      |          |
| SubscriberType   | The type of subscriber (it will be `ExactTarget`)                                               | Text      | X        |

**Field Picklist Values**

`AddMethod` possible values:

- API
- Imported
- WebApplication
- DataExtensionSend
- Unknown

`ListType` possible values:

- Publication List
- Suppression List
- List
- Group
- FTAF List
- Unknown

`Status` possible values:

- active
- held
- unsubscribed
- bounced

---

**SQL Query**

```sql
SELECT
      listSub.AddedBy
    , listSub.AddMethod
    , listSub.CreatedDate
    , listSub.DateUnsubscribed
    , listSub.EmailAddress
    , listSub.ListID
    , listSub.ListName
    , listSub.ListType
    , listSub.Status
    , listSub.SubscriberID
    , listSub.SubscriberKey
    , listSub.SubscriberType
FROM _ListSubscribers AS listSub
```

When working with `_ListSubscribers` Data View:

1. Thanks to having `ListID`, `ListName` and `ListType` fields, it allows you to make sense of the `ListID` field available in all other engagement-based System Data Views.
2. This Data View, along with [`_Subscribers`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_subscribers), [`_EnterpriseAttribute`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_enterpriseattribute) and [`_BusinessUnitUnsubscribes`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_businessunitunsubscribes), does not have six-month data retention.
3. You can only query Lists available on the current Business Unit. It's not possible to check Child's List subscription status from the Parent BU. The exception is the All Subscribers list that is shared across all Business Units.

---

## Mobile Connect Data Views

Learn more about Mobile Connect [SMS Data Views here](https://mateuszdabrowski.pldocs/salesforce/marketing-cloud-engagement/config/mobile-connect-data-views/).

---

## Journey Data Views

### \_Journey

Stores information about your Journeys for when context matters.

**Fields**

| Name              | Description                                                                                         | Data Type | Nullable |
| ----------------- | --------------------------------------------------------------------------------------------------- | --------- | -------- |
| VersionID         | The unique identifier for the version of the Journey                                                | Text      |          |
| JourneyID         | The unique identifier for the Journey. There are one or more VersionID's associated to a JourneyID. | Text      |          |
| JourneyName       | The name of the Journey                                                                             | Text      |          |
| VersionNumber     | The version number of the version of the Journey                                                    | Number    |          |
| CreatedDate       | The date that the version of the Journey was created                                                | Date      |          |
| LastPublishedDate | The date that the version of the Journey was last published                                         | Date      | X        |
| ModifiedDate      | The date that the version of the Journey was last edited                                            | Date      |          |
| JourneyStatus     | The current running mode of the Journey                                                             | Text      |          |

**Field Picklist Values**

`JourneyStatus` possible values:

- Draft
- Running
- Finishing
- Stopped
- Deleted

---

**SQL Query**

```sql
SELECT
      journey.VersionID
    , journey.JourneyID
    , journey.JourneyName
    , journey.VersionNumber
    , journey.CreatedDate
    , journey.LastPublishedDate
    , journey.ModifiedDate
    , journey.JourneyStatus
FROM _Journey AS journey
```

When working with `_Journey` Data View:

1. `VersionID` field is perfect to [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) with [`_JourneyActivity`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_journeyactivity). It lets you map multi-channel engagement to a particular Journey (visible in `JourneyName`) and its specific version (as shown in `VersionNumber`).
2. You can also connect it to SMS channel using [\_SMSMessageTracking](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/mobile-connect-data-views/#_smsmessagetracking) Data View by making a [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) `ON journey.VersionID = smsTracking.JBDefinitionID`.
3. Use `JourneyStatus` to check what is the current Journey Status. It is fantastic for both the [`WHERE`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-where/) statement and a data point for engagement analysis. Think about scheduled Automation that finds all emails performing below expectations and checks which are in the Active Journeys. For all found, it sends you a notification to check and improve. For awful results, you can even use this data in Script Activity to automatically stop the Journey with the MCE REST API.
4. The Date fields (`CreatedDate`, `LastPublishedDate`, `ModifiedDate`) are cool for automated cleanup of old Journeys, especially when paired with the [`_Sent`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_sent) data. For example, you can create monthly Automation that checks all Journeys that were last modified at least three months ago and, based on the send volume or performance, stop them and notify you about that.
5. You can query only Journeys that currently exists in your Business Unit.

> **Note: You Should Know**
>
> `_Journey` Data View shows data limited to a specific Business Unit. Your parent Business Unit has access to [`_Sent`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_sent), [`_Open`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_open), [`_Click`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_click) and other data from all Business Units, but this is not the case with `_Journey`. You can query only those Journeys that were created in the Business Unit where you execute your SQL snippet.
>
> Always consider this when choosing Business Unit to execute the query and the type of [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) statement.

---

### \_JourneyActivity

Stores information about Activities available in your Journeys. Must-have for joining Email data with Journey data.

**Fields**

| Name                    | Description                                                                                                                     | Data Type | Nullable |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| VersionID               | The unique identifier for the version of the Journey                                                                            | Text      |          |
| ActivityID              | The unique identifier for the activity. There are one or more ActivityID's associated to a VersionID.                           | Text      |          |
| ActivityName            | The name of the activity                                                                                                        | Text      | X        |
| ActivityExternalKey     | The external key associated with the activity                                                                                   | Text      |          |
| JourneyActivityObjectID | Use this unique identifier to join to email tracking system Data Views to identify a Journey email's Triggered Send Definition. | Text      | X        |
| ActivityType            | The type of activity                                                                                                            | Text      | X        |

**Field Picklist Values**

`ActivityType` possible values:

- `null`
- APIEvent
- Audience
- AutomationAudience
- CloudPagesSmartCaptureSubmissionEvent
- ContactEvent
- EMAILAUDIENCE
- EMAILV2
- ENGAGEMENTDECISION
- Event
- ExitCriteria
- MULTICRITERIADECISION
- NOOP
- PUSHNOTIFICATIONACTIVITY
- RANDOMSPLIT
- SENDTOLINESYNC
- StartActivity
- STOWAIT
- transactional-api
- UPDATECONTACTDATA
- WAIT

---

**SQL Query**

```sql
SELECT
      journeyActivity.VersionID
    , journeyActivity.ActivityID
    , journeyActivity.ActivityName
    , journeyActivity.ActivityExternalKey
    , journeyActivity.JourneyActivityObjectID
    , journeyActivity.ActivityType
FROM _JourneyActivity AS journeyActivity
```

When working with `_JourneyActivity` Data View:

1. There are two key fields here: `VersionID` and `JourneyActivityObjectID`. `JourneyActivityObjectID` lets you match Journey Activity with specific Email Send. Use `TriggererSendDefinitionObjectID` available on either [`_Job`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_job), [`_Sent`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_sent), [`_Open`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_open), [`_Click` ](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_click) or [`_Bounce`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_bounce) Data View. It is handy when you later use the `VersionID` field to [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) [`_Journey`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_journey) Data View and with this connect specific Email engagement with particular Journey and its exact version. Fantastic for full scope reporting.
2. You can also connect it to SMS channel using [\_SMSMessageTracking](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/mobile-connect-data-views/#_smsmessagetracking) Data View by making a [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) `ON journeyActivity.ActivityID = smsTracking.JBActivityID`.
3. With the help of [`_Journey`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_journey) Data View, you can use the `ActivityType` field for an excellent little report created with SQL that will show which Journeys use which channels and what types of logic. For a more in-depth understanding of what happens in Journey, you need to use Script Activity with REST API instead, but SQL is perfect for glancing at the multi-channel use.
4. `_JourneyActivity` Data View holds data about activities from deleted Journeys and Journey Versions, so if you want to see only activities currently in use, [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) [`_Journey`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_journey) Data View.

> **Note: You Should Know**
>
> `_JourneyActivity` Data View shows data limited to a specific Business Unit. Your parent Business Unit has access to [`_Sent`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_sent), [`_Open`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_open), [`_Click`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_click) and other data from all Business Units, but this is not the case with `_JourneyActivity`. You can query only those Journey Activities that were created in the Business Unit where you execute your SQL snippet.
>
> Always consider this when choosing Business Unit to execute the query and the type of [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) statement.

---

## Automation Data Views

### \_AutomationInstance

Provides historical information about Automation runs.

**Fields**

| Name                                      | Description                                                                                                                                           | Data Type | Nullable |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| MemberID                                  | The Account ID for the Business Unit                                                                                                                  | Number    |          |
| AutomationName                            | The name of the automation                                                                                                                            | Text      |          |
| AutomationDescription                     | The description of the automation                                                                                                                     | Text      | X        |
| AutomationCustomerKey                     | The unique ID of the automation                                                                                                                       | Text      |          |
| AutomationInstanceID                      | The unique ID of the specific automation run                                                                                                          | Text      |          |
| AutomationType                            | The type of starting source used in automation                                                                                                        | Text      |          |
| AutomationNotificationRecipient\_Complete | Email(s) receiving notification about completed runs                                                                                                  | Text      | X        |
| AutomationNotificationRecipient\_Error    | Email(s) receiving notification about errored runs                                                                                                    | Text      | X        |
| AutomationNotificationRecipient\_Skip     | Email(s) receiving notification about skipped runs                                                                                                    | Text      | X        |
| AutomationStepCount                       | The number of steps in the automation                                                                                                                 | Number    |          |
| AutomationInstanceIsRunOnce               | Was this specific automation run executed with Run Once? 1 for true, 0 for false in File Drop and Triggered automations. Null in Schedule automations | Boolean   |          |
| FilenameFromTrigger                       | Name of the file that triggered the automation for Triggered and File Drop automations. Null for Schedule automations                                 | Text      | X        |
| AutomationInstanceScheduledTime\_UTC      | Starting schedule datetime in UTC timezone for Schedule automations. Null for Triggered and File Drop automation                                      | Date      | X        |
| AutomationInstanceStartTime\_UTC          | Automation run start datetime in UTC timezone. Null if run is skipped                                                                                 | Date      | X        |
| AutomationInstanceEndTime\_UTC            | Automation run end datetime in UTC timezone. Null if run is skipped or still running                                                                  | Date      | X        |
| AutomationInstanceStatus                  | The status of the automation run at the time of querying                                                                                              | Text      |          |
| AutomationInstanceActivityErrorDetails    | The first error message encountered in the automation run                                                                                             | Text      | X        |

**Field Picklist Values**

`AutomationType` possible values:

- Schedule
- File Drop
- Trigger

`AutomationInstanceStatus` possible values:

- QueuedFile
- Initialized
- Executing
- Stopped
- Complete
- Error

---

**SQL Query**

```sql
SELECT
      automation.MemberID
    , automation.AutomationName
    , automation.AutomationDescription
    , automation.AutomationCustomerKey
    , automation.AutomationInstanceID
    , automation.AutomationType
    , automation.AutomationNotificationRecipient_Complete
    , automation.AutomationNotificationRecipient_Error
    , automation.AutomationNotificationRecipient_Skip
    , automation.AutomationStepCount
    , automation.AutomationInstanceIsRunOnce
    , automation.FilenameFromTrigger
    , automation.AutomationInstanceScheduledTime_UTC
    , automation.AutomationInstanceStartTime_UTC
    , automation.AutomationInstanceEndTime_UTC
    , automation.AutomationInstanceStatus
    , automation.AutomationInstanceActivityErrorDetails
FROM _AutomationInstance AS automation
```

When working with `_AutomationInstance` Data View:

1. This data view stores all Automation **runs**, so you will see here separte row for each execution of the Automation. This is great basic audit tool for logging changes to the automation as well as a nice way to counting the amount of automation executions against licence limits.
2. Since Winter '25 Release `_AutomationActivityInstance` no longer shows data with 24 hours delay. Now all information is available in real-time.
3. If automation run errored out due to system or unclassified error, `AutomationInstanceActivityErrorDetails` will show "System Error occurred. Please contact support for details.". In other cases it will store the first error message. If there are more and you want to find them, you will need to leverage [`_AutomationActivityInstance`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_automationactivityinstance) Data View.
4. All date fields in this data view are UTC based (unlike most other Data Views) so when manipulating them with [SQL Date Functions](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-date-functions/) it might be best to use [`GETUTCDATE()`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-date-functions/#getdate--getutcdate) instead of system date from [`GETDATE()`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-date-functions/#getdate--getutcdate).
5. `AutomationInstanceID` field is perfect to [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) with [`_AutomationActivityInstance`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_automationactivityinstance). It lets you find information about execution of each activity within the Automation in the specific run.

> **Note: You Should Know**
>
> `_AutomationInstance` Data View shows data limited to a specific Business Unit. Your parent Business Unit has access to [`_Sent`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_sent), [`_Open`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_open), [`_Click`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_click) and other data from all Business Units, but this is not the case with `_AutomationInstance`. You can query only those Automtion runs that were executed in the Business Unit where you execute your SQL snippet.
>
> Always consider this when choosing Business Unit to execute the query and the type of [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) statement.

### \_AutomationActivityInstance

Provides historical information about Automation Studio Activity runs.

**Fields**

| Name                           | Description                                                                              | Data Type | Nullable |
| ------------------------------ | ---------------------------------------------------------------------------------------- | --------- | -------- |
| MemberID                       | The Account ID for the Business Unit                                                     | Number    |          |
| JobID                          | The job ID number for the email send                                                     | Number    |          |
| AutomationName                 | The name of the automation                                                               | Text      |          |
| AutomationCustomerKey          | The unique ID of the automation                                                          | Text      |          |
| AutomationInstanceID           | The unique ID of the specific automation run                                             | Text      |          |
| ActivityCustomerKey            | The unique ID of the activity                                                            | Text      |          |
| ActivityInstanceID             | The unique ID of the specific activity execution                                         | Text      |          |
| ActivityType                   | The type of the activity (numeric ID)                                                    | Number    |          |
| ActivityName                   | The name of the activity                                                                 | Text      |          |
| ActivityDescription            | The description of the activity                                                          | Text      | X        |
| ActivityInstanceStep           | The two-dimensional description where in automation the activity is located              | Text      |          |
| ActivityInstanceStartTime\_UTC | Activity execution start datetime in UTC timezone. Null if run is skipped                | Date      | X        |
| ActivityInstanceEndTime\_UTC   | Activity execution end datetime in UTC timezone. Null if run is skipped or still running | Date      | X        |
| ActivityInstanceStatus         | The status of the activity run at the time of querying                                   | Text      |          |
| ActivityInstanceStatusDetails  | The error message encountered in the activity execution                                  | Text      | X        |

**Field Picklist Values**

`ActivityType` possible values:

| Value | Meaning                                        |
| ----- | ---------------------------------------------- |
| 33    | SMS Activity                                   |
| 42    | Send Email                                     |
| 43    | Import File                                    |
| 45    | Refresh Group                                  |
| 53    | File Transfer                                  |
| 73    | Data Extract                                   |
| 84    | Report Definition                              |
| 300   | SQL Query                                      |
| 303   | Filter                                         |
| 423   | Script                                         |
| 425   | Data Factory Utility Activity                  |
| 426   | Refresh Segment Template                       |
| 427   | Publish Audience                               |
| 467   | Wait                                           |
| 724   | Refresh Mobile Filtered List                   |
| 725   | Send SMS                                       |
| 726   | Import Mobile Contacts                         |
| 733   | Journey Builder Event Activity                 |
| 736   | Send Push                                      |
| 749   | Fire Event                                     |
| 771   | Salesforce Email Send                          |
| 772   | Mobile Connect Send Salesforce Sync Subscriber |
| 783   | Send GroupConnect                              |
| 1000  | Verification                                   |
| 1010  | Interaction Studio Data                        |
| 1101  | Interactions                                   |
| 1701  | Batch Personalization                          |
| 3700  | Contact to Business Unit Mapping               |

`ActivityInstanceStatus` possible values:

- Initialized
- Executing
- Complete
- Error
- NotSelected

---

**SQL Query**

```sql
SELECT
      automationActivity.MemberID
    , automationActivity.JobID
    , automationActivity.AutomationName
    , automationActivity.AutomationCustomerKey
    , automationActivity.AutomationInstanceID
    , automationActivity.ActivityCustomerKey
    , automationActivity.ActivityInstanceID
    , automationActivity.ActivityType
    , automationActivity.ActivityName
    , automationActivity.ActivityDescription
    , automationActivity.ActivityInstanceStep
    , automationActivity.ActivityInstanceStartTime_UTC
    , automationActivity.ActivityInstanceEndTime_UTC
    , automationActivity.ActivityInstanceStatus
    , automationActivity.ActivityInstanceStatusDetails
FROM _AutomationActivityInstance AS automationActivity
```

When working with `_AutomationActivityInstance` Data View:

1. This data view stores all Automation Activity **runs**, so you will see here separte row for each execution of each Activity. It is awesome tool for checking how optimised our Activities are and what errors are troubling our Automations.
2. Since Winter '25 Release `_AutomationActivityInstance` no longer shows data with 24 hours delay. Now all information is available in real-time.
3. If activity run errored out due to system or unclassified error, `ActivityInstanceStatusDetails` will show "System Error occurred. Please contact support for details.". In other cases it will store the error message.
4. All date fields in this data view are UTC based (unlike most other Data Views) so when manipulating them with [SQL Date Functions](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-date-functions/) it might be best to use [`GETUTCDATE()`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-date-functions/#getdate--getutcdate) instead of system date from [`GETDATE()`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-date-functions/#getdate--getutcdate).
5. The start and end dates in this data view can be leveraged with [`DATEDIFF`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-date-functions/#datediff) and [`AVG`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/#avg) to calculate average time needed for each activity to finish. This information is crucial to assess whether the current automation Schedule is correct and where the optimisation efforts are required to protect against 30 minutes autokill.
6. `AutomationInstanceID` field is perfect to [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) with [`_AutomationInstance`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_automationinstance). It lets you find information about the Automation using this Activity.
7. You can also leverage `JobID` field to [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) your email sending activities directly with [`_Job`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_job) and pull send-specific information from engagement Data Views.

> **Note: You Should Know**
>
> `_AutomationActivityInstance` Data View shows data limited to a specific Business Unit. Your parent Business Unit has access to [`_Sent`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_sent), [`_Open`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_open), [`_Click`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/system-data-views/#_click) and other data from all Business Units, but this is not the case with `_AutomationActivityInstance`. You can query only those Automation Activities that were created in the Business Unit where you execute your SQL snippet.
>
> Always consider this when choosing Business Unit to execute the query and the type of [`JOIN`](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-join/) statement.

---

## Custom Data Views

On top of all the built-in Data Views mentioned above, there is also a paid option for custom Data Views. As for the possibilities, the sky is the limit. Example? [Lukas Lunow](https://linkedin.com/in/lunow) [highlighted](https://salesforce.stackexchange.com/a/293395/91679) a fascinating one that solves the problem of knowing what is the current status of a Contact in a given Journey:

> **Note: You Should Know**
>
> As [shared](https://salesforce.stackexchange.com/a/293395/91679) by Lukas, since May 2021, there is longer no possibility to create Custom Data Views leveraging the Journey Builder.

| Name                 | Description                                                                                                                                          | Data Type | Nullable |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| JourneyVersionNumber | The version number of the version of the Journey                                                                                                     | Number    |          |
| JourneyName          | The name of the Journey                                                                                                                              | Text      |          |
| JourneyStatus        | Tells you whether the Journey is still Active                                                                                                        | Text      |          |
| ContactKey           | The subscriber key for the affected subscriber                                                                                                       | Text      |          |
| ContactID            | Global Contact ID (not Contact Key)                                                                                                                  | Number    |          |
| ContactStatus        | Tell you whether the contact is still in the Journey (`Active`, `Exited` or even more detailed like `DidNotMeetEntryCriteria`, `ContactExitedByAPI`) | Text      |          |
| EntryDate            | Date of Journey Entry                                                                                                                                | Date      |          |
| ExitDate             | Date of Journey Exit - including Goal / Exit Criteria. Null if still in Journey.                                                                     | Date      | x        |

Yes, you can create a workaround to know whether the Contact is in a given Journey using standard Data Extension and Update Contact Journey Activities at the beginning and end of every Journey. Not only it requires you to remember always to add those additional steps. It also blocks you from using Goals and Exit Criteria.

Custom Data View allow you to eat a cookie and have a cookie.

You can certainly come up with other use cases that could be solved if only you had one additional data point. Now you can.
