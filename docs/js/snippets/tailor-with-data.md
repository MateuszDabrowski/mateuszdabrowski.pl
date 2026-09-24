# Tailor the experience with data logic

> Everyone and his boss are talking about personalisation. Most stop at tailoring the content. Don't be that person. Utilise the power of simple data logic and control the user flows.

Source: https://mateuszdabrowski.pl/docs/js/snippets/tailor-with-data/  
Author: Mateusz Dąbrowski  
Last updated: 2026-09-24  
Licence: CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)

## Outline

1. [Review the use cases possible thanks to the tailored data logic](https://mateuszdabrowski.pl/docs/js/snippets/tailor-with-data/#leverage-the-data)
2. [Check easy to implement script examples](https://mateuszdabrowski.pl/docs/js/snippets/tailor-with-data/#script-your-solution)
3. [Create personalisation fueled conditional user flows](https://mateuszdabrowski.pl/docs/js/snippets/tailor-with-data/#create-conditional-logic)

## Leverage the data

Most Marketing Automation tools allow you to use the contact and account data for personalisation. Are you inserting a user-specific value from a data model to landing page or email? Creating custom content tailored to the user? Easy and simple. [Eloqua](https://www.oracle.com/marketingcloud/products/marketing-automation/ "Oracle Eloqua Marketing Automation Platform")'s [Field Merges](https://docs.oracle.com/cloud/latest/marketingcs_gs/OMCAA/Help/FieldMerges/FieldMerges.htm "Field Merge Documentation") or [Marketing Cloud Engagement](https://www.salesforce.com/eu/products/marketing-cloud/overview/ "Salesforce Marketing Cloud Platform")'s personalisation strings. But you can do so much more!

### Change the structure of the landing page

Part of your subscription centre should be visible only to your clients? Instead of creating and managing two separate pages, you can use personalisation to check whether the visitor has any license and unhide product-related data & subscription section.

### Create a genuinely dynamic form

Not keen on asking your customers, again and again, the same questions in your content form? Use personalisation to hide form fields that won't give you new knowledge. The shorter the form, the better.

### Enrich your data

You got multi picklist storing information on topics that are interesting to your customers? Want to use whitepaper download form to add such data point? Sure, all Marketing Automation Platforms have form processing that will be able to append such value. But unfortunately, in most, you won't be able to check whether it will result in a duplicate data point. You guessed it, personalisation with a simple script can fix it.

## Script your solution

Time to create a script that will solve the problems mentioned above. Firstly, you will need to pull from your data model.

**Salesforce Marketing Cloud**

For Marketing Cloud Engagement (MCE, formerly Salesforce Marketing Cloud), the easiest way is to use the personalisation string. The code is straightforward:

```html
<ctrl:field name=ProfileAttributeName />
```

The only thing you need is the name of the Profile Attribute or Data Extension field. It gets a bit more elaborate if you want to leverage other sources, but still viable. You can use the Lookup function for non-sendable Data Extensions. You can even dig into Salesforce Objects with a bit of AMPScript.

**Oracle Eloqua**

For Eloqua, the easiest way is to use the Field Merge. The code is straightforward:

```html
<span class=eloquaemail>​Field_Merge_Name1​</span>
```

The only thing you need is the Field Merge name. Unfortunately, you can not add the asset name, as Eloqua is using in the code the automatically created HTML name.

In most cases it is very similar to the original Field Merge name, in some - like Field Merge created by copying another one - can be a surprise. To be sure you have the correct name I recommended creating an empty HTML landing page and drag and drop the Field Merge onto HTML editor. It will add whole needed code for you.

To create a script that will allow for three use cases mentioned in the first part of the post, we need one more thing - an `id` attribute. Some elements will already have it (for example, in Eloqua each form field exists in separate div element: `<div id='formElement1' ...>`). For others, you will have to add it to the HTML manually.

> **Note: You Should Know**
>
> You are not limited to the `id` attribute. Leverage any attribute and capture it with [DOM selectors](https://mateuszdabrowski.pl/docs/js/js-dom/), like `document.querySelector()` or `document.querySelectorAll()`. For example, capturing `class` is great to change multiple related parts of the website at once.

With personalisation code and value of the `id` attribute at hand, we can start the (short) scripting.

### Hiding elements on the website

**Salesforce Marketing Cloud**

```html title="Hide element with id='idName' if viewers EmailOptedIn attribute has value 'True'"
<script>
    window.addEventListener('load', () => { // 1.
        if ('<ctrl:field name=EmailOptedIn />' === 'True') { // 2.
            document.querySelector('#idValue').display = 'none'; // 3.
        };
    };
</script>
```

**Oracle Eloqua**

```html title="Hide element with id='idName' if viewers EmailOptedIn field has value 'True'"
<script>
    window.addEventListener('load', () => { // 1.
        if ('<span class=eloquaemail>EmailOptedIn1</span>' === 'True') { //2.
            document.querySelector('#idValue').display = 'none'; // 3.
        };
    };
</script>
```

Above script has three important lines that deserve some explanation.

First one uses [Event Listener](https://mateuszdabrowski.pl/docs/js/js-dom/#addeventlistener) to launch the logic only after the whole page loaded. It is essential, as it guarantees that the browser already rendered the website element you want to hide.

Next is the `if` statement. It evaluates the data model value received via personalisation (left side of ==) with another value we choose (right side of ==). In this case, it checks whether Email Opted In for a particular user is set to True (names and values may differ in your data model).

The third line looks for an HTML element with id equal to `'idValue'` and hides it from the user.

> **Note: You Should Know**
>
> You can adapt this script to do almost anything. Once you have your element selected with `querySelector` you can programmatically [change its value](https://mateuszdabrowski.pl/docs/js/js-dom/#changing-attributes), add or remove a class from it to impact the CSS applied or even create new elements around it.

With this script, you can both modify the structure of your landing page and alter the form fields (or even just form field options) visible for the user. Hide some elements, show other, change the style of a web element to make it more prominent on the website. But that's not all!

### Changing elements on the website

For our data enrichment use case, we will need to alter the script slightly.

**Salesforce Marketing Cloud**

```html title="Change value of a hidden form field if Profile Attribute value includes 'Tax'"
<script>
    window.addEventListener('load', () => { // 1.
        const regexSearchValue = /Tax/; // 2.
        if (regexSearchValue.test('<ctrl:field name=Interests />')) { // 3.
            document.querySelector('#alreadyInterested').value = 'True'; // 4.
        };
    };
</script>
```

**Oracle Eloqua**

```html title="Change value of a hidden form field if Field Merge value includes 'Tax'"
<script>
    window.addEventListener('load', () => { // 1.
        const regexSearchValue = /Tax/; // 2.
        if (regexSearchValue.test('<span class=eloquaemail>Interests1</span>')) { // 3.
            document.querySelector('#alreadyInterested').value = 'True'; // 4.
        };
    };
</script>
```

In this scenario, we have a multi picklist field `Interests` that captures what fascinates specific customer. If he is captivated by more than one topic, the names are semicolon-separated. A nice marketing tactic is to enrich this list each time the customer engages with something directly related to a particular topic. For example, downloads your new whitepaper.

In most Marketing Automation Platforms, it is straightforward to append a value to a column. Simple adding, however, leads to a (quite big) possibility of having duplicates. And this is neither good from the data quality perspective nor field length compliance.

So how to use the above script to enrich your data cleanly? We will need a hidden form field inside the whitepaper download form. In the HTML look for (or create) hidden field input (`<input id='alreadyInterested' type='hidden' ...>`). The `id` attribute will be useful again.

You already know the first line from the previous section. The new things come next. We declare value we want to check in our data model picklist. In this example, we will test whether the user is already interested in Tax topic. The `/` before and after the word are special characters used for a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions "MDN Documentation on Regular_Expressions").

The third line is the fastest way to check whether the declared value is already in the `Interests` field.

Finally, in case of the value already being in the multi picklist, we put True inside the hidden form field. It enables us to enforce on form processing to append new interest conditionally - only if the hidden field is blank in the submission data.

## Create conditional logic

Simple manipulation of visibility and values on your landing page is just beginning. You can get even more out of scripted-backed personalisations and take control over user & data flows.

Looking for an excellent way to tell your Google Analytics whether the user just downloaded a whitepaper or did he also wanted to receive product presentation on top of that? Not keen on creating two mirror-like Thank You pages with different conversion script? Sure!

**Salesforce Marketing Cloud**

Your form processing page should append date stamp to a data model field in case of the user becoming a lead (asking for a product presentation). This data, apart from being a great source of knowledge for your lead reporting and data processing trigger, will be handy for this solution.

```html
<script>
    const leadCreationDate = '<ctrl:field name=leadCreationDate />';
    if (Date.now() - new Date(leadCreationDate) < 93600000) {
        dataLayer.push({
            // Your Lead conversion dataLayer model
        });
    } else {
        dataLayer.push({
            // Your Whitepaper conversion dataLayer model
        });
    }
</script>
```

**Oracle Eloqua**

Your form should have a processing step that appends date stamp to a data model field in case of the user becoming a lead (asking for a product presentation). This data, apart from being a great source of knowledge for your lead reporting and data processing trigger, will be handy for this solution.

```html
<script>
    const leadCreationDate = '<span class=eloquaemail>LeadCreationTriggerDate1</span>';
    if (Date.now() - new Date(leadCreationDate) < 93600000) {
        dataLayer.push({
            // Your Lead conversion dataLayer model
        });
    } else {
        dataLayer.push({
            // Your Whitepaper conversion dataLayer model
        });
    }
</script>
```

Why? Because once you have this script on your Thank You page, you can check how distant in the past the personalised date is. And if it is within minutes, you can be pretty sure the user just became your lead. Which tells the script to push the lead conversion data layer instead of the whitepaper data layer. Simple and quick.

Remember to take into consideration the difference between local time and server time, which might play a role depending on the Marketing Automation Platform and configuration.

### Possibilities are endless.

Want to be sure only recognised users will enter your subscription centre?

**Salesforce Marketing Cloud**

Add email address or contact key personalisation. If it is empty, it means Marketing Cloud Engagement did not recognise this user. JavaScript can automatically redirect him to your subscription centre entry form that will take care of authorization.

```js
 if ('<ctrl:field name="Email Address" />' == '') {
    window.location.replace(​'https://redirect.here')
}
```

Want to double-check by querying the Salesforce Core? Add API call within the condition. You can also push some information from a data extension, or profile attributes to an external page. Personalise that data and use JavaScript to append it to redirect link as a query string or send it as a payload within POST call. Imagination is the only limit.

**Oracle Eloqua**

Add email address Field Merge. If it is empty, it means Eloqua did not recognise this user. JavaScript can automatically redirect him to your subscription centre entry form that will take care of authorization.

```js
if ('<span class=eloquaemail>​EmailAddress​</span>' == '') {
    window.location.replace(​'https://redirect.here')
}
```

Want to push some information from a data model to an external page? Field Merge that data and use JavaScript to append it to redirect link as a query string.

You can get even more power with using dynamic content (perfect for simplifying javascript logic) or web data lookups (allows you to leverage email group subscription, shared list audience › even on external websites). Imagination is the only limit.
