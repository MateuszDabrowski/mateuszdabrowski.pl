# Salesforce Data in MCE Journey Builder

> Learn how to integrate and use Salesforce CRM data with Marketing Cloud Engagement (MCE) Journey Builder. In both ways. The right way.

Source: https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/webinars/mce-salesforce-data-in-journey-builder/  
Author: Mateusz Dąbrowski  
Last updated: 2026-09-24  
Licence: CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)

## Table of Contents

1. Salesforce Data Entry ([3:29](https://youtu.be/Ru4Qh__3xdA?t=209))
2. Salesforce Data Bindings ([24:54](https://youtu.be/Ru4Qh__3xdA?t=1494))
3. Synchronized Data Extensions ([29:40](https://youtu.be/Ru4Qh__3xdA?t=1780))
4. Salesforce Data through API ([34:31](https://youtu.be/Ru4Qh__3xdA?t=2071))
5. Salesforce AMPScript functions ([37:11](https://youtu.be/Ru4Qh__3xdA?t=2231))
6. Salesforce Journey Builder Activities ([41:31](https://youtu.be/Ru4Qh__3xdA?t=2491))

## Video

Video: [Salesforce Data in Journey Builder with MCC Webinar Recording](https://www.youtube.com/watch?v=Ru4Qh__3xdA)

> **Note: You Should Know**
>
> During the webinar I mentioned the surprising behaviour of Salesforce Data Entry in terms of injection to a Journey based on [this Knowledge Article](https://help.salesforce.com/s/articleView?id=000381146\&type=1).
>
> The actual logic for records that are not yet in the Salesforce Marketing Cloud Engagement (MCE, formerly Salesforce Marketing Cloud) is a bit more complex:
>
> | Email Opt Out | Email IS NULL | Email fails List Detective | Result                                                                               |
> | ------------- | ------------- | -------------------------- | ------------------------------------------------------------------------------------ |
> | False         | False         | False                      | Added to Journey, All Contacts and All Subscribers                                   |
> | False         | True          | False                      | Added to Journey and All Contacts (source = unspecified), but not to All Subscribers |
> | False         | False         | True                       | Added to Journey and All Contacts (source = unspecified), but not to All Subscribers |
> | True          | False         | False                      | Added to Journey, All Contacts and All Subscriber with Unsubscribed Status           |
> | True          | True          | False                      | **Not added to MCE**                                                                 |
> | True          | False         | True                       | **Not added to MCE**                                                                 |

## Materials

| 10 September 2024 | Salesforce Data in Journey Builder with Marketing Cloud Connect                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Recording         | [YouTube](https://www.youtube.com/watch?v=Ru4Qh__3xdA\&list=PL_o00w2Z5LYHVcq56BLpBfJHRAghLhHkI)                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Slides            | [PDF](https://github.com/MateuszDabrowski/mateuszdabrowski.pl/blob/master/static/pdf/%5B2024-09%5D%20SF%20CRM%20in%20Journey%20Builder%20with%20MCC.pdf)                                                                                                                                                                                                                                                                                                                                                                  |
| Articles          | [MCE MCC Integration Patterns](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/mcc-integration-patterns/)  Tim Ziter on [Salesforce Data Entry](https://handsonsfmc.com/how-to-create-a-salesforce-data-entry-event/)  Salesforce on [Salesforce Journey Builder Activities](https://help.salesforce.com/s/articleView?id=sf.mc_jb_sales_service_cloud_best_practices.htm\&type=5)  Rafał Wolsztyniak on [Data Bindings](https://sfmc.quest/data-binding-with-the-update-contact-activity/) |
