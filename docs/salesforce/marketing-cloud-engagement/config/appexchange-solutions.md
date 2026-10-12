# MCE AgentExchange Solutions

> Fill the feature gaps with plug-and-play apps. Salesforce Marketing Cloud Engagement solution highlights from AgentExchange.

Source: https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/appexchange-solutions/  
Author: Mateusz Dąbrowski  
Last updated: 2026-10-12  
Licence: CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)

AgentExchange (formerly AppExchange) is an app store for various Clouds within Salesforce Customer 360 platform. You will find in-house solutions from Salesforce Labs and 3rd party. Free and paid. Good and bad. But all - validated by [Salesforce Security Review](https://developer.salesforce.com/docs/atlas.en-us.packagingGuide.meta/packagingGuide/security_review_guidelines.htm).

The new name arrived in 2026, when Salesforce merged Slack Marketplace and Agentforce components into the same store, so agents, actions and prompt templates now sit next to the classic apps. The listings, reviews and links of the solutions below carried over unchanged.

From over 4500 solutions available there, only around 100 are for [Salesforce Marketing Cloud Engagement (MCE, formerly Salesforce Marketing Cloud)](https://appexchange.salesforce.com/category/marketing). Here, I will focus only on those I had some experience with.

> **Note: You Should Know**
>
> This document is a living thing. New solutions keep popping up, and old ones sometimes disappear or are recreated. I try to keep it up-to-date, but your help with this task will be appreciated.

## When is AgentExchange worth it?

Before we jump into specific solutions available in the store, let's talk about whether you should consider going through AgentExchange offerings. This question is especially relevant with how feature-packed and customizable MCE is. And not that easy to answer when you assess all decision drivers.

### 1. Define feature requirements

Ok, you want a feature and are eager to find a solution to deliver it. Now stop. Before opening the AgentExchange repository, you should dive deep into the exact requirements the solution has to fulfil.

Key things to consider:

- **What it needs to do** - what is the minimum valuable outcome, and what is an ideal one?
- **How it needs to do it** - does it have to be a user-friendly no-code solution, or is a developer-oriented approach acceptable?
- **Where it needs to do it** - does it have to be done within MCE, or can it be external?
- **Who needs to do it** - do you have the resources to implement it, or should it be outsourced?
- **What is the budget** - does it have to be free, cheap, or you can pay for good value?

Those requirements should be aligned with the final users and be clear enough to serve as a guardrail for making an informed decision.

### 2. Validate out-of-the-box options

Once you have requirements, it's time to check what already is within your MCE license. Over the years, Salesforce baked in many solutions, so you might find something already there, just waiting to be used.

> **Note: You Should Know**
>
> Not all solutions are available by default - some require a support ticket to be enabled. Check out my [list of features on-demand](https://mateuszdabrowski.pldocs/salesforce/marketing-cloud-engagement/config/features-on-demand/) to see if there is anything hidden that might fulfil your requirements.

However, even if your requirement has an out-of-the-box solution, it doesn't always mean the end of the work. You need to check whether it is good and easy enough:

- **Good Enough**: Just because there is something, it might not meet all the requirements you gathered in the first step. Maybe it is too basic for your needs or doesn't have access to all data you want to leverage. It is where you start seeing the benefits of the prework.
- **Easy Enough**: Even if the solution is good enough, it might not be easy enough. Always assess the solution by considering the knowledge and skills of the end users - not yours (unless you will be the only end user, of course).

If the out-of-the-box solution checks both boxes - you hit the jackpot and can leverage what is already there.

Else, it's time to look somewhere... else.

### 3. Free AgentExchange Solutions

Time to check whether there is any free solution available on demand. You can do it by going to [marketing AgentExchange](https://appexchange.salesforce.com/category/marketing) and applying filters to get Free solutions dedicated to MCE.

To manage your expectations: for Salesforce MCE, the list won't be long. And even then, you have to make sure the app is genuinely offering a meaningful free tier. Expect free Salesforce Labs solutions (like [Query Studio 2](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/appexchange-solutions/#query-studio-2) covered below) and little pearls made by 3rd parties - like Content Builder asset finder [DESelect Search](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/appexchange-solutions/#deselect-search).

If you are lucky enough to find something free in AgentExchange related to your requirements, check whether it is good enough. Just as you did in the [previous step](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/appexchange-solutions/#2-validate-out-of-the-box-options).

No luck? Before checking the paid filter in AgentExchange, there is one more approach to consider.

### 4. Custom Solution

A decade ago, building a custom solution for every requirement was all the rage. Since then, the platforms and their 3rd party ecosystems have grown significantly, making this approach much less tempting. Why?

There are four things to consider:

1. **Can you build a Custom solution?** This can be done using in-house developers or outsourced to external specialists, but you need either skills or a budget.
2. **Will it be good enough?** If you have the means, building a custom is easy. But do you have *enough* skills or budget to make a good solution that will be user-friendly, optimized, polished and matching all your requirements?
3. **Will it be cheaper than AgentExchange?** Sure, with enough time and money, you can build something good enough. But will it be more affordable than a similar solution available in the paid section of AgentExchange?
4. **Will you maintain it?** Even if you answered yes to the previous three points, you must consider maintenance. In most cases, building a custom is just the beginning. Requirements change, new needs happen, platforms get updated and require refactor. With AgentExchange solutions, it *should* be much less of a worry in the long term.

While the list might look like a hard pass for custom solutions, there is a place for them. Especially on the ends of the spectrum. Simple, but lifesaving micro solutions ([Cloud Page Apps](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/ssjs/snippets/sfmc-cloud-page-apps/), [Code Resources](https://mateuszdabrowski.pldocs/salesforce/marketing-cloud-engagement/config/code-resource/)) or custom behemoths aligned to all non-negotiable quirks and features of your internal processes.

However, if you hit a hard "no" to any of the above questions, it's time to visit the AgentExchange again.

### 5. Paid AgentExchange Solutions

Here we are. After defining the requirements, we haven't found anything worthy among the out-of-the-box solutions, the land of the free AgentExchange was barren, and the custom work didn't seem like the best choice. Paid AgentExchange it is. But is it really?

Assuming you found a paid solution, you still need to assess whether it will be good enough. The positive part here? If you see only small pieces missing from the ideal, you might talk with the solution creators and discuss prioritization of the future changes.

However, you also need to keep in mind the budget. Not only the subscription cost but also implementation, training, and enhancements. After considering all that, will you still see a return on investment? If yes - you are good to go.

If not, it's time to update your requirements - the list of needed features or the budget size - and [start again](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/appexchange-solutions/#2-validate-out-of-the-box-options).

---

Sounds complex? Would you rather have a visual guide? Got you covered:

![Flowchart with visual representation of the When is AgentExchange Worth It? analysis process](https://mateuszdabrowski.pl/img/article/article-image-appexchange-flowchart.png)

Looks complex? Would you rather have an example-based walkthrough? Got you covered as well in the next chapter:

## MCE Segmentation Solutions

Finding the right approach to database segmentation is one of the critical elements of successful marketing automation. In Salesforce MCE, it's a complex topic because (spoiler) there is no perfect - powerful, simple and free - solution. You need to choose your priorities.

Looks like excellent use case to test the ["Is AgentExchange worth it?" process](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/appexchange-solutions/#when-is-agentexchange-worth-it) on a real-life scenario, so let's check how it works.

**1. Feature Requirements**

Let me paraphrase the user story constraints I encounter on nearly every implementation:

- As a company, I want to have segmentation based on our comprehensive data so that we can send the right communication to the right persons at the right time.
- As a marketer, I want to have a drag and drop segmentation so that it is fast and easy to deliver correctly built segments.

Let's split it into crucial things to consider:

- **What it needs to do** - Segment the database using multiple data points.
- **How it needs to do it** - Simple drag and drop solution.
- **Where it needs to do it** - Within MCE.
- **Who needs to do it** - Undecided, but no internal resources for implementation.
- **What is the budget** - No budget.

Does it sound familiar? ;)

**2. Out-of-the-box options**

There are two ways to segment contacts in MCE core. Filtered Data Extensions and SQL Query Activities. How do they stack against our requirements?

Filtered Data Extensions are free, require nearly no implementation (apart from setting Data Relationships), work directly in MCE, and are a simple drag and drop solution, but... They don't support segmenting on more than two Data Extensions. Not good enough.

SQL Query Activities are free, require no implementation, work directly in MCE and allow segmenting on multiple data points, but... demand [SQL](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-basics/) skills. It means training requirements, slower segmentation and a higher risk of errors by inexperienced users. Not easy enough.

**3. Free AgentExchange**

Filtering the AgentExchange for free solutions shows only one related to segmentation - [Query Studio 2](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/appexchange-solutions/#query-studio-2), the successor of the original Query Studio. It is a great tool, and so is my free [SQL Studio](https://mateuszdabrowski.pl/sql-studio/), but both are SQL-based solutions. Neither is an end-to-end tool for segmentation purposes. Not good enough.

**4. Custom Solution**

There are two base options for the drag and drop custom solution approach.

First - generator that modifies predefined segments. It's relatively simple to build, but it allows you to make only minor adaptations of the templated query, mostly on filtering ([SQL WHERE](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-where/)). Very limited and requires hard coding for each new segment template. Not good enough and hard to maintain.

Second - fully-fledged visual wrapper over SQL queries. Full power with a drag and drop interface. Sounds like a dream? Correct. Such solution requires a lot of work and testing. The cost would skyrocket well above (spoiler alert) what is available in the paid section of AgentExchange. Not worth it.

**5. Paid AgentExchange**

Finally, we get to the last stop. After a quick search, we can find two solutions: tried and tested [DESelect Segment](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/appexchange-solutions/#deselect-segment) and the new contender [Activation Studio](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/appexchange-solutions/#activation-studio). More details on them in a moment, but from the perspective of this exercise - both are subscription based, while one of the key things to consider was the beloved "no budget".

Therefore we get to the update requirements step, where the company needs to prioritize between powerful, simple and free.

![Triangle with three corners - FREE, POWERFUL and SIMPLE - and three solutions: FREE and POWERFUL SQL Query Activity, FREE and SIMPLE Filtered Data Extensions, POWERFUL and SIMPLE DESelect Segment. ](https://mateuszdabrowski.pl/img/article/article-image-appexchange-segmentation.png)

I hope it is now easier to find when AgentExchange can solve MCE requirements. With that, let's jump to the solutions available there.

---

## AgentExchange Solutions for MCE

### Query Studio 2

![Screenshot of the Query Studio 2 user interface, with a query on \_Subscribers, the Query Builder, the Action Log and the results below the SQL](https://mateuszdabrowski.pl/img/article/article-image-appexchange-query-studio-2.png)

| Creator         | Pricing |
| --------------- | ------- |
| Salesforce Labs | Free    |

> **Note: You Should Know**
>
> The original Query Studio is no longer available on AgentExchange. Installed copies still work, but Salesforce's support sends you to community resources for setup and fixes. When it was removed, I built [SQL Studio](https://mateuszdabrowski.pl/sql-studio/) to replace it. Then, on 9 October 2026, Salesforce Labs put Query Studio 2 on AgentExchange in its place.

Query Studio 2 solves the same two problems as its predecessor:

1. MCE SQL Query Testing
2. MCE SQL Data Exploratory Analysis

Why do I call them problems? Because the only out-of-the-box way to work with SQL in MCE is a Query Activity in Automation Studio. It tells you whether your query is valid, but to see what it returns, you first have to create a Data Extension with the correct fields (names, data types, lengths) and run the activity. Outcomes are not what you expected? The Data Extension needs a rework. It happens sometimes when you write a new query, and all the time when you explore the data.

Query Studio 2 runs your query into a temporary Data Extension it creates for you and shows the results below your SQL.

#### The Good

It installs from AgentExchange as an Installed Package in a few clicks, an admin grants access per user or per Business Unit, and it opens from an MCE menu. Next to the editor, it brings a Query Builder: search for a Data Extension or a Data View, then click a table or a field to add it to your query. A table added as a JOIN asks for the field to join on and starts the ON with it, and you write the rest. Its editor completes field names, also after an alias, and SQL keywords and functions, and Format lays the query out. Its checks mark the problems they find in the editor, with a Fix all for the ones they can repair. And it accepts what the original refused in my tests: parentheses in the first line of `SELECT`, `TOP PERCENT` and `CAST` in `SELECT` all pass its Check Query.

When you click Run, it lists the fields it will create in the target Data Extension and asks you to confirm, with an Edit link next to the list. A field of a Data Extension or a Data View keeps its type and length, such as an EmailAddress of 254 or SubscriberID as a Number, while a column of a subquery or one your query computes becomes Text (255). Its action log then shows each step of the run, and the results come below your SQL, from 50 to 1,000 rows per page. A click on a column header sorts all of them, not only the page on screen. That Data Extension deletes itself after a while, so Convert DE renames it and removes its retention policy when you want to keep the results, and Extract to File writes it to the Export folder of your Enhanced FTP.

#### The Bad

Like every Salesforce Labs app, it comes with no official or guaranteed support from Salesforce, only the community boards. It also runs on its own server, a Heroku app between your browser and MCE, so your queries and their results pass through it. It keeps neither in a database of its own, as [Nobuyuki Watanabe's review](https://medium.com/@marketingcloudtips/query-studio-2-arrives-in-marketing-cloud-engagement-751313246455) notes. And if your account restricts logins by IP, you first have to add the four IP addresses from its Specs tab to the login allowlist.

Its own parser brings back the main weakness of the original Query Studio in a milder form: it refuses some valid SQL. The most common case is a comment. A `--` comment gets "Please use /\* comments \*/ rather than --comments.", and a `/* ... */` comment then gets "'SELECT \*' statements are not allowed.", while a Query Activity runs both.

The other way round, Run does not stop at everything Check Query flags. When its Query Builder added a field of a second table without joining that table, Check Query flagged the unknown alias, but Run sent the query to MCE anyway, which refused it with "The multi-part identifier could not be bound". It is a young app, at version 2.2 within days of its release, so expect such gaps to close quickly.

It has one editor, and Run sends all of its text, so you cannot keep a few queries there and run the one you select: with two queries in the editor, Run reports a syntax error at the second one. It has no dark mode either. And its code is not published on the Salesforce Labs GitHub, so your security team has only the listing and its Security Review to go on.

#### The Sum Up

If you want a free SQL editor that installs in minutes and stays up to date with a package upgrade, Query Studio 2 is the easiest pick. If you want the syntax check of MCE itself, so that your editor runs exactly what a Query Activity runs, [SQL Studio](https://mateuszdabrowski.pl/sql-studio/) is my free, open-source alternative. It also keeps every query and result inside your own account, needs no allowlist entries and lets you keep several queries in one tab. It needs a short deployment by your admin first, as it is not on AgentExchange.

[Query Studio 2](https://appexchange.salesforce.com/appxListingDetail?listingId=37382c71-88a7-4907-aef9-034f6100c447) | [SQL Studio](https://mateuszdabrowski.pl/sql-studio/)

---

### MCE Schema Explorer

| Creator         | Pricing |
| --------------- | ------- |
| Salesforce Labs | Free    |

Schema Explorer is a new tool directly from Salesforce Labs that maps your MCE data ecosystem - Data Extensions, Journeys, Automations, and how they depend on each other - into one visual schema.

MCE has no built-in data lineage view, so understanding how objects relate is usually tribal knowledge held by whoever built the instance. Schema Explorer also connects to an Agentforce agent, so you can ask questions about your own data model instead of clicking through Contact Builder to find out.

It's free, made available by Salesforce Labs, and actively developed. Definitely worth checking out if you are a Salesforce Marketing Cloud Engagement architect or administrator.

[AgentExchange](https://appexchange.salesforce.com/appxListingDetail?listingId=661d2ae0-c125-4f40-874d-004d58824c6b)

---

### DESelect Segment

![Screenshot of the DESelect Segment User Interface](https://mateuszdabrowski.pl/img/article/article-image-appexchange-deselect-segment.png)

| Creator  | Pricing                               |
| -------- | ------------------------------------- |
| DESelect | [Paid](https://deselect.com/pricing/) |

DESelect Segment is the golden standard for the middle ground between the very limited Filtered Data Extensions and yes-code SQL Queries. Actually, "middle ground" is not fair.

Over time, DESelect team polished it to cover nearly all use cases that were possible only with SQL in the past. It makes the app more of a no-code alternative to Query Activities then an enhanced Filtered Data Extensions.

In a fully drag and drop experience, DESelect Segment can:

- Join multiple data points (both Data Extensions and Data Views)
- Create complex, multilevel filters (using dynamic dates, aggregates and checks against other Data Extensions)
- Build final Data Extension on demand with selected or custom-created columns
- Deduplicate the data using specified logic
- Preview the outcomes to validate the configuration

And it doesn't stop there. There are features not available in the out-of-the-box MCE experience that lets you:

- Create Picklists to mitigate typo issues when working with set lists of values
- Build Data Sets that works as templated multi-table relationships for quick drag and drop
- Share segmentation templates across Business Units to speed up rolling solutions

While the features sound great, true magic happens when you use them together. Why? Because they allow you to create your segment in one place, start to finish.

The out-of-the-box path for query segmentation is:

1. Write and test segmentation query in [SQL Studio](https://mateuszdabrowski.pl/sql-studio/) (with Contact Builder in another tab to check the values)
2. Manually create Data Extension that has all needed columns in correct data types and lengths in Contact Builder
3. Fix it in Email Studio because Content Builder is bugged around CustomerKey and default Current Date
4. Copy the query to Query Activity in Automation Studio
5. \[Optionally] Create Automation

DESelect Segment can do all of it in a single, streamlined process using guided creator. Faster, simpler and less intimidating to beginners. Available right in the MCE main menu.

While I'm a big fan of [SQL](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/sql/sql-basics/), I know it's not a tool for everyone. If you want SQL-level segmentation without hiring for SQL skills toward it, DESelect is the tool for you.

> **Note: You Should Know**
>
> DESelect Segment builds the segments with SQL for you as standard Query Activities. You can see the SQL behind the scenes.
>
> But it doesn't use Automations. Instead, it runs the Query Activities directly from their server using API calls. The data still stays in your MCE instance, but you are not burning the \[yearly Automation execution limit]\(TODO LINK TO LICENCE LIMITS ARTICLE).
>
> If you are running a lot of segments, it can singificantly offset the subscription cost of DESelect Segment.

[AgentExchange](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000G0yE1UAJ) | [Website](https://deselect.com/segment/)

---

### DESelect Engage

| Creator  | Pricing                                              |
| -------- | ---------------------------------------------------- |
| DESelect | [Paid](https://deselect.com/pricing/engage-pricing/) |

DESelect Engage is a different DESelect product from Segment - it doesn't touch *who* you send to, it caps *how often* you send to them, applying frequency capping and saturation control across campaigns and Business Units.

MCE has nothing native for this and while you can implement it with complex SQL queries it will be massive amount of work, maintenance, and \[yearly Automation execution limit]\(TODO LINK TO LICENCE LIMITS ARTICLE) burn. Without it, avoiding over-messaging the same contact comes down to campaign owners informally coordinating with each other. Engage replaces that with rule-based prioritisation (transactional beats newsletter, newsletter beats ad hoc, etc) and visibility into saturation, even for contacts sitting in multiple Business Units.

If you struggle with oversaturation, Engage is worth taking a look at. Managing your marketing pressure is key to keeping your contacts engaged and your deliverability healthy.

[AgentExchange](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N4V00000JeGMiUAN) | [Website](https://deselect.com/engage/)

---

### DESelect Search

| Creator  | Pricing |
| -------- | ------- |
| DESelect | Free    |

DESelect Search does one thing: it searches every object in MCE - Data Extensions, automations, query activities, content blocks, and more - by name or external key, across Business Units.

MCE's folder-based navigation has no cross-object search at all, so "where did I put that Data Extension" usually means digging through nested folders by hand. Search replaces that with a single search box, installed once for the whole team.

It's free and it solves a genuine daily annoyance. You can easily build it yourself as a \[Cloud Page App]\(TODO LINK TO CLOUD PAGE APP ARTICLE), but if you have more interesting tasks at hand, DESelect Search is a polished, ready-to-go solution.

[AgentExchange](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N4V00000Fz2a4UAB) | [Website](https://deselect.com/search/)

---

### Activation Studio

![Screenshot of the Activiation Studio User Interface](https://mateuszdabrowski.pl/img/article/article-image-appexchange-activation-studio.png)

| Creator           | Pricing                                                           |
| ----------------- | ----------------------------------------------------------------- |
| Harvest Tech Labs | [Paid](https://activation-studio.com/pricing/), 30-day free trial |

Activation Studio bolts drag-and-drop segmentation, lead scoring, and lightweight web tracking onto MCE through three modules - Segment Designer, Score Designer, and Interaction Designer - that you can buy separately or as a bundle.

Its Segment Designer trades DESelect Segment's flexibility and power for something narrower but faster and less technical: it builds on Attribute Groups you've already defined in Contact Builder Data Designer, so relationships come pre-wired instead of hand-built. Score Designer is much more unique feature, as it adds simple lead scoring model that was always a gap for MCE.

I'd reach for it over DESelect Segment specifically for smaller and less technicalMCE teams that just want to drag & drop segments on their static data model and enhance it with a built-in lead scoring.

[AgentExchange](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3u00000PurpQEAR) | [Website](https://activation-studio.com/drag-and-drop-segmentation-salesforce-marketing-cloud/)

---

### Qairy

| Creator | Pricing                                   |
| ------- | ----------------------------------------- |
| QAiry   | [Freemium](https://www.qairy.com/pricing) |

Qairy skips the filter-building UI entirely and replaces it with a chat box: describe the audience in plain English (or other language) and its AI writes and runs the underlying SFMC-compatible SQL for you, returning a segment or Data Extension.

That's a genuinely different approach to no-code segmentation than the drag-and-drop tools above. It works against your existing data model, supports scheduled refresh, and only ever sends Data Extension metadata to the AI, never row-level data, so your contact data stays inside SFMC.

The key limitation is related to your metadata quality. AI works best when your data extensions, descriptions and fields are well-named and separated. If you have dozens of similar DEs with cryptic or duplicated columns, the AI will struggle to understand what you mean.

There is a free tier, but it only covers Data Views reporting. Good for testing, or simplyfying quick reporting, but not segmentation. It also won't let you check how problematic your data model is before you pay.

[AgentExchange](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N4V00000IknOOUAZ) | [Website](https://www.qairy.com)

---

### Marketing Cloud Connect Toolbox

| Creator        | Pricing |
| -------------- | ------- |
| Lightbox Logic | Paid    |

Marketing Cloud Connect Toolbox extends the standard Marketing Cloud Connect package by surfacing MCE email, SMS, WhatsApp, and Push activity directly on Salesforce CRM records.

Standard Marketing Cloud Connect gives Sales and Service Cloud only limited visibility into what MCE actually sent (and IERs generally are a pain to setup and maintain). This toolbox closes that gap without copying MCE data into CRM storage, so a rep sees engagement history without leaving Salesforce.

You can create a basic version of it with LWC component and MCE API, but MCC Toolbox provides much more with option to sync emails to Cloud Storage of your choice and showing the visuals of the email in the CRM record. This provides both much more detailed visibility for your Sales and Service teams, but also helps with compliance of storing messaging sent to customers.

It earns its place when Sales or Service reps genuinely need that send visibility on the CRM record - if your teams live entirely in MCE, skip it.

[AgentExchange](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N4V00000J6QDbUAN) | [Website](https://lightboxlogic.com.au/marketing-cloud-connect-toolbox/)

---

### Stashr

| Creator | Pricing                                              |
| ------- | ---------------------------------------------------- |
| Avagate | [Freemium](https://www.avagate.com/solutions/stashr) |

Stashr backs up, version-controls, and recovers MCE assets - Content Builder, Data Extension and Automation Studio configurations, Web Studio CloudPages and Code Resources - with change monitoring that flags what changed, line by line.

MCE has no native backup or version history for most of this (MCE Package Manager is not even close for that purpose). Delete or overwrite something by mistake and it's gone for good. Stashr's free tier covers manual backup of three configurations up to 50 assets each, which is enough to try it on a real project before paying, though recovery only reaches as far back as the day you installed it.

Nice way to add a bit of peace of mind to your MCE operations and even the free tier might be enough to secure the most important and complex assets.

[AgentExchange](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N4V00000IrJkeUAF) | [Website](https://www.avagate.com/solutions/stashr)

---

### Inbox Monster

| Creator       | Pricing                                  |
| ------------- | ---------------------------------------- |
| Inbox Monster | [Paid](https://inboxmonster.com/pricing) |

Inbox Monster pairs pre-send email QA with post-send deliverability monitoring: inbox placement, spam traps, sender reputation, plus SMS signal tracking.

MCE's native preview tools don't get you rendering across real inbox clients or ongoing reputation monitoring at this depth, so Inbox Monster is filling a genuine gap rather than duplicating something MCE half-does already. It also has a direct integration with MCE, so you can use it without leaving the platform.

It's built - and priced - for high-volume senders where deliverability is a revenue line, not a side concern. For a smaller MCE team, Emails on Acid might be a more suitable option.

[AgentExchange](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N4V00000Gk56iUAB) | [Website](https://inboxmonster.com)
