/**
 * Icons.jsx
 *
 * SVG icon library for timeline event types.
 * Each icon is a 22x22 SVG using `currentColor` so it inherits
 * the parent element's text colour (controlled via CSS).
 *
 * Usage:
 *   import { Icons } from './Icons';
 *   const Icon = Icons[event.icon] || Icons.Default;
 */
import React from 'react';

/* Shared SVG attributes applied to every icon */
const SVG_PROPS = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const Icons = {
  /** Folder — project / engagement */
  Project: () => (
    <svg {...SVG_PROPS}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),

  /** Trending-up chart — role / promotion */
  Position: () => (
    <svg {...SVG_PROPS}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),

  /** Badge ribbon — certification */
  Certification: () => (
    <svg {...SVG_PROPS}>
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),

  /** Microphone — speaking event */
  SpeakingEvent: () => (
    <svg {...SVG_PROPS}>
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  ),

  /** Graduation cap — education */
  Education: () => (
    <svg {...SVG_PROPS}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),

  /** Building — organisation */
  Organisation: () => (
    <svg {...SVG_PROPS}>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  ),

  /** Info circle — fallback for unknown types */
  Default: () => (
    <svg {...SVG_PROPS}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
};
