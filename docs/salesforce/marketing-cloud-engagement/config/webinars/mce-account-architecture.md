# MCE Account Architecture

> Learn how to structure your Marketing Cloud Engagement account to make the most of the Business Units, Marketing Cloud Connect and deliverability features.

Source: https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/webinars/mce-account-architecture/  
Author: Mateusz Dąbrowski  
Last updated: 2026-09-24  
Licence: CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)

## Table of Contents

1. MCE Business Units ([5:53](https://youtu.be/dRxcbwIA1K0?t=353))
2. Business Units Setup Patterns ([21:02](https://youtu.be/dRxcbwIA1K0?t=1262))
3. Single-Org vs Multi-Org ([27:31](https://youtu.be/dRxcbwIA1K0?t=1651))
4. Marketing Cloud Connect Patterns ([41:36](https://youtu.be/dRxcbwIA1K0?t=2496))
5. SAP, Private Domains & IPs ([50:21](https://youtu.be/dRxcbwIA1K0?t=3021))
6. Deliverability & IP Warmup ([56:22](https://youtu.be/dRxcbwIA1K0?t=3382))

## Video

Video: [Marketing Cloud Engagement Account Architecture Webinar Recording](https://www.youtube.com/watch?v=dRxcbwIA1K0)

> **Note: You Should Know**
>
> ### Important errata related to the Multi-Org limitations
>
> While one SF Org can have only one integration to a single MCE (Marketing Cloud Engagement, formerly Salesforce Marketing Cloud) Account, you can leverage [more than one Integration User on the Salesforce side](https://help.salesforce.com/s/articleView?id=000381081\&type=1) for that connection. Doing so provides a few significant benefits:
>
> 1. The [recommended limit of up to 5 Business Units per integration in Multi-Org](https://youtu.be/dRxcbwIA1K0?t=2639) is applied to the SF Integration User, not Marketing Cloud Connect itself. It enables you to use multiple SF Integration Users in a single SF Org to connect dozens of Business Units (up to 5 per User).
> 2. The [shared Synchronized Objects configuration per SF Org](https://youtu.be/dRxcbwIA1K0?t=2037) is applied to SF Integration User. It enables you to set distinct configurations per each SF Integration User (shared across Business Units connected using the same User).
> 3. While you still cannot control the [Synchronized DEs visibility](https://youtu.be/dRxcbwIA1K0?t=2173) of MCE Users, you can control which Objects and Records are being synchronized to each Business Unit by applying appropriate Permissions to each SF Integration User. It enables use cases like syncing different Contact Record Types to each Business Unit.
>
> Using the above approach requires additional User licences on the SF CRM side and adds complexity to your implementation. However, it can significantly expand possible use cases in Multi-Org configurations. Full details in the [Marketing Cloud Connect Integration Patterns deep dive](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/mcc-integration-patterns/).

## Materials

| 28 January 2023 | Salesforce Marketing Cloud Engagement Infrastructure Setup -  Org Setup                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Recording       | [YouTube](https://www.youtube.com/watch?v=dRxcbwIA1K0\&list=PLOWi4YJyd0lTtKyr72NHpOawIsoGjbuwr\&index=6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Articles        | [MCE MCC Integration Patterns](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/mcc-integration-patterns/)  Salesforce Architects blog on [Business Units](https://medium.com/salesforce-architects/adopting-business-units-in-marketing-cloud-98eac8eda216) and [Marketing Cloud Connect](https://medium.com/salesforce-architects/implementing-marketing-cloud-with-multiple-salesforce-orgs-part-1-cf8637cf0985) Salesforce Documentation on [Multi-Org Considerations](https://help.salesforce.com/s/articleView?id=sf.mc_co_faqs_for_multi_org.htm) |
