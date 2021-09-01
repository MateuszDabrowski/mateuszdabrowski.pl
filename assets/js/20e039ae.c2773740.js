"use strict";(self.webpackChunkmd=self.webpackChunkmd||[]).push([[1872],{4137:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return p}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),u=c(n),p=r,h=u["".concat(l,".").concat(p)]||u[p]||m[p]||i;return n?a.createElement(h,s(s({ref:t},d),{},{components:n})):a.createElement(h,s({ref:t},d))}));function p(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,s=new Array(i);s[0]=u;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:r,s[1]=o;for(var c=2;c<i;c++)s[c]=n[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},2043:function(e,t,n){n.d(t,{m:function(){return i}});var a=n(7294),r="leadText_16va",i=function(e){var t=e.content;return a.createElement(a.Fragment,null,a.createElement("p",{id:r},t))}},5209:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return d},toc:function(){return m},default:function(){return p}});var a=n(7462),r=n(3366),i=(n(7294),n(4137)),s=n(2043),o=["components"],l={id:"sfmc-sql-from",title:"SFMC SQL From",sidebar_label:"From",description:"Tell the SQL query FROM where you need the data.",image:"img/og/og-image-sql-from.png",tags:["SQL"]},c=void 0,d={unversionedId:"sql/sfmc-sql-from",id:"sql/sfmc-sql-from",isDocsHomePage:!1,title:"SFMC SQL From",description:"Tell the SQL query FROM where you need the data.",source:"@site/docs/sql/sfmc-sql-from.mdx",sourceDirName:"sql",slug:"/sql/sfmc-sql-from",permalink:"/docs/sql/sfmc-sql-from",editUrl:"https://github.com/MateuszDabrowski/mateuszdabrowski.pl/edit/master/docs/sql/sfmc-sql-from.mdx",tags:[{label:"SQL",permalink:"/docs/tags/sql"}],version:"current",lastUpdatedBy:"Mateusz D\u0105browski",lastUpdatedAt:1630274625,formattedLastUpdatedAt:"8/30/2021",frontMatter:{id:"sfmc-sql-from",title:"SFMC SQL From",sidebar_label:"From",description:"Tell the SQL query FROM where you need the data.",image:"img/og/og-image-sql-from.png",tags:["SQL"]},sidebar:"snippets",previous:{title:"Select",permalink:"/docs/sql/sfmc-sql-select"},next:{title:"Join",permalink:"/docs/sql/sfmc-sql-join"}},m=[{value:"Basic FROM",id:"basic-from",children:[]},{value:"System Data Views",id:"system-data-views",children:[]},{value:"Enterprise Data Extension",id:"enterprise-data-extension",children:[]},{value:"Enterprise System Data Views",id:"enterprise-system-data-views",children:[]}],u={toc:m};function p(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)(s.m,{content:"Tell the SQL query FROM where you need the data",mdxType:"LeadText"}),(0,i.kt)("h2",{id:"basic-from"},"Basic FROM"),(0,i.kt)("p",null,"The ",(0,i.kt)("a",{parentName:"p",href:"/docs/sql/sfmc-sql-select"},(0,i.kt)("inlineCode",{parentName:"a"},"SELECT"))," statement alone won't do much. In most cases, once you have selected data you want to work with, you also need to pick the table (Data Extension or System Data View) ",(0,i.kt)("inlineCode",{parentName:"p"},"FROM")," which the query will take the required columns. The code for this is simple:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql",metastring:'{4} title="Get ContactKey and EmailAddress from Data Extension named MasterSubscriberDE"',"{4}":!0,title:'"Get',ContactKey:!0,and:!0,EmailAddress:!0,from:!0,Data:!0,Extension:!0,named:!0,'MasterSubscriberDE"':!0},"SELECT\n      ContactKey\n    , EmailAddress\nFROM MasterSubscriberDE\n")),(0,i.kt)("p",null,"Just as with column names, if the name of your Data Extension has spaces or hyphens in it, be sure to enclose it in brackets."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql",metastring:"{4}","{4}":!0},"SELECT\n      ContactKey\n    , EmailAddress\nFROM [Master-Subscriber DE]\n")),(0,i.kt)("p",null,"There are, however, two cases specific to Salesforce Marketing Cloud that adds a twist. System Data Views and Enterprise Data Extensions."),(0,i.kt)("h2",{id:"system-data-views"},"System Data Views"),(0,i.kt)("p",null,"Salesforce Marketing Cloud is partially hiding the ",(0,i.kt)("a",{parentName:"p",href:"/docs/config/sfmc-config-system-data-views"},"System Data Views")," Data Extensions that store tracking data. Think about Email Sent history, Opens and Clicks, Bounces and Complaints. You can find there the tracking data for SMS and Social channels. Also, more technical data points, like Jobs and Enterprise Attributes, are available in the System Data Views. You won't find them in the User Interface but can query them with the SQL. The difference related to those tables is in naming convention. When querying them, you must leverage ",(0,i.kt)("inlineCode",{parentName:"p"},"_")," prefix:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql",metastring:"{8}","{8}":!0},"SELECT\n      JobID\n    , EmailID\n    , EmailName\n    , EmailSubject\n    , EmailSendDefinition\n    , DeliveredTime\nFROM _Job\n")),(0,i.kt)("h2",{id:"enterprise-data-extension"},"Enterprise Data Extension"),(0,i.kt)("p",null,"If you want to query Shared Data Extensions or Synchronized Data Extensions, you must use a different unique prefix, ",(0,i.kt)("inlineCode",{parentName:"p"},"Ent."),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql",metastring:"{4}","{4}":!0},"SELECT\n      ContactKey\n    , EmailAddress\nFROM Ent.SharedSegment\n")),(0,i.kt)("p",null,"Remember that account permissions restrictions may apply."),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"You Should Know")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"In the past, the opposite was also available. You could query Data Extension on child Business Unit from the Parent. To do this, you had to use the MID of the child BU (visible next to BU name on the Business Unit selection drop down) as a prefix:"),(0,i.kt)("pre",{parentName:"div"},(0,i.kt)("code",{parentName:"pre",className:"language-sql",metastring:'{4} title="On Parent BU query DataExtensionOnChildBU from Child BU with MID 5123456"',"{4}":!0,title:'"On',Parent:!0,BU:!0,query:!0,DataExtensionOnChildBU:!0,from:!0,Child:!0,with:!0,MID:!0,'5123456"':!0},"SELECT\n      ContactKey\n    , EmailAddress\nFROM 5123456.DataExtensionOnChildBU\n")),(0,i.kt)("p",{parentName:"div"},"Since 2020, trying to do so will result in an error: ",(0,i.kt)("inlineCode",{parentName:"p"},"An error occurred while checking the query syntax. Errors: The 123456.DataExtensionOnChildBU table has a multi-part specification. This is not allowed.")," The workaround is to use Shared Data Extensions."),(0,i.kt)("p",{parentName:"div"},"Marketing Cloud legend says that there are still some instances that support this legacy type of querying. You might try it, but even if you are the lucky one, I would recommend using the Shared Data Extensions to worry not about unexpected Automation errors in the future."))),(0,i.kt)("h2",{id:"enterprise-system-data-views"},"Enterprise System Data Views"),(0,i.kt)("p",null,"Using ",(0,i.kt)("a",{parentName:"p",href:"#enterprise-data-extension"},(0,i.kt)("inlineCode",{parentName:"a"},"Ent."))," prefix on a System Data View might give you different results."),(0,i.kt)("p",null,"For example, if you query _Subscribers on child Business Unit, you will receive data only for the subscribers stored in this child BU."),(0,i.kt)("p",null,"By adding the ",(0,i.kt)("inlineCode",{parentName:"p"},"Ent.")," prefix, however, you can query all your subscribers on the Parent BU:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql",metastring:"{6}","{6}":!0},"SELECT\n      SubscriberKey\n    , EmailAddress\n    , DateJoined\n    , DateUnsubscribed\nFROM Ent._Subscribers\n")),(0,i.kt)("p",null,"When selecting Data Extensions to pull data from, remember the best practice to avoid ones spanning a cumulative field width greater than 4000 characters. They will badly impact the performance of your query. If needed, consider splitting your query into multiple consecutive queries."))}p.isMDXComponent=!0}}]);