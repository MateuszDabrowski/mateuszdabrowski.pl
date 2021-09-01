"use strict";(self.webpackChunkmd=self.webpackChunkmd||[]).push([[6576],{4137:function(e,t,a){a.d(t,{Zo:function(){return p},kt:function(){return m}});var s=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,s)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,s,n=function(e,t){if(null==e)return{};var a,s,n={},i=Object.keys(e);for(s=0;s<i.length;s++)a=i[s],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(s=0;s<i.length;s++)a=i[s],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var l=s.createContext({}),c=function(e){var t=s.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},p=function(e){var t=c(e.components);return s.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return s.createElement(s.Fragment,{},t)}},d=s.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,l=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),d=c(a),m=n,f=d["".concat(l,".").concat(m)]||d[m]||u[m]||i;return a?s.createElement(f,r(r({ref:t},p),{},{components:a})):s.createElement(f,r({ref:t},p))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,r=new Array(i);r[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:n,r[1]=o;for(var c=2;c<i;c++)r[c]=a[c];return s.createElement.apply(null,r)}return s.createElement.apply(null,a)}d.displayName="MDXCreateElement"},2043:function(e,t,a){a.d(t,{m:function(){return i}});var s=a(7294),n="leadText_16va",i=function(e){var t=e.content;return s.createElement(s.Fragment,null,s.createElement("p",{id:n},t))}},4770:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return p},toc:function(){return u},default:function(){return m}});var s=a(7462),n=a(3366),i=(a(7294),a(4137)),r=a(2043),o=["components"],l={id:"docs-and-snippets",title:"Docs & Snippets",slug:"/",description:"SSJS + JS + AMPScript + SQL + SFMC Config documentation and code snippets that I find useful for developing Salesforce Marketing Cloud.",image:"img/og/og-image-docs-and-snippets.png"},c=void 0,p={unversionedId:"docs-and-snippets",id:"docs-and-snippets",isDocsHomePage:!1,title:"Docs & Snippets",description:"SSJS + JS + AMPScript + SQL + SFMC Config documentation and code snippets that I find useful for developing Salesforce Marketing Cloud.",source:"@site/docs/docs-and-snippets.mdx",sourceDirName:".",slug:"/",permalink:"/docs/",editUrl:"https://github.com/MateuszDabrowski/mateuszdabrowski.pl/edit/master/docs/docs-and-snippets.mdx",tags:[],version:"current",lastUpdatedBy:"Mateusz D\u0105browski",lastUpdatedAt:1630274625,formattedLastUpdatedAt:"8/30/2021",frontMatter:{id:"docs-and-snippets",title:"Docs & Snippets",slug:"/",description:"SSJS + JS + AMPScript + SQL + SFMC Config documentation and code snippets that I find useful for developing Salesforce Marketing Cloud.",image:"img/og/og-image-docs-and-snippets.png"},sidebar:"snippets",next:{title:"If & Switch",permalink:"/docs/ssjs/ssjs-if-and-switch"}},u=[{value:"Server-Side JavaScript",id:"server-side-javascript",children:[{value:"SSJS Documentation",id:"ssjs-documentation",children:[]},{value:"SSJS Use Cases",id:"ssjs-use-cases",children:[]},{value:"SSJS Snippets",id:"ssjs-snippets",children:[]}]},{value:"JavaScript",id:"javascript",children:[{value:"JS Documentation",id:"js-documentation",children:[]},{value:"JS Use Cases",id:"js-use-cases",children:[]}]},{value:"AMPScript",id:"ampscript",children:[{value:"AMPScript Documentation",id:"ampscript-documentation",children:[]},{value:"AMPScript Use Cases",id:"ampscript-use-cases",children:[]},{value:"AMPScript Snippets",id:"ampscript-snippets",children:[]}]},{value:"SFMC SQL",id:"sfmc-sql",children:[{value:"SQL Documentation",id:"sql-documentation",children:[]},{value:"SQL Snippets",id:"sql-snippets",children:[]}]},{value:"SFMC Config",id:"sfmc-config",children:[]},{value:"Changes",id:"changes",children:[]}],d={toc:u};function m(e){var t=e.components,a=(0,n.Z)(e,o);return(0,i.kt)("wrapper",(0,s.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)(r.m,{content:"SSJS + JS + AMPScript + SQL + SFMC Config documentation and code snippets that I find useful for developing Salesforce Marketing Cloud.",mdxType:"LeadText"}),(0,i.kt)("h2",{id:"server-side-javascript"},"Server-Side JavaScript"),(0,i.kt)("p",null,"SSJS is an XX-century-version of JavaScript paired with proprietary libraries created by Salesforce. It is one of the programmatic tools useful to leverage Marketing Cloud to its fullest potential. I am creating this documentation to make my (and hopefully also yours) work easier."),(0,i.kt)("h3",{id:"ssjs-documentation"},"SSJS Documentation"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/ssjs/ssjs-if-and-switch"},"If & Switch")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/ssjs/ssjs-loops"},"Loops")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/ssjs/debugging-ssjs"},"Debugging")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/ssjs/ssjs-style-guide"},"Style Guide")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/ssjs/ssjs-vs-ampscript-performance"},"Performance"))),(0,i.kt)("h3",{id:"ssjs-use-cases"},"SSJS Use Cases"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/usecase/sfmc-cloud-apps"},"Solve with Cloud Apps")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/usecase/engage-with-countdown"},"Engage with Countdown")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/usecase/tailor-with-data"},"Tailor with Data"))),(0,i.kt)("h3",{id:"ssjs-snippets"},"SSJS Snippets"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/ssjs/ssjs-snippet-ampscript-in-ssjs"},"AMPScript in SSJS")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/ssjs/ssjs-snippet-mobileconnect-phone-change"},"MobileConnect Phone Change")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/ssjs/ssjs-snippet-ssjs-script-template"},"SSJS Script Template"))),(0,i.kt)("a",{class:"button button--outline button--lg button--primary col col--6 col--offset-3",href:"https://mateuszdabrowski.pl/docs/ssjs/ssjs-if-and-switch"},"Read about SSJS"),(0,i.kt)("h2",{id:"javascript"},"JavaScript"),(0,i.kt)("p",null,"In this part, I am gathering selected elements of modern vanilla JavaScript that I find useful for marketing technologists. Expect guides on asynchronous calls to API and backend resources, form-focused DOM manipulation and playing with data objects."),(0,i.kt)("h3",{id:"js-documentation"},"JS Documentation"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/js/js-if-and-switch"},"If & Switch")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/js/js-loops"},"Loops"))),(0,i.kt)("h3",{id:"js-use-cases"},"JS Use Cases"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/usecase/engage-with-countdown"},"Engage with Countdown")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/usecase/tailor-with-data"},"Tailor with Data"))),(0,i.kt)("a",{class:"button button--outline button--lg button--primary col col--6 col--offset-3",href:"https://mateuszdabrowski.pl/docs/js/js-if-and-switch"},"Read about JavaScript"),(0,i.kt)("h2",{id:"ampscript"},"AMPScript"),(0,i.kt)("p",null,"AMPScript is a proprietary scripting language in Salesforce Marketing Cloud along with ",(0,i.kt)("a",{parentName:"p",href:"#Server-Side-JavaScript"},"SSJS"),". Out of the two, it is simpler and more performant, but too limited for complex solutions. Good starting point for marketers without development experience. Best option for scripting in messaging."),(0,i.kt)("h3",{id:"ampscript-documentation"},"AMPScript Documentation"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/ampscript/ampscript-style-guide"},"Style Guide")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/ssjs/ssjs-vs-ampscript-performance"},"Performance"))),(0,i.kt)("h3",{id:"ampscript-use-cases"},"AMPScript Use Cases"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/usecase/sfmc-cloud-apps"},"Solve with Cloud Apps"))),(0,i.kt)("h3",{id:"ampscript-snippets"},"AMPScript Snippets"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/ssjs/ssjs-snippet-ampscript-in-ssjs"},"AMPScript in SSJS"))),(0,i.kt)("a",{class:"button button--outline button--lg button--primary col col--6 col--offset-3",href:"https://mateuszdabrowski.pl/docs/ampscript/ampscript-style-guide"},"Read about AMPScript"),(0,i.kt)("h2",{id:"sfmc-sql"},"SFMC SQL"),(0,i.kt)("p",null,"To fully leverage the Salesforce Marketing Cloud Data Extensions and Automation Studio, SQL is a must-have. Here I gathered both the language basics and some of the most useful snippets to copy and paste shamelessly."),(0,i.kt)("h3",{id:"sql-documentation"},"SQL Documentation"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/sql/sfmc-sql-basics"},"SQL Basics")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/sql/sfmc-sql-select"},"Select")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/sql/sfmc-sql-from"},"From")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/sql/sfmc-sql-join"},"Join")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/sql/sfmc-sql-where"},"Where")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/sql/sfmc-sql-like"},"Like")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/sql/sfmc-sql-string-functions"},"String Functions")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/sql/sfmc-sql-date-functions"},"Date Functions")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/sql/sfmc-sql-numeric-functions"},"Numeric Functions")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/sql/sfmc-sql-conversion-functions"},"Conversion Functions")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/sql/sfmc-sql-aggregate-functions"},"Aggregate Functions")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/sql/sfmc-sql-style-guide"},"Style Guide"))),(0,i.kt)("h3",{id:"sql-snippets"},"SQL Snippets"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/sql/sfmc-sql-snippet-debugging-email-sends"},"Debugging Email Sends")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/sql/sfmc-sql-snippet-debugging-value-length"},"Debugging Value Length")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/sql/sfmc-sql-snippet-enhanced-send-log"},"Enhanced Send Log"))),(0,i.kt)("a",{class:"button button--outline button--lg button--primary col col--6 col--offset-3",href:"https://mateuszdabrowski.pl/docs/sql/sfmc-sql-basics"},"Read about SFMC SQL"),(0,i.kt)("h2",{id:"sfmc-config"},"SFMC Config"),(0,i.kt)("p",null,"There are many things in Salesforce Marketing Cloud that aren't code but have a massive impact on the code. Permissions. System Data Views. Configuration options. Here I focus on the most important ones that are crucial for Marketing Cloud developers."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/config/sfmc-config-permissions"},"Permissions")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/config/sfmc-config-system-data-views"},"System Data Views")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/config/sfmc-config-features-on-demand"},"Features On Demand")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/config/sfmc-config-behavioral-triggers"},"Behavioral Triggers"))),(0,i.kt)("a",{class:"button button--outline button--lg button--primary col col--6 col--offset-3",href:"https://mateuszdabrowski.pl/docs/config/sfmc-config-system-data-views"},"Read about SFMC Config"),(0,i.kt)("h2",{id:"changes"},"Changes"),(0,i.kt)("p",null,"I'm updating the docs ongoingly, so expect changes. You can track those by watching and starring the website's ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/MateuszDabrowski/mateuszdabrowski.pl"},"Github Repository"),"."))}m.isMDXComponent=!0}}]);