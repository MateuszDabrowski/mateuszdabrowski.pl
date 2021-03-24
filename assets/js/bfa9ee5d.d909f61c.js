(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{110:function(e,t,i){"use strict";i.r(t),i.d(t,"frontMatter",(function(){return l})),i.d(t,"metadata",(function(){return c})),i.d(t,"toc",(function(){return b})),i.d(t,"default",(function(){return p}));var n=i(3),a=i(8),r=(i(0),i(122)),s=i(124),o=i(123),l={id:"sfmc-config-permissions",title:"SFMC Permissions",sidebar_label:"Permissions",description:"Welcome to the jungle, we've got Roles and Permissions."},c={unversionedId:"config/sfmc-config-permissions",id:"config/sfmc-config-permissions",isDocsHomePage:!1,title:"SFMC Permissions",description:"Welcome to the jungle, we've got Roles and Permissions.",source:"@site/docs/config/sfmc-config-permissions.mdx",slug:"/config/sfmc-config-permissions",permalink:"/docs/config/sfmc-config-permissions",editUrl:"https://github.com/MateuszDabrowski/mateuszdabrowski.pl/edit/master/docs/config/sfmc-config-permissions.mdx",version:"current",lastUpdatedBy:"Mateusz D\u0105browski",lastUpdatedAt:1615417469,formattedLastUpdatedAt:"3/11/2021",sidebar_label:"Permissions",sidebar:"snippets",previous:{title:"SFMC SQL Debugging Value Length",permalink:"/docs/sql/sfmc-sql-snippet-debugging-value-length"},next:{title:"SFMC System Data Views",permalink:"/docs/config/sfmc-config-system-data-views"}},b=[{value:"Permissions Best Practices",id:"permissions-best-practices",children:[{value:"Standard vs Custom Roles",id:"standard-vs-custom-roles",children:[]},{value:"Permission Overlap",id:"permission-overlap",children:[]}]},{value:"SFMC Permissions",id:"sfmc-permissions",children:[{value:"General Permissions",id:"general-permissions",children:[]},{value:"Email Studio Permissions",id:"email-studio-permissions",children:[]},{value:"Mobile Studio Permissions",id:"mobile-studio-permissions",children:[]},{value:"Social Studio Permissions",id:"social-studio-permissions",children:[]},{value:"Web Studio Permissions",id:"web-studio-permissions",children:[]},{value:"Interaction Studio Permissions",id:"interaction-studio-permissions",children:[]},{value:"Analytics Builder Permissions",id:"analytics-builder-permissions",children:[]},{value:"Journey Builder Permissions",id:"journey-builder-permissions",children:[]},{value:"Content Builder Permissions",id:"content-builder-permissions",children:[]},{value:"Audience Builder Permissions",id:"audience-builder-permissions",children:[]},{value:"AppExchange Permissions",id:"appexchange-permissions",children:[]},{value:"Legacy Permissions",id:"legacy-permissions",children:[]}]}],m={toc:b};function p(e){var t=e.components,i=Object(a.a)(e,["components"]);return Object(r.b)("wrapper",Object(n.a)({},m,i,{components:t,mdxType:"MDXLayout"}),Object(r.b)(o.a,{content:"Welcome to the jungle, we've got Roles and Permissions.",mdxType:"LeadText"}),Object(r.b)("div",{className:"admonition admonition-tip alert alert--success"},Object(r.b)("div",{parentName:"div",className:"admonition-heading"},Object(r.b)("h5",{parentName:"div"},Object(r.b)("span",{parentName:"h5",className:"admonition-icon"},Object(r.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},Object(r.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Table of Contents")),Object(r.b)("div",{parentName:"div",className:"admonition-content"},Object(r.b)(s.a,{toc:b,mdxType:"TOCInline"}))),Object(r.b)("h2",{id:"permissions-best-practices"},"Permissions Best Practices"),Object(r.b)("h3",{id:"standard-vs-custom-roles"},"Standard vs Custom Roles"),Object(r.b)("p",null,"The best way to work with Roles and Permissions in Salesforce Marketing Cloud is to leverage standard roles and only build on top of them with custom permissions/roles. Creating custom roles from scratch (even by copying existing standard role) is not recommended. There are two reasons for this:"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"Standard Roles are updated every release to support changes in permissions structure."),Object(r.b)("li",{parentName:"ol"},"In many Marketing Cloud spaces, you need multiple permissions from various permission groups.")),Object(r.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(r.b)("div",{parentName:"div",className:"admonition-heading"},Object(r.b)("h5",{parentName:"div"},Object(r.b)("span",{parentName:"h5",className:"admonition-icon"},Object(r.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(r.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"You Should Know")),Object(r.b)("div",{parentName:"div",className:"admonition-content"},Object(r.b)("p",{parentName:"div"},"An excellent example of it might be the Journey Builder."),Object(r.b)("p",{parentName:"div"},"It is not enough to add full Journey Builder permissions to allow someone to work with that part of Marketing Cloud, because Activities used on Journey canvas require additional permissions to work:"),Object(r.b)("pre",{parentName:"div"},Object(r.b)("code",{parentName:"pre",className:"language-md"},"1. Decision Splits and Wait by Attribute requires:\n    - Email > Subscribers > Data Extensions > View\n    - Salesforce Marketing Cloud > Contacts > Read Contact Data\n2. Update Contact requires:\n    - Email > Subscribers > Data Extensions > View\n    - Email > Subscribers > List > View\n3. Engagement Splits requires:\n    - Email > Content > Email > View\n    - Content Builder > Assets > View\n4. Journey Entry Sources requires:\n    - Email > Subscribers > Data Extensions > View\n    - Email > Subscribers > List > View\n    - Salesforce Marketing Cloud > Contacts > Read Contact Data\n5. Goals, Exit Criteria, Default Email and Mobile Number settings require:\n    - Email > Subscribers > Data Extensions > View\n    - Salesforce Marketing Cloud > Contacts > Read Contact Data\n")),Object(r.b)("p",{parentName:"div"},"Such mixes are happening in multiple parts of Marketing Cloud and might change from release to release, which makes creating custom roles from scratch very hard to make and maintain."))),Object(r.b)("p",null,"However, Standard Roles not always align perfectly with your needs. The widespread use case would be hiding shared folders via permissions or blocking deletion rights for some users. It is where custom work is needed."),Object(r.b)("h3",{id:"permission-overlap"},"Permission Overlap"),Object(r.b)("p",null,"When working with multiple roles or overlapping permissions, be sure to check what is the outcome on the user."),Object(r.b)("p",null,"Marketing Cloud goes with the most restrictive resulting permission possible:"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"If at least one permission (role-based or individual) is set to Deny - the user will ",Object(r.b)("strong",{parentName:"li"},"not")," be able to use the feature."),Object(r.b)("li",{parentName:"ol"},"If there is neither Allow nor Deny permission - the user will ",Object(r.b)("strong",{parentName:"li"},"not")," be able to use the feature."),Object(r.b)("li",{parentName:"ol"},"If there is at least one Allow permission and not even one Deny permission - the user will be able to use the feature.")),Object(r.b)("p",null,"You can check the outcome by going to Setup > Users > Users > clicking checkbox next to a user > clicking Manage Roles > Edit Permissions. In this place, you can not only configure individual permissions but also, by expanding to the final permission level, check current result permission along with the source for that state."),Object(r.b)("hr",null),Object(r.b)("h2",{id:"sfmc-permissions"},"SFMC Permissions"),Object(r.b)("p",null," Below I have listed details on the permissions currently available in Salesforce Marketing Cloud Setup. For better readability, I have split them by Studio/Builder, so they are not in the same order as in Setup."),Object(r.b)("p",null," To search for specific permission you can use site search in top right or browser search (",Object(r.b)("inlineCode",{parentName:"p"},"CMD"),"/",Object(r.b)("inlineCode",{parentName:"p"},"Ctrl"),"+",Object(r.b)("inlineCode",{parentName:"p"},"F")," keys)."),Object(r.b)("hr",null),Object(r.b)("h3",{id:"general-permissions"},"General Permissions"),Object(r.b)("h4",{id:"salesforce-marketing-cloud"},"Salesforce Marketing Cloud"),Object(r.b)("p",null,"Contains a mix of permissions for:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Marketing Cloud Dashboard tools"),Object(r.b)("li",{parentName:"ul"},"Contacts"),Object(r.b)("li",{parentName:"ul"},"Marketing Cloud Roles"),Object(r.b)("li",{parentName:"ul"},"Some ",Object(r.b)("strong",{parentName:"li"},"Legacy")," or unreleased functions like ",Object(r.b)("em",{parentName:"li"},"Pulse")," or ",Object(r.b)("em",{parentName:"li"},"Watchdog"),".")),Object(r.b)("p",null,"One of the most important permissions here is:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Salesforce Marketing Cloud > Contacts > Read Contact Data.")),Object(r.b)("p",null,"It is used in multiple SFMC areas and is required for them to work."),Object(r.b)("h4",{id:"tags"},"Tags"),Object(r.b)("p",null,"Permissions for Marketing Cloud tagging solution."),Object(r.b)("h4",{id:"administration"},"Administration"),Object(r.b)("p",null,"Permissions for most of the ",Object(r.b)("em",{parentName:"p"},"Setup")," items."),Object(r.b)("h4",{id:"event-notifications"},"Event Notifications"),Object(r.b)("p",null,"Permissions for REST API Event Notifications Service."),Object(r.b)("h4",{id:"audit-trail"},"Audit Trail"),Object(r.b)("p",null,"Permissions for ",Object(r.b)("em",{parentName:"p"},"Audit Trail")," tools."),Object(r.b)("h4",{id:"database-encryption"},"Database Encryption"),Object(r.b)("p",null,"Permissions for ",Object(r.b)("em",{parentName:"p"},"Transparent Database Encryption"),"."),Object(r.b)("hr",null),Object(r.b)("h3",{id:"email-studio-permissions"},"Email Studio Permissions"),Object(r.b)("h4",{id:"email"},"Email"),Object(r.b)("p",null,"Huge permission set for most of the ",Object(r.b)("em",{parentName:"p"},"Email Studio")," features."),Object(r.b)("p",null,"Two of the most important permissions here are:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Email > Subscribers > Data Extensions > View"),Object(r.b)("li",{parentName:"ul"},"Email > Subscribers > List > View")),Object(r.b)("p",null,"They are used in multiple SFMC areas and are required for them to work."),Object(r.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(r.b)("div",{parentName:"div",className:"admonition-heading"},Object(r.b)("h5",{parentName:"div"},Object(r.b)("span",{parentName:"h5",className:"admonition-icon"},Object(r.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(r.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"You Should Know")),Object(r.b)("div",{parentName:"div",className:"admonition-content"},Object(r.b)("p",{parentName:"div"},"Some of the Shared Data Extension permissions are overwritten by local Data Extension permissions (for example Move, Rename). If you have problem with correctly limiting rights to Shared data, try playing with standard Data Extensions permissions."))),Object(r.b)("p",null,"Contains also some permissions for ",Object(r.b)("strong",{parentName:"p"},"Legacy")," features like ",Object(r.b)("em",{parentName:"p"},"Omniture TnT")," and ",Object(r.b)("em",{parentName:"p"},"3sixty"),"."),Object(r.b)("h4",{id:"email-send-wizard"},"Email Send Wizard"),Object(r.b)("p",null,"Enables Email Send process in ",Object(r.b)("em",{parentName:"p"},"Email Studio")," and partially for single send in ",Object(r.b)("em",{parentName:"p"},"Journey Builder"),"."),Object(r.b)("h4",{id:"distributed-sending"},"Distributed Sending"),Object(r.b)("p",null,"Permissions for ",Object(r.b)("em",{parentName:"p"},"Distributed Sending"),"."),Object(r.b)("h4",{id:"transactional-sending"},"Transactional Sending"),Object(r.b)("p",null,"Permissions for ",Object(r.b)("em",{parentName:"p"},"Transactional Messaging API"),"."),Object(r.b)("hr",null),Object(r.b)("h3",{id:"mobile-studio-permissions"},"Mobile Studio Permissions"),Object(r.b)("h4",{id:"mobileconnect"},"MobileConnect"),Object(r.b)("p",null,"Permissions for ",Object(r.b)("em",{parentName:"p"},"MobileConnect"),"."),Object(r.b)("h4",{id:"mobilepush"},"MobilePush"),Object(r.b)("p",null,"Permissions for ",Object(r.b)("em",{parentName:"p"},"MobilePush"),"."),Object(r.b)("h4",{id:"groupconnect"},"GroupConnect"),Object(r.b)("p",null,"Permissions for ",Object(r.b)("em",{parentName:"p"},"Group Connect"),"."),Object(r.b)("hr",null),Object(r.b)("h3",{id:"social-studio-permissions"},"Social Studio Permissions"),Object(r.b)("p",null,"Most permissions are managed from within ",Object(r.b)("em",{parentName:"p"},"Social Studio")," and not available in global Setup."),Object(r.b)("h4",{id:"socialengage"},"SocialEngage"),Object(r.b)("p",null,"Permissions for Engage, part of ",Object(r.b)("em",{parentName:"p"},"Social Studio"),"."),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Perform Workgroup Leader Role")," is permission for an unreleased feature."),Object(r.b)("hr",null),Object(r.b)("h3",{id:"web-studio-permissions"},"Web Studio Permissions"),Object(r.b)("h4",{id:"cloudpages"},"CloudPages"),Object(r.b)("p",null,"Permissions for ",Object(r.b)("em",{parentName:"p"},"Cloud Pages"),"."),Object(r.b)("hr",null),Object(r.b)("h3",{id:"interaction-studio-permissions"},"Interaction Studio Permissions"),Object(r.b)("p",null,"Most permissions are managed from within ",Object(r.b)("em",{parentName:"p"},"Interaction Studio")," and not available in global Setup."),Object(r.b)("h4",{id:"interaction-studio"},"Interaction Studio"),Object(r.b)("p",null,"Permissions for ",Object(r.b)("em",{parentName:"p"},"Interaction Studio")," (",Object(r.b)("em",{parentName:"p"},"Evergage"),")."),Object(r.b)("h4",{id:"interaction-studio---legacy"},"Interaction Studio - Legacy"),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Legacy")," permissions for previous ",Object(r.b)("em",{parentName:"p"},"Interaction Studio")," solution (",Object(r.b)("em",{parentName:"p"},"Thunderhead"),")."),Object(r.b)("hr",null),Object(r.b)("h3",{id:"analytics-builder-permissions"},"Analytics Builder Permissions"),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Tracking")," within ",Object(r.b)("em",{parentName:"p"},"Email Studio")," is managed by separate permissions available within ",Object(r.b)("a",{parentName:"p",href:"#email"},"Email")," permission group."),Object(r.b)("h4",{id:"reports"},"Reports"),Object(r.b)("p",null,"Permissions for ",Object(r.b)("em",{parentName:"p"},"Reports"),"."),Object(r.b)("h4",{id:"campaignanalytics"},"CampaignAnalytics"),Object(r.b)("p",null,"Permissions enabling Campaign objects for ",Object(r.b)("em",{parentName:"p"},"Reports"),".\nAvailable only on Role level (cannot be limited as individual permission)."),Object(r.b)("h4",{id:"analytics"},"Analytics"),Object(r.b)("p",null,"Permissions for ",Object(r.b)("em",{parentName:"p"},"Web Analytics")," and integration with ",Object(r.b)("em",{parentName:"p"},"Google Analytics"),"."),Object(r.b)("h4",{id:"discover"},"Discover"),Object(r.b)("p",null,"Permissions for ",Object(r.b)("em",{parentName:"p"},"Discover")," premium feature."),Object(r.b)("hr",null),Object(r.b)("h3",{id:"journey-builder-permissions"},"Journey Builder Permissions"),Object(r.b)("h4",{id:"automation-studio"},"Automation Studio"),Object(r.b)("p",null,"Permissions for ",Object(r.b)("em",{parentName:"p"},"Automation Studio"),"."),Object(r.b)("h4",{id:"journey-builder"},"Journey Builder"),Object(r.b)("p",null,"Permissions for ",Object(r.b)("em",{parentName:"p"},"Journey Builder"),"."),Object(r.b)("hr",null),Object(r.b)("h3",{id:"content-builder-permissions"},"Content Builder Permissions"),Object(r.b)("h4",{id:"content-builder"},"Content Builder"),Object(r.b)("p",null,"Permissions for ",Object(r.b)("em",{parentName:"p"},"Content Builder"),"."),Object(r.b)("h4",{id:"workflows-and-approvals"},"Workflows and Approvals"),Object(r.b)("p",null,"Permissions for ",Object(r.b)("em",{parentName:"p"},"Content Builder")," Approval tool."),Object(r.b)("h4",{id:"approvals-email"},"Approvals (Email)"),Object(r.b)("p",null,"Additional Permissions for ",Object(r.b)("em",{parentName:"p"},"Content Builder")," Approval tool."),Object(r.b)("hr",null),Object(r.b)("h3",{id:"audience-builder-permissions"},"Audience Builder Permissions"),Object(r.b)("h4",{id:"contact-builder"},"Contact Builder"),Object(r.b)("p",null,"Permissions for ",Object(r.b)("em",{parentName:"p"},"Contact Builder"),"."),Object(r.b)("h4",{id:"audience-builder"},"Audience Builder"),Object(r.b)("p",null,"Permissions for ",Object(r.b)("em",{parentName:"p"},"Audience Builder"),"."),Object(r.b)("h4",{id:"active-audiences"},"Active Audiences"),Object(r.b)("p",null,"Permissions for ",Object(r.b)("em",{parentName:"p"},"Active Audiences")," - part of ",Object(r.b)("em",{parentName:"p"},"Audience Builder"),"."),Object(r.b)("h4",{id:"audience-builder-enabler"},"Audience Builder Enabler"),Object(r.b)("p",null,"Permission for enabling ",Object(r.b)("em",{parentName:"p"},"Audience Builder"),"."),Object(r.b)("h4",{id:"data-factory-utility"},"Data Factory Utility"),Object(r.b)("p",null,"Permission related to ",Object(r.b)("em",{parentName:"p"},"Audience Builder")," and ",Object(r.b)("em",{parentName:"p"},"Discover")," (",Object(r.b)("em",{parentName:"p"},"Analytics Builder")," add-on). Moves data between environments. Configured during implementation. Do not touch."),Object(r.b)("h4",{id:"salesforce-dmp"},"Salesforce DMP"),Object(r.b)("p",null,"Most permissions are managed from within ",Object(r.b)("em",{parentName:"p"},"Salesforce DMP")," and not available in global Setup."),Object(r.b)("h4",{id:"einstein-data-analytics"},"Einstein Data Analytics"),Object(r.b)("p",null,"Most permissions are managed from within ",Object(r.b)("em",{parentName:"p"},"Einstein Analytics")," and not available in global Setup."),Object(r.b)("h4",{id:"datorama"},"Datorama"),Object(r.b)("p",null,"Most permissions are managed from within ",Object(r.b)("em",{parentName:"p"},"Datorama")," and not available in global Setup."),Object(r.b)("h4",{id:"datorama-reports"},"Datorama Reports"),Object(r.b)("p",null,"Permissions for ",Object(r.b)("em",{parentName:"p"},"Datorama Reports")," - part of ",Object(r.b)("em",{parentName:"p"},"Datorama"),"."),Object(r.b)("hr",null),Object(r.b)("h3",{id:"appexchange-permissions"},"AppExchange Permissions"),Object(r.b)("h4",{id:"hubexchange"},"HubExchange"),Object(r.b)("p",null,"Permissions for ",Object(r.b)("em",{parentName:"p"},"AppExchange"),"."),Object(r.b)("hr",null),Object(r.b)("h3",{id:"legacy-permissions"},"Legacy Permissions"),Object(r.b)("p",null,"Below you can find permissions for solutions that are no longer offered by Salesforce. No need to worry about them."),Object(r.b)("h4",{id:"marketo"},"Marketo"),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Legacy")," permissions for integration with ",Object(r.b)("em",{parentName:"p"},"Adobe Marketo"),"."),Object(r.b)("h4",{id:"xpress"},"Xpress"),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Legacy")," permissions."),Object(r.b)("h4",{id:"adobeanalytics"},"AdobeAnalytics"),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Legacy")," permissions for integration with ",Object(r.b)("em",{parentName:"p"},"Adobe Analytics"),"."),Object(r.b)("h4",{id:"tmmessenger"},"tmMessenger"),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Legacy")," permissions for integration with ",Object(r.b)("em",{parentName:"p"},"TicketMaster"),"."),Object(r.b)("h4",{id:"lemi"},"LEMI"),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Legacy")," permissions."),Object(r.b)("h4",{id:"3sixty"},"3sixty"),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Legacy")," permissions for integration with ",Object(r.b)("em",{parentName:"p"},"3sixty")," elearning platform."),Object(r.b)("h4",{id:"extension-manager"},"Extension Manager"),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Legacy")," permissions for ",Object(r.b)("em",{parentName:"p"},"Marketing Cloud Extension Manager"),"."),Object(r.b)("h4",{id:"developerapp"},"DeveloperApp"),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Legacy")," permissions."))}p.isMDXComponent=!0},121:function(e,t,i){"use strict";function n(e){var t,i,a="";if("string"==typeof e||"number"==typeof e)a+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(i=n(e[t]))&&(a&&(a+=" "),a+=i);else for(t in e)e[t]&&(a&&(a+=" "),a+=t);return a}t.a=function(){for(var e,t,i=0,a="";i<arguments.length;)(e=arguments[i++])&&(t=n(e))&&(a&&(a+=" "),a+=t);return a}},122:function(e,t,i){"use strict";i.d(t,"a",(function(){return m})),i.d(t,"b",(function(){return u}));var n=i(0),a=i.n(n);function r(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function s(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function o(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?s(Object(i),!0).forEach((function(t){r(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):s(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function l(e,t){if(null==e)return{};var i,n,a=function(e,t){if(null==e)return{};var i,n,a={},r=Object.keys(e);for(n=0;n<r.length;n++)i=r[n],t.indexOf(i)>=0||(a[i]=e[i]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)i=r[n],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(a[i]=e[i])}return a}var c=a.a.createContext({}),b=function(e){var t=a.a.useContext(c),i=t;return e&&(i="function"==typeof e?e(t):o(o({},t),e)),i},m=function(e){var t=b(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var i=e.components,n=e.mdxType,r=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=b(i),d=n,u=m["".concat(s,".").concat(d)]||m[d]||p[d]||r;return i?a.a.createElement(u,o(o({ref:t},c),{},{components:i})):a.a.createElement(u,o({ref:t},c))}));function u(e,t){var i=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=i.length,s=new Array(r);s[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:n,s[1]=o;for(var c=2;c<r;c++)s[c]=i[c];return a.a.createElement.apply(null,s)}return a.a.createElement.apply(null,i)}d.displayName="MDXCreateElement"},123:function(e,t,i){"use strict";i.d(t,"a",(function(){return s}));var n=i(0),a=i(57),r=i.n(a);const s=({content:e})=>n.createElement(n.Fragment,null,n.createElement("p",{id:r.a.leadText},e))},124:function(e,t,i){"use strict";var n=i(0),a=i.n(n),r=i(121),s=i(58),o=i.n(s);function l({toc:e,isChild:t}){return e.length?a.a.createElement("ul",{className:t?"":"table-of-contents"},e.map((e=>a.a.createElement("li",{key:e.id},a.a.createElement("a",{href:`#${e.id}`,dangerouslySetInnerHTML:{__html:e.value}}),a.a.createElement(l,{isChild:!0,toc:e.children}))))):null}t.a=function({toc:e}){return a.a.createElement("div",{className:Object(r.a)(o.a.tableOfContentsInline)},a.a.createElement(l,{toc:e}))}}}]);