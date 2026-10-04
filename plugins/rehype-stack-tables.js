/**
 * Rehype plugin that prepares wide tables for phones.
 *
 * Every markdown table with MIN_COLUMNS or more columns gets the class
 * `table--stack`, and each body cell gets `data-label` with its column
 * header. Below 577 px, custom.css shows such a table as one card per row,
 * each value under its header, in place of a table that scrolls sideways and
 * squeezes the descriptions into a narrow column. Wider screens keep the table
 * as it is.
 *
 * The CSS turns the table parts into blocks, which drops their table
 * semantics in some browsers, so the plugin also sets the ARIA table roles:
 * screen readers keep announcing rows, columns and headers.
 */
const MIN_COLUMNS = 4;

const ROLES = { table: 'table', thead: 'rowgroup', tbody: 'rowgroup', tr: 'row', th: 'columnheader', td: 'cell' };

/** Plain text of a hast node and its children. */
function textOf(node) {
    if (node.type === 'text') return node.value;
    return (node.children || []).map(textOf).join('');
}

/** Element children with the given tag name. */
const childElements = (node, tagName) => (node.children || []).filter((child) => child.type === 'element' && child.tagName === tagName);

function setRoles(node) {
    if (node.type !== 'element') return;
    if (ROLES[node.tagName]) node.properties = { ...node.properties, role: ROLES[node.tagName] };
    (node.children || []).forEach(setRoles);
}

function stackTable(table) {
    const [head] = childElements(table, 'thead');
    const [headRow] = head ? childElements(head, 'tr') : [];
    const labels = headRow ? childElements(headRow, 'th').map((cell) => textOf(cell).trim()) : [];
    if (labels.length < MIN_COLUMNS) return;

    const className = [].concat(table.properties?.className || [], 'table--stack');
    table.properties = { ...table.properties, className };
    for (const body of childElements(table, 'tbody')) {
        for (const row of childElements(body, 'tr')) {
            childElements(row, 'td').forEach((cell, index) => {
                if (labels[index]) cell.properties = { ...cell.properties, dataLabel: labels[index] };
            });
        }
    }
    setRoles(table);
}

function walk(node) {
    if (node.type === 'element' && node.tagName === 'table') {
        stackTable(node);
        return;
    }
    (node.children || []).forEach(walk);
}

module.exports = function rehypeStackTables() {
    return (tree) => walk(tree);
};
