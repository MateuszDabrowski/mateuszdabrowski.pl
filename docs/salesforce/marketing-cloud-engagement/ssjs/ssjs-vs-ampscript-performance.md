# SSJS vs AMPScript Performance

> Should I use AMPScript or SSJS? Which is better? As always, it depends. Check the performance comparisons for various use cases.

Source: https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/ssjs/ssjs-vs-ampscript-performance/  
Author: Mateusz Dąbrowski  
Last updated: 2026-09-24  
Licence: CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)

There is much knowledge shared on blogs, social networks, and Stack Exchange in the Salesforce Marketing Cloud Engagement (MCE, formerly Salesforce Marketing Cloud) world. Frequently you will see some strong opinions on which scripting approach is best.

I decided to check some of those assumptions empirically. Some test results are obvious, and some might surprise you (just as they surprised me).

I split the article into two sections:

1. [Conclusions](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/ssjs/ssjs-vs-ampscript-performance/#conclusions) are the TL;DR of my tests. If you want quick high-level findings - go there.
2. [Performance Test Cases](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/ssjs/ssjs-vs-ampscript-performance/#performance-test-cases) are the nerdy part, where I describe the exact code used for each case and more dive into detailed outcomes that might give you a better basis for a decision on what to use.

> **Note: You Should Know**
>
> This article will be in constant Work In Progress state, as I plan to add new test cases and conclusions perpetually.
>
> Should you have any interesting idea for a test case - let me know!
>
> Next: speed comparison of mirrored SSJS Platform and Core functions.

## Conclusions

### AMPScript vs SSJS

For scripting in time-critical assets (Emails, SMS, Pushes), go with AMPScript. It is much more optimised for the most popular use cases in this space, which will make a difference when scaled for hundreds of thousands of executions.

For scripting in other assets (Landing Pages, Automation Studio), it depends on the use case. As a rule of thumb, AMPScript might be a bit more optimised, but for more complex projects, it lacks readability, flexibility and power (arrays, objects, try/catch, etc.). If you are building something simple - AMPScript might be the way to go. Otherwise, go with SSJS (or mix for optimisation).

### SSJS Best Practices

When splitting your SSJS code block, try not to do it within a long loop ([Code Block Breaking](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/ssjs/ssjs-vs-ampscript-performance/#code-block-breaking)).

However, if you find an out-of-the-box AMPScript function that does something requiring custom development on the SSJS side (ProperCase, SFDC integration), it might be worth to inject AMPScript into your SSJS. The impact of code splitting on execution time might be much smaller than that of the complex code necessary to replicate a function ([ProperCase](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/ssjs/ssjs-vs-ampscript-performance/#propercase)). For functions available in both languages, you should stay with the SSJS not to mix scripting contexts  ([LowerCase & UpperCase](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/ssjs/ssjs-vs-ampscript-performance/#lowercase--uppercase)).

## Methodology

The testing toolset is minimal by the nature of SSJS and AMPScript. I'm using a Cloud Page and `new Date().getTime();` to capture the execution's beginning and end. Within this scope, I run a [loop](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/ssjs/ssjs-loops/) with the code I want to test. Finally, I divide the total time by the number of loop iterations to get an average run time.

This approach means that the millisecond values I provide are in no way the exact times you can use to calculate the speed at scale. But they should be standardised enough to allow for meaningful comparison between various scenarios. The actual times also change a bit when we run the test multiple times, as the strain on MCE servers at the very moment of execution also has an impact. Focus less on exact milliseconds count and more on relations between the values.

In the test case descriptions, you can find additional details on the methodology: input used for the test, expected output, number of loop iterations or exact code tested.

> **Note: You Should Know**
>
> For testing the execution speed of AMPScript block solutions, I'm using the SSJS to start and stop the count. I compared it with calculation using AMPScript `FormatDate(Now(), 'ISO')`, and there was no meaningful difference between the two.

## Performance Test Cases

### Code Block Breaking

I wanted to test the cost of breaking out of a code block for both SSJS and AMPScript.

Understanding the execution time impact of the scripting context switch was necessary for me to make valid conclusions for future tests and help decide on the best approach when coding a personalisation solution.

#### Test Cases

**SSJS**

In this scenario, there is no context switch. I timed a pure SSJS loop to have a base for analysis.

```js
for (var i = 0; i < 10000; i++) {
    var a;
};
```

**SSJS + HTML**

In the next scenario, I added empty breaking out of SSJS within a loop.

```js
for (var i = 0; i < 10000; i++) {
    var b;
    </script>

    <script runat="server">
};
```

**SSJS + AMPScript**

Next, I pushed an AMPScript block within the break.

```js
for (var i = 0; i < 10000; i++) {
    </script>
    %%[
        VAR @c
    ]%%
    <script runat="server">
};
```

**AMPScript**

Then I put the for loop in the AMPScript context. As a result, the SSJS code block breaking impact count only once per 10 000 executions, making it irrelevant for the final average. It gives us another base for the next test.

```js
</script>
%%[
    FOR @current = 1 TO 10000 DO
        VAR @d
    NEXT @current
]%%
<script runat="server">

```

**AMPScript x2**

For the final scenario I decided to break out of AMPScript context within an AMPScript loop, as this is popular way for creating dynamic content in MCE.

```js
</script>
    %%[
    FOR @current = 1 TO 10000 DO
        VAR @e
        ]%%

        %%[
    NEXT @current
    ]%%
<script runat="server">
```

#### Outcomes (ms)

| SSJS   | SSJS + HTML | SSJS + AMPScript | AMPScript | AMPScript x2 |
| ------ | ----------- | ---------------- | --------- | ------------ |
| 0.0016 | 0.1453      | 0.1422           | 0.0015    | 0.0016       |

#### Sum Up

1. Breaking out of the SSJS code block is impacting execution time.
2. Breaking out of the AMPScript code block has close to none impact on execution time.

### ProperCase

What should you use when you want to change a string to Proper Case? As there is no single function in SSJS for that, I compared two pure SSJS approaches (`split`/`join` & `replace` with RegEx) with [AMPScript in SSJS](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/ssjs/snippets/ampscript-in-ssjs/) and (nearly) pure AMPScript.

The test was performed using ten different strings varying in number of words and capitalization:

```js
var sentences = [
    'one',                                      // 1
    'one Two',                                  // 2
    'one Two THREE',                            // 3
    'one Two THREE fOUR',                       // 4
    'one Two THREE fOUR FiVe',                  // 5
    'one Two THREE fOUR FiVe siX',              // 6
    'one Two THREE fOUR FiVe siX &',            // 7
    'one Two THREE fOUR FiVe siX & 8',          // 8
    'one Two THREE fOUR FiVe siX & 8 nine',     // 9
    'one Two THREE fOUR FiVe siX & 8 nine-ten'  // 10
];
```

All approaches output final sentence as: `One Two Three Four Five Six & 8 Nine-ten`

#### Test Cases

**SSJS Split**

```js
function toTitleCase(string) {
    var sentence = string.toLowerCase().split(" ");
    for (var i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    };
    sentence = sentence.join(" ");
    return sentence;
};

title = toTitleCase(testedString);
```

**SSJS Replace**

```js
title = testedString.replace(
    /[a-zA-Z]\S*/g,
    function(string) {
        return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase()
    }
);
```

**AMPScript in SSJS**

```js
function ampScript(code) {
    var ampBlock = '\%\%[' + code + ']\%\%';
    Platform.Function.TreatAsContent(ampBlock);
    return Variable.GetValue('@response');
};

title = ampScript("SET @response = ProperCase('" + testedString + "')");
```

**AMPScript**

```js
%%[
SET @response = ProperCase(@sentence)
]%%
```

#### Outcomes (ms)

| Sentence | SSJS Split | SSJS Replace | AMPScript in SSJS | AMPScript |
| -------- | ---------- | ------------ | ----------------- | --------- |
| 1        | 0.0968     | 0.0782       | 0.3686            | 0.0032    |
| 2        | 0.1376     | 0.1186       | 0.3688            | 0.0032    |
| 3        | 0.175      | 0.1594       | 0.3874            | 0.0032    |
| 4        | 0.2218     | 0.2032       | 0.375             | 0.0062    |
| 5        | 0.2562     | 0.247        | 0.3686            | 0.0064    |
| 6        | 0.2968     | 0.2812       | 0.372             | 0.0062    |
| 7        | 0.3344     | 0.2844       | 0.375             | 0.003     |
| 8        | 0.372      | 0.2874       | 0.372             | 0.003     |
| 9        | 0.4126     | 0.3312       | 0.3718            | 0.0064    |
| 10       | 0.4124     | 0.342        | 0.375             | 0.0064    |

#### Sum Up:

1. Pure AMPScript execution time for ProperCase scenario murders SSJS.
2. When working with arrays or regex replace, SSJS execution time extends with each additional word. However, AMPScript execution time is constant thanks to the optimised out-of-the-box `ProperCase` function.
3. Although [AMPScript in SSJS](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/ssjs/snippets/ampscript-in-ssjs/) is doing levels-of-magnitude worse than pure AMPScript, it will be a better choice then pure SSJS for long sentences (10+ words).
4. SSJS Replace might be the option to choose despite the performance if you want more flexibility (for example, changing that `Nine-ten` to `Nine-Ten`).
5. Otherwise, for anything longer than a few words, consider [breaking from the SSJS code block](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/ssjs/ssjs-vs-ampscript-performance/#code-block-breaking) to leverage AMPscript.

### LowerCase & UpperCase

Based on the [Proper Case](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/ssjs/ssjs-vs-ampscript-performance/#propercase) scenario's exciting outcomes, I decided to follow up on that with a performance comparison on a function that is available out-of-the-box in both SSJS and AMPScript. For testing, I used sibling string modification - Lower Case.

The test was performed using ten different strings varying in number of words and capitalization (same as for Proper Case):

```js
var sentences = [
    'one',                                      // 1
    'one Two',                                  // 2
    'one Two THREE',                            // 3
    'one Two THREE fOUR',                       // 4
    'one Two THREE fOUR FiVe',                  // 5
    'one Two THREE fOUR FiVe siX',              // 6
    'one Two THREE fOUR FiVe siX &',            // 7
    'one Two THREE fOUR FiVe siX & 8',          // 8
    'one Two THREE fOUR FiVe siX & 8 nine',     // 9
    'one Two THREE fOUR FiVe siX & 8 nine-ten'  // 10
];
```

All approaches output final sentence as: `one two three four five six & 8 nine-ten`

#### Test Cases

**SSJS Method**

```js
title = testedString.toLowerCase();
```

**SSJS Function**

This approach doesn't make sense but gives an idea of the impact of using function vs method.

```js
function toLowerCase(string) {
    var sentence = string.toLowerCase();
    return sentence;
};
title = toLowerCase(sentences[a]);
```

**AMPScript in SSJS**

```js
function ampScript(code) {
    var ampBlock = '\%\%[' + code + ']\%\%';
    Platform.Function.TreatAsContent(ampBlock);
    return Variable.GetValue('@response');
};

title = ampScript("SET @response = LowerCase('" + testedString + "')");
```

**AMPScript**

```js
%%[
SET @response = LowerCase(@sentence)
]%%
```

#### Outcomes (ms)

| Sentence | SSJS Method | SSJS Function | AMPScript in SSJS | AMPScript |
| -------- | ----------- | ------------- | ----------------- | --------- |
| 1        | 0.014       | 0.0203        | 0.3625            | 0.0032    |
| 2        | 0.0125      | 0.0187        | 0.3625            | 0.0031    |
| 3        | 0.0125      | 0.0188        | 0.3625            | 0.0031    |
| 4        | 0.0125      | 0.0188        | 0.3687            | 0.0016    |
| 5        | 0.0125      | 0.0187        | 0.3641            | 0.0015    |
| 6        | 0.0125      | 0.0188        | 0.3641            | 0.0031    |
| 7        | 0.0125      | 0.0187        | 0.3625            | 0.0032    |
| 8        | 0.0125      | 0.0187        | 0.3672            | 0.0031    |
| 9        | 0.0125      | 0.0204        | 0.3593            | 0.0032    |
| 10       | 0.014       | 0.0203        | 0.3625            | 0.0016    |

#### Sum up

1. The out-of-the-box JavaScript method works much better then the custom solution developer for [Proper Case](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/ssjs/ssjs-vs-ampscript-performance/#propercase) - just like the AMPScript function, it executes in constant time regardless of sentence length.
2. Pure AMPScript execution time still is better, but due to constant time in both languages and much faster SSJS speed, there is no longer any reason to use [AMPScript in SSJS](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/ssjs/snippets/ampscript-in-ssjs/) or [break out of SSJS code block](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/ssjs/ssjs-vs-ampscript-performance/#code-block-breaking).
