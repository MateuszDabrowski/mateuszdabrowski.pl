<!-- Strum .strum file-format specification.
     Hand this whole file to an LLM (Claude, Gemini, GPT) and ask it to transcribe
     a song into an importable .strum file. Canonical copy lives with the app
     source; this is the public mirror. -->

# Strum — `.strum` file spec for LLM authors

This document is the **complete, self-contained specification** for the
`.strum` file format used by the Strum iOS app. It exists so that a
language model (Claude, Gemini, GPT, etc.) can take a song in *any* input
form — Ultimate Guitar–style chord-over-lyrics, a YouTube tutorial
transcript, a leadsheet PDF, plain instructions ("the four-chord progression
of Let It Be on high-G ukulele") — and emit a JSON file the user can drop
straight into Strum's Import flow.

Sister documents (Strum-AppLogic, Strum-Architecture, etc.) describe how
the app *uses* the format. **You don't need them.** Everything you need
to produce a valid file is here.

The schema is enforced by `Shared/Sharing/StrumSongDTO.swift` and the
`materialize(...)` import path inside it. When this doc disagrees with
that source file, the source file wins — open it and update this doc.

---

## 0. How to use this spec (for LLMs)

You will usually be asked something like:

> "Transcribe *Stand By Me* for high-G ukulele into a `.strum` file."

Your job: emit a **single JSON document** that matches the schema below.
Save it (or instruct the user to save it) with a `.strum` extension. The
user opens Strum → Library → Import → picks the file → the song appears
in their library.

You do **not** need access to Strum to test the file. If your JSON
parses, the fields match the schema, and the values fall inside the
import limits in § 6, the file will load. Anything you get *slightly*
wrong (an unknown strum value, an out-of-range fret) is silently
sanitised — the song still loads, but a single wrong note may turn into
a default rest. Aim to be correct; rely on the safety net only as a
seatbelt.

The four most common mistakes (each has its own callout later):

1. Treating ukulele string index 0 as the lowest-pitched string. For
   **high-G ukulele it is the *highest*-pitched string** (the re-entrant
   g4). See § 5.1.
2. Using a chord name like `"C major"` or `"Cmaj"` instead of the exact
   built-in id `"C"`. See § 5.2.
3. Forgetting that **baritone** and **guitar** chord ids are namespaced
   (`"b-C"`, `"g-C"`). See § 5.2.
4. Setting `isDrumHit: true` on a beat that *also* has tab notes or a
   pinned chord. The importer drops the notes/chord and logs a warning;
   the beat becomes a bare drum hit. See § 4.5.

---

## 1. Quick start — a 30-second example

This is the smallest legal `.strum` file. It is one bar of C-major
strummed once on high-G ukulele.

```json
{
  "schemaVersion": 6,
  "title": "Quick Demo",
  "artist": "LLM",
  "bpm": 90,
  "capoFret": 0,
  "timeSignatureNumerator": 4,
  "timeSignatureDenominator": 4,
  "instrument": "ukulele",
  "tuning": "highG",
  "usesEighths": false,
  "strummingPatternID": "down-up",
  "fingerOverrides": {},
  "notes": null,
  "sections": [
    {
      "index": 0,
      "name": "Verse",
      "isCollapsed": false,
      "strummingPatternID": null,
      "timeSignatureNumerator": null,
      "timeSignatureDenominator": null,
      "usesEighths": null,
      "measures": [
        {
          "index": 0,
          "repeatStart": false,
          "repeatEnd": false,
          "repeatCount": 2,
          "lyrics": null,
          "activeBeatSlotCount": null,
          "beats": [
            { "index": 0, "duration": "quarter", "dotted": false, "isRest": false, "isDrumHit": false, "strum": "down", "pinnedChordName": "C",  "notes": [] },
            { "index": 1, "duration": "quarter", "dotted": false, "isRest": false, "isDrumHit": false, "strum": "up",   "pinnedChordName": null, "notes": [] },
            { "index": 2, "duration": "quarter", "dotted": false, "isRest": false, "isDrumHit": false, "strum": "down", "pinnedChordName": null, "notes": [] },
            { "index": 3, "duration": "quarter", "dotted": false, "isRest": false, "isDrumHit": false, "strum": "up",   "pinnedChordName": null, "notes": [] }
          ]
        }
      ]
    }
  ]
}
```

That's the whole file. Key points:

* JSON, not JSON5: no comments, no trailing commas, all keys quoted.
* `schemaVersion` is the **writer version** — always set it to `6`, the
  current format. See § 3 for the companion
  `minimumReaderVersion` and how the importer gates on it (it stays `1`
  for the long-standing built-in tunings; a custom-tuning song raises it to
  `3`, and an `ebStandard` / `dropC` song raises it to `5` — see
  § 7.3).
* Every section, measure, and beat has an `index` field that matches its
  position in its parent's array (0-based, increasing).
* A `pinnedChordName` set on **beat 0** carries through following beats
  until another chord is pinned — beats 1–3 use the same C.
* Empty `notes: []` means "no tab notes on this beat" — required, not
  optional. (`notes` at the *song* level is a different field — see § 3.)
* Optional fields (`strummingPatternID`, `timeSignatureNumerator`,
  `usesEighths` on a section; `lyrics`, `activeBeatSlotCount` on a
  measure; `pinnedChordName` on a beat) are present-but-`null` rather
  than omitted. Either form decodes the same way, but emitting nulls is
  the encoder's own convention and keeps diffs readable.

---

## 2. The file

* **Encoding**: UTF-8, no BOM.
* **Extension**: `.strum`. The app registers this as a custom UTType.
* **MIME**: not relevant — the file moves via Files, AirDrop, iMessage,
  Mail attachments, etc., never over HTTP.
* **Size cap**: 5 MB. Files larger than that are rejected before
  parsing.
* **Whitespace**: irrelevant to the parser. Strum's own exporter
  pretty-prints with sorted keys (`encoder.outputFormatting =
  [.prettyPrinted, .sortedKeys, .withoutEscapingSlashes]`). Matching
  that convention makes diffs cleaner; minified JSON works equally well.

---

## 3. Root object

```text
StrumSongDTO {
  schemaVersion              Int      required, writer version — set to 6 (the current format)
  minimumReaderVersion       Int?     optional, oldest reader that can open the file; omit (defaults to 1) unless the song uses a custom tuning (set 3) or the ebStandard/dropC built-in tuning (set 5) — see § 7.3
  title                      String   required
  artist                     String   required
  bpm                        Int      required, integer beats-per-minute (no schema bound — pick 30..300 in practice)
  capoFret                   Int?     optional, 0..24 (clamped on import); omit or 0 = no capo. Raises the SOUNDING pitch by
                                      that many semitones while fret numbers stay as written — capo tab convention. Do NOT
                                      transpose the frets or rename the chords: a C shape stays "C". Purely additive, so it
                                      never raises minimumReaderVersion (an older reader just plays it at concert pitch).
  timeSignatureNumerator     Int      required, 1..32
  timeSignatureDenominator   Int      required, MUST be one of {1, 2, 4, 8, 16}
  instrument                 String   required, "ukulele" | "guitar" | "electricGuitar"
  tuning                     String   required, see § 5.1
  usesEighths                Bool     required, true → each beat slot is an 8th note; false → quarter notes
  strummingPatternID         String?  optional, see § 5.4 (null defaults to "down-up")
  fingerOverrides            Map      required (can be {}), see § 3.1
  notes                      String?  optional, free-form song notes (NOT tab notes — those live on beats)
  sections                   Array    required, see § 4.1
  customChords               Array?   optional, see § 7
  customStrumPatterns        Array?   optional, see § 7
  customTunings              Array?   optional, see § 7.3 — user-defined tunings the song / its custom chords reference by a "ct-…" id
}
```

### 3.1 `fingerOverrides`

Per-song finger assignments that override the user's library defaults
for a given chord. Most of the time you emit `{}`.

```json
"fingerOverrides": {
  "Am": [null, 1, 2, 2],
  "F":  [2, 1, null, null]
}
```

* Key = a `pinnedChordName` id (built-in or `cc-{uuid}`).
* Value = array of finger numbers, **one entry per string** (matching the
  `openStringMIDI` order in § 5.1). `1` = index, `2` = middle, `3` =
  ring, `4` = pinky, `5` = thumb. `null` = open string or not used.
* Optional — only fill this in when the user explicitly wants a
  fingering different from the library default.

### 3.2 `usesEighths`

When `true`, each measure has *eight* slots per 4/4 bar (one per 8th note).
When `false`, it has four (one per quarter note). General rule:

| Pattern feel | `usesEighths` |
|---|---|
| Pure quarters, plain "down on each beat" feel | `false` |
| Any 8th-note strum (down-up, island, calypso, almost all pop/folk) | `true` |
| 16th-note feel | `true` (use 16ths as `duration` on individual beats) |

A 4/4 bar with `usesEighths: true` carries **8 beats** in the
`beats` array. Each beat's `duration` defaults to `"eighth"` (you set it
per beat — see § 4.5). Other time signatures follow the same rule:
slot count = numerator × (denominator / 4) × (usesEighths ? 2 : 1) for
common cases. The safe play is: pick a meter, pick `usesEighths`, then
fill the resulting slot count.

---

## 4. Song structure

```
Song
├── Section[]          named blocks (Verse, Chorus, Bridge, …)
│   └── Measure[]      bars
│       └── Beat[]     individual rhythmic positions ("slots")
│           └── TabNote[]   optional, per-string fret positions
```

Each level has a required `index` field. Indices are **0-based** and
should equal the element's position in its parent array. The importer
does not re-sort on `index`, but mismatched indices confuse the editor
when the file round-trips.

### 4.1 `SectionDTO`

```text
SectionDTO {
  index                      Int      required, 0-based position in Song.sections
  name                       String   required (can be ""; common values: "Intro", "Verse", "Chorus", "Bridge", "Outro")
  isCollapsed                Bool     required, UI hint (false is the safe default)
  strummingPatternID         String?  optional, overrides song's pattern for this section only; null → inherit
  timeSignatureNumerator     Int?     optional, see below
  timeSignatureDenominator   Int?     optional, see below
  usesEighths                Bool?    optional, overrides song setting for this section only; null → inherit
  measures                   Array    required, ordered list of MeasureDTO
}
```

A section's time-signature override is meaningful **only when both
numerator and denominator are non-null**. If you set one but not the
other, the importer drops both and the section inherits the song's time
signature. If you don't want a section override, set both fields to
`null`.

### 4.2 `MeasureDTO`

```text
MeasureDTO {
  index                Int      required, 0-based position in Section.measures
  repeatStart          Bool     required, true if a "|:" repeat-start barline precedes this measure
  repeatEnd            Bool     required, true if a ":|" repeat-end barline follows this measure
  repeatCount          Int      required, total times the repeat block plays (clamped 1..100 on import; default 2)
  lyrics               String?  optional, one line of song text shown below this measure; null = no lyrics
  activeBeatSlotCount  Int?     optional, see § 4.4 (pickup / shortened measures); null = full length
  beats                Array    required, BeatDTO list — length is the measure's slot count (see § 3.2)
}
```

* For a single non-repeated bar: `repeatStart: false, repeatEnd: false,
  repeatCount: 2`. (`repeatCount` is required but ignored unless one of
  the repeat flags is true; `2` is the seed default.)
* For a bracketed repeat: set `repeatStart: true` on the first measure
  of the block, `repeatEnd: true` and `repeatCount: N` on the last
  measure. The block then plays N times during simulated playback.

### 4.3 Lyrics

`MeasureDTO.lyrics` is a single line associated with the bar. To put a
chorus's text under the music, fill it in measure by measure. Strum
draws lyrics centred under each bar; line breaks within a `lyrics`
string render as one line (the field is single-line semantically).

For multi-bar phrases, distribute the lyrics across bars so each chunk
appears under the bar where its syllables land. Example:

| Measure | `lyrics` |
|---|---|
| 0 | `"Stand by me, oh"` |
| 1 | `"stand by me, oh"` |
| 2 | `"stand,"` |
| 3 | `"stand by me"` |

### 4.4 Pickup bars / shortened measures

`activeBeatSlotCount` lets a measure carry fewer playable beats than its
slot array suggests. Useful for **anacrusis / pickup bars** ("you say
goodbye…" on beat 4 only of a 4/4 bar).

Strategy: fill the full slot count in `beats` (e.g. 8 beats for a 4/4
`usesEighths` bar), set the leading slots to `isRest: true`, and set
`activeBeatSlotCount: 2` to mark only the last 2 slots as playable. Or
leave `activeBeatSlotCount: null` and rely on rests alone — both work,
but `activeBeatSlotCount` is the better signal for visually-shortened
bars.

Constraints (enforced on import):

* Must be `> 0` and `<= beats.length`. Out-of-range values are silently
  set to `null` (no truncation).

### 4.5 `BeatDTO`

```text
BeatDTO {
  index             Int      required, 0-based position in Measure.beats
  duration          String   required, NoteDuration enum — see § 5.3
  dotted            Bool     required, true → dotted note (×1.5 duration)
  isRest            Bool     required, true → silence on this slot
  isDrumHit         Bool     required, true → percussive body-tap (NO tab notes, NO pinned chord)
  strum             String   required, StrumDirection enum — see § 5.5
  pinnedChordName   String?  optional, chord id that the beat displays/sustains; null = inherit from earlier beat
  notes             Array    required (can be []), per-string tab notes — see § 4.6
}
```

Rules:

* **The drum-hit invariant.** If `isDrumHit: true`, then
  `pinnedChordName` MUST be `null` and `notes` MUST be `[]`. The
  importer enforces this defensively (drops the chord and notes), but
  honour it in the file.
* **Rests.** `isRest: true` typically pairs with `strum: "none"` and
  `notes: []`. (A pattern-side `"rest"` stroke is a separate concept —
  see § 5.5.)
* **Chord pinning.** Setting `pinnedChordName` on a beat tells Strum
  "show this chord glyph above this beat, and use this chord's notes
  when the player triggers an audible strum." A pin sticks until the
  next pin or the end of the song — you do **not** need to repeat the
  same chord on every beat. The convention in seed songs is: pin the
  chord on its first sounding beat in a measure (often beat 0) and
  leave the rest at `null`.
* **Default values for "do nothing" beats** (e.g. the 2nd, 3rd, 4th
  eighth slot of a strummed quarter-note bar):
  `{"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"none","pinnedChordName":null,"notes":[]}`.

### 4.6 `TabNoteDTO`

```text
TabNoteDTO {
  string      Int      required, string index (see § 5.1) — clamped to 0..10 on import
  fret        Int      required, fret number — clamped to -1..30 on import; -1 means "dead/muted note" (renders as "×")
  transition  String?  optional, connective articulation to the NEXT note on this string — NoteTransition enum, see § 5.6
  ornament    String?  optional, in-place articulation on this note — NoteOrnament enum, see § 5.6
}
```

A beat with `notes` set is a **fingerstyle / picking** beat — Strum will
play the notes you list at their actual pitches rather than strumming
the pinned chord. Combine with `strum: "fingerstyle"` for typical
fingerpicking. Multiple notes on the same beat = simultaneous pluck.

**A strummed beat still needs its `notes`.** `pinnedChordName` is a
**label only** — it renders the chord name above the beat and nothing
else. `expandSong` builds `activeMIDI` purely from the beat's tab notes
and carries the chord id along as metadata (`ExpandedBeat.chordID`), so
a beat with a pinned chord and `notes: []` is **silent and draws an
empty tab column**. To strum a chord, write out the shape's frets on
every beat that sounds it:

```json
{"index":0,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,
 "strum":"down","pinnedChordName":"C",
 "notes":[{"string":0,"fret":0},{"string":1,"fret":0},{"string":2,"fret":0},{"string":3,"fret":3}]}
```

Pin the NAME once, on the first beat of the chord — repeating the label
on every beat clutters the chord row — but repeat the NOTES on every
beat you want to hear. `StarterSong.strum` is the reference: it carries
the full four-string shape on each strummed slot and pins the name only
where the chord changes.

`notes: []` is correct for exactly two cases: a slot where the previous
strike should sustain (`strum: "none"`), and an explicit rest.

**Articulations (optional).** A `TabNoteDTO` may carry `transition`
and/or `ornament` to notate playing technique — see § 5.6 for the values
and rules. They attach only to **fretted** notes (`fret >= 0`); a
connective (`transition`) is tagged on the **destination** note and
connects back from the *previous note on the same string within the same
measure*. Both are notation-only in playback **except** a `"harmonic"`
ornament, which
sounds one octave (+12 semitones) above the fretted pitch. Omit the keys
entirely for a plain note — older `.strum` files without them are fine.

---

## 5. Vocabularies (enum values)

Every value listed here must be used **with the exact spelling and
case** shown. Unknown values fall back to safe defaults (`"quarter"`
duration, `"none"` strum, `"ukulele"` instrument) — silent recovery, but
you lose information.

### 5.1 Tunings and string indexing

`tuning` field: one of `"highG" | "lowG" | "baritone" | "guitarStandard" | "dropD"`,
**or** a custom-tuning id `"ct-…"` defined in `customTunings` (see § 7.3).

| `tuning` raw value | Instrument | Strings | MIDI per `string` index |
|---|---|---|---|
| `"highG"` | ukulele | 4 | `0:g4(67) 1:C4(60) 2:E4(64) 3:A4(69)` |
| `"lowG"` | ukulele | 4 | `0:G3(55) 1:C4(60) 2:E4(64) 3:A4(69)` |
| `"baritone"` | ukulele | 4 | `0:D3(50) 1:G3(55) 2:B3(59) 3:E4(64)` |
| `"guitarStandard"` | guitar / electricGuitar | 6 | `0:E2(40) 1:A2(45) 2:D3(50) 3:G3(55) 4:B3(59) 5:E4(64)` |
| `"dropD"` | guitar / electricGuitar | 6 | `0:D2(38) 1:A2(45) 2:D3(50) 3:G3(55) 4:B3(59) 5:E4(64)` |
| `"ebStandard"` | guitar / electricGuitar | 6 | `0:E♭2(39) 1:A♭2(44) 2:D♭3(49) 3:G♭3(54) 4:B♭3(58) 5:E♭4(63)` |
| `"dropC"` | guitar / electricGuitar | 6 | `0:C2(36) 1:G2(43) 2:C3(48) 3:F3(53) 4:A3(57) 5:D4(62)` |

`electricGuitar` is a distinct instrument but **shares guitar's tunings and chords verbatim** (standard EADGBE, 6 strings) — use the same tuning raws and the same `g-` / `dd-` chord ids as `guitar`. Only the playback timbre differs.

`"ebStandard"` (half-step-down) and `"dropC"` are **uniform transpositions** of `"guitarStandard"` / `"dropD"` (every string down 1 / down 2 semitones), so a chord is fingered identically — **reuse the same `g-*` / `dd-*` chord ids** respectively. A song using either MUST set `minimumReaderVersion: 5` (see § 7.3) — an older reader can't resolve the slug and would misread every tab a semitone high.

**Read this carefully.** The `string` field on a `TabNoteDTO` indexes
into the **`openStringMIDI` array shown above** — *not* into the visual
tab notation (where the A string is the topmost line).

In ukulele convention the 4th string is the "g" (or "G") string. So:

* `string: 0` = g/G string (4th string in player terminology).
* `string: 1` = C string (3rd).
* `string: 2` = E string (2nd).
* `string: 3` = A string (1st).

For **high-G ukulele**, the 4th string (`string: 0`) is the
*high* G — it is re-entrant: G4 is higher in pitch than the C4 on string
1. Don't assume index 0 is the lowest-pitched string; for highG it
isn't. (For lowG, baritone, and guitar, index 0 *is* the lowest-pitched
string.)

For guitar, `string: 0` is the low E (thickest), `string: 5` is the high
E (thinnest).

### 5.2 Built-in chord ids (`pinnedChordName`)

`pinnedChordName` accepts either a built-in chord id (listed below) or a
custom-chord id (`"cc-{uuid}"`, see § 7).

**Use the exact spelling and case.** No spaces, no `"maj"` for "major",
sharps as `#` and flats as `b`.

#### High-G / Low-G ukulele (no prefix)

These ids work for both highG and lowG (the fretboard is identical;
they differ only in the pitch of the g string).

| Family | Ids |
|---|---|
| Major | `C` `C#` `D` `Eb` `E` `F` `F#` `G` `Ab` `A` `Bb` `B` |
| Minor | `Cm` `Dm` `Em` `Fm` `Gm` `Am` `Bm` |
| Dominant 7 | `C7` `D7` `E7` `F7` `G7` `A7` `B7` |
| Minor 7 | `Cm7` `Dm7` `Em7` `Fm7` `Gm7` `Am7` `Bm7` |
| Major 7 | `Cmaj7` `Dmaj7` `Emaj7` `Fmaj7` `Gmaj7` `Amaj7` `Bmaj7` |
| Sus2 | `Asus2` `Bsus2` `Csus2` `Dsus2` `Esus2` `Fsus2` `Gsus2` |
| Sus4 | `Asus4` `Bsus4` `Csus4` `Dsus4` `Esus4` `Fsus4` `Gsus4` |
| Diminished | `Adim` `Bdim` `Cdim` `Ddim` `Edim` `Fdim` `Gdim` |
| Augmented | `Aaug` `Baug` `Caug` `Daug` `Eaug` `Faug` `Gaug` |
| Extension | `Fadd9` |

#### Baritone ukulele (prefix `b-`)

Every baritone chord id is the above name prefixed with `b-` — e.g.
`b-C`, `b-Am`, `b-G7`, `b-Cmaj7`, `b-Fdim`.

#### Guitar, standard tuning (prefix `g-`)

Every standard-guitar chord id is the above name prefixed with `g-` — e.g.
`g-C`, `g-D`, `g-Am`, `g-F`, `g-Bm`, `g-Cmaj7`. The full guitar set
covers the same families as ukulele.

#### Guitar, Drop D tuning (prefix `dd-`)

A Drop D song (`tuning: "dropD"`) has its **own** chord ids prefixed
`dd-` — e.g. `dd-D`, `dd-G`, `dd-Em`, `dd-A7`, `dd-Cmaj7`. The set covers
majors, minors, dom7 / maj7 / m7, the D-family sus chords, and the
power chords `dd-D5` `dd-E5` `dd-G5` `dd-A5`. A `g-…` id will **not**
resolve in a Drop D song (different fingering domain) and vice versa —
match the prefix to the song's tuning, not just its instrument.

**Why this matters**: a `pinnedChordName` of `"C"` on a guitar song
resolves to a *ukulele* C shape and won't render correctly. Always
prefix to the song's instrument **and** tuning (`g-` standard, `dd-`
Drop D).

**Picking an enharmonic.** Strum stores `C#` and `Db` as distinct ids
(only one of each enharmonic pair is in the library — see the list).
Pick the spelling that matches the key. If you need an id that doesn't
exist (e.g. `D#m`), either substitute the enharmonic (`Ebm`) or define a
custom chord (§ 7).

### 5.3 Note durations (`BeatDTO.duration`)

| Value | Beats (in 4/4) | Symbol |
|---|---|---|
| `"whole"` | 4.0 | 𝅝 |
| `"half"` | 2.0 | 𝅗𝅥 |
| `"quarter"` | 1.0 | ♩ |
| `"eighth"` | 0.5 | ♪ |
| `"sixteenth"` | 0.25 | 𝅘𝅥𝅯 |
| `"thirtysecond"` | 0.125 | 𝅘𝅥𝅰 |

`dotted: true` multiplies by 1.5 (so a dotted quarter is 1.5 beats).

The duration is **per beat slot**, not "the total duration of the
measure." A 4/4 bar with `usesEighths: true` has 8 slots, each
`"eighth"`; setting one slot to `"quarter"` does NOT shorten the bar in
playback — it just changes the *displayed* glyph on the staff row.

Unknown values fall back to `"quarter"`.

### 5.4 Strumming pattern ids (`strummingPatternID`)

A pattern dictates what stroke each beat slot gets by default. The
per-beat `strum` field overrides the pattern's choice on that slot.

| Id | Behaviour |
|---|---|
| `"down-up"` | **Default.** Alternating down on odd slots, up on even slots. Adaptive — works at any slot count. |
| `"all-down"` | Down on every "main" beat, none on the off-beats. Adaptive. |
| `"island"` | Fixed 8-slot: `D _ D U _ U D U`. Use only when the measure has 8 slots. |
| `"calypso"` | Fixed 8-slot: `D _ D U U M _ D U`. (`M` = mute.) |
| `"waltz"` | Fixed 6-slot 3/4 pattern. Use only in 3/4. |
| `"fingerstyle"` | Fingerstyle on every slot. Adaptive. |
| `"freeform"` | "Don't auto-fill anything" — relies entirely on per-beat `strum` values. Adaptive. |
| `"custom-N"` | A user-defined pattern (see § 7). Use only when the file ships a matching `customStrumPatterns` entry. |
| `"cs-…"` | A stable pattern id found in files **exported by Strum** (schema 4+). When authoring a file by hand, use `"custom-N"` instead — it's positional against your own `customStrumPatterns` array and needs no id computation. A `"cs-…"` reference only resolves when the file ships a `customStrumPatterns` entry whose `id` matches. |
| `null` | Treated the same as `"down-up"`. |

Pick `"freeform"` whenever you intend to set the `strum` field
explicitly on every beat (which you usually will, for a transcription).
Pick `"down-up"` or `"all-down"` if you want the per-beat `strum` field
to remain `"none"` on most beats and let the pattern fill in the
strokes at playback.

### 5.5 Strum directions (`BeatDTO.strum`)

| Value | Meaning |
|---|---|
| `"none"` | No stroke this slot; previous strike sustains. |
| `"down"` | Downstroke (low strings to high). |
| `"up"` | Upstroke (high strings to low). |
| `"fingerstyle"` | Pluck — typically paired with explicit `notes` on the beat. |
| `"arpeggio-up"` | Arpeggiate the pinned chord from low to high. |
| `"arpeggio-down"` | Arpeggiate from high to low. |
| `"mute"` | Percussive string-mute ("chuck") — no pitch. |
| `"drum"` | Body-tap percussive hit. **Use `isDrumHit: true` on the beat, not this stroke**, for persistence — `"drum"` only appears in pattern definitions (§ 7). |
| `"rest"` | Explicit rest — pattern-side only. On a persisted `BeatDTO`, use `isRest: true` and `strum: "none"` instead. |
| `"preserve"` | "Keep whatever is already there" — pattern-side only. Never persist this on a beat. |

For a transcription you will almost always use `"none"`, `"down"`,
`"up"`, `"fingerstyle"`, `"mute"`, and the two `"arpeggio-*"` values.
The other three (`"drum"`, `"rest"`, `"preserve"`) live in the pattern
DSL.

### 5.6 Articulations (`TabNoteDTO.transition` / `ornament`)

Both fields are **optional** and attach only to a **fretted** note
(`fret >= 0`). The importer drops any articulation on a dead string
(`fret: -1`), and unknown values decode to "none" (silent recovery).

`transition` — a *connective* from the **previous note on the same
string** *to this note*. **Tag the destination** note (the note you
arrive at): in `2h3` you pick the 2 and hammer the 3, so the hammer-on
lives on the **3**. Strum draws the arc/slide back from the preceding
note that string played — **including across a barline**: when the origin
is the previous measure's last note on that string, the mark renders as
two half-connectives meeting at the barline (an exit stub on the origin
measure, a labelled entry stub on the destination measure). Intervening
empty / `"none"` slots don't break the scan — it finds the previous
sounding note on that string. Only when no origin is reachable does the
tab degrade to a small **entry-stub** half-arc rising into the note
(hammer/pull keep their letter above the stub).

| `transition` value | Tab mark | Meaning |
|---|---|---|
| `"hammerOn"` | arc + `h` | Hammer onto **this** fret from the previous (usually lower) one, no re-pick. |
| `"pullOff"` | arc + `p` | Pull off onto **this** fret from the previous (usually higher) one, no re-pick. |
| `"slideUp"` | `/` diagonal | Slide up **into** this fret from a lower one. |
| `"slideDown"` | `\` diagonal | Slide down **into** this fret from a higher one. |
| `"legato"` | bare arc | Plain legato connective into **this** note — the arc with no technique letter, for smooth ties where the mechanism isn't named. (A bare entry-stub arc when no origin is reachable.) |

**Keep connectives physically plausible.** The renderer fences every
transition: the origin must sit within **3 slots** of the destination,
and any **rest**, **drum hit**, or **3+-string chord** between them
severs the chain (the mark degrades to a short entry-stub arc). When
transcribing, tag transitions only on notes that closely follow their
origin on the same string.

`ornament` — an *in-place* decoration of the note itself.

| `ornament` value | Tab mark | Meaning |
|---|---|---|
| `"vibrato"` | `~` squiggle | Vibrato. Notation-only. |
| `"harmonic"` | `◇` diamond | Natural harmonic. **Sounds +12 semitones** (12th-fret octave approximation). |

A note may carry **one** transition and **one** ornament simultaneously
(e.g. slide up + vibrato). Everything except `"harmonic"` is
notation-only — the synth pitch is unchanged.

---

## 6. Validation and limits (the safety net)

The import boundary (`StrumSongDTO.materialize`) is **defensive**. A
hostile or buggy `.strum` file should never crash the app. Aim to stay
inside these bounds; if you can't, the importer will silently clip and
keep going.

| Rule | Limit | Behaviour on violation |
|---|---|---|
| File size | ≤ 5 MB | Rejected before parsing. |
| `schemaVersion` | writer ver (`6`) | Informational; a value *newer* than the importing app shows a non-blocking "update for full detail" note but still imports. |
| `minimumReaderVersion` | `≤` app's version | If the file demands a **newer** reader than the app supports, import is **refused** with an "Update Strum" alert. Omit it (→ 1) unless you know you need a breaking feature — set **3** when the song (or one of its custom chords) references a `"ct-…"` custom tuning (see § 7.3). |
| Number of sections | ≤ 50 | Extras truncated. |
| Measures per section | ≤ 100 | Extras truncated. |
| Beats per measure | ≤ 32 | Extras truncated. |
| `customTunings` count | ≤ 16 | Extras past the first 16 dropped. |
| `CustomTuningDTO.openStringMIDI` value | 24..96 | Each clamped into range. |
| `CustomTuningDTO.openStringMIDI` length | = native count (4 uke / 6 guitar) | Wrong count → the whole tuning is dropped; referencing rows fall back to the instrument default. |
| `repeatCount` | 1..100 | Clamped. |
| `timeSignatureNumerator` | 1..32 | Out of range → both num and den reset to 4/4. |
| `timeSignatureDenominator` | ∈ {1, 2, 4, 8, 16} | Out of range → both reset to 4/4. |
| `TabNote.string` | 0..10 | Clamped. |
| `TabNote.fret` | -1..30 (`-1` = dead) | Clamped. |
| `TabNote.transition` | NoteTransition enum (§ 5.6) | Unknown → none; dropped if `fret < 0`. |
| `TabNote.ornament` | NoteOrnament enum (§ 5.6) | Unknown → none; dropped if `fret < 0`. |
| `isDrumHit` invariant | drum hit ⇒ no notes, no chord | Notes and chord dropped; logged. |
| `activeBeatSlotCount` | `> 0` and ≤ beat count | Out of range → set to null (no truncation). |
| Unknown `duration` | — | Falls back to `"quarter"`. |
| Unknown `strum` | — | Falls back to `"none"`. |
| Unknown `instrument` | — | Falls back to `"ukulele"`. |
| Unknown `tuning` | — | Falls back to the instrument's default tuning. (A `"ct-…"` id with no matching — or an unusable — `customTunings` entry falls back the same way.) |

Stay inside the structural caps (50 / 100 / 32). For a long song use
**repeats** (`repeatStart` / `repeatEnd` / `repeatCount`) instead of
unrolling, otherwise you'll bump into the 100-measures-per-section cap.

---

## 7. Optional advanced features

### 7.1 Custom chords

If the song uses a chord shape that isn't in the built-in library, embed
its definition under `customChords` at the song level and reference it
by `cc-{uuid}` from any beat's `pinnedChordName`.

```json
"customChords": [
  {
    "id": "11111111-2222-3333-4444-555555555555",
    "name": "C/G",
    "instrument": "ukulele",
    "tuning": "highG",
    "presses": [
      { "string": 0, "fret": 3, "finger": 4 },
      { "string": 3, "fret": 3, "finger": 3 }
    ],
    "openStrings": [1, 2],
    "sourceChordID": "C"
  }
]
```

Then on a beat: `"pinnedChordName": "cc-11111111-2222-3333-4444-555555555555"`.

Field rules:

* `id` is a UUID-like stable string. The full pinned name is
  `"cc-" + id` (the `cc-` prefix is added by the consumer, not stored
  inside `id`).
* `instrument` and `tuning` use the same raw values as the song.
* `presses[].string` and `presses[].fret` follow the same indexing as
  TabNoteDTO (§ 5.1). `presses[].fret` must be ≥ 1 — open strings live
  in `openStrings`, not `presses`.
* `presses[].finger` is `1..5` or `null`.
* `openStrings` lists string indices that ring open (rendered with `○`).
  Any string with no press and not listed here defaults to muted (`×`).
* `sourceChordID` is the built-in chord id this was seeded from (e.g.
  `"C"` for a C/G slash chord). Optional; used by the editor for the
  "mute-only variant" superscript.

When the user imports the song, Strum prompts before adopting the
embedded customs into their library. The pin resolves immediately
either way (the chord library lookup checks both the global library and
any embedded customs).

### 7.2 Custom strum patterns

If the song's rhythmic pattern doesn't match any built-in id, define it
in `customStrumPatterns` and reference it as `"custom-N"`:

```json
"strummingPatternID": "custom-0",
"customStrumPatterns": [
  {
    "sourceIndex": 0,
    "name": "Slow swing",
    "numerator": 4,
    "strokes": ["down", "none", "up", "down", "none", "up", "down", "up"]
  }
]
```

* `sourceIndex` is the index in the *exporting* user's pattern library.
  The importer remaps `"custom-N"` references to wherever the pattern
  lands in the importing user's library. Just set it to match the index
  of the pattern in your file's `customStrumPatterns` array (e.g. `0`
  for the first pattern, `1` for the second).
* `id` (String, optional, schema 4+) — the exporting app's stable
  pattern identity (`"cs-…"`). **Omit it when authoring by hand** — it
  exists so app-exported files can remap `"cs-…"` song references onto
  the importing library's own identity. If you do set it, any
  `strummingPatternID` matching it is remapped the same way `"custom-N"`
  is. Older Strum versions ignore the key entirely.
* `numerator` is the time-signature numerator the pattern was designed
  for. Drives the slot count Strum expects.
* `strokes[]` uses the same `StrumDirection` raw values as § 5.5 —
  *including* `"drum"`, `"rest"`, and `"preserve"`, which are only
  valid here, not on a `BeatDTO`.

You almost never need this. Prefer setting per-beat `strum` values with
`strummingPatternID: "freeform"` — same result, less ceremony.

### 7.3 Custom tunings

If the song uses a tuning that isn't one of the five built-ins in § 5.1
(e.g. Open D, DADGAD, an alternate uke tuning), define it under
`customTunings` at the song level and reference it by its `"ct-…"` id
from the song's `tuning` field (and from any `customChords[].tuning`
scoped to it).

```json
"tuning": "ct-11111111-2222-3333-4444-555555555555",
"minimumReaderVersion": 3,
"customTunings": [
  {
    "id": "ct-11111111-2222-3333-4444-555555555555",
    "name": "Open D",
    "instrument": "guitar",
    "openStringMIDI": [38, 45, 50, 54, 57, 62],
    "stringNames": ["D", "A", "d", "F#", "A", "d"]
  }
]
```

Field rules:

* `id` is the full tuning id, **including** the `"ct-"` prefix (unlike
  custom chords, where the consumer adds `cc-`). Put the identical
  string in the referencing `tuning` field.
* `instrument` uses the same raw values as the song (`"ukulele"` |
  `"guitar"` | `"electricGuitar"`).
* `openStringMIDI` is the per-string open pitch in MIDI numbers,
  **low-string-first** — the same string ordering as § 5.1 (so a
  `TabNote`'s `string` index lines up). Its **length is fixed to the
  instrument's native count**: 4 for ukulele, 6 for guitar / electricGuitar. v1 only lets
  you re-pitch the existing strings, not add or remove them; a wrong
  count makes the importer **drop the whole tuning** (the song then falls
  back to the instrument default). Each value is clamped to **24..96**
  (`CustomTuningLimits.midiRange`).
* `stringNames` is one display label per string (same order). If it's
  missing or the wrong length, the importer derives names from the
  pitches, so you can omit accuracy here without harm.

**The `minimumReaderVersion` rule.** A song that actually references a
`"ct-…"` tuning **must** set `minimumReaderVersion: 3`. An older reader
doesn't know the id, would resolve it to a built-in, and would render
every tab at the wrong pitch — a silent, breaking misread. (A file that
defines `customTunings` but uses only built-in tunings everywhere can
stay at the default reader version, but the simplest correct rule is:
*using a custom tuning ⇒ set `minimumReaderVersion: 3`*.) The writer
`schemaVersion` is `6` regardless.

The importer **sanitizes** each entry on the way in (clamps the MIDI
into 24..96, enforces the native string count, caps the name length, and
derives missing string names), caps the array at `16` entries
(`ImportLimits.maxCustomTunings`), and — only when the user opts to adopt
the file's customs — adds the tuning to their library for reuse on
future songs. The referencing song always gets a **frozen snapshot** of
the tuning's pitches, so it renders correctly even if the user declines
to adopt it.

The built-in chord catalogue does **not** auto-extend to a custom
tuning. To pin chords in a custom-tuned song, define the shapes as
custom chords (§ 7.1) with their `tuning` set to the same `"ct-…"` id.

---

## 8. Worked examples

### 8.1 Three-chord folk song, strum-only

"Sweet Home" — verse, two bars of G, two bars of D, two bars of C, on
high-G ukulele, gentle down-up at 96 bpm. Skipping the boilerplate for
brevity — the full file looks like § 1 but with six measures.

The six measure bodies:

```json
{
  "index": 0,
  "repeatStart": false, "repeatEnd": false, "repeatCount": 2,
  "lyrics": "Sweet home,",
  "activeBeatSlotCount": null,
  "beats": [
    {"index":0,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"down","pinnedChordName":"G","notes":[]},
    {"index":1,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"up","pinnedChordName":null,"notes":[]},
    {"index":2,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"down","pinnedChordName":null,"notes":[]},
    {"index":3,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"up","pinnedChordName":null,"notes":[]},
    {"index":4,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"down","pinnedChordName":null,"notes":[]},
    {"index":5,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"up","pinnedChordName":null,"notes":[]},
    {"index":6,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"down","pinnedChordName":null,"notes":[]},
    {"index":7,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"up","pinnedChordName":null,"notes":[]}
  ]
}
```

Five more measures with `index: 1..5`, `pinnedChordName` switching to
`"G"` (index 1 — sustains), `"D"` (index 2), `"D"` (index 3 — sustains),
`"C"` (index 4), `"C"` (index 5 — sustains). Same eight strum beats
each.

Alternative — use the built-in pattern instead of writing the strums:

```json
"strummingPatternID": "down-up",
"usesEighths": true
```

…and leave each beat's `strum` as `"none"`. Strum will fill in the
down-up at playback. Less verbose but loses per-beat control.

### 8.2 Fingerpicked intro on high-G

A two-bar Travis-pick-style intro on a C chord, high-G ukulele, 4/4
`usesEighths: true`. Each beat plucks a single string. Indices and
fingerings shown:

```json
{
  "index": 0,
  "repeatStart": false, "repeatEnd": false, "repeatCount": 2,
  "lyrics": null, "activeBeatSlotCount": null,
  "beats": [
    {"index":0,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"fingerstyle","pinnedChordName":"C","notes":[{"string":1,"fret":0}]},
    {"index":1,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"fingerstyle","pinnedChordName":null,"notes":[{"string":3,"fret":3}]},
    {"index":2,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"fingerstyle","pinnedChordName":null,"notes":[{"string":2,"fret":0}]},
    {"index":3,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"fingerstyle","pinnedChordName":null,"notes":[{"string":3,"fret":3}]},
    {"index":4,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"fingerstyle","pinnedChordName":null,"notes":[{"string":0,"fret":0}]},
    {"index":5,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"fingerstyle","pinnedChordName":null,"notes":[{"string":3,"fret":3}]},
    {"index":6,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"fingerstyle","pinnedChordName":null,"notes":[{"string":2,"fret":0}]},
    {"index":7,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"fingerstyle","pinnedChordName":null,"notes":[{"string":3,"fret":3}]}
  ]
}
```

Notes:

* The chord `"C"` is pinned on beat 0 so the chord glyph appears, but
  the actual sounding pitches come from each beat's single `TabNote` —
  this is what fingerstyle does.
* `string: 0` = the high g (G4) — used as the "high" note in the
  Travis pattern. On lowG you would re-think which string carries the
  bass note.
* The A string (`string: 3`) at fret 3 is the C5 melody note —
  effectively the alternating bass in this pattern.

### 8.3 Repeated chorus

A four-bar chorus that plays twice:

```json
"measures": [
  {"index": 0, "repeatStart": true,  "repeatEnd": false, "repeatCount": 2, "lyrics": "I will…", "activeBeatSlotCount": null, "beats": [/* 8 beats, pinned G */]},
  {"index": 1, "repeatStart": false, "repeatEnd": false, "repeatCount": 2, "lyrics": "stand by you", "activeBeatSlotCount": null, "beats": [/* 8 beats, pinned D */]},
  {"index": 2, "repeatStart": false, "repeatEnd": false, "repeatCount": 2, "lyrics": "through the…", "activeBeatSlotCount": null, "beats": [/* 8 beats, pinned Em */]},
  {"index": 3, "repeatStart": false, "repeatEnd": true,  "repeatCount": 2, "lyrics": "long night", "activeBeatSlotCount": null, "beats": [/* 8 beats, pinned C */]}
]
```

* `repeatStart: true` on measure 0 places the opening `|:` barline.
* `repeatEnd: true` + `repeatCount: 2` on measure 3 places `:|` and
  unrolls the block to play **twice total** (not "twice more").
* `repeatCount` on every other measure is filler and ignored.

### 8.4 Articulated lick (hammer-on, slide, vibrato, harmonic)

A one-bar high-G ukulele lick on the A string (`string: 3`), 4/4
`usesEighths: true` (8 eighth slots): hammer 2→4, slide 4→7, let 7 ring
with vibrato, then a 12th-fret natural harmonic.

```json
{
  "index": 0,
  "repeatStart": false, "repeatEnd": false, "repeatCount": 2,
  "lyrics": null, "activeBeatSlotCount": null,
  "beats": [
    {"index":0,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"fingerstyle","pinnedChordName":null,"notes":[{"string":3,"fret":2}]},
    {"index":1,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"fingerstyle","pinnedChordName":null,"notes":[{"string":3,"fret":4,"transition":"hammerOn"}]},
    {"index":2,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"fingerstyle","pinnedChordName":null,"notes":[{"string":3,"fret":7,"transition":"slideUp","ornament":"vibrato"}]},
    {"index":3,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"none","pinnedChordName":null,"notes":[]},
    {"index":4,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"fingerstyle","pinnedChordName":null,"notes":[{"string":3,"fret":12,"ornament":"harmonic"}]},
    {"index":5,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"none","pinnedChordName":null,"notes":[]},
    {"index":6,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"none","pinnedChordName":null,"notes":[]},
    {"index":7,"duration":"eighth","dotted":false,"isRest":false,"isDrumHit":false,"strum":"none","pinnedChordName":null,"notes":[]}
  ]
}
```

* The hammer-on is tagged on the **destination** (beat 1, `fret 4`) —
  you pick the 2 on beat 0 and hammer the 4, so the `h` lives on the 4;
  Strum draws the arc back from beat 0. The slide on beat 2 (`fret 7`)
  likewise points back to beat 1.
* Beat 2 carries **both** a `slideUp` (its slide destination) **and** a
  `vibrato` ornament — a note can hold one transition and one ornament
  at once.
* The harmonic on beat 4 **sounds A5** (octave up) even though the tab
  reads fret 12.
* All eight slots are `"eighth"` so they sum to a valid 4/4 bar; the
  connectives skip the empty (`"none"`) slots when scanning back for
  their same-string origin.

---

## 9. Common mistakes (LLM failure modes)

1. **Wrong string index for high-G.** You wrote `{string: 0, fret: 3}`
   intending the lowest-pitched string. For high-G ukulele, string 0
   is the *high* g (G4) — your bass note went to the top of the tab.
   Fix: for high-G, the "bass" string is whichever has the lowest
   *pitch* in your part — usually `string: 1` (C4). For lowG, string 0
   *is* the lowest pitch.

2. **Made-up chord names.** Strum has no `"Cmajor"`, `"Cmin"`, `"Cm9"`,
   `"D/F#"`, `"Csus2sus4"`. Stick to the lists in § 5.2. If the song
   needs a chord that isn't there, either substitute (a `Dm7` instead
   of `Dm9` is usually musically acceptable) or define a custom chord
   (§ 7.1).

3. **Missing instrument prefix.** Wrote `pinnedChordName: "C"` for a
   guitar song. The library will look up the uke "C" shape and your
   guitar score will sound and display wrong. Use `"g-C"` for guitar,
   `"b-C"` for baritone uke.

4. **Slot count mismatch.** `timeSignatureNumerator: 4`,
   `timeSignatureDenominator: 4`, `usesEighths: true`, and only 4
   beats in `beats[]`. Result: a half-bar measure. Either provide 8
   beats, or set `usesEighths: false`.

5. **Drum hit with notes.** `isDrumHit: true` while `notes: [{...}]` or
   `pinnedChordName: "C"`. Importer silently drops them. Fix: pick one
   semantic (drum hit OR pitched beat), not both.

6. **`activeBeatSlotCount` set to the full count.** Equivalent to
   `null`, just noisier. Only use this when the measure is genuinely
   short.

7. **`repeatCount` meaning "additional repeats".** It is **total
   plays**, not "extra plays after the first". A repeat block with
   `repeatCount: 2` plays twice, not three times.

8. **Inventing strum-pattern ids.** `"strummingPatternID": "shuffle"`
   doesn't resolve. The resolver falls back to `"down-up"`. Pick from
   the list in § 5.4 or define a custom pattern (§ 7.2).

9. **Putting tab notes in `MeasureDTO.lyrics`** because both feel like
   "decoration on a bar." Lyrics is just text. Tab notes belong on
   individual beats.

10. **Forgetting `repeatCount`** because the bar isn't a repeat. It's
    required — set it to `2` (the seed default) and move on.

11. **Articulation on a dead/muted string.** A `transition` or
    `ornament` on a `{"fret": -1}` note is dropped on import — you can't
    hammer onto or vibrato a silenced string. Put articulations on
    fretted notes (`fret >= 0`).

12. **Tagging the origin of a connective.** A hammer-on / pull-off /
    slide goes on the **destination** note (the note you arrive at) and
    connects back to the previous note on that string — don't put it on
    the origin note. In `2h3`, the `hammerOn` belongs on the **3**.

---

## 10. Authoring strategies

When transcribing from a non-Strum input, climb the ladder:

1. **Get the structure right first.** Decide on sections (Intro, Verse,
   Chorus, …), how many measures each, the time signature, the bpm,
   and the instrument/tuning. Emit empty measures with zero strums,
   verify the count matches the original.
2. **Pin chords.** Walk the original chord chart and pin each chord on
   the first beat of the measure it lands on (or the exact beat for
   mid-bar changes). Leave `strum: "none"` everywhere.
3. **Pick a strum pattern.** If the user described a feel ("down-up",
   "island", "fingerstyle"), set `strummingPatternID` accordingly and
   you're often done. If they want a bespoke rhythm, switch to
   `"freeform"` and fill `strum` per beat.
4. **Add lyrics.** One line per measure, segmented to fit roughly.
5. **Add tab notes only when the part is melodic** — intros, outros,
   solo lines, instrumental breaks. A pure rhythm part needs no
   `notes` arrays beyond `[]`.
6. **Pull repeats.** Any block that recurs (Chorus, Verse repeats)
   becomes a single block with `repeatStart` / `repeatEnd` /
   `repeatCount`.

Keep the file small. The user can edit in Strum once it imports — your
job is to nail the bones, not every shimmer.

When the input is ambiguous (an Ultimate-Guitar chart with no rhythm
information), default to:

* `instrument: "ukulele"`, `tuning: "highG"` (the app's primary use case).
* `bpm: 90`, time signature `4/4`, `usesEighths: true`.
* `strummingPatternID: "down-up"`.
* Pin each chord on beat 0 of its measure.
* No tab notes, no per-beat strums (let the pattern fill them in).

That delivers a song the user can play through immediately, then refine
in the editor.

---

## 11. When in doubt

If a value isn't covered by this spec, look it up directly in:

* `Shared/Sharing/StrumSongDTO.swift` — the canonical schema and import
  logic.
* `Shared/Models/Enums.swift` — Instrument, Tuning, NoteDuration,
  StrumDirection raw values.
* `Shared/Music/ChordLibrary.swift` — the full list of built-in chord
  ids per instrument/tuning.
* `Shared/Music/StrummingPattern.swift` — built-in pattern definitions.

The file format carries **two** version numbers. `schemaVersion` is the
*writer* version (currently `3`) and bumps on every format change.
`minimumReaderVersion` (optional, defaults to `1`) is the *oldest* app
version that can still read the file correctly, and bumps **only** on a
breaking change. The importer rejects a file only when its
`minimumReaderVersion` exceeds what the app supports (telling the user to
update); a merely-newer `schemaVersion` still imports (older app drops
the keys it doesn't know) with a soft note. So a file you author at
`schemaVersion: 3` with a built-in tuning (no `minimumReaderVersion`)
loads on every shipping build; only a custom-tuning song raises
`minimumReaderVersion` to `3` (§ 7.3), because resolving an unknown
`"ct-…"` id on an older reader is a silent, breaking misread. If a
future release bumps the writer version, update this doc alongside the
schema.
