/**
 * SidebarDocList.jsx
 *
 * A bullet list of the docs in one sidebar category, read from the sidebar the
 * page displays (docs/docsSidebar.js). An index page built from it lists a new
 * doc as soon as the doc is in the sidebar, with the sidebar's label.
 *
 * Docs in subcategories are listed too, in sidebar order, except under the
 * permalinks in `exclude`. External links are left out. The llms-txt plugin
 * writes the same list into the page's markdown copy.
 *
 * Props:
 *   category - permalink of the category's generated index
 *   exclude  - optional [string]; permalinks of subcategories or docs to skip
 */
import React from 'react';
import Link from '@docusaurus/Link';
import { useDocsSidebar, findSidebarCategory } from '@docusaurus/plugin-content-docs/client';

const trim = (value = '') => value.replace(/\/+$/, '');

function collectDocs(items, skip) {
  return items.flatMap((item) => {
    if (skip.has(trim(item.href))) return [];
    if (item.type === 'category') return collectDocs(item.items, skip);
    return item.type === 'link' && item.docId && !item.unlisted ? [item] : [];
  });
}

export default function SidebarDocList({ category, exclude = [] }) {
  const sidebar = useDocsSidebar();
  const found = sidebar && findSidebarCategory(sidebar.items, (item) => trim(item.href) === trim(category));
  if (!found) return null;
  const docs = collectDocs(found.items, new Set(exclude.map(trim)));
  return (
    <ul>
      {docs.map((doc) => (
        <li key={doc.href}>
          <Link to={doc.href}>{doc.label}</Link>
        </li>
      ))}
    </ul>
  );
}
