"use strict";(self.webpackChunkmd=self.webpackChunkmd||[]).push([[7120],{2821:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>t,default:()=>m,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var i=s(5893),a=s(1151),l=s(1872);const r={id:"sfmc-sql-style-guide",title:"SFMC SQL Style Guide",sidebar_label:"Style Guide",description:"Query with style. Readable, bug-free code is a few shifts & spaces away.",image:"img/og/og-image-sql-style-guide.png",tags:["Marketing Cloud","SQL","Style Guide","Best Practice"]},t=void 0,o={id:"sql/sfmc-sql-style-guide",title:"SFMC SQL Style Guide",description:"Query with style. Readable, bug-free code is a few shifts & spaces away.",source:"@site/docs/sql/sfmc-sql-style-guide.mdx",sourceDirName:"sql",slug:"/sql/sfmc-sql-style-guide",permalink:"/docs/sql/sfmc-sql-style-guide",draft:!1,unlisted:!1,editUrl:"https://github.com/MateuszDabrowski/mateuszdabrowski.pl/edit/master/docs/sql/sfmc-sql-style-guide.mdx",tags:[{label:"Marketing Cloud",permalink:"/docs/tags/marketing-cloud"},{label:"SQL",permalink:"/docs/tags/sql"},{label:"Style Guide",permalink:"/docs/tags/style-guide"},{label:"Best Practice",permalink:"/docs/tags/best-practice"}],version:"current",lastUpdatedBy:"Mateusz D\u0105browski",lastUpdatedAt:1641649742,formattedLastUpdatedAt:"Jan 8, 2022",frontMatter:{id:"sfmc-sql-style-guide",title:"SFMC SQL Style Guide",sidebar_label:"Style Guide",description:"Query with style. Readable, bug-free code is a few shifts & spaces away.",image:"img/og/og-image-sql-style-guide.png",tags:["Marketing Cloud","SQL","Style Guide","Best Practice"]},sidebar:"docs",previous:{title:"Null Functions",permalink:"/docs/sql/sfmc-sql-null-functions"},next:{title:"SFMC Config",permalink:"/docs/category/sfmc-config"}},c={},d=[{value:"Letter Case",id:"letter-case",level:2},{value:"SQL Syntax Case",id:"sql-syntax-case",level:3},{value:"Column &amp; Table Names Case",id:"column--table-names-case",level:3},{value:"Alignment and Indentation",id:"alignment-and-indentation",level:2},{value:"Single Information per Line",id:"single-information-per-line",level:3},{value:"Left Aligned Keywords",id:"left-aligned-keywords",level:3},{value:"Consistent Indentation",id:"consistent-indentation",level:3},{value:"Intentional Spacing",id:"intentional-spacing",level:3},{value:"Commas Placement",id:"commas-placement",level:3},{value:"Explicit vs Implicit",id:"explicit-vs-implicit",level:2},{value:"Date Parts",id:"date-parts",level:3},{value:"JOIN and ON",id:"join-and-on",level:3},{value:"Table Aliases",id:"table-aliases",level:3},{value:"Not Equal To Symbol",id:"not-equal-to-symbol",level:3},{value:"Meaningful Column Names",id:"meaningful-column-names",level:3},{value:"Sum Up",id:"sum-up",level:2}];function h(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(l.m,{content:"Query with style. Readable, bug-free code is a few shifts & spaces away."}),"\n",(0,i.jsx)(n.p,{children:"First things first: this Salesforce Marketing Cloud SQL style guide is highly subjective. You may use it as it is, implement only some parts of it, or ignore it altogether. There are only two rules that I believe are a must-have:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Be consistent across your codebase."}),"\n",(0,i.jsx)(n.li,{children:"Strive for good readability."}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Everything else is preference. And you are just about to learn about mine."}),"\n",(0,i.jsx)(n.h2,{id:"letter-case",children:"Letter Case"}),"\n",(0,i.jsx)(n.p,{children:"SQL gives you much freedom regarding the type of letter case you will be using for parts of your query. Let's use this freedom to create queries that are readable and aligned in convention to other Marketing Cloud programmatic languages operating on the same data."}),"\n",(0,i.jsx)(n.h3,{id:"sql-syntax-case",children:"SQL Syntax Case"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsxs)(n.strong,{children:["Use ",(0,i.jsx)(n.code,{children:"UPPERCASE"})," for all elements of SQL syntax."]})}),"\n",(0,i.jsx)(n.p,{children:"This approach helps visually differentiate query language from Tables (data extensions, data views) and Columns (fields) to improve readability."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"/* \u2705 Upper Case for SQL Syntax */\nSELECT\n      SubscriberKey\n    , EmailAddress\nFROM Ent._Subscribers\nWHERE DateJoined >= DATEADD(MONTH, -1, GETDATE())\n\n/* \u274c Pascal Case for SQL Syntax */\nSelect\n      SubscriberKey\n    , EmailAddress\nFrom Ent._Subscribers\nWhere DateJoined >= DateAdd(Month, -1, GetDate())\n\n/* \u274c Lower Case for SQL Syntax */\nselect\n      SubscriberKey\n    , EmailAddress\nfrom Ent._Subscribers\nwhere DateJoined >= dateadd(month, -1, getdate())\n"})}),"\n",(0,i.jsx)(n.h3,{id:"column--table-names-case",children:"Column & Table Names Case"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsxs)(n.strong,{children:["Use ",(0,i.jsx)(n.code,{children:"PascalCase"})," for all Table and Column names."]})}),"\n",(0,i.jsx)(n.p,{children:"Treat it as a soft recommendation, as it is highly connected to your organisation's conventions. If other connected systems are using a different style, it might be best to follow it in Marketing Cloud."}),"\n",(0,i.jsx)(n.p,{children:"It is especially true for Tables, as you might be using mixed convention leveraging lowercase, uppercase and underscores for Data Extension names. However, try not to use hyphens, as those will require you to use square brackets around the name and might interfere in query syntax highlighting, leading to worse readability."}),"\n",(0,i.jsxs)(n.p,{children:["The most popular SQL convention for Table and Column names is ",(0,i.jsx)(n.code,{children:"snake_case"}),". However, in Marketing Cloud, the Table and Column names will share the case between your queries and the User Interface. It is essential to make them as readable and human friendly as possible. Additionally, in many cases, you will also leverage those names in AMPScript and SSJS."]}),"\n",(0,i.jsxs)(n.p,{children:["Due to the above, I believe ",(0,i.jsx)(n.code,{children:"PascalCase"})," - especially for Column names - is the best choice for Marketing Cloud SQL."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"/* \u2705 Pascal Case for Table and Column names */\nSELECT\n      wel.SubscriberKey\n    , wel.EmailAddress\n    , o.EventDate AS OpenDate\nFROM WelcomeCampaignSegment AS wel\n    INNER JOIN _Open AS o\n        ON o.SubscriberKey = wel.SubscriberKey\n\n/* \u2705 Pascal Case for Column names and custom consistent covention for Table names */\nSELECT\n      wel.SubscriberKey\n    , wel.EmailAddress\n    , o.EventDate AS OpenDate\nFROM WEL_WelcomeCampaignSegment_20201011_OTH AS wel\n    INNER JOIN _Open AS o\n        ON o.SubscriberKey = wel.SubscriberKey\n\n/* \u274c Lower Case for Table and Column names */\nSELECT\n      wel.subscriberkey\n    , wel.emailaddress\n    , o.eventdate AS opendate\nFROM welcomecampaignsegment AS wel\n    INNER JOIN _open AS o\n        ON o.subscriberkey = wel.subscriberkey\n\n/* \u274c Upper Case for Table and Column names */\nSELECT\n      WEL.SUBSCRIBERKEY\n    , WEL.EMAILADDRESS\n    , O.EVENTDATE AS OPENDATE\nFROM WELCOMECAMPAIGNSEGMENT AS WEL\n    INNER JOIN _OPEN AS O\n        ON O.SUBSCRIBERKEY = WEL.SUBSCRIBERKEY\n"})}),"\n",(0,i.jsxs)(n.admonition,{title:"You Should Know",type:"note",children:[(0,i.jsx)(n.p,{children:"If you want to make your Style Guide even safer, you can decide on writing all Columns and Table names in square brackets. As Marketing Cloud is not checking whether you use SQL's reserved keywords, this approach will protect you from potential silent issue. The cost, however, is much more characters and less readable queries."}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",metastring:'title="You need to decide how hard you want to leverage the square brackets"',children:"SELECT\n      [wel].[SubscriberKey]\n    , [wel].[EmailAddress]\n    , [o].[EventDate] AS [OpenDate]\nFROM [WelcomeCampaignSegment] AS [wel]\n    INNER JOIN [_Open] AS [o]\n        ON [o].[SubscriberKey] = [wel].[SubscriberKey]\n"})})]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"alignment-and-indentation",children:"Alignment and Indentation"}),"\n",(0,i.jsx)(n.p,{children:"SQL is very flexible when it comes to alignment and indentation of the query. Writing everything in one line creates a valid code that will run. But just because it is correct, it doesn't mean it is good. Generous use of new lines and indents has close to no impact on performance but a massive impact on readability. Enter and Space keys are your friends."}),"\n",(0,i.jsx)(n.p,{children:"There are many styles out there, and I decided to follow those that merge good writing speed with excellent readability."}),"\n",(0,i.jsx)(n.h3,{id:"single-information-per-line",children:"Single Information per Line"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Limit information per line to one."})}),"\n",(0,i.jsx)(n.p,{children:"I recommend keeping one information per line, as it allows for much easier scanning. The four most important examples of this approach are:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Each ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-select",children:(0,i.jsx)(n.code,{children:"SELECT"})})," Column in a separate line"]}),"\n",(0,i.jsxs)(n.li,{children:["Each ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-where",children:(0,i.jsx)(n.code,{children:"WHERE"})})," condition in a separate line"]}),"\n",(0,i.jsxs)(n.li,{children:["Each ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-case",children:(0,i.jsx)(n.code,{children:"CASE"})})," condition in a separate line"]}),"\n",(0,i.jsxs)(n.li,{children:["Each ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-join",children:(0,i.jsx)(n.code,{children:"JOIN"})})," and ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-join#joining-on",children:(0,i.jsx)(n.code,{children:"ON"})})," relationship in a separate line"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"/* \u2705 Single information per line  */\nSELECT\n      s.SubscriberKey AS SubscriberKey\n    , j.EmailName     AS EmailName\n    , s.EventDate     AS SentDate\n    , j.DeliveredTime AS DeliveryDate\n    , o.EventDate     AS OpenDate\nFROM _Sent AS s\n    LEFT JOIN _Job AS j\n        ON j.JobID = s.JobID\n    LEFT JOIN _Open AS o\n        ON o.JobID = s.JobID\n        AND o.ListID = s.ListID\n        AND o.BatchID = s.BatchID\n        AND o.SubscriberID = s.SubscriberID\n        AND o.IsUnique = 1\nWHERE\n    1 = CASE\n        WHEN j.EmailName LIKE 'UPS_%' THEN 1\n        WHEN j.EmailName LIKE 'CRS_%' THEN 1\n        ELSE 0\n    END\n\n/* \u274c Multiple pieces of information per line */\nSELECT s.SubscriberKey AS SubscriberKey, j.EmailName AS EmailName, s.EventDate AS SentDate, j.DeliveredTime AS DeliveryDate, o.EventDate AS OpenDate\nFROM _Sent AS s\n    LEFT JOIN _Job AS j ON j.JobID = s.JobID\n    LEFT JOIN _Open AS o ON o.JobID = s.JobID AND o.ListID = s.ListID AND o.BatchID = s.BatchID AND o.SubscriberID = s.SubscriberID AND o.IsUnique = 1\nWHERE 1 = CASE WHEN j.EmailName LIKE 'UPS_%' THEN 1 WHEN j.EmailName LIKE 'CRS_%' THEN 1 ELSE 0 END\n"})}),"\n",(0,i.jsxs)(n.p,{children:["As you can see, the ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-select",children:(0,i.jsx)(n.code,{children:"SELECT"})})," and ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-where",children:(0,i.jsx)(n.code,{children:"WHERE"})})," keywords have their separate line to mark respective block starting. For readability reasons, I make an exception if there is only one Column or condition to be used:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"/* \u2705 Single Column in SELECT and single condition in WHERE lines */\nSELECT SubscriberKey\nFROM _Subscribers\nWHERE Domain = 'mateuszdabrowski.pl'\n\n/* \u274c Separate lines with single SELECT Column and WHERE condition */\nSELECT\n      SubscriberKey\nFROM _Subscribers\nWHERE\n    Domain = 'mateuszdabrowski.pl'\n"})}),"\n",(0,i.jsxs)(n.admonition,{title:"You Should Know",type:"note",children:[(0,i.jsxs)(n.p,{children:["If you are using ",(0,i.jsx)(n.code,{children:"DISTINCT"})," or ",(0,i.jsx)(n.code,{children:"TOP"}),", put it into the same line as ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-select",children:(0,i.jsx)(n.code,{children:"SELECT"})}),". In such a case, even if you work on a single Column, move it to a separate row for better readability."]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"/* \u2705 Single Column in SELECT and single condition in WHERE lines */\nSELECT DISTINCT TOP 10\n      SubscriberKey\nFROM ContenstSubmissions\n\n/* \u274c Separate lines for single SELECT Column and WHERE condition */\nSELECT DISTINCT TOP 10 SubscriberKey\nFROM ContenstSubmissions\n"})})]}),"\n",(0,i.jsx)(n.h3,{id:"left-aligned-keywords",children:"Left Aligned Keywords"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Align main SQL keywords to the left."})}),"\n",(0,i.jsx)(n.p,{children:"This rule focuses on writing speed. While I prefer the Vertically Aligned Space approach's aesthetics, I don't see any significant readability gains. On the other hand, writing in this style in Marketing Cloud is a pain, as there is no autoformatter supporting it in the Query Studio or Query Activity. We would have to add all those additional spaces manually. It's just not worth it."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"/* \u2705 Left Aligned Keywords */\nSELECT\n      SubscriberKey\n    , EmailAddress\nFROM Ent._Subscribers\nWHERE DateJoined >= DATEADD(MONTH, -1, GETDATE())\n\n/* \u274c Post Keyword Space Aligned Vertically */\nSELECT SubscriberKey,\n       EmailAddress\n  FROM Ent._Subscribers\n WHERE DateJoined >= DATEADD(MONTH, -1, GETDATE())\n"})}),"\n",(0,i.jsx)(n.h3,{id:"consistent-indentation",children:"Consistent Indentation"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Use indentation to highlight SQL keyword relationships."})}),"\n",(0,i.jsx)(n.p,{children:"This rule focuses on readability. The logic, in short, is to indent whenever the line is dependent on the previous line (child line), for example:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Selected Column Names are children of ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-select",children:(0,i.jsx)(n.code,{children:"SELECT"})})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-join",children:(0,i.jsx)(n.code,{children:"JOIN"})})," keywords are children of the initial Table referenced with ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-from",children:(0,i.jsx)(n.code,{children:"FROM"})})]}),"\n",(0,i.jsxs)(n.li,{children:["Joining relationships (",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-join#joining-on",children:(0,i.jsx)(n.code,{children:"ON"})}),") are children of ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-join",children:(0,i.jsx)(n.code,{children:"JOIN"})})]}),"\n",(0,i.jsxs)(n.li,{children:["Case conditions are children of the ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-case",children:(0,i.jsx)(n.code,{children:"CASE"})})]}),"\n",(0,i.jsxs)(n.li,{children:["Where conditions are children of the ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-where",children:(0,i.jsx)(n.code,{children:"WHERE"})})]}),"\n",(0,i.jsx)(n.li,{children:"Sub-queries follow the same rules in respective indentation level."}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"For simplicity I use 4-spaces indent, as it is both standard and can be added in Marketing Cloud Query with a single click of the Tab key."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"/* \u2705 Dependency based indentation */\nSELECT\n      s.SubscriberKey AS SubscriberKey\n    , j.EmailName     AS EmailName\n    , s.EventDate     AS SentDate\n    , j.DeliveredTime AS DeliveryDate\n    , o.EventDate     AS OpenDate\nFROM _Sent AS s\n    LEFT JOIN _Job AS j\n        ON j.JobID = s.JobID\n    LEFT JOIN _Open AS o\n        ON o.JobID = s.JobID\n        AND o.ListID = s.ListID\n        AND o.BatchID = s.BatchID\n        AND o.SubscriberID = s.SubscriberID\n        AND o.IsUnique = 1\nWHERE\n    1 = CASE\n        WHEN j.EmailName LIKE 'UPS_%' THEN 1\n        WHEN j.EmailName LIKE 'CRS_%' THEN 1\n        ELSE 0\n    END\n\n/* \u274c Lack of indentation */\nSELECT\ns.SubscriberKey   AS SubscriberKey\n, j.EmailName     AS EmailName\n, s.EventDate     AS SentDate\n, j.DeliveredTime AS DeliveryDate\n, o.EventDate     AS OpenDate\nFROM _Sent AS s\nLEFT JOIN _Job AS j ON j.JobID = s.JobID\nLEFT JOIN _Open AS o ON o.JobID = s.JobID\nAND o.ListID = s.ListID\nAND o.BatchID = s.BatchID\nAND o.SubscriberID = s.SubscriberID\nAND o.IsUnique = 1\nWHERE 1 = CASE\nWHEN j.EmailName LIKE 'UPS_%' THEN 1\nWHEN j.EmailName LIKE 'CRS_%' THEN 1\nELSE 0\nEND\n"})}),"\n",(0,i.jsx)(n.h3,{id:"intentional-spacing",children:"Intentional Spacing"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Use spaces wherever it makes the query more readable."})}),"\n",(0,i.jsxs)(n.p,{children:["The must-have is spacing around any ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-where#basic-operators",children:"operators"})," (equality or comparison) and after commas."]}),"\n",(0,i.jsxs)(n.p,{children:["However, there is another place where spacing is beneficial for readability but might require an exception in some scenarios. Spacing for ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-select#aliasing-with-as",children:"aliases"})," and ",(0,i.jsx)(n.code,{children:"THEN"})," keywords of the ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-case",children:(0,i.jsx)(n.code,{children:"CASE"})})," statement."]}),"\n",(0,i.jsxs)(n.p,{children:["I try to use it whenever possible, but when there is huge imbalance in length (for example one Column requires multi-function calculation or there is a single complex ",(0,i.jsx)(n.code,{children:"WHEN"})," in ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-case",children:(0,i.jsx)(n.code,{children:"CASE"})}),") equal spacing might make the query harder to read. Always decide which approach works best for your query from readability perspective."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"/* \u2705 Spacing around operators plus equalizing aliases and THEN */\nSELECT\n      s.SubscriberKey AS SubscriberKey\n    , j.EmailName     AS EmailName\n    , s.EventDate     AS SentDate\n    , j.DeliveredTime AS DeliveryDate\n    , o.EventDate     AS OpenDate\nFROM _Sent AS s\n    LEFT JOIN _Job AS j\n        ON j.JobID = s.JobID\n    LEFT JOIN _Open AS o\n        ON o.JobID = s.JobID\n        AND o.ListID = s.ListID\n        AND o.BatchID = s.BatchID\n        AND o.SubscriberID = s.SubscriberID\n        AND o.IsUnique = 1\nWHERE\n    1 = CASE\n        WHEN j.EmailName LIKE 'UPS_%'     THEN 1\n        WHEN j.EmailName LIKE 'CRS_%'     THEN 1\n        WHEN j.EmailName = 'OTH_SeedList' THEN 1\n        ELSE 0\n    END\n\n/* \u2705 Spacing around operators plus equalizing aliases with exceptions */\nSELECT\n      s.SubscriberKey AS SubscriberKey\n    , j.EmailName     AS EmailName\n    , s.EventDate     AS SentDate\n    , j.DeliveredTime AS DeliveryDate\n    , o.EventDate     AS OpenDate\n    , DATEDIFF(HOUR, s.EventDate, o.EventDate) AS TimeToOpen\nFROM _Sent AS s\n    LEFT JOIN _Job AS j\n        ON j.JobID = s.JobID\n    LEFT JOIN _Open AS o\n        ON o.JobID = s.JobID\n        AND o.ListID = s.ListID\n        AND o.BatchID = s.BatchID\n        AND o.SubscriberID = s.SubscriberID\n        AND o.IsUnique = 1\nWHERE\n    1 = CASE\n        WHEN j.EmailName LIKE 'UPS_%' OR j.EmailName LIKE 'CRS_%' THEN 1\n        WHEN j.EmailName = 'OTH_SeedList' THEN 1\n        ELSE 0\n    END\n\n/* \u274c Lack of spacing */\nSELECT\n    s.SubscriberKey AS SubscriberKey\n    ,j.EmailName AS EmailName\n    ,s.EventDate AS SentDate\n    ,j.DeliveredTime AS DeliveryDate\n    ,o.EventDate AS OpenDate\n    ,DATEDIFF(HOUR,s.EventDate,o.EventDate) AS TimeToOpen\nFROM _Sent AS s\n    LEFT JOIN _Job AS j\n        ON j.JobID=s.JobID\n    LEFT JOIN _Open AS o\n        ON o.JobID=s.JobID\n        AND o.ListID=s.ListID\n        AND o.BatchID=s.BatchID\n        AND o.SubscriberID=s.SubscriberID\n        AND o.IsUnique=1\nWHERE\n    1=CASE\n        WHEN j.EmailName LIKE 'UPS_%' THEN 1\n        WHEN j.EmailName LIKE 'CRS_%' THEN 1\n        WHEN j.EmailName='OTH_SeedList' THEN 1\n        ELSE 0\n    END\n"})}),"\n",(0,i.jsx)(n.h3,{id:"commas-placement",children:"Commas Placement"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Use commas at the beginning of the line."})}),"\n",(0,i.jsx)(n.p,{children:"There are few approaches related to comma placement. Initially, I favoured commas at the end of the line, as I found them more accessible to use due to their similarity to natural language. However, there are strong reasons to use the comma at the beginning of the line. Here is what convinced me to change my style:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Adding or deleting a Column requires a change in only one line. It's easier, faster and minimises the risk of a crash due to the trailing comma."}),"\n",(0,i.jsx)(n.li,{children:"Above is also very beneficial during difference checking and when leveraging git for query version control. With a comma at the beginning of the line, the Column addition or deletion is displayed correctly as a single line change."}),"\n",(0,i.jsxs)(n.li,{children:["Having a comma in the beginning makes it easier to assess where a new Column definition starts quickly. It is a vast readability improvement when you are using more complex structures, like ",(0,i.jsxs)(n.a,{href:"/docs/sql/sfmc-sql-case#conditional-values-with-case",children:[(0,i.jsx)(n.code,{children:"CASE"})," in ",(0,i.jsx)(n.code,{children:"SELECT"})]}),"."]}),"\n",(0,i.jsx)(n.li,{children:"It's also easier to quickly assess whether you have a comma for each Column. With lines of various length, it is much harder with the comma at the end."}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["For the sake of readability, I indent the first Column by two spaces so that it is in line with the following ones. Similarly, I indent ",(0,i.jsx)(n.code,{children:"END"})," after ",(0,i.jsxs)(n.a,{href:"/docs/sql/sfmc-sql-case#conditional-values-with-case",children:[(0,i.jsx)(n.code,{children:"CASE"})," in ",(0,i.jsx)(n.code,{children:"SELECT"})]})," by two spaces for the same reason."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",metastring:"{3-5,10-12}",children:"/* \u2705 Commas at the beginning */\nSELECT\n      SubscriberKey\n    , EmailAddress\n    , DateJoined\nFROM Ent._Subscribers\n\n/* \u274c Commas in the end */\nSELECT\n    SubscriberKey,\n    EmailAddress,\n    DateJoined\nFROM Ent._Subscribers\n"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"explicit-vs-implicit",children:"Explicit vs Implicit"}),"\n",(0,i.jsx)(n.p,{children:"Many things in SQL can be done in multiple ways - using various functions, symbols or shortcuts. While all those options may work, not all are a good idea. Whenever you are choosing the approach, go for the explicit and straightforward. Even if it means writing a few characters more."}),"\n",(0,i.jsx)(n.h3,{id:"date-parts",children:"Date Parts"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsxs)(n.strong,{children:["Use full ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-date-functions#date-parts",children:"Date Parts"})," names."]})}),"\n",(0,i.jsx)(n.p,{children:"Yes, abbreviations let you save few characters, but they kill the readability unless someone is fluent in those shortcuts. For Marketing Cloud purposes, the time saved during writing is not worth the time lost when reading. Go with the full version."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",metastring:"{6,13}",children:"/* \u2705 Full Date Part */\nSELECT\n      SubscriberKey\n    , EmailAddress\nFROM Ent._Subscribers\nWHERE DateJoined >= DATEADD(MONTH, -1, GETDATE())\n\n/* \u274c Abbreviated Date Part */\nSELECT\n      SubscriberKey\n    , EmailAddress\nFROM Ent._Subscribers\nWHERE DateJoined >= DATEADD(M, -1, GETDATE())\n"})}),"\n",(0,i.jsx)(n.h3,{id:"join-and-on",children:"JOIN and ON"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsxs)(n.strong,{children:["Use ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-join",children:(0,i.jsx)(n.code,{children:"INNER JOIN"})})," name and reference Column from the new Table first after ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-join#joining-on",children:(0,i.jsx)(n.code,{children:"ON"})}),"."]})}),"\n",(0,i.jsxs)(n.p,{children:["Instead of just ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-join",children:(0,i.jsx)(n.code,{children:"JOIN"})}),", write ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-join#inner-join",children:(0,i.jsx)(n.code,{children:"INNER JOIN"})})," - it's longer but explicit and in line with the rest of ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-join",children:(0,i.jsx)(n.code,{children:"JOIN"})})," keywords. It makes it easier to scan queries with ",(0,i.jsxs)(n.a,{href:"/docs/sql/sfmc-sql-join#multiple-various-joins",children:["multiple various ",(0,i.jsx)(n.code,{children:"JOIN"})]})," statements."]}),"\n",(0,i.jsxs)(n.p,{children:["Additionally, when defining ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-join",children:(0,i.jsx)(n.code,{children:"JOIN"})})," relationships after ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-join#joining-on",children:(0,i.jsx)(n.code,{children:"ON"})}),", firstly reference the Column from the joined Table. The previous Table should be on the right side. It will improve consistency and reading speed."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",metastring:"{7-8,16-17}",children:"/* \u2705 Explicit Inner Join and Column from new Table on the left side of the ON condition */\nSELECT\n      wel.SubscriberKey\n    , wel.EmailAddress\n    , o.EventDate AS OpenDate\nFROM WelcomeCampaignSegment AS wel\n    INNER JOIN _Open AS o\n        ON o.SubscriberKey = wel.SubscriberKey\n\n/* \u274c Implicit Inner Join and Column from new Table on the right side of the ON condition */\nSELECT\n      wel.SubscriberKey\n    , wel.EmailAddress\n    , o.EventDate AS OpenDate\nFROM WelcomeCampaignSegment AS wel\n    JOIN _Open AS o\n        ON wel.SubscriberKey = o.SubscriberKey\n"})}),"\n",(0,i.jsx)(n.h3,{id:"table-aliases",children:"Table Aliases"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsxs)(n.strong,{children:["When using ",(0,i.jsx)(n.code,{children:"JOIN"}),", add meaningful aliases for Tables and prefix all Columns with them."]})}),"\n",(0,i.jsx)(n.p,{children:"There are a few points:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["If you are working on only one Table without ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-join",children:(0,i.jsx)(n.code,{children:"JOIN"})})," - don't use ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-join#table-name-prefix",children:"aliases"})," at all. They are not needed and would make the query less readable."]}),"\n",(0,i.jsxs)(n.li,{children:["If you have any ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-join",children:(0,i.jsx)(n.code,{children:"JOIN"})})," - always use ",(0,i.jsx)(n.a,{href:"/docs/sql/sfmc-sql-join#table-name-prefix",children:"aliases and prefixes"}),". SQL doesn't always require it, but it is much easier to read the query when the Columns have an explicit Table mention in the prefix."]}),"\n",(0,i.jsx)(n.li,{children:"When you create an alias for a Table, make it meaningful. Using subsequent letters of the alphabet is not a good idea. Instead, use something that will remind the reader of the full name - for example, abbreviation using the first letter of each word in the Table. It will allow for much easier reading."}),"\n",(0,i.jsxs)(n.li,{children:["Always use ",(0,i.jsx)(n.code,{children:"AS"})," keyword between the Table name and the alias."]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"/* \u2705 No aliasing in single Table query */\nSELECT\n      SubscriberKey\n    , EmailAddress\nFROM Ent._Subscribers\n\n/* \u274c Aliasing in single Table query */\nSELECT\n      s.SubscriberKey\n    , s.EmailAddress\nFROM Ent._Subscribers AS s\n\n/* \u2705 Meaningful aliasing and prefixes in multi Table query */\nSELECT\n      wel.SubscriberKey\n    , wel.EmailAddress\n    , o.EventDate AS OpenDate\nFROM WelcomeCampaignSegment AS wel\n    INNER JOIN _Open AS o\n        ON o.SubscriberKey = wel.SubscriberKey\n\n/* \u274c No aliasing and no prefix in multi Table query */\nSELECT\n      SubscriberKey\n    , EmailAddress\n    , EventDate AS OpenDate\nFROM WelcomeCampaignSegment\n    INNER JOIN _Open\n        ON _Open.SubscriberKey = WelcomeCampaignSegment.SubscriberKey\n\n/* \u274c Not meaningful aliasing and no AS keyword in multi Table query */\nSELECT\n      a.SubscriberKey\n    , a.EmailAddress\n    , b.EventDate AS OpenDate\nFROM WelcomeCampaignSegment a\n    INNER JOIN _Open b\n        ON a.SubscriberKey = b.SubscriberKey\n"})}),"\n",(0,i.jsx)(n.h3,{id:"not-equal-to-symbol",children:"Not Equal To Symbol"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsxs)(n.strong,{children:["Use ",(0,i.jsx)(n.code,{children:"!="})," instead of ",(0,i.jsx)(n.code,{children:"<>"}),"."]})}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"!="})," symbol is much more popular and used in many languages. Using it makes the query more readable to people not experienced in SQL."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",metastring:"{4,9}",children:"/* \u2705 Use of != for negation */\nSELECT SubscriberKey\nFROM Ent._Subscribers\nWHERE CONVERT(DATE, DateJoined) != CONVERT(DATE, GETDATE())\n\n/* \u274c Use of <> for negation */\nSELECT SubscriberKey\nFROM Ent._Subscribers\nWHERE CONVERT(DATE, DateJoined) <> CONVERT(DATE, GETDATE())\n"})}),"\n",(0,i.jsx)(n.h3,{id:"meaningful-column-names",children:"Meaningful Column Names"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Use Column names that suggest the data type."})}),"\n",(0,i.jsx)(n.p,{children:"Just as with a letter case, you might have your hands tied by cross-system dependencies. But whenever possible, strive for meaningful names:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Use descriptive Column names. It is better to have a long explicit one (",(0,i.jsx)(n.code,{children:"IsTrackingSuppressed"}),") than a short mysterious abbreviation (",(0,i.jsx)(n.code,{children:"trk"}),")."]}),"\n",(0,i.jsxs)(n.li,{children:["When the Column is a boolean, prefix it with ",(0,i.jsx)(n.code,{children:"Is"})," (or ",(0,i.jsx)(n.code,{children:"Has"}),"/",(0,i.jsx)(n.code,{children:"Does"})," depending on the underlying data)."]}),"\n",(0,i.jsxs)(n.li,{children:["When the Column is a date, suffix it with ",(0,i.jsx)(n.code,{children:"Date"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",metastring:"{3-8,17-22}",children:"/* \u2705 Meaningful and consistent Column Names */\nSELECT\n      s.SubscriberKey    AS SubscriberKey\n    , j.EmailName        AS EmailName\n    , s.EventDate        AS SentDate\n    , j.DeliveredTime    AS DeliveryDate\n    , o.EventDate        AS OpenDate\n    , j.SuppressTracking AS IsTrackingSuppressed\nFROM _Sent AS s\n    LEFT JOIN _Job AS j\n        ON j.JobID = s.JobID\n    LEFT JOIN _Open AS o\n        ON o.JobID = s.JobID\n\n/* \u274c No consistency and type alignment in Column Names */\nSELECT\n      s.SubscriberKey    AS SubscriberKey\n    , j.EmailName        AS EmailName\n    , s.EventDate        AS SentDate\n    , j.DeliveredTime    AS DeliveryTime\n    , o.EventDate        AS OpenedAt\n    , j.SuppressTracking AS SuppressTracking\nFROM _Sent AS s\n    LEFT JOIN _Job AS j\n        ON j.JobID = s.JobID\n    LEFT JOIN _Open AS o\n        ON o.JobID = s.JobID\n"})}),"\n",(0,i.jsx)(n.h2,{id:"sum-up",children:"Sum Up"}),"\n",(0,i.jsx)(n.p,{children:"It is a long article, so let's gather all the recommendations in one place:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Be consistent"}),"\n",(0,i.jsx)(n.li,{children:"Strive for readability"}),"\n",(0,i.jsx)(n.li,{children:"Use comments to provide required context to your query"}),"\n",(0,i.jsxs)(n.li,{children:["Use ",(0,i.jsx)(n.code,{children:"UPPERCASE"})," for SQL syntax ",(0,i.jsx)(n.a,{href:"#sql-syntax-case",children:"\ud83d\udd17"})]}),"\n",(0,i.jsxs)(n.li,{children:["Use ",(0,i.jsx)(n.code,{children:"PascalCase"})," for Table & Column names ",(0,i.jsx)(n.a,{href:"#column--table-names-case",children:"\ud83d\udd17"})]}),"\n",(0,i.jsxs)(n.li,{children:["Limit information per line to one ",(0,i.jsx)(n.a,{href:"#single-information-per-line",children:"\ud83d\udd17"})]}),"\n",(0,i.jsxs)(n.li,{children:["Align main SQL keywords to the left ",(0,i.jsx)(n.a,{href:"#left-aligned-keywords",children:"\ud83d\udd17"})]}),"\n",(0,i.jsxs)(n.li,{children:["Use indentation to highlight the relationship between SQL keywords ",(0,i.jsx)(n.a,{href:"#consistent-indentation",children:"\ud83d\udd17"})]}),"\n",(0,i.jsxs)(n.li,{children:["Use spaces wherever it makes the query more readable ",(0,i.jsx)(n.a,{href:"#intentional-spacing",children:"\ud83d\udd17"})]}),"\n",(0,i.jsxs)(n.li,{children:["Use commas at the beginning of the line ",(0,i.jsx)(n.a,{href:"#commas-placement",children:"\ud83d\udd17"})]}),"\n",(0,i.jsxs)(n.li,{children:["Use full Date Parts names ",(0,i.jsx)(n.a,{href:"#date-parts",children:"\ud83d\udd17"})]}),"\n",(0,i.jsxs)(n.li,{children:["Use ",(0,i.jsx)(n.code,{children:"INNER JOIN"})," name over ",(0,i.jsx)(n.code,{children:"JOIN"})," ",(0,i.jsx)(n.a,{href:"#join-and-on",children:"\ud83d\udd17"})]}),"\n",(0,i.jsxs)(n.li,{children:["In ",(0,i.jsx)(n.code,{children:"JOIN ON"})," reference Column from newly joined Table on the left ",(0,i.jsx)(n.a,{href:"#join-and-on",children:"\ud83d\udd17"})]}),"\n",(0,i.jsxs)(n.li,{children:["When using ",(0,i.jsx)(n.code,{children:"JOIN"}),", add meaningful aliases for Tables and prefix all Columns ",(0,i.jsx)(n.a,{href:"#join-and-on",children:"\ud83d\udd17"})]}),"\n",(0,i.jsxs)(n.li,{children:["Always use ",(0,i.jsx)(n.code,{children:"AS"})," keyword between the Table name and the alias ",(0,i.jsx)(n.a,{href:"#join-and-on",children:"\ud83d\udd17"})]}),"\n",(0,i.jsxs)(n.li,{children:["Use ",(0,i.jsx)(n.code,{children:"!="})," instead of ",(0,i.jsx)(n.code,{children:"<>"})," ",(0,i.jsx)(n.a,{href:"#not-equal-to-symbol",children:"\ud83d\udd17"})]}),"\n",(0,i.jsxs)(n.li,{children:["Use Column names that suggest the data type ",(0,i.jsx)(n.a,{href:"#meaningful-column-names",children:"\ud83d\udd17"})]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["If you want to share something I'm missing or have arguments for a different recommendation - ",(0,i.jsx)(n.a,{href:"https://www.linkedin.com/in/mateusz-dabrowski-marketing/",children:"let me know"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"Looking for more Marketing Cloud style? Check out my:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/docs/ssjs/ssjs-style-guide",children:"SSJS Style Guide"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/docs/ampscript/ampscript-style-guide",children:"AMPScript Style Guide"})}),"\n"]})]})}function m(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},1872:(e,n,s)=>{s.d(n,{m:()=>l});s(7294);const i="leadText_qzwo";var a=s(5893);const l=e=>{let{content:n}=e;return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("p",{id:i,children:n})})}},1151:(e,n,s)=>{s.d(n,{Z:()=>t,a:()=>r});var i=s(7294);const a={},l=i.createContext(a);function r(e){const n=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);