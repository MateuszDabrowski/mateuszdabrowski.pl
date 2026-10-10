import React, { useMemo } from 'react';
import DocSidebar from '@theme-original/DocSidebar';
import { useActivePlugin } from '@docusaurus/plugin-content-docs/client';

// Landing-page dependent sidebar expansion.
// - On the docs root (Docs & Snippets), open categories ROOT_EXPAND_DEPTH levels deep as an overview.
// - On any other page, keep the native behaviour (active branch open, siblings closed), but when
//   the current page is a category whose child folders hold at most DRILL_MAX_ROWS entries in
//   total, open those folders too, so small sections (MC Next -> Config, MC Personalization ->
//   Serverside Code + Snippets) show their articles at once while MCE stays a menu of folders.
// The sidebar remounts only when the resulting pattern changes, so manual toggles survive reading.
// The tree is memoised: the layout re-renders this wrapper on every location change, including
// TOC clicks, and a new tree each time would defeat the memo on DocSidebarItems and re-render
// the whole sidebar (the slow INP Cloudflare reported on long pages, October 2026).
const ROOT_EXPAND_DEPTH = 2;
const DRILL_MAX_ROWS = 12;

const samePath = (a, b) => Boolean(a && b) && a.replace(/\/+$/, '') === b.replace(/\/+$/, '');

// Rows a list would take fully expanded.
const countRows = (items) =>
    items.reduce((n, item) => n + 1 + (item.type === 'category' ? countRows(item.items) : 0), 0);

function expandTree(items, path, isRoot, level = 1, parentDrills = false, opened = []) {
    return items.map((item) => {
        if (item.type !== 'category') return item;
        const expand = (isRoot && level <= ROOT_EXPAND_DEPTH) || parentDrills;
        if (expand) opened.push(item.href ?? item.label);
        const childCategories = item.items.filter((child) => child.type === 'category');
        const drills =
            samePath(item.href, path) &&
            childCategories.length > 0 &&
            childCategories.reduce((n, child) => n + countRows(child.items), 0) <= DRILL_MAX_ROWS;
        return {
            ...item,
            collapsed: expand ? false : item.collapsed,
            items: expandTree(item.items, path, isRoot, level + 1, drills, opened),
        };
    });
}

export default function DocSidebarWrapper(props) {
    const pluginPath = useActivePlugin()?.pluginData.path;
    const isRoot = samePath(props.path, pluginPath);
    const { sidebar, key } = useMemo(() => {
        const opened = [];
        const tree = expandTree(props.sidebar, props.path, isRoot, 1, false, opened);
        return { sidebar: tree, key: opened.join('|') };
    }, [props.sidebar, props.path, isRoot]);
    return <DocSidebar key={key} {...props} sidebar={sidebar} />;
}
