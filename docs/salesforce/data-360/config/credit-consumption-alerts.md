# Data 360 Credit Consumption Alerts

> Burn now, pay later. Data 360 warns you only after half of your credits are gone. Get alerted earlier, and against the month of your contract.

Source: https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/  
Author: Mateusz Dąbrowski  
Last updated: 2026-11-17  
Licence: CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)

## Data 360 Credit Consumption

**Data 360 (formerly Data Cloud) doesn't stop when your credits run out. It keeps processing and sends you the bill.**

Nearly everything in Data 360 (formerly Data Cloud) is consumption-based. Every data stream refresh, identity resolution run, Calculated Insight and segment publish burns credits from the pool you bought for the contract term, and that pool has no hard cap. Once you consume 100% of a card, Salesforce [keeps the platform running and bills you for the extra usage at the end of each month](https://help.salesforce.com/s/articleView?id=xcloud.wallet_consumption_alerts_manage.htm\&type=5), at the usage rate from your Order Form. Burn through the pool in month 9 of a 12-month contract, and every credit during the last quarter bills at that overage rate.

The monitoring is on you. Digital Wallet, the app that tracks every consumption-based product in your org (Data 360, Agentforce and more), gives you three ways to watch it: the Consumption Cards homepage with consumed and remaining credits per card, the Consumption Insights page with usage per day and resource, and the Consumption Threshold Alerts flow. The first two help only when someone remembers to look at them. The third one sends you alerts on its own, which makes it the strongest tool for the job.

Let's dive into it, threshold by threshold. First, what the flow does out of the box. Then lower the default thresholds, so the first alert arrives long before you burn half of your contract's credit pool. Finally, a custom flow that compares your consumption with a burn plan for your contract, month by month, and alerts you on the day you run ahead of it.

Both flows work for more than Data 360. They read every consumption card in Digital Wallet, so they can also watch Einstein Requests for Agentforce, Flex Credits, and the Salesforce Message Credits cards for Email, SMS, WhatsApp and Mobile App that Marketing Cloud Next (MCN) and [Marketing Cloud Engagement+](https://help.salesforce.com/s/articleView?id=mktg.mceplus_dw_message_credits.htm\&type=5) sends draw on.

> **Note: You Should Know**
>
> Digital Wallet is a monitoring tool, and your monthly statement stays the [source of truth for billing](https://help.salesforce.com/s/articleView?id=xcloud.wallet_faq_fundamentals.htm\&type=5). Usage refreshes every few hours under normal conditions, while new products and contract changes can take 24-48 hours to show up. Treat every alert below as an early warning, and check the statement for the numbers you report to finance.
>
> Running Data 360 on a Profiles or Enterprise Profiles licence? Digital Wallet doesn't show the profile count yet, which is the meter that licence bills on. Until it's added, count your billable profiles by hand: the known unified profiles plus 4% of the anonymous ones from each active ruleset's Identity Resolution Summary, plus every record in DLOs mapped to Profile DMOs outside your rulesets.

---

## Digital Wallet Consumption Threshold Alerts

**Salesforce ships a ready-made alert flow, but it does nothing until you activate it.**

The Consumption Threshold Alerts flow is a flow template built on two Digital Wallet actions. [Compute Consumption](https://help.salesforce.com/s/articleView?id=platform.flow_ref_elements_actions_wallet_compute_consumption.htm\&type=5) reads usage and entitlement for every consumption card in your org, and [Create Consumption Alert](https://help.salesforce.com/s/articleView?id=platform.flow_ref_elements_actions_wallet_create_consumption_alert.htm\&type=5) records an alert and notifies users when a card crosses a threshold. Neither action consumes credits, but the flow counts toward your org's flow limits. You need the Manage Flow permission to activate it, and View Consumption to open the Consumption Cards it reports on.

To activate it:

1. In Setup, go to **Flows** and click **New Flow**.
2. Search for the **Consumption Threshold Alerts** template and select it. Flow Builder opens it as a new, unsaved flow.
3. Follow the on-screen instructions, and set the recipients before you go further (see [Custom Alert Recipients](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#custom-alert-recipients)).
4. Click **Save**, then **Activate**.

Why the recipients first? By default, every user with the System Administrator profile gets the alerts. Before you activate the flow, make sure all your recipients know what the alert means and what to do when it arrives.

Your edits change only your flow, never the template, so you can always create a clean copy and start over. Digital Wallet Home has a shortcut to it too: **Set Up Consumption Alerts > Set Up** opens the template in Flow Builder, and **Save As New Flow** makes the copy.

It's best to activate it on the first day the org has a consumption card, not at go-live, because testing isn't free either. Sandbox usage consumes credits from the production org at a [discounted rate](https://help.salesforce.com/s/articleView?id=data.c360_a_data_cloud_sandbox_billing_considerations.htm\&type=5) (80% of the production rates on the [Data Services](https://www.salesforce.com/data/rates/multipliers/) or [Flex Credits](https://www.salesforce.com/agentforce/rates/) rate card), and test resources inside the production org bill at the full rate. Even simple per-record lookups may get extremely expensive if not configured correctly.

> **Note: You Should Know**
>
> You can open the Consumption Threshold Alerts flow in a sandbox, but you can't run it there. Digital Wallet actions aren't supported in sandboxes, where they fail with "This action can't be executed in a sandbox environment." A demo or developer org without consumption cards rejects them too, with an "Unsupported action type" error. You can test a flow's logic in those orgs, but the full flow runs only in production.
>
> Before activating, check **Setup > Process Automation Settings**. Salesforce's [setup steps](https://help.salesforce.com/s/articleView?id=xcloud.wallet_consumption_alerts_create.htm\&type=5) ask for a Default Workflow User that is active, has a verified email address and isn't the Integration User. While it is blank, Flow Builder warns on the flow's Start element.

### Default Consumption Alerts

Out of the box, the flow alerts every user with the System Administrator profile when a card crosses **50%, 70%, 80%, 85%, 90%, 95% and 100%** of its purchased entitlement. Each alert lands in the Salesforce notification bell and in their inbox. The user lookup behind it picks up inactive admins too, up to 1,000 users. What happens next depends on the threshold:

| Situation                                   | Behaviour                                                                                                                                                                                      |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Card crosses 50%, 70%, 80%, 85%, 90% or 95% | One notification. Nothing more until the card crosses the next threshold.                                                                                                                      |
| Card crosses two thresholds between runs    | One notification, for the higher threshold only. A jump from 45% to 72% sends the 70% alert, and the 50% one never comes.                                                                      |
| Pre-purchased card crosses 100%             | A daily email with the usage status, and a bill for the extra usage at the end of each month.                                                                                                  |
| You buy more credits                        | The consumed percentage drops, and [Help says](https://help.salesforce.com/s/articleView?id=xcloud.wallet_consumption_alerts_manage.htm\&type=5) thresholds you already passed can fire again. |
| Contract expires                            | No more alerts, as they fire only for cards with active entitlements.                                                                                                                          |

The flow checks once a day, at a fixed time, so an alert can arrive up to a day after the card crosses a threshold.

On every run, Compute Consumption reads every consumption card in the org, and with no cards, the flow ends. Otherwise it collects the System Administrators and loops over the cards. Each card gets its thresholds, and the flow keeps only the highest one the card has crossed. If the card has no equal or higher alert yet, or it is a pre-purchased card past 100%, Create Alert and Notify raises the alert and sends the notifications.

All thresholds share the same recipients, and 100% is where that matters most. After an overage, a pre-purchased card can stay at or above it until the next invoice. That means a new email every day, which everyone learns to ignore. Agree up front who acts on it, and route the alerts to that person with the steps in [Custom Alert Recipients](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#custom-alert-recipients).

Want the alerts in a team inbox? A mail rule can route them, as every email comes from `Salesforce Consumption Alerts <noreply@salesforce.com>` and its subject starts with `Consumption Alert:`, as in `Consumption Alert: 100% of Data Services Credits Consumed`. Its body lists the org ID and, for each card, the total, consumed and remaining credits with the contract start and end dates. The other ways to deliver an alert are in [Alert Notification Channels](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#alert-notification-channels).

The email lists totals per card and says nothing about what consumed them. To find the cause, click **View Consumption Insights by Tags** on the Digital Wallet home page, where reports built on [standard consumption tags](https://help.salesforce.com/s/articleView?id=xcloud.wallet_usage_tags_overview.htm\&type=5) show the agents, features and sources behind your consumption. To split it your own way, by department, cost centre or project, add [custom consumption tags](https://help.salesforce.com/s/articleView?id=xcloud.wallet_custom_tags_intro.htm\&type=5) when the org gets its first card, as they mark only the usage that comes after you tag a resource.

### Default Consumption Alert Gaps

The first alert arrives when half of your credits are gone. On a 12-month contract, that is good news in month 10 and a disaster in month 2, yet the flow sends the same email in both cases. It knows how much you consumed, never when you consumed it.

And it sends that email to every System Administrator, while the person who owns the Data 360 budget hears about it second-hand, if at all.

Both are fixable. Let me show you how ;)

---

## Customise Data 360 Credit Alerts

**Change when the alerts fire, who gets them and how they reach you. In minutes.**

In the diagrams below, green marks a step, outcome or connector you add, an orange dotted border a step you change, and a red dashed border a step you delete. The map next to each one shows where that part sits in the whole flow, with the threshold, recipient and email changes all in place.

### Lower Percentage Thresholds

With the first alert triggering at 50% of the credit budget, the levers left to lower the consumption might be the painful ones: switching off features you bought, or asking for more budget mid-year. If you get a notification at 20%, you can still review an identity resolution ruleset or a data stream schedule before it eats the year. Adding lower thresholds buys you that time, and gives you check-ins while most of your credits are still unused.

All percentage thresholds live in [one element of the flow](https://help.salesforce.com/s/articleView?id=xcloud.wallet_change_percentage_threshold_all_cards.htm\&type=5):

1. Open your Consumption Threshold Alerts flow and click the **Assign Thresholds** element.
2. In **Set Variable Values**, click **Add Assignment**.
3. Select `ThresholdValues` as the Variable, `Add` as the Operator, and enter the threshold as an integer (`10` for 10%).
4. Repeat for every threshold you need, then **Save**. **Activate** now, or after the last change you make.

To remove a threshold, use the trash icon at the end of its row. Keep `100`, even though it repeats daily on a pre-purchased card. No other alert tells you that a card went past its entitlement, so cut the noise by sending it to the right person with [Custom Alert Recipients](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#custom-alert-recipients).

Adding `10`, `20`, `30` and `40` to the defaults gives you an alert at every 10% up to the halfway point. Is four more emails per card too many? With a steady burn on a 12-month contract, they come roughly every five weeks in the first half of the year, which is about how often someone should look at consumption anyway.

These thresholds apply to every card with an entitlement, through the **Percentage Threshold** outcome of **Check Card Conditions**, so your Flex Credits and storage cards get them too. Cards without an entitlement take the default **Units Threshold** outcome instead, which sets the alert type to credits but assigns no thresholds. So those cards never alert until you add your own after **Assign Type (Units)**, the same way as in step 5 of the next section.

### Credit Thresholds for Specific Cards

Need different thresholds for specific cards? You can [give those cards their own thresholds](https://help.salesforce.com/s/articleView?id=xcloud.wallet_change_threshold_specific_card.htm\&type=5), either as percentages or as credit amounts. The latter helps when your budget is set in credits, as you can then get an alert at, for example, 1, 2 and 3 million credits.

First, find the card definition developer name, which often differs from the name on the card. On the Consumption Cards tab, click **View Consumption Details** on the card and read the `c__card` parameter from the URL:

```text title="PlatformServicesCard is the developer name of the Data Services Credits card"
https://myorg.lightning.force.com/standard-ConsumptionCards?c__view=cardDetail&c__card=PlatformServicesCard&c__env=Production&c__model=PrePurchased
```

On a contract without a Data Services Credits card, [Data 360 usage bills to Flex Credits](https://help.salesforce.com/s/articleView?id=data.c360_a_flex_credits_for_data360.htm\&type=5), on the card with the developer name `FlexCredits`. It also carries Agentforce and other Flex usage, so a threshold on it covers all of them.

Then add a branch for that card:

1. Open the **Check Card Conditions** decision and add a new outcome named after the card, for example `Data 360 Card`. Keep the existing outcomes.
2. In **Outcome Order**, drag the new outcome to the top, so it takes priority over the existing ones. The default outcome always stays last.
3. Add the condition: Resource `Current Item from Loop Cards > cardDefinitionDeveloperName`, Operator `Equals`, and as Value the developer name from `c__card`, for example `PlatformServicesCard`.
4. Under the new outcome, add an **Assignment** that sets `AlertTriggerType` Equals `AlertTriggerType_ThresholdUnits` for credits, or `AlertTriggerType_ThresholdPercent` for percentages.
5. Right below it, add a second **Assignment** with one `ThresholdValues` Add row per threshold, as an integer: `60` for 60% on a percentage branch, or `1000000` for one million credits on a credits branch.
6. **Save**. **Activate** now, or after the last change you make.

For more cards with the same thresholds, add a condition per card in step 3 and set the requirement to **Any Condition Is Met (OR)**. Cards that need different thresholds each need their own outcome, so repeat steps 1 to 5 for each of them.

> **Note: You Should Know**
>
> A decision runs only the first outcome that matches, so the cards on your branch skip the **Percentage Threshold** outcome and its thresholds, including 100%. To keep that alert, add your full entitlement as the last threshold on your branch: `100` on a percentage branch, or the entitlement in credits on a credits branch. Only the percentage one repeats daily past the entitlement on a pre-purchased card, like the default. The credits one fires once.
>
> If you also run the [burn plan flow](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#data-360-credit-burn-plan-alerts) on a card, keep that card on percentage thresholds here. The template's repeat check also counts the burn plan's credits alerts, so a credits threshold at or below one of them stays silent. Percentage thresholds are a different alert type, so the burn plan never blocks them.

### Custom Alert Recipients

**Take control of who receives the alerts.**

The template collects every user with the System Administrator profile and passes their IDs to the **Create Alert and Notify** element. You can [replace them](https://help.salesforce.com/s/articleView?id=xcloud.wallet_change_who_gets_threshold_alerts.htm\&type=5) with the users of a permission set or a public group:

1. Below the **Has Cards** outcome, add a **Get Records** on **Permission Set** called `Get Alert Permission Set`. Filter it on `API Name` Equals your permission set's API name, for example `Consumption_Alerts`, and store only the first record. Pick `API Name`, as `Permission Set Name` is the label and won't match.
2. Below it, add a **Get Records** on **Permission Set Assignment** called `Get Permission Set Assignments`. Filter it on `Permission Set ID` Equals `Permission Set from Get Alert Permission Set > Permission Set ID`, and store all records.
3. Below it, add a **Transform** called `Collect Assignee IDs`. In **Map Your Data**, add `Get Permission Set Assignments` as **Source Data** and a new Text collection as **Target Data**, then connect `AssigneeId` to it.
4. In **Create Alert and Notify**, replace the **Recipient IDs** value with `Collect Assignee IDs`.
5. Delete the old steps from the bottom up, as each one uses the one above it: **Collect User IDs**, then **Get Users**, then **Get System Administrator Profile**.
6. **Save**. **Activate** now, or after the last change you make.

The public group version follows the same pattern with **Group** (`DeveloperName`) and **Group Member** (`GroupId`), mapping `UserOrGroupId`.

> **Note: You Should Know**
>
> In both scenarios, only direct members get the alerts. Users in a nested public group get nothing, and so do users who have the permission set through a permission set group. For those, filter the assignments on `PermissionSetGroupId` instead.

I prefer the permission set. Create one called, for example, `Consumption Alerts` with the View Consumption permission in it. Assign it to the people who can act on consumption, such as the platform team and the Data Cloud Architects, so they get both the alerts and access to the Consumption Cards the alerts point to.

To keep the default alerts for every System Administrator and add just one more user, or someone without Salesforce access, insert a **Send Email** action after the alert, with the steps in [Custom Email Alerts](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#custom-email-alerts). Unlike Recipient IDs, it takes any email address.

### Alert Notification Channels

**Pick the channel by who has to act on the alert.**

Out of the box, every alert reaches its recipients twice, as a Salesforce notification and as an email. Is that enough? Only if everyone who should know has a Salesforce user. Both channels reach Salesforce users only, so a budget owner without one never hears about the alert. Everything else, from a Slack channel to a shared mailbox, takes an extra step in the flow:

| Channel                        | How You Get It                                                                                                                                                           | Reaches                                                                                                 | Keep in Mind                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Salesforce notification        | Built into the template                                                                                                                                                  | Recipients, in the notification bell on desktop and in the Salesforce mobile app                        | Turn desktop and mobile delivery on or off for the Consumption Alert type in **Setup > Notification Builder > Notification Delivery Settings**, where it sits in the Other section. Mobile push also needs [push notifications enabled](https://help.salesforce.com/s/articleView?id=xcloud.salesforce_app_notifications_enable.htm\&type=5) for the mobile app. |
| Email                          | Built into the template                                                                                                                                                  | Recipients' email addresses                                                                             | Sent from `Salesforce Consumption Alerts <noreply@salesforce.com>` when a card crosses a threshold, and daily once a pre-purchased card passes 100%.                                                                                                                                                                                                             |
| Slack                          | **Send Slack Message** action after the alert ([note below](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#custom-email-alerts)) | Any channel in a connected workspace                                                                    | Needs your Slack workspace connected to Salesforce. Reaches everyone in the channel, regardless of whether they have a Salesforce user.                                                                                                                                                                                                                          |
| Email to any address           | **Send Email** action after the alert ([steps below](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#custom-email-alerts))        | Any address, including budget owners without a Salesforce user, a shared mailbox or a distribution list | You write the subject and the body, for up to 150 recipients per email. The [burn plan flow](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#burn-plan-alert-flow) uses it to put the plan next to the consumption.                                                                                                       |
| Custom Salesforce notification | **Send Custom Notification** action with your own notification type                                                                                                      | Salesforce users, in the notification bell and the Salesforce mobile app, with your own title and text  | Needs a custom notification type created in Notification Builder first.                                                                                                                                                                                                                                                                                          |

My default is the built-in email and Salesforce notification for the people who can act on consumption, such as the Data Cloud Architects and the platform team. The budget owner, product owners and managers responsible for the spend get the [burn plan email](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#data-360-credit-burn-plan-alerts) instead, which reaches any address. A custom Salesforce notification adds little, as the built-in one already lands in the same spot. It is worth the extra type only when you want your own text there, for example the burn plan figures.

### Custom Email Alerts

**Email the alert to anyone, Salesforce user or not.**

The default setup with Recipient IDs reaches Salesforce users only. To also email people without a Salesforce user, a shared mailbox or a distribution list, add two elements after **Create Alert and Notify**:

1. A **Decision** called `Check Alert Created` with an outcome `Alert Created`, where `Outputs from Create Alert and Notify > Is Created` Equals `True`. Without it, the email would go out even when the action created no alert.
2. A **Send Email** action under that outcome, with the addresses as recipients, a subject and a body. The body can name the card with `{!Cards.cardDefinitionDeveloperName}` and the threshold with `{!Thresholds}`.
3. **Save**. **Activate** now, or after the last change you make.

Flow Builder warns on Send Email when the Automated Process User has no email address. In my tests, the email went out anyway from a scheduled run, but enter one in **Setup > Process Automation Settings** before you activate, as the warning also covers the flow's error emails.

> **Note: You Should Know**
>
> You can post the alert to a Slack channel instead, with the **Send Slack Message** action in place of Send Email. It needs your [Slack workspace connected to Salesforce](https://help.salesforce.com/s/articleView?id=xcloud.wallet_enable_slack_notifications.htm\&type=5), and a 1-minute **Wait for Amount of Time** before the action, as Send Slack Message makes a callout and the flow has to commit the alert first. A Slack channel reaches everyone in it, regardless of whether they have a Salesforce user.

To see your customised flow fire before any card crosses a threshold, give one card a credits branch, as in [Credit Thresholds for Specific Cards](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#credit-thresholds-for-specific-cards), with a threshold of `0`, and run the flow as in step 3 of [Burn Plan Alert Testing](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#burn-plan-alert-testing). It raises a real alert and notifies your recipients, so warn them first. Afterwards, delete the test alert by ID and remove the `0`.

With the changes above, the alerts arrive earlier, cover the cards you choose and reach the people who can act on them. That is a big step up from the default, but an alert still can't tell you whether it needs action. Let's solve that.

---

## Data 360 Credit Burn Plan Alerts

**A bit more work, but you get alerted only when your consumption puts your contract limit at risk.**

Half of your credits gone by month 10 of a 12-month contract is good news. Half gone by month 2 means that, at the same pace, the pool runs out in month 4, and every credit for the remainder of the contract bills at the overage rate. Standard percentage thresholds can't tell those two apart, as they measure where you are against the whole pool, never how fast you got there.

A burn plan can. It is the line you would draw on a burn chart: the cumulative consumption you plan for the end of each contract month. It answers the question finance asks, which is whether the credits will last until the end of the contract. The alert fires when consumption goes above the plan for the current month, and stays silent while you are on or below it. Every alert then means something.

To build that alert, you have to give a flow the plan yourself. For every card, Compute Consumption returns the developer name, environment, buying model, consumed units, total entitlement and the alerts already triggered ([ConsumptionCard class](https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/apex_class_sfdw_ConsumptionCard.htm)), and that's it. The contract dates live on the Consumption Cards tab and in the alert email, where no flow can read them. So the plan goes into custom metadata, month by month, and a small scheduled flow around the same two Digital Wallet actions reads it.

> **Note: You Should Know**
>
> You've just learned how to customise the Consumption Threshold Alerts template, and now I'm showing you a burn plan flow. Which one should you use? It's best to run both. Your customised Consumption Threshold Alerts flow covers every card, with or without a plan, and only it keeps sending the daily overage email once a pre-purchased card passes 100%. The burn plan adds what that flow can't see, whether you are ahead of schedule, but only for the cards you plan. Run that flow alone until you have a plan you trust, for example while the credit sizing isn't split into months yet, and add the burn plan once you do. Running the burn plan alone leaves every card without plan records unwatched.
>
> Run them for different audiences: the threshold alerts to the people who can find what burns the credits and fix it, and the burn plan email to those accountable for the spend, who need to know whether the credits will last. Cards without a plan then reach the budget owner only through the platform team, so agree how they escalate.

### Data 360 Burn Plan

Start with the plan, as it matters more than the flow. Take the contract start and end dates and the total credits from the card on the Consumption Cards tab. If the card shows `Multiple` instead of a date, [several contracts feed it](https://help.salesforce.com/s/articleView?id=xcloud.wallet_multiple_contracts.htm\&type=5), so go through the contract list behind it before you plan anything.

The simplest burn plan is linear: 1/12 of the credits per month on a 12-month contract. I don't recommend it for the first year of an implementation. The historical backfill, the first full identity resolution and the ruleset iterations all land in the first months, so a healthy implementation runs above a linear plan from day one. The team learns to ignore the alert, so nobody reacts when real overspending begins. A phased plan front-loads the build months:

| Contract Month | Month End         | Linear Plan | Phased Plan | Phased Plan in Credits |
| -------------- | ----------------- | ----------- | ----------- | ---------------------- |
| 1              | 30 November 2026  | 8.33%       | 15%         | 1,800,000              |
| 2              | 31 December 2026  | 16.67%      | 25%         | 3,000,000              |
| 3              | 31 January 2027   | 25%         | 33%         | 3,960,000              |
| 4              | 28 February 2027  | 33.33%      | 40%         | 4,800,000              |
| 5              | 31 March 2027     | 41.67%      | 47.5%       | 5,700,000              |
| 6              | 30 April 2027     | 50%         | 55%         | 6,600,000              |
| 7              | 31 May 2027       | 58.33%      | 62.5%       | 7,500,000              |
| 8              | 30 June 2027      | 66.67%      | 70%         | 8,400,000              |
| 9              | 31 July 2027      | 75%         | 77.5%       | 9,300,000              |
| 10             | 31 August 2027    | 83.33%      | 85%         | 10,200,000             |
| 11             | 30 September 2027 | 91.67%      | 92.5%       | 11,100,000             |
| 12             | 31 October 2027   | 100%        | 100%        | 12,000,000             |

*Example: 12,000,000 credits on a contract starting 1 November 2026, with 25% planned for the two build months, 15% for the two ramp months and 7.5% for every month after that.*

The split is an illustration. Your numbers should come from the credit sizing done before the contract was signed, spread across your implementation plan, and updated once the initial backfill shows what your data really costs.

### Burn Plan Custom Metadata

The flow reads the plan from a Custom Metadata Type. That keeps the plan out of the flow itself, so a new contract or a revised plan means editing records, not the flow, and the records deploy between orgs like any other metadata. Custom metadata comes with your Salesforce edition, so it costs nothing extra.

In **Setup > Custom Metadata Types**, create `Credit Burn Plan` (`Credit_Burn_Plan__mdt`) with these fields. `Label` comes with every custom metadata type, and you add the other four:

| Field                | Type                                | Purpose                                                                                                                                          |
| -------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Label`              | Text (standard)                     | Name of the record, for example `Data Services 2026-11`. The record's API name fills in from it.                                                 |
| `Card__c`            | Text (255)                          | Card definition developer name, for example `PlatformServicesCard`.                                                                              |
| `Month_End__c`       | Date                                | Last day of the month this record covers, for example 30 November 2026 for contract month 1.                                                     |
| `Planned_Percent__c` | Number, length 3, 2 decimal places  | Cumulative share of the entitlement you plan to consume by the end of that month. If you deploy it as metadata, that is precision 5 and scale 2. |
| `Planned_Credits__c` | Number, length 18, 0 decimal places | Optional. The same plan in credits. When filled, the flow uses it instead of the percentage.                                                     |

> **Note: You Should Know**
>
> `Planned_Percent__c` is the default, even though credits are easier to read. A percentage follows the card's entitlement, so when you buy more credits mid-contract, the plan grows with the pool and no record needs editing. It also works the same for every card, whatever the size or unit of its pool.
>
> The exception is an overage. Once you consume past 100%, the overage invoice can add the billed credits to the card's entitlement, and a percentage plan grows with it. On the 12M-credit plan above, 1M credits of overage raise the entitlement to 13M. It becomes the new 100%, and the overage no longer looks like overage. Similar confusion can come from a card that shows a wrong total while you wait for Salesforce to correct it.
>
> You don't need to change the flow for that. The one described below uses `Planned_Credits__c` whenever a record has it. Fill it in on the records for the remaining months, and they keep the credits you set, whatever the entitlement does. Once a correction lands, you can clear them again.

Once you configure `Credit Burn Plan`, click **Manage Credit Burn Plans** and add one record per contract month. For the example phased plan above, the records for the Data Services Credits card start and end like this:

| `Label`                 | `Card__c`              | `Month_End__c`   | `Planned_Percent__c` | `Planned_Credits__c` |
| ----------------------- | ---------------------- | ---------------- | -------------------- | -------------------- |
| `Data Services 2026-11` | `PlatformServicesCard` | 30 November 2026 | `15`                 |                      |
| `Data Services 2026-12` | `PlatformServicesCard` | 31 December 2026 | `25`                 |                      |
| …                       | …                      | …                | …                    | …                    |
| `Data Services 2027-10` | `PlatformServicesCard` | 31 October 2027  | `100`                |                      |

A plan for another card, for example Flex Credits (`FlexCredits`), needs no new Custom Metadata Type. Add its months as more `Credit Burn Plan` records, with that card's developer name in `Card__c`. The flow picks each card's records by that name. On Flex Credits, plan for Agentforce and other Flex usage too, as they burn the same card.

### Burn Plan Alert Flow

The flow runs once a day. For every card, it finds the furthest contract month whose planned value your consumption has already passed. If there is one, and no alert at that value yet, it raises one and sends an email. A continued spike that crosses a later month's plan triggers a fresh alert to make sure you can react fast.

The flow opens with a schedule, a Wait and the loop over the cards:

1. In Setup, go to **Flows**, click **New Flow** and create a **Schedule-Triggered Flow** that runs **Daily**, with no object. Daily is the most often a scheduled flow can run, and as Digital Wallet refreshes usage every few hours, it is enough. Pick any start date and time.
2. Add a **Wait for Amount of Time** element of 1 minute, then the **Compute Consumption** action. A scheduled flow with no object can make callouts only after a Wait, and Compute Consumption is one. The action takes no inputs, and its `Cards` output holds every consumption card in the org.
3. Add a **Loop** over `Cards` and call it `Cards`, so it matches the references in the steps below.

Next, find the furthest month you have passed. Why the furthest and not the current one? Because a spike can pass next month's plan before this month is over, and only the furthest month tells you how far ahead you are:

4. Inside the loop, add an **Assignment** called `Set Consumption` that copies `unitsConsumed` and `totalEntitlement` from the current card into two Number variables with 2 decimal places, `Consumed` and `Entitlement`.
5. Add **Get Records** on **Credit Burn Plan** called `Get Future Plans`. Filter it on `Card` Equals `Current Item from Loop Cards > cardDefinitionDeveloperName` and `Month End` Greater Than or Equal `Running Flow Interview > CurrentDate`, and store all records. That gives you the current contract month and every month after it. Once the last month end has passed, the card has no plan and the flow skips it, so add the next contract's records before the renewal.

> **Note: You Should Know**
>
> The flow takes today's date from the user who runs it, the [Default Workflow User](https://help.salesforce.com/s/articleView?id=platform.flow_considerations_trigger_schedule.htm\&type=5). So the plan moves to the next contract month at midnight in that user's time zone: set it to the one your contract months follow. The start time you pick in step 1 is in the [org's default time zone](https://help.salesforce.com/s/articleView?id=platform.flow_considerations_trigger_schedule.htm\&type=5).

6. Add a **Collection Filter** called `Find Reached Plans` on `Credit Burn Plans from Get Future Plans`. Set **Condition Requirements** to **Formula Evaluates to True** and enter the formula below, which keeps the months whose planned credits your consumption has already passed. Picking **Current Item from Find Reached Plans** in the resource picker inserts `currentItem_Find_Reached_Plans`.

```text title="Find Reached Plans formula"
BLANKVALUE({!currentItem_Find_Reached_Plans.Planned_Credits__c}, FLOOR({!currentItem_Find_Reached_Plans.Planned_Percent__c} / 100 * {!Entitlement})) < {!Consumed}
```

7. Add a **Collection Sort** called `Sort Reached Plans` on `Credit Burn Plans from Find Reached Plans`. Sort by `Month_End__c`, descending, and under **How Many Items to Keep After Sorting**, choose **Set the maximum number of items** and enter `1`. What is left is the furthest month you have passed, or nothing while you are on or below plan.
8. Add a **Loop** called `Reached Plan` (API name `Reached_Plan`) over `Credit Burn Plans from Find Reached Plans`. It runs once when you are ahead of plan and not at all otherwise, and its After Last goes back to the `Cards` loop. A loop over a single record looks odd, but it is how Flow Builder hands you one item from a collection. Create the two formula resources the next steps read, `PlannedCredits` (Number, 0 decimal places) and `ConsumedPercent` (Number, 2 decimal places):

```text title="PlannedCredits formula"
BLANKVALUE({!Reached_Plan.Planned_Credits__c}, FLOOR({!Reached_Plan.Planned_Percent__c} / 100 * {!Entitlement}))
```

```text title="ConsumedPercent formula"
ROUND({!Consumed} / {!Entitlement} * 100, 2)
```

The rest goes inside that loop, so only a card ahead of plan gets this far:

9. Check whether you already alerted at this planned value. Create a Date/Time formula resource `MonthAgo` with `{!$Flow.CurrentDateTime} - 31`. Then add **Get Records** on **Utilization Alert** (`TenantConsumptionAlert`) called `Get Existing Alert`. Filter it on `Alert Scope` Equals `Current Item from Loop Cards > cardDefinitionDeveloperName`, `Trigger Type` Equals `ThresholdUnits`, `Trigger Value` Equals `PlannedCredits` and `Alert Timestamp` Greater Than `MonthAgo`, and store only the first record. Flow Builder warns that a first-record lookup should filter on a unique field. Any match will do here, so ignore it. Follow it with a **Decision** `Not Yet Alerted` with an outcome `No Alert Yet` where `Utilization Alert from Get Existing Alert` Is Null `True`. The default outcome goes back to the loop.

> **Note: You Should Know**
>
> Why the check? Once consumption passes a planned value, it never drops back below it, so without the check the flow would raise the same alert and send the same email every day. The object reference says an `Active` alert [suppresses duplicates](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_tenantconsumptionalert.htm), but in my tests Create Consumption Alert created a second alert at the same value anyway, and marked the first one `Cleared`. Both the Consumption Threshold Alerts flow and this one run their own check instead.
>
> The check looks only at `ThresholdUnits` alerts for this exact planned value from the last 31 days, so the percentage alerts from the other flow never block it. You get an email each time consumption passes a later month's plan, plus a reminder a month later if nothing changes.

10. Under `Not Yet Alerted`, add another 1-minute **Wait for Amount of Time**, as **Create Consumption Alert** makes a callout too. Then add that action with these inputs:

| Input                          | Value                                                        |
| ------------------------------ | ------------------------------------------------------------ |
| Alert Trigger Type             | `ThresholdUnits`                                             |
| Alert Trigger Value            | `{!PlannedCredits}`                                          |
| Business Environment Type      | `Current Item from Loop Cards > businessEnvType`             |
| Card Definition Developer Name | `Current Item from Loop Cards > cardDefinitionDeveloperName` |
| Usage Model                    | `Current Item from Loop Cards > usageModel`                  |
| Send Notification              | `False`                                                      |

> **Note: You Should Know**
>
> Two inputs in the table are deliberate:
>
> - **Alert Trigger Type** is `ThresholdUnits`, and the value is always in credits, as `PlannedCredits` converts a percentage plan first. That way, a burn plan alert never looks like one of the percentage alerts from the [Consumption Threshold Alerts flow](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#digital-wallet-consumption-threshold-alerts). With percentages, a month planned at exactly 50% would leave the same record as its default 50% alert.
> - **Send Notification** is `False`, because your own email in step 11 does the notifying. It puts consumption and plan side by side and goes to whoever you set as its recipients. The standard Salesforce notification and email would only repeat how much you consumed.
>
> **Create Consumption Alert** stays in the flow even with its notification off, as every alert lands in `TenantConsumptionAlert`. That record is what step 9 looks for, and it gives you an audit trail of the months you ran ahead of plan.

11. Add a **Decision** `Alert Created` with an outcome `Created` where `Outputs from Create Consumption Alert > Is Created` Equals `True`. Under it, add a **Send Email** action to the budget owner, product owners and managers responsible for the spend, or a team mailbox, with a subject such as `Data 360 consumption above plan`. The email leads with how far ahead of plan you are, so create three more formula resources first: `PlannedPercent` and `PointsAbovePlan` (both Number, 2 decimal places), and `DaysAhead` (Number, 0 decimal places). The first two work from the credits, so they also work for records that use `Planned_Credits__c`:

```text title="PlannedPercent formula"
ROUND({!PlannedCredits} / {!Entitlement} * 100, 2)
```

```text title="PointsAbovePlan formula"
{!ConsumedPercent} - {!PlannedPercent}
```

```text title="DaysAhead formula"
{!Reached_Plan.Month_End__c} - {!$Flow.CurrentDate}
```

Then click **New Resource**, create a **Text Template** called `BurnPlanEmailBody`, switch it to **View as Plain Text**, paste the text below and select it as the body:

```text title="BurnPlanEmailBody text template"
Data 360 credit consumption is above the burn plan.

Card: {!Cards.cardDefinitionDeveloperName}
Consumed: {!ConsumedPercent}% of the contract's credits, {!PointsAbovePlan} percentage points above the {!PlannedPercent}% planned by {!Reached_Plan.Month_End__c}
That is at least {!DaysAhead} days ahead of plan.
In credits: {!Consumed} consumed, {!PlannedCredits} planned, {!Entitlement} in total

What to do next:
1. Open Digital Wallet, go to the Consumption Insights page of this card and look for the usage types and resources that grew.
2. Check whether that growth was planned, for example a backfill or a new data stream.
3. If it wasn't, pause or reschedule the resource behind it. If it was, update the remaining burn plan records with finance.

You get another email when consumption passes the plan for a later month, or a month after this one if it stays where it is.
```

Each card above plan gets its own alert and email, so two cards over plan in the same run send two emails.

To use another channel, swap the Send Email action for one from [Alert Notification Channels](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#alert-notification-channels), and for Slack, see the note in [Custom Email Alerts](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#custom-email-alerts).

Flow Builder warns on Send Email when the Automated Process User has no email address. As in [Custom Email Alerts](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#custom-email-alerts), enter one before you activate. It also warns that Get Future Plans, Get Existing Alert and Send Email run inside a loop. Leave them there, as the loop runs once per card and an org has only a handful of cards.

12. **Save**. Activate it once the [test below](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#burn-plan-alert-testing) passes.

### Burn Plan Alert Testing

Neither a sandbox nor a demo org can run the Digital Wallet actions, so the first real run happens in production. Make it a controlled one, with two test records dated so far ahead that no real month comes after them. Three debug runs then show the alert, the escalation and the repeat check:

1. Put your own email address in the Send Email action from step 11 and **Save**. The test emails then come to you, not your recipients.
2. Add a `Credit Burn Plan` record for your card with 30 December 2099 as `Month_End__c` and `1` as `Planned_Percent__c`. No real month end comes later, so the flow picks this record, as long as your consumption is above 1%. Early in a contract it may not be yet, so use a smaller value, such as `0.05`, as the field takes two decimal places.
3. Run the flow with **Debug** in Flow Builder, or with **Test** and **Run Scenario** where [Flow Test Mode (Beta)](https://help.salesforce.com/s/articleView?id=release-notes.rn_automate_flow_test_mode.htm\&type=5) is on. Make sure **Run automation in rollback mode** is off, so the actions run for real, as Test Mode can tick it by default. Keep **Debug wait element behavior** on, which is the default. The run pauses at each Wait, so [keep its Wait Path and click **Continue the Debug Run**](https://help.salesforce.com/s/articleView?id=platform.flow_test_debug.htm\&type=5). The alert gets created and the email goes out. Its days-ahead figure counts to the 2099 test date, so expect a number in the tens of thousands.
4. Check the email, then query the alert record in the Developer Console. Expect `sf__ConsumptionThreshold` as the `AlertType` and your card's developer name as the `AlertScope`.
5. Add a second record with 31 December 2099 and `2`, or any value between the first one and your consumption, and run the debug again. The flow now picks the later record, a new planned value, so a second alert and email follow. That is the escalation.
6. Run the debug a third time. `Get Existing Alert` finds the alert from step 5, so the flow creates no new alert record and sends no new email.
7. Delete both test records, put your recipients back in Send Email, then **Save** and **Activate**.

Deleting the test records doesn't remove the two test alerts. You can delete them by ID through the API, for example with `sf data delete record -s TenantConsumptionAlert -i <Id>`. Delete only those two, as Compute Consumption drops a deleted alert at once, and a real alert you delete fires again on the next run. If you keep them, the query below lists them too, and you can tell them by the date of your test and their trigger values, the two test records' planned values in credits.

```sql title="Burn plan alerts recorded by the flow"
SELECT
      AlertType
    , AlertScope
    , TriggerType
    , TriggerValue
    , AlertStatus
    , AlertTimestamp
FROM TenantConsumptionAlert
WHERE TriggerType = 'ThresholdUnits'
ORDER BY AlertTimestamp DESC
```

### Burn Plan Alert Limits

The burn plan alert is a great tool, but it has three limits:

- **It only reports.** Data 360 keeps consuming credits until someone pauses or reschedules the resource behind the growth, so agree up front who does that when the email arrives.
- **It reports late.** The flow checks once a day. A spike that jumps past a later month's plan gets an alert on the next run, but a smaller one can stay under the current month's planned value for days, as that value is the target for the end of the month.
- **It doesn't know what grew.** Compute Consumption returns one total per card, so the email can say how far ahead you are, not why.

The delay matters most for the changes that multiply your daily burn. An identity resolution ruleset change can reprocess every profile, and a Marketing Cloud Next send that looks each recipient up without a key scans a whole table every time. The [lower thresholds](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#lower-percentage-thresholds) shorten it. Most of them sit 10% apart or closer, so on a 12-month contract, a spike to five times your usual daily burn reaches the next threshold within about a week. Catching it on the first day needs a stored history of daily consumption and a baseline to compare with, which I don't find worth building for most orgs.

When the alert fires, finding what grew is up to you. The email's next steps send you to the Consumption Insights page of the card, which breaks consumption down by day, usage type and resource. Standard consumption tags already tell you which data stream, segment or insight burned the credits.

> **Note: You Should Know**
>
> You can use [custom consumption tags](https://help.salesforce.com/s/articleView?id=xcloud.wallet_custom_tags_intro.htm\&type=5) to add your own categories, such as department or cost centre, at no cost. They apply to consumption from the moment you assign them, so set them up on day one of the implementation. Tagging after a spike won't explain it.

---

## Sum Up

1. Data 360 keeps running past your credit pool and bills the overage, so set up alerts that warn you before it happens [🔗](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#data-360-credit-consumption)
2. Start your Data 360 implementation by activating the Consumption Threshold Alerts flow in production, after checking the Default Workflow User [🔗](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#digital-wallet-consumption-threshold-alerts)
3. Add `10`, `20`, `30` and `40` thresholds, as the default first alert at 50% comes too late, and never remove `100` [🔗](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#lower-percentage-thresholds)
4. Add the full entitlement as the last threshold on any card-specific branch, as it skips the default 100% alert [🔗](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#credit-thresholds-for-specific-cards)
5. Control who gets the alerts with permission sets, public groups and Send Email [🔗](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#custom-alert-recipients)
6. Standard percentage thresholds can't tell a healthy pace from a dangerous one, so compare consumption with a month-by-month burn plan, front-loaded for the implementation [🔗](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#data-360-credit-burn-plan-alerts)
7. Run the burn plan flow next to the Consumption Threshold Alerts flow, as the burn plan watches only the cards you plan, and send its email to those accountable for the spend [🔗](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#burn-plan-alert-flow)
8. Set up custom consumption tags on day one, so you can explain a spike when it comes [🔗](https://mateuszdabrowski.pl/docs/salesforce/data-360/config/credit-consumption-alerts/#burn-plan-alert-limits)
