(self.webpackChunkmd=self.webpackChunkmd||[]).push([[115],{4137:function(e,t,n){"use strict";n.d(t,{Zo:function(){return p},kt:function(){return d}});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=c(n),d=i,h=m["".concat(l,".").concat(d)]||m[d]||u[d]||r;return n?a.createElement(h,o(o({ref:t},p),{},{components:n})):a.createElement(h,o({ref:t},p))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var c=2;c<r;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8921:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var a=n(7294),i=n(6010),r="tableOfContentsInline_3fWc";function o(e){var t=e.toc,n=e.isChild;return t.length?a.createElement("ul",{className:n?"":"table-of-contents"},t.map((function(e){return a.createElement("li",{key:e.id},a.createElement("a",{href:"#"+e.id,dangerouslySetInnerHTML:{__html:e.value}}),a.createElement(o,{isChild:!0,toc:e.children}))}))):null}var s=function(e){var t=e.toc;return a.createElement("div",{className:(0,i.Z)(r)},a.createElement(o,{toc:t}))}},2043:function(e,t,n){"use strict";n.d(t,{m:function(){return r}});var a=n(7294),i="leadText_16va",r=function(e){var t=e.content;return a.createElement(a.Fragment,null,a.createElement("p",{id:i},t))}},8442:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return p},metadata:function(){return u},toc:function(){return m},default:function(){return h}});var a=n(2122),i=n(9756),r=(n(7294),n(4137)),o=n(8921),s=n(2043),l=["components"],c={id:"ssjs-snippet-ampscript-in-ssjs",title:"AMPScript in SSJS",sidebar_label:"AMPScript in SSJS",description:"Not all AMPScript functions are available in SSJS. But you still can use them."},p=void 0,u={unversionedId:"ssjs/ssjs-snippet-ampscript-in-ssjs",id:"ssjs/ssjs-snippet-ampscript-in-ssjs",isDocsHomePage:!1,title:"AMPScript in SSJS",description:"Not all AMPScript functions are available in SSJS. But you still can use them.",source:"@site/docs/ssjs/ssjs-snippet-ampscript-in-ssjs.mdx",sourceDirName:"ssjs",slug:"/ssjs/ssjs-snippet-ampscript-in-ssjs",permalink:"/docs/ssjs/ssjs-snippet-ampscript-in-ssjs",editUrl:"https://github.com/MateuszDabrowski/mateuszdabrowski.pl/edit/master/docs/ssjs/ssjs-snippet-ampscript-in-ssjs.mdx",version:"current",lastUpdatedBy:"Mateusz D\u0105browski",lastUpdatedAt:1625090575,formattedLastUpdatedAt:"7/1/2021",frontMatter:{id:"ssjs-snippet-ampscript-in-ssjs",title:"AMPScript in SSJS",sidebar_label:"AMPScript in SSJS",description:"Not all AMPScript functions are available in SSJS. But you still can use them."},sidebar:"snippets",previous:{title:"Tailor with Data",permalink:"/docs/usecase/tailor-with-data"},next:{title:"MobileConnect Phone Change",permalink:"/docs/ssjs/ssjs-snippet-mobileconnect-phone-change"}},m=[{value:"Problem with missing SSJS functions",id:"problem-with-missing-ssjs-functions",children:[]},{value:"Solution",id:"solution",children:[]},{value:"Options",id:"options",children:[{value:"Long AMPScript Code",id:"long-ampscript-code",children:[]},{value:"Dynamic AMPScript Code",id:"dynamic-ampscript-code",children:[]},{value:"Working with AMPScript on Lists &amp; Objects",id:"working-with-ampscript-on-lists--objects",children:[]}]}],d={toc:m};function h(e){var t=e.components,n=(0,i.Z)(e,l);return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)(s.m,{content:"Not all AMPScript functions are available in SSJS. But you still can use them.",mdxType:"LeadText"}),(0,r.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Table of Contents")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)(o.Z,{toc:m,mdxType:"TOCInline"}))),(0,r.kt)("h2",{id:"problem-with-missing-ssjs-functions"},"Problem with missing SSJS functions"),(0,r.kt)("p",null,"SSJS language has many features missing from AMPScript - ",(0,r.kt)("a",{parentName:"p",href:"/docs/ssjs/debugging-ssjs#try-to-catch-the-error"},"try/catch blocks"),", arrays and objects to mention the most used ones. But some things are available only in AMPScript."),(0,r.kt)("p",null,"Some, like ",(0,r.kt)("inlineCode",{parentName:"p"},"ProperCase")," function, can be recreated in SSJS with a bit of RegEx creativity. Other, like ",(0,r.kt)("inlineCode",{parentName:"p"},"RetrieveSalesforceObjects"),", cannot (unless you decide on building custom wrappers around Salesforce API)."),(0,r.kt)("p",null,"Either way, you are in for a time consuming, error-prone custom coding. Is there a better way?"),(0,r.kt)("h2",{id:"solution"},"Solution"),(0,r.kt)("p",null,"You guessed it - yes, there is a better way. You can run AMPScript code with your SSJS. The simple answer to this problem is ",(0,r.kt)("inlineCode",{parentName:"p"},"Platform.Function.TreatAsContent()")," SSJS function."),(0,r.kt)("p",null,"But the good answer is few lines longer:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"/**\n * @function ampScript\n * @description Executes provided AMPScript code and returns value assigned to @Response variable\n * @param {string} code - String of AMPScript code without start/end delimiters. Final outcome should be assigned to @Response to enable passing back to SSJS\n * @return {?string} - Returns value from AMPScript execution if any was assigned to @Response variable\n */\nfunction ampScript(code) {\n    var ampBlock = '\\%\\%[' + code + ']\\%\\%';\n    Platform.Function.TreatAsContent(ampBlock);\n    return Variable.GetValue('@response');\n};\n")),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"You Should Know")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"As we are using ",(0,r.kt)("inlineCode",{parentName:"p"},"Variable.GetValue")," here, you will need to import Salesforce Marketing Cloud SSJS Core library at the top of your script."),(0,r.kt)("p",{parentName:"div"},"Just add ",(0,r.kt)("inlineCode",{parentName:"p"},"Platform.Load('core', '1')")," right after ",(0,r.kt)("inlineCode",{parentName:"p"},"<script runat=server>")," and you are good to go!"))),(0,r.kt)("p",null,"Instead of writing your AMPScript execution wrapper every time from scratch, here is a ready-to-use function that you can copy-paste across your scripts that allows you to use ampscript and do it gracefully."),(0,r.kt)("p",null,"Sure, it still uses the ",(0,r.kt)("inlineCode",{parentName:"p"},"Platform.Function.TreatAsContent()")," at its heart, but there are two additional tricks:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"var ampBlock = '\\%\\%[' + code + ']\\%\\%'"),": allows you to write AMPScript without the block symbols and adds them in the last moment. This way, Marketing Cloud will execute your code once you pass it to the ",(0,r.kt)("inlineCode",{parentName:"li"},"Platform.Function.TreatAsContent()")," function. It is essential when you want to ",(0,r.kt)("a",{parentName:"li",href:"#dynamic-ampscript-code"},"insert SSJS in your AMPScript"),"."),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"return Variable.GetValue('@response');"),": allows you to pull back data from your AMPScript to the SSJS. For it to work, you must ",(0,r.kt)("inlineCode",{parentName:"li"},"SET")," the ",(0,r.kt)("inlineCode",{parentName:"li"},"@response")," variable in your AMPScript. Whatever value you assign to the ",(0,r.kt)("inlineCode",{parentName:"li"},"@response")," in the AMPScript context, will be returned to your SSJS context.")),(0,r.kt)("p",null,"How to use it? Pass the AMPScript code in the function and, if you want to do something with ",(0,r.kt)("inlineCode",{parentName:"p"},"@response")," value, assign it to an SSJS variable."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="As JavaScript lacks native ProperCase, we can use AMPScript for that"',title:'"As',JavaScript:!0,lacks:!0,native:!0,"ProperCase,":!0,we:!0,can:!0,use:!0,AMPScript:!0,for:!0,'that"':!0},"var properCaseFullName = ampScript(\"SET @response = ProperCase(AttributeValue('fullName'))\");\n")),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"You Should Know")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"Be sure only to use this approach if there is no equivalent SSJS solution, as mixing languages will ",(0,r.kt)("a",{parentName:"p",href:"/docs/ssjs/ssjs-vs-ampscript-performance"},"impact performance"),". It is crucial for code in the messages that Marketing Cloud will execute on send time."),(0,r.kt)("p",{parentName:"div"},"For example, if you are only planning to use ProperCase, it might be better to go the RegEx path for significant volume messaging."))),(0,r.kt)("h2",{id:"options"},"Options"),(0,r.kt)("p",null,"You can adapt the above script to suit your needs better."),(0,r.kt)("h3",{id:"long-ampscript-code"},"Long AMPScript Code"),(0,r.kt)("p",null,"Above example is a short and straightforward AMPScript. However, you will need a bit more code to do the job in many cases. You can write it as a single line if you want, but I recommend you split it into separate lines for readability purposes."),(0,r.kt)("p",null,"You can do it quickly, by just concatenating strings with ",(0,r.kt)("inlineCode",{parentName:"p"},"+"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:"title=\"Check whether there is a Campaign in Salesforce called 'WelcomeCampaign2021'\"",title:'"Check',whether:!0,there:!0,is:!0,a:!0,Campaign:!0,in:!0,Salesforce:!0,called:!0,"'WelcomeCampaign2021'\"":!0},"var response = ampScript(\"SET @retrieve = RetrieveSalesforceObjects(\"\n    + \"'Campaign', 'Id', 'Name', '=', 'WelcomeCampaign2021') \"\n    + \"IF RowCount(@retrieve) > 0 THEN SET @response = 'true' \"\n    + \"ELSE SET @response = 'false' ENDIF\");\n")),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"You Should Know")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"To use any Salesforce Object functions, you will need to have Marketing Cloud Connect implemented to tie in your Marketing Cloud and Sales or Service Cloud."))),(0,r.kt)("p",null,"Be sure always to check, whether you have space either at the end of the previous line or beginning of the new line. Otherwise, after concatenation, you might end up with incorrect code."),(0,r.kt)("h3",{id:"dynamic-ampscript-code"},"Dynamic AMPScript Code"),(0,r.kt)("p",null,"Using AMPScript via SSJS not only enables additional features for Server-Side JavaScript. It also allows you to make your AMPScript more dynamic by leveraging variables in the loops:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'{4} title="Same check as above, but for multiple campaigns and output to an array"',"{4}":!0,title:'"Same',check:!0,as:!0,"above,":!0,but:!0,for:!0,multiple:!0,campaigns:!0,and:!0,output:!0,to:!0,an:!0,'array"':!0},"var availableCampaigns = [];\nfor (var campaignName in campaignList) {\n    var response = ampScript(\"SET @retrieve = RetrieveSalesforceObjects(\"\n        + \"'Campaign', 'Id', 'Name', '=', '\" + campaignName + \"') \"\n        + \"IF RowCount(@retrieve) > 0 THEN SET @response = 'true' \"\n        + \"ELSE SET @response = 'false' ENDIF\");\n    if (reponse) availableCampaigns.push(campaignName);\n};\n")),(0,r.kt)("p",null,"It is even more useful when you have variability in what you want to create. For example, let's consider a use case where you want to create Campaigns in Salesforce from Marketing Cloud, but only some of your campaigns have an End Date known from the beginning."),(0,r.kt)("p",null,"In ",(0,r.kt)("inlineCode",{parentName:"p"},"CreateSalesforceObject")," AMPScript function, you must pass all fields with their values and a count of fields added to the object. With SSJS, you can use the ",(0,r.kt)("inlineCode",{parentName:"p"},"length")," method to count the Campaign's fields in each loop's run. Then pass the outcome to the call parameters just as in the example above."),(0,r.kt)("h3",{id:"working-with-ampscript-on-lists--objects"},"Working with AMPScript on Lists & Objects"),(0,r.kt)("p",null,"Unfortunately, AMPScript doesn't support list or objects. Fortunately, SSJS do. We will need a bit of creativity to pull that off, but it makes life so much easier once done."),(0,r.kt)("p",null,"The easy example is visible in the ",(0,r.kt)("a",{parentName:"p",href:"#dynamic-ampscript-code"},"previous section")," - the snippet creates an array of Campaigns available in Salesforce."),(0,r.kt)("p",null,"But we can go so much farther than that:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:"{8-9,11,14}","{8-9,11,14}":!0},"var response = ampScript(\"SET @retrieve = RetrieveSalesforceObjects(\"\n    + \"'Campaign', 'Name,Id,StartDate,EndDate', 'IsActive', '=', 'True') \"\n    + \"SET @rowCount = RowCount(@retrieve) SET @response = '' \"\n    + \"IF @rowCount > 0 THEN FOR @counter = 1 TO @rowCount DO \"\n    + \"SET @row = Row(@retrieve, @counter) \"\n    + \"SET @name = Field(@row, 'Name') SET @id = Field(@row, 'Id') \"\n    + \"SET @startDate = Field(@row, 'StartDate') SET @endDate = Field(@row, 'EndDate') \"\n    + \"SET @rowData = Concat(@name, ',', @id, ',', @startDate, ',', @endDate) \"\n    + \"SET @response = Concat(@response, @rowData, ';') \"\n    + \"NEXT @counter ENDIF\");\nresponse = response.split(';');\nvar campaignData = [];\nfor (var i = 0; i < response.length - 1; i++) {\n    var responseRowData = response[i].split(',');\n    campaignData.push({\n        name: responseRowData[0],\n        id: responseRowData[1],\n        startDate: responseRowData[2],\n        endDate: responseRowData[3]\n    });\n};\n")),(0,r.kt)("p",null,"Ok, a lot to unpack. But trust me, it's worth it. Let's go!"),(0,r.kt)("p",null,"The first line is easy - we are using ",(0,r.kt)("inlineCode",{parentName:"p"},"RetrieveSalesforceObjects")," function to get a list of all active Salesforce Campaigns and limit the fields we need about them."),(0,r.kt)("p",null,"Next, we have a standard AMPScript way of iterating over the function's outcomes."),(0,r.kt)("p",null,"Now starts the exciting part - we are creating an AMPScript variable for each field, concatenate it using a comma and then adding it to the end of the ",(0,r.kt)("inlineCode",{parentName:"p"},"@response")," variable - semicolon-separated."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-css",metastring:'title="Structure of the AMPScript output"',title:'"Structure',of:!0,the:!0,AMPScript:!0,'output"':!0},"Name1,Id1,StartDate1,EndDate1;Name2,Id2,StartDate2,EndDate2;Name3,Id3,StartDate3,EndDate3\n")),(0,r.kt)("p",null,"As we assigned the final string to ",(0,r.kt)("inlineCode",{parentName:"p"},"@response"),", the function will return it to the SSJS context."),(0,r.kt)("p",null,"Once it's there, we are leveraging the SSJS by splitting the string on semicolons to create an array of substrings containing each Salesforce Campaign's details."),(0,r.kt)("p",null,"Then we loop over it and split each Campaign string by comma. With the deconstructed data, we create a nice and clean ",(0,r.kt)("inlineCode",{parentName:"p"},"campaignData")," object that we can use in the rest of our code. Neat."))}h.isMDXComponent=!0},6010:function(e,t,n){"use strict";function a(e){var t,n,i="";if("string"==typeof e||"number"==typeof e)i+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(i&&(i+=" "),i+=n);else for(t in e)e[t]&&(i&&(i+=" "),i+=t);return i}function i(){for(var e,t,n=0,i="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(i&&(i+=" "),i+=t);return i}n.d(t,{Z:function(){return i}})}}]);