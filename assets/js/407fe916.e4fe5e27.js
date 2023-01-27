"use strict";(self.webpackChunkmd=self.webpackChunkmd||[]).push([[1099],{4137:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>h});var n=a(7294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=n.createContext({}),u=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},d=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},c="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=u(a),m=i,h=c["".concat(s,".").concat(m)]||c[m]||p[m]||r;return a?n.createElement(h,o(o({ref:t},d),{},{components:a})):n.createElement(h,o({ref:t},d))}));function h(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,o=new Array(r);o[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:i,o[1]=l;for(var u=2;u<r;u++)o[u]=a[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},425:(e,t,a)=>{a.d(t,{Z:()=>o});var n=a(7294),i=a(6010);const r="tabItem_Ymn6";function o(e){let{children:t,hidden:a,className:o}=e;return n.createElement("div",{role:"tabpanel",className:(0,i.Z)(r,o),hidden:a},t)}},3992:(e,t,a)=>{a.d(t,{Z:()=>T});var n=a(7462),i=a(7294),r=a(6010),o=a(2957),l=a(6550),s=a(5238),u=a(3609),d=a(2560);function c(e){return function(e){return i.Children.map(e,(e=>{if((0,i.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))}(e).map((e=>{let{props:{value:t,label:a,attributes:n,default:i}}=e;return{value:t,label:a,attributes:n,default:i}}))}function p(e){const{values:t,children:a}=e;return(0,i.useMemo)((()=>{const e=t??c(a);return function(e){const t=(0,u.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,a])}function m(e){let{value:t,tabValues:a}=e;return a.some((e=>e.value===t))}function h(e){let{queryString:t=!1,groupId:a}=e;const n=(0,l.k6)(),r=function(e){let{queryString:t=!1,groupId:a}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return a??null}({queryString:t,groupId:a});return[(0,s._X)(r),(0,i.useCallback)((e=>{if(!r)return;const t=new URLSearchParams(n.location.search);t.set(r,e),n.replace({...n.location,search:t.toString()})}),[r,n])]}function g(e){const{defaultValue:t,queryString:a=!1,groupId:n}=e,r=p(e),[o,l]=(0,i.useState)((()=>function(e){let{defaultValue:t,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:a}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${a.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=a.find((e=>e.default))??a[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:r}))),[s,u]=h({queryString:a,groupId:n}),[c,g]=function(e){let{groupId:t}=e;const a=function(e){return e?`docusaurus.tab.${e}`:null}(t),[n,r]=(0,d.Nk)(a);return[n,(0,i.useCallback)((e=>{a&&r.set(e)}),[a,r])]}({groupId:n}),f=(()=>{const e=s??c;return m({value:e,tabValues:r})?e:null})();(0,i.useEffect)((()=>{f&&l(f)}),[f]);return{selectedValue:o,selectValue:(0,i.useCallback)((e=>{if(!m({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);l(e),u(e),g(e)}),[u,g,r]),tabValues:r}}var f=a(1048);const y="tabList__CuJ",k="tabItem_LNqP";function b(e){let{className:t,block:a,selectedValue:l,selectValue:s,tabValues:u}=e;const d=[],{blockElementScrollPositionUntilNextRender:c}=(0,o.o5)(),p=e=>{const t=e.currentTarget,a=d.indexOf(t),n=u[a].value;n!==l&&(c(t),s(n))},m=e=>{let t=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{const a=d.indexOf(e.currentTarget)+1;t=d[a]??d[0];break}case"ArrowLeft":{const a=d.indexOf(e.currentTarget)-1;t=d[a]??d[d.length-1];break}}t?.focus()};return i.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":a},t)},u.map((e=>{let{value:t,label:a,attributes:o}=e;return i.createElement("li",(0,n.Z)({role:"tab",tabIndex:l===t?0:-1,"aria-selected":l===t,key:t,ref:e=>d.push(e),onKeyDown:m,onClick:p},o,{className:(0,r.Z)("tabs__item",k,o?.className,{"tabs__item--active":l===t})}),a??t)})))}function v(e){let{lazy:t,children:a,selectedValue:n}=e;if(t){const e=a.find((e=>e.props.value===n));return e?(0,i.cloneElement)(e,{className:"margin-top--md"}):null}return i.createElement("div",{className:"margin-top--md"},a.map(((e,t)=>(0,i.cloneElement)(e,{key:t,hidden:e.props.value!==n}))))}function w(e){const t=g(e);return i.createElement("div",{className:(0,r.Z)("tabs-container",y)},i.createElement(b,(0,n.Z)({},e,t)),i.createElement(v,(0,n.Z)({},e,t)))}function T(e){const t=(0,f.Z)();return i.createElement(w,(0,n.Z)({key:String(t)},e))}},1872:(e,t,a)=>{a.d(t,{m:()=>r});var n=a(7294);const i="leadText_qzwo",r=e=>{let{content:t}=e;return n.createElement(n.Fragment,null,n.createElement("p",{id:i},t))}},2637:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>u,default:()=>h,frontMatter:()=>s,metadata:()=>d,toc:()=>p});var n=a(7462),i=(a(7294),a(4137)),r=a(3992),o=a(425),l=a(1872);const s={id:"tailor-with-data",title:"Tailor the experience with data logic",sidebar_label:"Tailor with Data",description:"Everyone and his boss are talking about personalisation. Most stop at tailoring the content. Don't be that person. Utilise the power of simple data logic and control the user flows.",image:"img/og/og-image-tailor-with-data.png",tags:["Marketing Cloud","Eloqua","JavaScript","Personalisation","Cloud Page"]},u=void 0,d={unversionedId:"js/snippets/tailor-with-data",id:"js/snippets/tailor-with-data",title:"Tailor the experience with data logic",description:"Everyone and his boss are talking about personalisation. Most stop at tailoring the content. Don't be that person. Utilise the power of simple data logic and control the user flows.",source:"@site/docs/js/snippets/tailor-with-data.mdx",sourceDirName:"js/snippets",slug:"/js/snippets/tailor-with-data",permalink:"/docs/js/snippets/tailor-with-data",draft:!1,editUrl:"https://github.com/MateuszDabrowski/mateuszdabrowski.pl/edit/master/docs/js/snippets/tailor-with-data.mdx",tags:[{label:"Marketing Cloud",permalink:"/docs/tags/marketing-cloud"},{label:"Eloqua",permalink:"/docs/tags/eloqua"},{label:"JavaScript",permalink:"/docs/tags/java-script"},{label:"Personalisation",permalink:"/docs/tags/personalisation"},{label:"Cloud Page",permalink:"/docs/tags/cloud-page"}],version:"current",lastUpdatedBy:"Mateusz D\u0105browski",lastUpdatedAt:1672049341,formattedLastUpdatedAt:"Dec 26, 2022",frontMatter:{id:"tailor-with-data",title:"Tailor the experience with data logic",sidebar_label:"Tailor with Data",description:"Everyone and his boss are talking about personalisation. Most stop at tailoring the content. Don't be that person. Utilise the power of simple data logic and control the user flows.",image:"img/og/og-image-tailor-with-data.png",tags:["Marketing Cloud","Eloqua","JavaScript","Personalisation","Cloud Page"]},sidebar:"snippets",previous:{title:"JS Snippets",permalink:"/docs/category/js-snippets"},next:{title:"Engage with Countdown",permalink:"/docs/js/snippets/engage-with-countdown"}},c={},p=[{value:"Outline",id:"outline",level:2},{value:"Leverage the data",id:"leverage-the-data",level:2},{value:"Change the structure of the landing page",id:"change-the-structure-of-the-landing-page",level:3},{value:"Create a genuinely dynamic form",id:"create-a-genuinely-dynamic-form",level:3},{value:"Enrich your data",id:"enrich-your-data",level:3},{value:"Script your solution",id:"script-your-solution",level:2},{value:"Hiding elements on the website",id:"hiding-elements-on-the-website",level:3},{value:"Changing elements on the website",id:"changing-elements-on-the-website",level:3},{value:"Create conditional logic",id:"create-conditional-logic",level:2},{value:"Possibilities are endless.",id:"possibilities-are-endless",level:3}],m={toc:p};function h(e){let{components:t,...a}=e;return(0,i.kt)("wrapper",(0,n.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)(l.m,{content:"Everyone and his boss are talking about personalisation. Most stop at tailoring the content. Don't be that person. Utilise the power of simple data logic and control the user flows.",mdxType:"LeadText"}),(0,i.kt)("h2",{id:"outline"},"Outline"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("a",{parentName:"li",href:"#leverage-the-data"},"Review the use cases possible thanks to the tailored data logic")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("a",{parentName:"li",href:"#script-your-solution"},"Check easy to implement script examples")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("a",{parentName:"li",href:"#create-conditional-logic"},"Create personalisation fueled conditional user flows"))),(0,i.kt)("h2",{id:"leverage-the-data"},"Leverage the data"),(0,i.kt)("p",null,"Most Marketing Automation tools allow you to use the contact and account data for personalisation. Are you inserting a user-specific value from a data model to landing page or email? Creating custom content tailored to the user? Easy and simple. ",(0,i.kt)("a",{parentName:"p",href:"https://www.oracle.com/marketingcloud/products/marketing-automation/",title:"Oracle Eloqua Marketing Automation Platform"},"Eloqua"),"'s ",(0,i.kt)("a",{parentName:"p",href:"https://docs.oracle.com/cloud/latest/marketingcs_gs/OMCAA/Help/FieldMerges/FieldMerges.htm",title:"Field Merge Documentation"},"Field Merges")," or ",(0,i.kt)("a",{parentName:"p",href:"https://www.salesforce.com/eu/products/marketing-cloud/overview/",title:"Salesforce Marketing Cloud Platform"},"Marketing Cloud"),"'s personalisation strings. But you can do so much more!"),(0,i.kt)("h3",{id:"change-the-structure-of-the-landing-page"},"Change the structure of the landing page"),(0,i.kt)("p",null,"Part of your subscription centre should be visible only to your clients? Instead of creating and managing two separate pages, you can use personalisation to check whether the visitor has any license and unhide product-related data & subscription section."),(0,i.kt)("h3",{id:"create-a-genuinely-dynamic-form"},"Create a genuinely dynamic form"),(0,i.kt)("p",null,"Not keen on asking your customers, again and again, the same questions in your content form? Use personalisation to hide form fields that won't give you new knowledge. The shorter the form, the better."),(0,i.kt)("h3",{id:"enrich-your-data"},"Enrich your data"),(0,i.kt)("p",null,"You got multi picklist storing information on topics that are interesting to your customers? Want to use whitepaper download form to add such data point? Sure, all Marketing Automation Platforms have form processing that will be able to append such value. But unfortunately, in most, you won't be able to check whether it will result in a duplicate data point. You guessed it, personalisation with a simple script can fix it."),(0,i.kt)("h2",{id:"script-your-solution"},"Script your solution"),(0,i.kt)("p",null,"Time to create a script that will solve the problems mentioned above. Firstly, you will need to pull from your data model."),(0,i.kt)(r.Z,{groupId:"marketingAutomationPlatforms",defaultValue:"sfmc",values:[{label:"Salesforce Marketing Cloud",value:"sfmc"},{label:"Oracle Eloqua",value:"eloqua"}],mdxType:"Tabs"},(0,i.kt)(o.Z,{value:"sfmc",mdxType:"TabItem"},(0,i.kt)("p",null,"For Marketing Cloud, the easiest way is to use the personalisation string. The code is straightforward:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},"<ctrl:field name=ProfileAttributeName />\n")),(0,i.kt)("p",null,"The only thing you need is the name of the Profile Attribute or Data Extension field. It gets a bit more elaborate if you want to leverage other sources, but still viable. You can use the Lookup function for non-sendable Data Extensions. You can even dig into Salesforce Objects with a bit of AMPScript.")),(0,i.kt)(o.Z,{value:"eloqua",mdxType:"TabItem"},(0,i.kt)("p",null,"For Eloqua, the easiest way is to use the Field Merge. The code is straightforward:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},"<span class=eloquaemail>\u200bField_Merge_Name1\u200b</span>\n")),(0,i.kt)("p",null,"The only thing you need is the Field Merge name. Unfortunately, you can not add the asset name, as Eloqua is using in the code the automatically created HTML name."),(0,i.kt)("p",null,"In most cases it is very similar to the original Field Merge name, in some - like Field Merge created by copying another one - can be a surprise. To be sure you have the correct name I recommended creating an empty HTML landing page and drag and drop the Field Merge onto HTML editor. It will add whole needed code for you."))),(0,i.kt)("p",null,"To create a script that will allow for three use cases mentioned in the first part of the post, we need one more thing - an ",(0,i.kt)("inlineCode",{parentName:"p"},"id")," attribute. Some elements will already have it (for example, in Eloqua each form field exists in separate div element: ",(0,i.kt)("inlineCode",{parentName:"p"},"<div id='formElement1' ...>"),"). For others, you will have to add it to the HTML manually."),(0,i.kt)("admonition",{title:"You Should Know",type:"note"},(0,i.kt)("p",{parentName:"admonition"},"You are not limited to the ",(0,i.kt)("inlineCode",{parentName:"p"},"id")," attribute. Leverage any attribute and capture it with ",(0,i.kt)("a",{parentName:"p",href:"/docs/js/js-dom"},"DOM selectors"),", like ",(0,i.kt)("inlineCode",{parentName:"p"},"document.querySelector()")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"document.querySelectorAll()"),". For example, capturing ",(0,i.kt)("inlineCode",{parentName:"p"},"class")," is great to change multiple related parts of the website at once.")),(0,i.kt)("p",null,"With personalisation code and value of the ",(0,i.kt)("inlineCode",{parentName:"p"},"id")," attribute at hand, we can start the (short) scripting."),(0,i.kt)("h3",{id:"hiding-elements-on-the-website"},"Hiding elements on the website"),(0,i.kt)(r.Z,{groupId:"marketingAutomationPlatforms",defaultValue:"sfmc",values:[{label:"Salesforce Marketing Cloud",value:"sfmc"},{label:"Oracle Eloqua",value:"eloqua"}],mdxType:"Tabs"},(0,i.kt)(o.Z,{value:"sfmc",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html",metastring:"title=\"Hide element with id='idName' if viewers EmailOptedIn attribute has value 'True'\"",title:'"Hide',element:!0,with:!0,id:"'idName'",if:!0,viewers:!0,EmailOptedIn:!0,attribute:!0,has:!0,value:!0,"'True'\"":!0},"<script>\n    window.addEventListener('load', () => { // 1.\n        if ('<ctrl:field name=EmailOptedIn />' === 'True') { // 2.\n            document.querySelector('#idValue').display = 'none'; // 3.\n        };\n    };\n<\/script>\n"))),(0,i.kt)(o.Z,{value:"eloqua",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html",metastring:"title=\"Hide element with id='idName' if viewers EmailOptedIn field has value 'True'\"",title:'"Hide',element:!0,with:!0,id:"'idName'",if:!0,viewers:!0,EmailOptedIn:!0,field:!0,has:!0,value:!0,"'True'\"":!0},"<script>\n    window.addEventListener('load', () => { // 1.\n        if ('<span class=eloquaemail>EmailOptedIn1</span>' === 'True') { //2.\n            document.querySelector('#idValue').display = 'none'; // 3.\n        };\n    };\n<\/script>\n")))),(0,i.kt)("p",null,"Above script has three important lines that deserve some explanation."),(0,i.kt)("p",null,"First one uses ",(0,i.kt)("a",{parentName:"p",href:"/docs/js/js-dom#addeventlistener"},"Event Listener")," to launch the logic only after the whole page loaded. It is essential, as it guarantees that the browser already rendered the website element you want to hide."),(0,i.kt)("p",null,"Next is the ",(0,i.kt)("inlineCode",{parentName:"p"},"if")," statement. It evaluates the data model value received via personalisation (left side of ==) with another value we choose (right side of ==). In this case, it checks whether Email Opted In for a particular user is set to True (names and values may differ in your data model)."),(0,i.kt)("p",null,"The third line looks for an HTML element with id equal to ",(0,i.kt)("inlineCode",{parentName:"p"},"'idValue'")," and hides it from the user."),(0,i.kt)("admonition",{title:"You Should Know",type:"note"},(0,i.kt)("p",{parentName:"admonition"},"You can adapt this script to do almost anything. Once you have your element selected with ",(0,i.kt)("inlineCode",{parentName:"p"},"querySelector")," you can programmatically ",(0,i.kt)("a",{parentName:"p",href:"/docs/js/js-dom#changing-attributes"},"change its value"),", add or remove a class from it to impact the CSS applied or even create new elements around it.")),(0,i.kt)("p",null,"With this script, you can both modify the structure of your landing page and alter the form fields (or even just form field options) visible for the user. Hide some elements, show other, change the style of a web element to make it more prominent on the website. But that's not all!"),(0,i.kt)("h3",{id:"changing-elements-on-the-website"},"Changing elements on the website"),(0,i.kt)("p",null,"For our data enrichment use case, we will need to alter the script slightly."),(0,i.kt)(r.Z,{groupId:"marketingAutomationPlatforms",defaultValue:"sfmc",values:[{label:"Salesforce Marketing Cloud",value:"sfmc"},{label:"Oracle Eloqua",value:"eloqua"}],mdxType:"Tabs"},(0,i.kt)(o.Z,{value:"sfmc",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html",metastring:"title=\"Change value of a hidden form field if Profile Attribute value includes 'Tax'\"",title:'"Change',value:!0,of:!0,a:!0,hidden:!0,form:!0,field:!0,if:!0,Profile:!0,Attribute:!0,includes:!0,"'Tax'\"":!0},"<script>\n    window.addEventListener('load', () => { // 1.\n        const regexSearchValue = /Tax/; // 2.\n        if (regexSearchValue.test('<ctrl:field name=Interests />')) { // 3.\n            document.querySelector('#alreadyInterested').value = 'True'; // 4.\n        };\n    };\n<\/script>\n"))),(0,i.kt)(o.Z,{value:"eloqua",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html",metastring:"title=\"Change value of a hidden form field if Field Merge value includes 'Tax'\"",title:'"Change',value:!0,of:!0,a:!0,hidden:!0,form:!0,field:!0,if:!0,Field:!0,Merge:!0,includes:!0,"'Tax'\"":!0},"<script>\n    window.addEventListener('load', () => { // 1.\n        const regexSearchValue = /Tax/; // 2.\n        if (regexSearchValue.test('<span class=eloquaemail>Interests1</span>')) { // 3.\n            document.querySelector('#alreadyInterested').value = 'True'; // 4.\n        };\n    };\n<\/script>\n")))),(0,i.kt)("p",null,"In this scenario, we have a multi picklist field ",(0,i.kt)("inlineCode",{parentName:"p"},"Interests")," that captures what fascinates specific customer. If he is captivated by more than one topic, the names are semicolon-separated. A nice marketing tactic is to enrich this list each time the customer engages with something directly related to a particular topic. For example, downloads your new whitepaper."),(0,i.kt)("p",null,"In most Marketing Automation Platforms, it is straightforward to append a value to a column. Simple adding, however, leads to a (quite big) possibility of having duplicates. And this is neither good from the data quality perspective nor field length compliance."),(0,i.kt)("p",null,"So how to use the above script to enrich your data cleanly? We will need a hidden form field inside the whitepaper download form. In the HTML look for (or create) hidden field input (",(0,i.kt)("inlineCode",{parentName:"p"},"<input id='alreadyInterested' type='hidden' ...>"),"). The ",(0,i.kt)("inlineCode",{parentName:"p"},"id")," attribute will be useful again."),(0,i.kt)("p",null,"You already know the first line from the previous section. The new things come next. We declare value we want to check in our data model picklist. In this example, we will test whether the user is already interested in Tax topic. The ",(0,i.kt)("inlineCode",{parentName:"p"},"/")," before and after the word are special characters used for a ",(0,i.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions",title:"MDN Documentation on Regular_Expressions"},"regular expression"),"."),(0,i.kt)("p",null,"The third line is the fastest way to check whether the declared value is already in the ",(0,i.kt)("inlineCode",{parentName:"p"},"Interests")," field."),(0,i.kt)("p",null,"Finally, in case of the value already being in the multi picklist, we put True inside the hidden form field. It enables us to enforce on form processing to append new interest conditionally - only if the hidden field is blank in the submission data."),(0,i.kt)("h2",{id:"create-conditional-logic"},"Create conditional logic"),(0,i.kt)("p",null,"Simple manipulation of visibility and values on your landing page is just beginning. You can get even more out of scripted-backed personalisations and take control over user & data flows."),(0,i.kt)("p",null,"Looking for an excellent way to tell your Google Analytics whether the user just downloaded a whitepaper or did he also wanted to receive product presentation on top of that? Not keen on creating two mirror-like Thank You pages with different conversion script? Sure!"),(0,i.kt)(r.Z,{groupId:"marketingAutomationPlatforms",defaultValue:"sfmc",values:[{label:"Salesforce Marketing Cloud",value:"sfmc"},{label:"Oracle Eloqua",value:"eloqua"}],mdxType:"Tabs"},(0,i.kt)(o.Z,{value:"sfmc",mdxType:"TabItem"},(0,i.kt)("p",null,"Your form processing page should append date stamp to a data model field in case of the user becoming a lead (asking for a product presentation). This data, apart from being a great source of knowledge for your lead reporting and data processing trigger, will be handy for this solution."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},"<script>\n    const leadCreationDate = '<ctrl:field name=leadCreationDate />';\n    if (Date.now() - new Date(leadCreationDate) < 93600000) {\n        dataLayer.push({\n            // Your Lead conversion dataLayer model\n        });\n    } else {\n        dataLayer.push({\n            // Your Whitepaper conversion dataLayer model\n        });\n    }\n<\/script>\n"))),(0,i.kt)(o.Z,{value:"eloqua",mdxType:"TabItem"},(0,i.kt)("p",null,"Your form should have a processing step that appends date stamp to a data model field in case of the user becoming a lead (asking for a product presentation). This data, apart from being a great source of knowledge for your lead reporting and data processing trigger, will be handy for this solution."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},"<script>\n    const leadCreationDate = '<span class=eloquaemail>LeadCreationTriggerDate1</span>';\n    if (Date.now() - new Date(leadCreationDate) < 93600000) {\n        dataLayer.push({\n            // Your Lead conversion dataLayer model\n        });\n    } else {\n        dataLayer.push({\n            // Your Whitepaper conversion dataLayer model\n        });\n    }\n<\/script>\n")))),(0,i.kt)("p",null,"Why? Because once you have this script on your Thank You page, you can check how distant in the past the personalised date is. And if it is within minutes, you can be pretty sure the user just became your lead. Which tells the script to push the lead conversion data layer instead of the whitepaper data layer. Simple and quick."),(0,i.kt)("p",null,"Remember to take into consideration the difference between local time and server time, which might play a role depending on the Marketing Automation Platform and configuration."),(0,i.kt)("h3",{id:"possibilities-are-endless"},"Possibilities are endless."),(0,i.kt)("p",null,"Want to be sure only recognised users will enter your subscription centre?"),(0,i.kt)(r.Z,{groupId:"marketingAutomationPlatforms",defaultValue:"sfmc",values:[{label:"Salesforce Marketing Cloud",value:"sfmc"},{label:"Oracle Eloqua",value:"eloqua"}],mdxType:"Tabs"},(0,i.kt)(o.Z,{value:"sfmc",mdxType:"TabItem"},(0,i.kt)("p",null,"Add email address or contact key personalisation. If it is empty, it means Marketing Cloud did not recognise this user. JavaScript can automatically redirect him to your subscription centre entry form that will take care of authorization."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"}," if ('<ctrl:field name=\"Email Address\" />' == '') {\n    window.location.replace(\u200b'https://redirect.here')\n}\n")),(0,i.kt)("p",null,"Want to double-check by querying the Salesforce Core? Add API call within the condition. You can also push some information from a data extension, or profile attributes to an external page. Personalise that data and use JavaScript to append it to redirect link as a query string or send it as a payload within POST call. Imagination is the only limit.")),(0,i.kt)(o.Z,{value:"eloqua",mdxType:"TabItem"},(0,i.kt)("p",null,"Add email address Field Merge. If it is empty, it means Eloqua did not recognise this user. JavaScript can automatically redirect him to your subscription centre entry form that will take care of authorization."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"if ('<span class=eloquaemail>\u200bEmailAddress\u200b</span>' == '') {\n    window.location.replace(\u200b'https://redirect.here')\n}\n")),(0,i.kt)("p",null,"Want to push some information from a data model to an external page? Field Merge that data and use JavaScript to append it to redirect link as a query string."),(0,i.kt)("p",null,"You can get even more power with using dynamic content (perfect for simplifying javascript logic) or web data lookups (allows you to leverage email group subscription, shared list audience \u203a even on external websites). Imagination is the only limit."))))}h.isMDXComponent=!0}}]);