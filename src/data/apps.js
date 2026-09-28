/**
 * Apps shown on the homepage and on the Apps page (src/pages/apps.mdx).
 *
 * One list for both, so a new app or a changed description lands in both places.
 * Titles are plain strings: they double as image alt text, and a JSX fragment
 * there rendered as "[object Object]".
 *
 * layout: 'row' is the full-width free web tool, 'card' the App Store apps that
 * sit side by side under it on the homepage. category groups the Apps page, and
 * pitch is the one-sentence subtitle it shows under each app's name. description
 * is the short value statement both pages show; features are the Apps page's
 * bullets, each a benefit with the feature behind it. label is the short line
 * under the app's name in the Apps page header, taken from the navbar, and
 * iconUrl the icon beside it. Diagramforce has no icon of its own yet and uses
 * the MD mark; replace it here once it does.
 */
export const apps = [
    {
        title: 'Diagramforce',
        iconUrl: 'img/apps/diagramforce-icon.webp',
        label: 'Diagramming for Trailblazers',
        pitch: 'Free Salesforce diagramming in your browser, plus a Claude skill that turns your org\'s Flows, objects and Data 360 mappings into editable diagrams.',
        category: 'Productivity',
        url: 'https://diagramforce.com',
        githubUrl: 'https://github.com/MateuszDabrowski/diagramforce',
        imageUrl: 'img/article/index-image-tool-diagramforce.webp',
        description: 'Every diagram a Salesforce project needs, in one free tool with no account to create. When drawing by hand would take too long, Claude builds the first version for you.',
        tags: ['Salesforce', 'Diagrams', 'Data 360', 'Claude'],
        platforms: ['Web'],
        cta: 'Open App',
        badge: 'FREE',
        layout: 'row',
        features: [
            'Architecture diagrams, data models, Data 360 field mappings with field-level lineage, Salesforce Flows, processes, sequence diagrams, org charts and Gantt charts in one tool',
            'A Claude skill that converts your org\'s Flows and Data 360 mappings through the Salesforce CLI and validates each diagram so it opens intact',
            '1700+ Salesforce SLDS icons for systems, clouds and integrations',
            'Diagrams stay in your browser or your own Google Drive, and you share them as a link',
        ],
    },
    {
        title: 'Slot',
        iconUrl: 'img/apple/slot/Slot_light.webp',
        label: 'Your inboxes in one app',
        pitch: 'All your Google and Microsoft accounts side by side in one Mac window, with no signing in and out.',
        category: 'Productivity',
        url: '/slot/',
        appStoreUrl: 'https://apps.apple.com/app/id6796483262',
        imageUrl: 'img/apple/slot/Slot-Mac-Card.webp',
        description: 'If you work across several Google and Microsoft accounts, Slot adds the tools that work needs on top: one agenda for every account\'s day, notes that follow you from account to account, and links that open in the right account.',
        tags: ['Gmail', 'Outlook', 'Meet', 'Teams'],
        platforms: ['macOS'],
        layout: 'card',
        features: [
            'Unread counts on the Dock and notifications that name the sender, for every account',
            'Meeting reminders at the lead times you choose, with your next meeting and the mute for your call in the menu bar',
            'Docs, Sheets, Word and Excel in their own windows, drawing over the page while you share your screen, and Diagramforce as an add-on per account',
            'Every account in its own isolated session, enforced by macOS',
        ],
    },
    {
        title: 'Shelf',
        iconUrl: 'img/apple/shelf/Shelf_light.webp',
        label: 'Quick copy vault',
        pitch: 'The codes, addresses and snippets you keep retyping, encrypted on your device and one tap or one shortcut from your clipboard.',
        category: 'Productivity',
        url: '/shelf/',
        appStoreUrl: 'https://apps.apple.com/app/id6762406443',
        imageUrl: 'img/apple/shelf/Shelf-Mac-Main.webp',
        description: 'Door codes, IBANs and the command you paste every Monday usually sit scattered across old chats, notes and emails. Shelf keeps them in one place you can search in a second.',
        tags: ['Your', 'Stuff', 'Vault', 'Clipboard'],
        platforms: ['macOS', 'iPadOS', 'iOS', 'watchOS'],
        layout: 'card',
        features: [
            'A tap on iPhone and iPad, a global shortcut on the Mac or a Home Screen widget, and a reader on Apple Watch',
            'Paste anything and Shelf recognises it, so you can call the number, write the email or open the address in Maps',
            'Hidden values stay masked until you peek and clear from the clipboard 60 seconds after a copy',
            'Encrypted with AES-256-GCM on your device before it syncs through your own iCloud',
        ],
    },
    {
        title: 'Strum',
        iconUrl: 'img/apple/strum/Strum_light.webp',
        label: 'Tabs made easy',
        pitch: 'Write ukulele and guitar tabs, hear them on a recorded instrument and learn them with a metronome that scrolls the tab for you.',
        category: 'Music',
        url: '/strum/',
        appStoreUrl: 'https://apps.apple.com/app/id6764788253',
        imageUrl: 'img/apple/strum/Strum-Pad-Library.webp',
        description: 'Learning a song is easier when you can see the tab, hear it and play along at your own pace. Strum puts all three in one app.',
        tags: ['Ukulele', 'Guitar', 'Tabs'],
        platforms: ['macOS', 'iPadOS', 'iOS'],
        layout: 'card',
        features: [
            'Tap any beat to set the frets, pick chords from a grid and build your own strum patterns',
            'Hear the song on a recorded instrument, and set a capo while the tab keeps the frets you hold',
            'A metronome that scrolls the tab as you play and ramps up the tempo, and a Practice Hub that loops the passage you are learning',
            'A built-in tuner, custom tunings and songs synced through your own iCloud',
        ],
    },
];
