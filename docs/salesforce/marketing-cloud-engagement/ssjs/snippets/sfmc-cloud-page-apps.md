# Solve with Cloud Page Apps

> Create micro applications tailored to your organisation needs using only Salesforce Marketing Cloud Engagement features.

Source: https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/ssjs/snippets/sfmc-cloud-page-apps/  
Author: Mateusz Dąbrowski  
Last updated: 2026-09-24  
Licence: CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)

## Cloud Page Apps: what and why

### When out-of-the-box features are not enough

Salesforce MCE (Marketing Cloud Engagement, formerly Salesforce Marketing Cloud) offers a multitude of options. With all the Studios, Builders, and other Salesforce-ecosystem cross-sells, you can deliver nearly anything. Nearly.

There will always be some business processes or requirements that are too niche or too unique to be covered out-of-the-box. Sometimes they can be delivered with what is available after some compromises. Sometimes only custom development can help.

Depending on the use case and company resources, you can overcome such challenges in two ways. By shopping at AppExchange - Salesforce App Store with 3rd Party solutions - or by building a custom application connected to MCE with APIs (for example, leveraging yet another Salesforce product - Heroku).

AppExchange might be a great idea if you can find a product solving your problem, but it will add a recurring cost to your budget. On the other hand, a fully-fledged custom application might deliver precisely what you need but create considerable up-front cost (in either money for external developers or time for an in-house team) and require maintenance.

There is, however, the third path. One that can be perfect if you have a necessary but relatively small requirement for internally used power-up and would instead go lean on both budget and time — MCE micro application.

### Out-of-the-box approach to out-of-the-box feature

Marketing Cloud Engagement micro application offers AppExchange-style deep integration with MCE platform and solution flexibility of custom development. In short, it is an application hosted on a Cloud Page and available via the main menu of MCE. A Cloud Page App.

The good? You can use MCE programmatic languages (SSJS and AMPScript) with all their nifty built-in functions to control the assets and behaviours of the MCE platform and connected Sales & Service Clouds. You can also leverage the APIs to gather even more power and pull external logic and data. All this without having to care about hosting, scaling and integration. Available directly from the MCE menu. And cost? Just a super message for loading a Cloud Page.

The bad? It is suitable for relatively simple apps. Think about a single front-end page powered by an SSJS or AMPScript backend on a [Code Resource](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/code-resource/). Of course, you can try to build something more complex, but you may quickly get into a place where the whole endeavour would have been easier with an outside-hosted application.

## Build your dream

So what can you do with such a solution? Possibilities are endless, but to share a few use cases:

- MCE Asset Viewer that allows you to quickly locate, for example, a Data Extension or Content asset.
- Data Extension Analyzer for quick data analysis or even visualisation of values from a selected Data Extension.
- KPI Dashboard displaying the most critical data for understanding your communication's current state - or even related data from Sales or Service Cloud imported using functions enabled by Marketing Cloud Connect.
- Deliverability Dashboard pulling data from MCE and external deliverability monitoring and alerting tools.
- Documentation or FAQ related to your company processes and best practices that everyone should follow when building customer experience through MCE.
- Templated Journey creator to deploy tested flows for most used campaigns in a single click.

Anything related to MCE that you wish could be a bit more automated or easy can be a good idea for a micro application approach.

## Cloud Page Apps step by step

### Create your first MCE micro application

Implementation is very straightforward, and you can do it in few minutes:

1. Create a simple Cloud Page (blank page with a "Hello World" will do the job for now).
2. Publish it and copy the URL of the Cloud Page.
3. Go to MCE Setup -> Apps -> Installed Packages and create a New Package.
4. Add a `Marketing Cloud App` Component to the Package and paste the Cloud Page URL in both Endpoint fields and Save.

That's all. You just created your first Marketing Cloud Engagement micro application. Refresh MCE to see it available in the main menu under the AppExchange icon. Now it's time to build up your solution to solve the business need.

### A Good application is a secure application

Your micro application is now available from the MCE menu. But unfortunately, it can also be accessed from any other place, as it is still just a simple Cloud Page. It is, of course, not ideal. You don't want random people to access your API-fueled solution.

#### API Integration Component

Thankfully, you can leverage the already created Installed Package to secure the micro application cleanly. To do so, add yet another Component to the Package - this time, you will need API Integration one. Select Web App integration type and paste your micro application Cloud Page URL to the Redirect URI field.

You don't need to select anything in the Scope to secure your micro application. But if you plan on using the API calls, feel free to choose the required areas now. If you only want to leverage built-in SSJS and AMPScript functions, keep them unchecked.

Once you save the Component, you will see that your Installed Package API Component now lists: `Client Id`, `Client Secret`, and `API Base URI`. Copy those, as you will need them in the next step.

> **Note: You Should Know**
>
> After you create your Installed Package, three base URI's are available - Authentication, REST and SOAP. After the `https://`, all of them have a common alphanumeric string with hyphens unique to your MCE. I copy only this part to build any endpoint necessary for the application.
>
> For example, for `https://abcdefghi-jklmnoprst-123456.auth.marketingcloudapis.com/`, the `API Base URI` is `abcdefghi-jklmnoprst-123456`.

#### API Authorisation

With the above pre-work completed, you can use SSJS or AMPScript on your Cloud Page to redirect to the `v2/authorize` endpoint of your Authentication Base URI before loading. It will require any visitor to log into your MCE to load your micro application. What's even better, it will automatically load it for users already logged in (micro Single Sign-On).

You will need to pass `Client Id` and `Cloud Page URL` (for redirect after successful login) as query parameters to your authorisation redirect. Another necessary thing is Response Type equal to code. Finally, you can pass a State. The value of this parameter will be available after the redirect. It is excellent for recognising whether someone opened your micro application before (no state) or after (available state) logging in.

**SSJS**

```js {7} title="API Authentication Flow"
var appURL = 'APP_CLOUD_PAGE_URL';
var clientID = 'CLIENT_ID';
var clientSecret = 'CLIENT_SECRET';
var clientBase = 'API_BASE_URI';
var state = GUID();

Platform.Response.Redirect('https://' + clientBase + '.auth.marketingcloudapis.com/v2/authorize?response_type=code&client_id=' + clientID + '&redirect_uri=' + appURL + '&state=' + state);
```

**AMPScript**

```js {9-13} title="API Authentication Flow"
VAR @clientID, @clientSecret, @clientBase, @appURL, @state, @requestURL

SET @clientID = 'CLIENT_ID'
SET @clientSecret = 'CLIENT_SECRET'
SET @clientBase = 'API_BASE_URI'
SET @appURL = 'APP_CLOUD_PAGE_URL'
SET @state = GUID()

SET @requestURL = Concat(
    'https://', @clientBase, '.auth.marketingcloudapis.com/v2/authorize',
    '?response_type=code&client_id=', @clientID,
    '&redirect_uri=', @appURL, '&state=', @state)
Redirect(@requestURL)
```

#### API Authentication with Token

Once your micro application refreshes after authorisation, you can get the code query string parameter with SSJS or AMPScript function and use it to make a POST API call to Authentication Base URI - this time to `v2/token` endpoint. As the code from the authorisation endpoint is required in the payload, the fact of receiving the token in the response will validate that the visitor is eligible to access the micro application and use it.

**SSJS**

```js {15} title="API Token Authorisation Flow"
var appURL = 'APP_CLOUD_PAGE_URL';
var clientID = 'CLIENT_ID';
var clientSecret = 'CLIENT_SECRET';
var clientBase = 'API_BASE_URI';

var code = Platform.Request.GetQueryStringParameter('code');
var payload = {
    grant_type: 'authorization_code',
    code: code,
    client_id: clientID,
    client_secret: clientSecret,
    redirect_uri: appURL
};

var response = HTTP.Post('https://' + clientBase + '.auth.marketingcloudapis.com/v2/token', 'application/json', Stringify(payload));

if (response.StatusCode == 200) {
    var parsedResponse = Platform.Function.ParseJSON(response.Response[0]);
    var accessToken = parsedResponse.access_token;
    var tokenExpire = Platform.Function.SystemDateToLocalDate(Platform.Function.Now());
    tokenExpire.setMinutes(tokenExpire.getMinutes() + 18);
};

```

> **Note: You Should Know**
>
> If you want to use the token for API in the context of a specific Business Unit, add `account_id: businessUnitMID,` to the `payload` to get the right token. Otherwise you will get autorization errors on API calls.

**AMPScript**

```js {19-21} title="API Token Authorisation Flow"
VAR @clientID, @clientSecret, @clientBase, @appURL, @code, @requestURL, @token, @tokenResponse, @tokenResponseRows

SET @clientID = 'CLIENT_ID';
SET @clientSecret = 'CLIENT_SECRET';
SET @clientBase = 'API_BASE_URI';
SET @appURL = 'APP_CLOUD_PAGE_URL';
SET @code = RequestParameter('code');

SET @requestURL = Concat('https://', @clientBase, '.auth.marketingcloudapis.com/v2/token');

SET @payload = Concat(
    '{"grant_type": "authorization_code", ',
    '"code": "', @code, '",',
    '"client_id": "', @clientID, '",',
    '"client_secret": "', @clientSecret, '",',
    '"redirect_uri": "', @appURL, '"}'
)

HTTPPost2(@requestURL, 'application/json', @payload, false, @tokenResponse, @tokenResponseRows)
/* A failed request continues (false above), so only a response that carries an access token proves the sign-in */
SET @token = RegExMatch(@tokenResponse, '"access_token"\s*:\s*"(?<token>[^"]+)"', 'token')
```

> **Note: You Should Know**
>
> If you want to use the token for API in the context of a specific Business Unit, add `'"account_id": "', @businessUnitMID, '",',` to the `@payload` to get the right token. Otherwise you will get autorization errors on API calls.

This way, you just added a micro Single Sign-On feature that is as secure as your MCE. And that's not all! As now only your MCE users can access the application, you can leverage the Installed Package Access tab to control who will see your solution in the main menu.

Now you have a secure, SSO-enabled micro application deeply integrated with MCE ready to solve your business needs and power up your Marketing Team.

> **Note: You Should Know**
>
> Adding this micro SSO process blocks Web Studio from loading the Cloud Page in Preview. During development, you either have to comment out the SSO or validate the changes only by publishing and checking in the Cloud Page App directly.
>
> It also increases the cost of using the micro application from 1 Super Message per use to 2, due to Cloud Page refresh during authorization.

#### Capture your Cloud Page App usage

We can also add a logging solution that will store session and log app use history. We will need a Data Extension (one can serve multiple Cloud Page Apps) and a bit more code around the above snippets.

Create Data Extension with the following structure (`session` column being the Primary Key):

| Name        | DataType | Default Value | Length | Nullable |
| ----------- | -------- | ------------- | ------ | -------- |
| 🔑 session  | Text     |               | 50     | No       |
| appName     | Text     |               | 100    | Yes      |
| createdDate | Date     | Current date  |        | Yes      |
| token       | Text     |               | 520    | Yes      |
| tokenExpire | Date     |               |        | Yes      |
| userName    | Text     |               | 100    | Yes      |
| userEmail   | Text     |               | 254    | Yes      |

As for data retention, one day for Individual Records is enough for authorisation purposes. However, you can extend it for logging history purposes. Keep in mind that the more data stored, the slower the Data Extension operations speeds. Pushing data to this table is straightforward:

**SSJS**

```js title="Fill Cloud Page App Logging Data Extension"
var session = GUID(); /* never reuse the OAuth state as the session id */
Platform.Function.UpsertData(authDE, ['session'], [session], ['appName', 'token', 'tokenExpire'], [appName, accessToken, tokenExpire]);
```

**AMPScript**

```js title="Fill Cloud Page App Logging Data Extension"
SET @session = GUID() /* never reuse the OAuth state as the session id */
UpsertData(@authDE, 1, 'session', @session, 'appName', @appName, 'token', @token, 'tokenExpire', DateAdd(Now(), 18, 'MI'))
```

> **Warning: Keep the session secret**
>
> The session id is the credential of your Cloud Page App: anyone who knows a live one can use the app as its owner. Mint it with `GUID()` after the token exchange and never reuse the OAuth `state` for it. Whoever starts a sign-in knows its `state`, and could send the authorize link to a colleague who is logged in to MCE, then use the colleague's session.
>
> The logging Data Extension holds session ids and tokens, and every user with Data Extension access in the Business Unit can read it. Keep it in a folder only admins browse, with the one-day retention above.

It will additionally allow you to safely split your application into the front end (Cloud Page) and back end (Code Resource) to improve user experience and optimise speed and cost.

### Secured Cloud Page App Template

By considering all the above, we get a robust and secure template for our Cloud Page Apps:

**SSJS**

```js title="Full Cloud Page App Template"
<script runat="server">
    /* -------------------------------------------------------------------------

    Authenticates each visitor to limit access only to SFMC logged-in users.

    1. Global Variables
    2. Helper Functions
        2.1. Debugging
        2.2. Error handling
    3. Authentication Flow
        3.1. Authorisation
        3.2. Authentication with REST Token
            3.2.1. Build token request payload
            3.2.2. Request the token
            3.2.3. Destructure the response
            3.2.4 Get User Details
            3.2.5. Upsert Logging Data Extension
            3.2.6. Mark the visitor as authenticated
            3.2.7. Handle authentication error
        3.3. Authorisation Error
    4. Protected content (rendered only for authenticated visitors)

    -------------------------------------------------------------------------- */

    Platform.Load('core', '1');

    /* ----------------------------------------------------------------------- */
    /* ---------------------- 1. GLOBAL VARIABLES ---------------------------- */
    /* ----------------------------------------------------------------------- */

    var debugging = false;
    var appName = 'CLOUD_APP_NAME';
    var appURL = 'APP_CLOUD_PAGE_URL';

    var clientID = 'CLIENT_ID';
    var clientSecret = 'CLIENT_SECRET';
    var clientBase = 'API_BASE_URI';
    var authDE = 'AUTHENTICATION_DATA_EXTENSION';

    var state = Platform.Request.GetQueryStringParameter('state');

    var errorMessage = Platform.Request.GetQueryStringParameter('error');
    var errorDescription = Platform.Request.GetQueryStringParameter('error_description');
    var errorDE = 'ERROR_DATA_EXTENSION';
    var errorURL = 'ERROR_CLOUD_PAGE_URL';

    /* ----------------------------------------------------------------------- */
    /* ---------------------- 2. HELPER FUNCTIONS ---------------------------- */
    /* ----------------------------------------------------------------------- */

    /* ---------------------- 2.1. Debugging --------------------------------- */

    /**
    * @function debugValue
    * @description Outputs provided description and SSJS value to front-end in a type-safe & consistent way
    * @param {string} description - Describes meaning of the second parameter in the output
    * @param {*} value - The value that needs to be debugged
    */
    function debugValue(description, value) {
        Write(htmlEscape(description + ': ' + (typeof value == 'object' ? Stringify(value) : value)) + '<br><br>');
    };

    /* ---------------------- 2.2. Error handling ---------------------------- */

    /**
    * @function handleError
    * @description Adds the error with context to error logging Data Extension and redirects to error page.
    * @param {Object} error - The caught error object. Can come from the try/catch block or be manually created.
    * @param {string} error.message - First error key stores short error message describing the issue.
    * @param {string} error.description - Second error key stores detailed error path helping with root cause analysis
    */
    function logError(error) {
        // Remember that if your Logging Data Extension is in Shared Folder, you need to add the "ENT." prefix to name
        try {
            Platform.Function.InsertData(errorDE, ['id', 'appName', 'errorMessage', 'errorDescription'], [GUID(), appName, String(error.message).substring(0, 2000), String(error.description).substring(0, 2000)]);
        } catch (logFailure) {
            // A failed log write must never hide the original error
        };
    };

    function handleError(error) {
        if (debugging) {
            debugValue('Found error', error);
        } else {
            logError(error);
            Platform.Response.Redirect(errorURL + '?error=' + encodeParam(error.message) + '&error_description=' + encodeParam(error.description));
        };
    };
    /**
    * @function encodeParam
    * @description Percent-encodes a value for a URL query string (UTF-8, RFC 3986 unreserved characters kept).
    * @param {*} value
    * @returns {string}
    */
    function encodeParam(value) {
        var text = String(value == undefined ? '' : value);
        var hex = '0123456789ABCDEF';
        var result = '';
        for (var i = 0; i < text.length; i++) {
            var ch = text.charAt(i);
            var code = text.charCodeAt(i);
            if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122) || (code >= 48 && code <= 57) || ch == '-' || ch == '_' || ch == '.' || ch == '~') {
                result += ch;
            } else {
                var bytes = code < 128 ? [code] : (code < 2048 ? [0xC0 | (code >> 6), 0x80 | (code & 0x3F)] : [0xE0 | (code >> 12), 0x80 | ((code >> 6) & 0x3F), 0x80 | (code & 0x3F)]);
                for (var b = 0; b < bytes.length; b++) {
                    result += '%' + hex.charAt((bytes[b] >> 4) & 0xF) + hex.charAt(bytes[b] & 0xF);
                }
            }
        }
        return result;
    };

    /**
    * @function htmlEscape
    * @description Escapes a value for safe output into HTML.
    * @param {*} value
    * @returns {string}
    */
    function htmlEscape(value) {
        return String(value == undefined ? '' : value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    };

    /**
    * @function isSessionId
    * @description True when the value has the shape of a GUID, which is the only shape a session id or state can take.
    * @param {*} value
    * @returns {boolean}
    */
    function isSessionId(value) {
        return value != undefined && /^[0-9a-fA-F-]{36}$/.test(String(value));
    };

    /**
    * @function isExpired
    * @description Compares a tokenExpire value (Date or date string, depending on how the platform returns it) with now.
    * @param {*} tokenExpire
    * @returns {boolean} true when the value is missing, unreadable or in the past
    */
    function isExpired(tokenExpire) {
        var expireDate = typeof tokenExpire == 'string' ? new Date(tokenExpire) : tokenExpire;
        if (expireDate == undefined || isNaN(expireDate.getTime())) return true;
        return Platform.Function.SystemDateToLocalDate(Platform.Function.Now()).getTime() > expireDate.getTime();
    };

    /* ----------------------------------------------------------------------- */
    /* ---------------------- 3. AUTHENTICATION FLOW ------------------------- */
    /* ----------------------------------------------------------------------- */

    /* ---------------------- 3.1. Authorization ----------------------------- */

    if (!state && !errorMessage) {
        state = GUID();
        Platform.Response.Redirect('https://' + clientBase + '.auth.marketingcloudapis.com/v2/authorize?response_type=code&client_id=' + clientID + '&redirect_uri=' + encodeParam(appURL) + '&state=' + state);

        /* ---------------------- 3.2. Authentication ---------------------------- */

    } else if (state && !errorMessage && !isSessionId(state)) {
        handleError({ message: 'Invalid sign-in request', description: 'The state parameter is not a valid GUID.' });

    } else if (state && !errorMessage) {
        /* 3.2.1. Build token request payload */
        var code = Platform.Request.GetQueryStringParameter('code');
        var payload = {
            grant_type: 'authorization_code',
            code: code,
            client_id: clientID,
            client_secret: clientSecret,
            redirect_uri: appURL
        };
        /* 3.2.2. Request the token */
        var response = HTTP.Post('https://' + clientBase + '.auth.marketingcloudapis.com/v2/token', 'application/json', Stringify(payload));
        /* 3.2.3. Destructure the response */
        if (response.StatusCode == 200) {
            var parsedResponse = Platform.Function.ParseJSON(response.Response[0]);
            var accessToken = parsedResponse.access_token;
            var tokenExpire = Platform.Function.SystemDateToLocalDate(Platform.Function.Now());
            tokenExpire.setMinutes(tokenExpire.getMinutes() + 18);

            /* 3.2.4. Get User Details */
            response = HTTP.Get('https://' + clientBase + '.auth.marketingcloudapis.com/v2/userinfo', ['Authorization'], ['Bearer ' + accessToken]);
            if (debugging) debugValue('UserInfo Response', response)
            var userName = Platform.Function.ParseJSON(response.Content).user.name;
            var userEmail = Platform.Function.ParseJSON(response.Content).user.email;

            /* 3.2.5. Upsert Authentication Logging Data Extension.
               The row is keyed by a fresh session id minted here, never by `state`: whoever starts
               the sign-in knows `state`, so it must never identify the signed-in user. */
            var session = GUID();
            Platform.Function.UpsertData(authDE, ['session'], [session],
                ['appName', 'token', 'tokenExpire', 'userName', 'userEmail'],
                [appName, accessToken, tokenExpire, userName, userEmail]
            );

            /* 3.2.6. Mark the visitor as authenticated for the AMPscript gate around the content below */
            Variable.SetValue('@appAuthenticated', 'true');

            /* 3.2.7. Handle authentication error */
        } else {
            handleError({ message: 'Authentication Failed', description: 'Status: ' + response.StatusCode })
        };

        /* ---------------------- 3.3. Authorization Error ----------------------- */

    } else {
        handleError({ message: errorMessage, description: errorDescription });
    };
</script>

%%[ /* 4. Protected content: rendered only after a successful sign-in, even when debugging is on or a redirect does not stop the page */ ]%%
%%[ IF @appAuthenticated == 'true' THEN ]%%

<!-- The Cloud Page App micro SSO solution secures anything you create between IF and ENDIF -->

%%[ ENDIF ]%%
```

> **Note: You Should Know**
>
> This single-page template signs the visitor in on every load. Any reload done within the app (Reload/Redirect/Post via Form) should point back to the plain Cloud Page URL: the visitor is still logged in to MCE, so the sign-in completes without a login screen. Do not pass `state` along to stay signed in, because whoever starts a sign-in knows it.
>
> During the page load, the token is available as `accessToken`. If your app needs a session that survives reloads, use the split Cloud Page and Code Resource template from the [Cloud Page App template repository](https://github.com/MateuszDabrowski/sfmc-cloud-page-app-template), which passes a session id minted after sign-in.

**AMPScript**

```js title="Full Cloud Page App Template"
<!-- Authorisation START -->
%%[
    /* -------------------------------------------------------------------------

    Authenticates each visitor to limit access only to SFMC logged-in users.

    1. Global Variables - should be updated for each implementation
    2. Authentication Flow
    2.1. Session Validation
    2.2. Authorisation
    2.3. Authentication with REST Token
    2.3.1. Build token request payload
    2.3.2. Get the token
    2.3.3. Upsert Logging Data Extension

    -------------------------------------------------------------------------- */

    /* ----------------------------------------------------------------------- */
    /* ------------------------- 1. GLOBAL VARIABLES ------------------------- */
    /* ----------------------------------------------------------------------- */

    VAR @appName, @clientID, @clientSecret, @clientBase, @appURL, @errorURL, @requestURL, @payload, @tokenResponse, @tokenResponseRows, @token, @tokenExpire, @session, @state, @code, @authDE, @appAuthenticated

    /* Add clientID, Client Secret, Client Base (part of API Base URL) for all further calls*/
    SET @clientID = 'CLIENT_ID'
    SET @clientSecret = 'CLIENT_SECRET'
    SET @clientBase = 'API_BASE_URI'

    /* App Nane and relevant URLs */
    SET @appName = 'CLOUD_APP_NAME'
    SET @appURL = 'APP_CLOUD_PAGE_URL'
    SET @errorURL = 'ERROR_CLOUD_PAGE_URL'

    /* Data Extension for Authorisation Logging */
    SET @authDE = 'AUTHENTICATION_DATA_EXTENSION'

    /* Capture State and Session for Authorisation purposes */
    SET @state = RequestParameter('state')
    SET @session = RequestParameter('s')

    /* ----------------------------------------------------------------------- */
    /* ------------------------- 2. AUTHENTICATION FLOW ---------------------- */
    /* ----------------------------------------------------------------------- */

    /* ---------------------- 2.1. Session Validation ------------------------ */

    /* If there is Session parameter, validate it with logging DE*/
    IF NOT Empty(@session) THEN
        /* Only a GUID-shaped session of this app with an unexpired token is valid; anything else signs in again */
        SET @appAuthenticated = 'false'
        IF NOT Empty(RegExMatch(@session, '^[0-9a-fA-F-]{36}$', 0)) THEN
            IF Lookup(@authDE, 'appName', 'session', @session) == @appName THEN
                SET @tokenExpire = Lookup(@authDE, 'tokenExpire', 'session', @session)
                IF NOT Empty(@tokenExpire) THEN
                    IF DateDiff(Now(), @tokenExpire, 'MI') > 0 THEN
                        SET @appAuthenticated = 'true'
                    ENDIF
                ENDIF
            ENDIF
        ENDIF
        IF @appAuthenticated != 'true' THEN
            Redirect(@appURL)
        ENDIF
        /* Authenticated users jump to main code */

    /* ------------------------- 2.2. Authorization -------------------------- */

    /* If there is no Session parameter, start Authorisation flow */
    ELSEIF Empty(@state) AND Empty(@session) THEN
        SET @state = GUID()
        SET @requestURL = Concat(
            'https://', @clientBase, '.auth.marketingcloudapis.com/v2/authorize',
            '?response_type=code&client_id=', @clientID,
            '&redirect_uri=', @appURL, '&state=', @state)
        Redirect(@requestURL)

    /* ------------------------- 2.3. Authentication ------------------------- */

    /* If there is state parameter after Authorisation, get the REST Token */
    ELSEIF NOT Empty(@state) AND Empty(RegExMatch(@state, '^[0-9a-fA-F-]{36}$', 0)) THEN
        Redirect(Concat(@errorURL, '?error=invalid_state'))

    ELSEIF NOT Empty(@state) THEN
        SET @code = RequestParameter('code')
        SET @requestURL = Concat('https://', @clientBase, '.auth.marketingcloudapis.com/v2/token')

        /* 2.3.1. Build token request payload */
        SET @payload = Concat(
            '{"grant_type": "authorization_code",',
            '"code": "' ,@code, '",',
            '"client_id": "', @clientID, '",',
            '"client_secret": "', @clientSecret, '",',
            '"redirect_uri": "', @appURL, '"}'
        )

        /* 2.3.2. Get the token */
        HTTPPost2(@requestURL, 'application/json', @payload, false, @tokenResponse, @tokenResponseRows)
        /* A failed request continues (false above), so only a response that carries an access token proves the sign-in */
        SET @token = RegExMatch(@tokenResponse, '"access_token"\s*:\s*"(?<token>[^"]+)"', 'token')
        /* Token expires after 18 minutes */

        IF Empty(@token) THEN
            Redirect(Concat(@errorURL, '?error=token_exchange_failed'))
        ELSE
            /* 2.3.3. Upsert Logging Data Extension */
            /* The session id is minted here and never reuses @state: whoever starts the sign-in knows @state */
            SET @session = GUID()
            UpsertData(@authDE, 1, 'session', @session, 'appName', @appName, 'token', @token, 'tokenExpire', DateAdd(Now(), 18, 'MI'))
            Redirect(Concat(@appURL, '?s=', @session))
        ENDIF

    /* For any other scenario, redirect to Error Page  */
    ELSE
        Redirect(@errorURL)

    ENDIF
    /* Remember to pass ?s=%%=v(@session)=%% on each page reload for leverage session validation */
]%%
<!-- Authorisation END -->

%%[ IF @appAuthenticated == 'true' THEN ]%%

<!-- The Cloud Page App micro SSO solution secures anything you create between IF and ENDIF -->

%%[ ENDIF ]%%
```

> **Note: You Should Know**
>
> Any reload done within the app (Reload/Redirect/Post via Form) should point back to Apps Cloud Page URL with `s=%%=v(@session)=%%` appended to it as a query parameter (remember to use `?` if it will be the first parameter or `&` in another case).
>
> You can also leverage the session to lookup the token for API calls: `%%=Lookup(@authDE,'token','session',@session)=%%`. A session stays valid for 18 minutes, the life of its token; after that the page signs the visitor in again, without a login screen when they are still logged in to MCE.

To implement it, copy and paste the above code to the top of the Cloud Page used for the App. Next, change the values at the top of the code (the uppercase ones) to match your package installation and app details. That's all!

## Implementation Sum Up

There was much information to digest, so it's time for a streamlined step by step guide from zero to hero:

1. **Logging Data Extensions**
   1. In Content Builder or Email Studio create a [Cloud Page App Logging Data Extension](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/ssjs/snippets/sfmc-cloud-page-apps/#capture-your-cloud-page-app-usage).
   2. In Content Builder or Email Studio create an [Error Logging Data Extension](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/ssjs/debugging-ssjs/#logging-to-data-extension).
   3. In both cases, one is enough for multiple Cloud Page Apps. If stored in the Shared Data Extensions folder, both can serve multiple Business Units.
2. **Cloud Page**
   1. Create a new Cloud Page.
   2. Copy the URL.
3. **Installed Package**
   1. Go to System -> Platform Tools -> Apps -> Installed Packages.
   2. Click `New` in the top right corner.
   3. Add Unique Name and Description suggesting the App's purpose.
   4. Marketing Cloud App Component.
      1. Click `Add Component` at the bottom.
      2. Select `Marketing Cloud App` and click Next.
      3. Add Unique Name and Description suggesting the App's purpose.
      4. Add Cloud Page URL copied in step 2.ii as both Login and Logout Endpoint.
      5. Click `Save`.
   5. API Integration Component.
      1. Click `Add Component` on the right side of the page.
      2. Select `API Integration` and click Next.
      3. Select `Web App` and click Next.
      4. Add Cloud Page URL copied in step 2.ii as Redirect URI.
      5. Add Scope of the App (should be minimal, can be extended later) and click `Save`.
   6. Copy `Client Id`, `Client Secret` and `Client Base URI`.
4. **Menu Unlock**
   1. Refresh tab with MCE.
   2. On the main menu pane of MCE, hover over AppExchange to see your application.
5. **Secured Template**
   1. Copy the [template](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/ssjs/snippets/sfmc-cloud-page-apps/#secured-cloud-page-app-template) in the prefered language to the Cloud Page from step 2.i.
   2. Update the unique values in the variables at the top part of the template (CAPS\_LOCK placeholders).
6. **Build your solution**

## Learn more

Looking for more? Check out follow up materials for added context and deeper dive:

1. Webinar recording on [Cloud Page Apps](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/webinars/mce-cloud-page-apps/).
2. Webinar recording on [Architecting Web Solutions in MCE](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/webinars/mce-architecting-web-solutions/).
3. Article on [Power of MCE Code Resources](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/code-resource/).
4. Article on [MCE AppExchange Solutions](https://mateuszdabrowski.pl/docs/salesforce/marketing-cloud-engagement/config/appexchange-solutions/).
5. Code Snippets on [my GitHub](https://github.com/MateuszDabrowski/sfmc-cloud-page-app-template).
