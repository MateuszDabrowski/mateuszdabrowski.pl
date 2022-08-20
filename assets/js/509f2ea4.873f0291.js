"use strict";(self.webpackChunkmd=self.webpackChunkmd||[]).push([[9134],{4137:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>c});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=p(n),c=r,h=m["".concat(l,".").concat(c)]||m[c]||d[c]||i;return n?a.createElement(h,o(o({ref:t},u),{},{components:n})):a.createElement(h,o({ref:t},u))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var p=2;p<i;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1872:(e,t,n)=>{n.d(t,{m:()=>i});var a=n(7294);const r="leadText_qzwo",i=e=>{let{content:t}=e;return a.createElement(a.Fragment,null,a.createElement("p",{id:r},t))}},9682:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var a=n(7462),r=(n(7294),n(4137)),i=n(1872);const o={id:"sfmc-sql-where",title:"SFMC SQL Where",sidebar_label:"Where",description:"Use WHERE to make your query lean and to the point. Less is more.",image:"img/og/og-image-sql-where.png",tags:["Marketing Cloud","SQL"]},s=void 0,l={unversionedId:"sql/sfmc-sql-where",id:"sql/sfmc-sql-where",title:"SFMC SQL Where",description:"Use WHERE to make your query lean and to the point. Less is more.",source:"@site/docs/sql/sfmc-sql-where.mdx",sourceDirName:"sql",slug:"/sql/sfmc-sql-where",permalink:"/docs/sql/sfmc-sql-where",draft:!1,editUrl:"https://github.com/MateuszDabrowski/mateuszdabrowski.pl/edit/master/docs/sql/sfmc-sql-where.mdx",tags:[{label:"Marketing Cloud",permalink:"/docs/tags/marketing-cloud"},{label:"SQL",permalink:"/docs/tags/sql"}],version:"current",lastUpdatedBy:"Mateusz D\u0105browski",lastUpdatedAt:1657131299,formattedLastUpdatedAt:"Jul 6, 2022",frontMatter:{id:"sfmc-sql-where",title:"SFMC SQL Where",sidebar_label:"Where",description:"Use WHERE to make your query lean and to the point. Less is more.",image:"img/og/og-image-sql-where.png",tags:["Marketing Cloud","SQL"]},sidebar:"snippets",previous:{title:"Join",permalink:"/docs/sql/sfmc-sql-join"},next:{title:"Case",permalink:"/docs/sql/sfmc-sql-case"}},p={},u=[{value:"Basic operators",id:"basic-operators",level:2},{value:"Equality operators",id:"equality-operators",level:3},{value:"Comparison operators",id:"comparison-operators",level:3},{value:"LIKE operator",id:"like-operator",level:2},{value:"Logical operators",id:"logical-operators",level:2},{value:"BETWEEN shorthand",id:"between-shorthand",level:3},{value:"IN shorthand",id:"in-shorthand",level:3},{value:"NOT operator",id:"not-operator",level:2},{value:"CASE operator",id:"case-operator",level:2}],d={toc:u};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)(i.m,{content:"Use WHERE to make your query lean and to the point. Less is more.",mdxType:"LeadText"}),(0,r.kt)("p",null,"With just ",(0,r.kt)("a",{parentName:"p",href:"/docs/sql/sfmc-sql-select"},(0,r.kt)("inlineCode",{parentName:"a"},"SELECT"))," and ",(0,r.kt)("a",{parentName:"p",href:"/docs/sql/sfmc-sql-from"},(0,r.kt)("inlineCode",{parentName:"a"},"FROM"))," statements, you can already start building your queries. With the addition of ",(0,r.kt)("a",{parentName:"p",href:"/docs/sql/sfmc-sql-join"},(0,r.kt)("inlineCode",{parentName:"a"},"JOIN")),", you can do much more than in the Salesforce Marketing Cloud UI. ",(0,r.kt)("inlineCode",{parentName:"p"},"WHERE")," grants you even more power by allowing you to filter your queries' outcomes."),(0,r.kt)("p",null,"The concept behind it is straightforward. It takes all the results you obtained with the query above the ",(0,r.kt)("inlineCode",{parentName:"p"},"WHERE"),", and for each, it applies one or more conditions. If they evaluate to ",(0,r.kt)("inlineCode",{parentName:"p"},"TRUE")," - this particular result will be available in the output Data Extension. If evaluation ends with ",(0,r.kt)("inlineCode",{parentName:"p"},"FALSE"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"WHERE")," will filter it out."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql",metastring:"{5} title=\"All subscribers with domain equal to 'mateuszdabrowski.pl'\"","{5}":!0,title:'"All',subscribers:!0,with:!0,domain:!0,equal:!0,to:!0,"'mateuszdabrowski.pl'\"":!0},"SELECT\n      SubscriberKey\n    , EmailAddress\nFROM _Subscribers\nWHERE Domain = 'mateuszdabrowski.pl'\n")),(0,r.kt)("admonition",{title:"You Should Know",type:"note"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("inlineCode",{parentName:"p"},"WHERE")," statement is heavily impacted by ",(0,r.kt)("a",{parentName:"p",href:"/docs/sql/sfmc-sql-null-functions"},(0,r.kt)("inlineCode",{parentName:"a"},"NULL"))," values - be sure to check ",(0,r.kt)("a",{parentName:"p",href:"/docs/sql/sfmc-sql-null-functions"},"dedicated guide")," on how to solve those issues.")),(0,r.kt)("h2",{id:"basic-operators"},"Basic operators"),(0,r.kt)("p",null,"In many scenarios, you will be using the basic operators in your ",(0,r.kt)("inlineCode",{parentName:"p"},"WHERE")," clauses. In the example above, you already saw the equality operator (",(0,r.kt)("inlineCode",{parentName:"p"},"="),"). There are a few more available."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Operator"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"=")),(0,r.kt)("td",{parentName:"tr",align:null},"Equal to")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"!=")," or ",(0,r.kt)("inlineCode",{parentName:"td"},"<>")),(0,r.kt)("td",{parentName:"tr",align:null},"Not equal to")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},">")),(0,r.kt)("td",{parentName:"tr",align:null},"Greater than")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"<")),(0,r.kt)("td",{parentName:"tr",align:null},"Less than")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},">=")),(0,r.kt)("td",{parentName:"tr",align:null},"Greater or equal to")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"<=")),(0,r.kt)("td",{parentName:"tr",align:null},"Less or equal to")))),(0,r.kt)("h3",{id:"equality-operators"},"Equality operators"),(0,r.kt)("p",null,"Equality operators (",(0,r.kt)("inlineCode",{parentName:"p"},"="),", ",(0,r.kt)("inlineCode",{parentName:"p"},"!="),") are great when you have a controlled value. Think booleans (for example Opt-in information) and picklists (for example Status field on ",(0,r.kt)("inlineCode",{parentName:"p"},"_Subscribers")," System Data View that is limited to four values)."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql",metastring:'{5} title="All subscribers that do not have the unsubscribed status"',"{5}":!0,title:'"All',subscribers:!0,that:!0,do:!0,not:!0,have:!0,the:!0,unsubscribed:!0,'status"':!0},"SELECT\n      SubscriberKey\n    , EmailAddress\nFROM _Subscribers\nWHERE Status != 'unsubscribed'\n")),(0,r.kt)("h3",{id:"comparison-operators"},"Comparison operators"),(0,r.kt)("p",null,"Comparison operators (",(0,r.kt)("inlineCode",{parentName:"p"},"<"),", ",(0,r.kt)("inlineCode",{parentName:"p"},">"),", ",(0,r.kt)("inlineCode",{parentName:"p"},">="),", ",(0,r.kt)("inlineCode",{parentName:"p"},"<="),") are perfect when you are operating on numbers (for example selecting contacts with low Customer Lifetime Value) or dates."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql",metastring:'{5} title="All subscribers that joined within the last month"',"{5}":!0,title:'"All',subscribers:!0,that:!0,joined:!0,within:!0,the:!0,last:!0,'month"':!0},"SELECT\n      SubscriberKey\n    , EmailAddress\nFROM _Subscribers\nWHERE CONVERT(DATE, DateJoined) >= DATEADD(MONTH, -1, CONVERT(DATE, GETUTCDATE()))\n")),(0,r.kt)("p",null,"With dates, you will frequently want to use a bit more complex structure for the comparison to work correctly. In this case, we are converting the ",(0,r.kt)("inlineCode",{parentName:"p"},"DateJoined")," value to a simple date (day, month, year without the time). We are also getting a current date in UTC format and converting it to a simple date. Next, we subtract one month and compare it to the ",(0,r.kt)("inlineCode",{parentName:"p"},"DateJoined")," transformed value. I cover more such examples in the ",(0,r.kt)("a",{parentName:"p",href:"/docs/sql/sfmc-sql-date-functions"},"SFMC SQL Date Functions"),"."),(0,r.kt)("h2",{id:"like-operator"},"LIKE operator"),(0,r.kt)("p",null,"Another handy operator is ",(0,r.kt)("inlineCode",{parentName:"p"},"LIKE"),". It allows you to leverage wildcards to search for matching records based on value fragment. You may know it from the ",(0,r.kt)("a",{parentName:"p",href:"/docs/sql/sfmc-sql-case#like-in-case"},(0,r.kt)("inlineCode",{parentName:"a"},"SELECT")," ",(0,r.kt)("inlineCode",{parentName:"a"},"CASE")," statement"),", but it is much more useful with ",(0,r.kt)("inlineCode",{parentName:"p"},"WHERE"),". Think about filtering with just a part of the value (for example email domain in ",(0,r.kt)("inlineCode",{parentName:"p"},"EmailAddress")," field) or with a single element within multi picklist (for instance finding one value within the comma-separated list of all purchased products)."),(0,r.kt)("p",null,"However, in the marketing automation world, the ",(0,r.kt)("inlineCode",{parentName:"p"},"LIKE")," operator is handy for selecting contacts based on the multi-picklist columns. Consider ",(0,r.kt)("inlineCode",{parentName:"p"},"ActiveSubscriptions")," field with any combination of values ",(0,r.kt)("inlineCode",{parentName:"p"},"Phone"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"TV"),", or ",(0,r.kt)("inlineCode",{parentName:"p"},"Internet"),"."),(0,r.kt)("p",null,"Suppose you would like to select all contacts with active phone subscription. In that case, you shouldn't use ",(0,r.kt)("a",{parentName:"p",href:"#equality"},"equality operator")," (",(0,r.kt)("inlineCode",{parentName:"p"},"WHERE ActiveSubscription = 'Phone'"),"), as it would return only contacts that have just this one subscription. However, some of your customers might have multiple (phone and tv or phone and internet plans). For SQL, a field containing ",(0,r.kt)("inlineCode",{parentName:"p"},"'Phone'")," is not equal to having a value of ",(0,r.kt)("inlineCode",{parentName:"p"},"'Phone', Internet'"),". ",(0,r.kt)("inlineCode",{parentName:"p"},"LIKE")," operator is here to save the day."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql",metastring:'{5} title="All subscribers that have at least Phone subscription"',"{5}":!0,title:'"All',subscribers:!0,that:!0,have:!0,at:!0,least:!0,Phone:!0,'subscription"':!0},"SELECT\n      SubscriberKey\n    , EmailAddress\nFROM MasterSubscriberDE\nWHERE ActiveSubscription LIKE '%Phone%'\n")),(0,r.kt)("p",null,"It is also an excellent tool for database cleaning by finding incorrect values within automation. To learn more about the possibilities, check out the ",(0,r.kt)("a",{parentName:"p",href:"/docs/sql/sfmc-sql-like"},(0,r.kt)("inlineCode",{parentName:"a"},"LIKE")," guide"),"."),(0,r.kt)("h2",{id:"logical-operators"},"Logical operators"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"WHERE")," statement supports standard logical operators - ",(0,r.kt)("inlineCode",{parentName:"p"},"AND")," & ",(0,r.kt)("inlineCode",{parentName:"p"},"OR"),"."),(0,r.kt)("p",null,"They allow you to create more fine-tuned filters evaluating either multiple values or a single value from various points of view. You can use as many ",(0,r.kt)("inlineCode",{parentName:"p"},"AND"),"s and ",(0,r.kt)("inlineCode",{parentName:"p"},"OR"),"s as you want, but keep in mind the AutoKill 30 minute limit for query execution."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql",metastring:'{5-8} title="All subscribers that have at least Phone subscription AND are in its twelfth month"',"{5-8}":!0,title:'"All',subscribers:!0,that:!0,have:!0,at:!0,least:!0,Phone:!0,subscription:!0,AND:!0,are:!0,in:!0,its:!0,twelfth:!0,'month"':!0},"SELECT\n      SubscriberKey\n    , EmailAddress\nFROM MasterSubscriberDE\nWHERE\n    ActiveSubscription LIKE '%Phone%'\n    AND CONVERT(DATE, SubscriptionStart) >= DATEADD(MONTH, -12, CONVERT(DATE, GETUTCDATE()))\n    AND CONVERT(DATE, SubscriptionStart) < DATEADD(MONTH, -11, CONVERT(DATE, GETUTCDATE()))\n")),(0,r.kt)("p",null,"The standard order of execution evaluates the pairs joined by ",(0,r.kt)("inlineCode",{parentName:"p"},"AND")," first and then considers the ones with ",(0,r.kt)("inlineCode",{parentName:"p"},"OR"),". But you can use parentheses ",(0,r.kt)("inlineCode",{parentName:"p"},"()")," to enforce your order:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql",metastring:'{6} title="All subscribers that have at least either Phone OR Internet subscription AND are in its twelfth month"',"{6}":!0,title:'"All',subscribers:!0,that:!0,have:!0,at:!0,least:!0,either:!0,Phone:!0,OR:!0,Internet:!0,subscription:!0,AND:!0,are:!0,in:!0,its:!0,twelfth:!0,'month"':!0},"SELECT\n      SubscriberKey\n    , EmailAddress\nFROM MasterSubscriberDE\nWHERE\n    (ActiveSubscription LIKE '%Phone%' OR ActiveSubscription LIKE '%Internet%')\n    AND CONVERT(DATE, SubscriptionStart) >= DATEADD(MONTH, -12, CONVERT(DATE, GETUTCDATE()))\n    AND CONVERT(DATE, SubscriptionStart) < DATEADD(MONTH, -11, CONVERT(DATE, GETUTCDATE()))\n")),(0,r.kt)("p",null,"There are many use cases for using ",(0,r.kt)("inlineCode",{parentName:"p"},"AND")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"OR"),". The most popular ones are filtering by range (numerical or date-based) and capturing records fulfilling at least one of multiple criteria. For both, there is an optional shorthand."),(0,r.kt)("h3",{id:"between-shorthand"},"BETWEEN shorthand"),(0,r.kt)("p",null,"Whenever you want to work on ranges, instead of binding ",(0,r.kt)("inlineCode",{parentName:"p"},">=")," & ",(0,r.kt)("inlineCode",{parentName:"p"},"<=")," scopes (closed range) with ",(0,r.kt)("inlineCode",{parentName:"p"},"AND"),", you can leverage ",(0,r.kt)("inlineCode",{parentName:"p"},"BETWEEN")," statement."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql",metastring:"{8}","{8}":!0},"SELECT\n      SubscriberKey\n    , EmailAddress\nFROM MasterSubscriberDE\nWHERE\n    (ActiveSubscription LIKE '%Phone%' OR ActiveSubscription LIKE '%Internet%')\n    AND CONVERT(DATE, SubscriptionStart)\n       BETWEEN DATEADD(MONTH, -12, CONVERT(DATE, GETUTCDATE()))\n       AND DATEADD(MONTH, -11, CONVERT(DATE, GETUTCDATE()))\n")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"BETWEEN")," is replacing only a range greater or equal to the first value and smaller or equal to the second value. Additionally, it behaves weird when working with dates or datetime values."),(0,r.kt)("p",null,"For example: ",(0,r.kt)("inlineCode",{parentName:"p"},'WHERE Date BETWEEN "01/01/2020" AND "31/01/2020"')," will work as if you wrote ",(0,r.kt)("inlineCode",{parentName:"p"},'WHERE Date >= "01/01/2020 00:00:00" AND Date <= "31/01/2020 00:00:00"'),". It would result in a lack of data for the last day of the range. In most cases you would rather want ",(0,r.kt)("inlineCode",{parentName:"p"},'WHERE Date >= "01/01/2020 00:00:00" AND Date <= "31/01/2020 23:59:59"'),"."),(0,r.kt)("p",null,"Due to the above, I recommended not use ",(0,r.kt)("inlineCode",{parentName:"p"},"BETWEEN")," statement, unless you are sure the range is correct."),(0,r.kt)("h3",{id:"in-shorthand"},"IN shorthand"),(0,r.kt)("p",null,"There is another shorthand available - the ",(0,r.kt)("inlineCode",{parentName:"p"},"IN")," statement. And it is much more interesting than the ",(0,r.kt)("inlineCode",{parentName:"p"},"BETWEEN"),"."),(0,r.kt)("p",null,"It allows you to simplify ",(0,r.kt)("inlineCode",{parentName:"p"},"WHERE")," statement with multiple ",(0,r.kt)("inlineCode",{parentName:"p"},"OR")," operators (like ",(0,r.kt)("inlineCode",{parentName:"p"},"WHERE Status = 'held' OR Status = 'unsubscribed' OR Status = 'bounced'"),") by using a list of searched values:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql",metastring:'{5} title="All subscribers with the unsubscribed, bounced or temporarily held status"',"{5}":!0,title:'"All',subscribers:!0,with:!0,the:!0,"unsubscribed,":!0,bounced:!0,or:!0,temporarily:!0,held:!0,'status"':!0},"SELECT\n      SubscriberKey\n    , EmailAddress\nFROM _Subscribers\nWHERE Status IN ('held', 'unsubscribed', 'bounced')\n")),(0,r.kt)("p",null,"As you can see above, the syntax is much shorter and more readable."),(0,r.kt)("p",null,"But the beauty of ",(0,r.kt)("inlineCode",{parentName:"p"},"IN")," statement doesn't end there. It additionally optimizes the search speed by sorting the data and performing the binary search. Thanks to it, using ",(0,r.kt)("inlineCode",{parentName:"p"},"IN")," instead of multiple ",(0,r.kt)("inlineCode",{parentName:"p"},"OR"),"s can lead to significant performance improvements."),(0,r.kt)("admonition",{title:"You Should Know",type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Unfortunately, you cannot use ",(0,r.kt)("inlineCode",{parentName:"p"},"IN")," statement together with ",(0,r.kt)("inlineCode",{parentName:"p"},"LIKE")," statement. You need to use one or more ",(0,r.kt)("inlineCode",{parentName:"p"},"OR")," operators for such use case.")),(0,r.kt)("h2",{id:"not-operator"},"NOT operator"),(0,r.kt)("p",null,"Sometimes you want to rather exclude some records instead of searching for them. In many cases, you can do it by just adjusting the operators (for example ",(0,r.kt)("inlineCode",{parentName:"p"},"!=")," instead of ",(0,r.kt)("inlineCode",{parentName:"p"},"="),"). There are, however, some situations where the ",(0,r.kt)("inlineCode",{parentName:"p"},"NOT")," operator is the best tool for the job."),(0,r.kt)("p",null,"It is especially apparent when working with ",(0,r.kt)("inlineCode",{parentName:"p"},"LIKE"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"BETWEEN"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"IN")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"EXISTS")," operators."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql",metastring:'{5} title="All subscribers NOT with unsubscribed, bounced or temporarily held status"',"{5}":!0,title:'"All',subscribers:!0,NOT:!0,with:!0,"unsubscribed,":!0,bounced:!0,or:!0,temporarily:!0,held:!0,'status"':!0},"SELECT\n      SubscriberKey\n    , EmailAddress\nFROM _Subscribers\nWHERE Status NOT IN ('held', 'unsubscribed', 'bounced')\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql",metastring:'{5} title="All subscribers that have email address NOT ending with @mateuszdabrowski.pl"',"{5}":!0,title:'"All',subscribers:!0,that:!0,have:!0,email:!0,address:!0,NOT:!0,ending:!0,with:!0,'@mateuszdabrowski.pl"':!0},"SELECT\n      SubscriberKey\n    , EmailAddress\nFROM _Subscribers\nWHERE EmailAddress NOT LIKE '%@mateuszdabrowski.pl'\n")),(0,r.kt)("h2",{id:"case-operator"},"CASE operator"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"CASE")," statement is not only useful in a ",(0,r.kt)("a",{parentName:"p",href:"/docs/sql/sfmc-sql-select"},(0,r.kt)("inlineCode",{parentName:"a"},"SELECT"))," part of the query. You can use it also within the ",(0,r.kt)("inlineCode",{parentName:"p"},"WHERE"),". There are two approaches to do this."),(0,r.kt)("p",null,"The first compare ",(0,r.kt)("inlineCode",{parentName:"p"},"1")," to the outcome of the ",(0,r.kt)("inlineCode",{parentName:"p"},"CASE")," statement that evaluates each of its conditions to either ",(0,r.kt)("inlineCode",{parentName:"p"},"1")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"0"),". If the comparison evaluates to ",(0,r.kt)("inlineCode",{parentName:"p"},"WHERE 1 = 1")," it will resolve to ",(0,r.kt)("inlineCode",{parentName:"p"},"TRUE")," and return the result."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql",metastring:'{6-11} title="All subscribers NOT with unsubscribed, bounced or temporarily held status"',"{6-11}":!0,title:'"All',subscribers:!0,NOT:!0,with:!0,"unsubscribed,":!0,bounced:!0,or:!0,temporarily:!0,held:!0,'status"':!0},"SELECT\n      SubscriberKey\n    , EmailAddress\nFROM _Subscribers\nWHERE\n    1 = CASE Status\n        WHEN 'active'       THEN 1\n        WHEN 'held'         THEN 0\n        WHEN 'unsubscribed' THEN 0\n        WHEN 'bounced'      THEN 0\n    END\n")),(0,r.kt)("p",null,"It works, but you can write it better with other means mentioned above in most cases. This query was previously coded with single-line ",(0,r.kt)("inlineCode",{parentName:"p"},"WHERE")," utilizing ",(0,r.kt)("inlineCode",{parentName:"p"},"NOT IN")," statement."),(0,r.kt)("admonition",{title:"You Should Know",type:"note"},(0,r.kt)("p",{parentName:"admonition"},"You can do better even with the ",(0,r.kt)("a",{parentName:"p",href:"/docs/sql/sfmc-sql-case#search-version-of-case"},"search version of ",(0,r.kt)("inlineCode",{parentName:"a"},"CASE")),", as it allows you to use ",(0,r.kt)("inlineCode",{parentName:"p"},"AND"),"/",(0,r.kt)("inlineCode",{parentName:"p"},"OR"),"/",(0,r.kt)("inlineCode",{parentName:"p"},"IN")," within the ",(0,r.kt)("inlineCode",{parentName:"p"},"CASE"),":"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-sql",metastring:'{6-9} title="All subscribers NOT with unsubscribed, bounced or temporarily held status"',"{6-9}":!0,title:'"All',subscribers:!0,NOT:!0,with:!0,"unsubscribed,":!0,bounced:!0,or:!0,temporarily:!0,held:!0,'status"':!0},"SELECT\n     SubscriberKey\n   , EmailAddress\nFROM _Subscribers\nWHERE\n   1 = CASE\n       WHEN Status = 'active'                              THEN 1\n       WHEN Status IN ('held', 'unsubscribed', 'bounced')  THEN 0\n   END\n")),(0,r.kt)("p",{parentName:"admonition"},"Notice the lack of ",(0,r.kt)("inlineCode",{parentName:"p"},"Status")," column name right after ",(0,r.kt)("inlineCode",{parentName:"p"},"CASE")," keyword and its addition in each ",(0,r.kt)("inlineCode",{parentName:"p"},"WHEN"),".")),(0,r.kt)("p",null,"The second approach compares a field to the ",(0,r.kt)("inlineCode",{parentName:"p"},"CASE")," statement evaluation and is much more useful:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql",metastring:'{6-9} title="All subscribers that have EmailAddress different from the Preferred Email"',"{6-9}":!0,title:'"All',subscribers:!0,that:!0,have:!0,EmailAddress:!0,different:!0,from:!0,the:!0,Preferred:!0,'Email"':!0},"SELECT\n      SubscriberKey\n    , EmailAddress\nFROM MasterSubscriberDE\nWHERE\n    EmailAddress != CASE\n        WHEN PreferredEmail = 'Personal Email'  THEN PersonalEmail\n        WHEN PreferredEmail = 'Work Email'      THEN WorkEmail\n    END\n")),(0,r.kt)("p",null,"It can still be written using multiple ",(0,r.kt)("inlineCode",{parentName:"p"},"AND")," & ",(0,r.kt)("inlineCode",{parentName:"p"},"OR")," statements, but it is shorter and more readable thanks to the ",(0,r.kt)("inlineCode",{parentName:"p"},"CASE")," statement."),(0,r.kt)("admonition",{title:"You Should Know",type:"note"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("inlineCode",{parentName:"p"},"CASE")," statement returns ",(0,r.kt)("inlineCode",{parentName:"p"},"THEN")," value of the first condition that evaluated to ",(0,r.kt)("inlineCode",{parentName:"p"},"TRUE"),". It means that if in your query first condition is true, the rest will be ignored. Even if for the selected contact, all of them would be true."),(0,r.kt)("p",{parentName:"admonition"},"Always consider the order of the conditions in your ",(0,r.kt)("inlineCode",{parentName:"p"},"CASE")," statement. It might lead to errors if you don't expect behaviour mentioned above, and make your life much easier if you know it works that way.")),(0,r.kt)("p",null,"To learn more about the possibilities and ",(0,r.kt)("a",{parentName:"p",href:"/docs/sql/sfmc-sql-case#iif-shorthand"},"shorthands"),", check out the ",(0,r.kt)("a",{parentName:"p",href:"/docs/sql/sfmc-sql-case"},(0,r.kt)("inlineCode",{parentName:"a"},"CASE")," guide"),"."))}m.isMDXComponent=!0}}]);