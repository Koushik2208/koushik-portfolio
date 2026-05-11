---
name: Editorial Desk
colors:
  surface: '#fdf9f4'
  surface-dim: '#ded9d4'
  surface-bright: '#fdf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f3ee'
  surface-container: '#f2ede8'
  surface-container-high: '#ece7e2'
  surface-container-highest: '#e6e2dd'
  on-surface: '#1d1b19'
  on-surface-variant: '#444748'
  inverse-surface: '#32302d'
  inverse-on-surface: '#f5f0eb'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#a13f20'
  on-secondary: '#ffffff'
  secondary-container: '#fd835f'
  on-secondary-container: '#721d01'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#001d32'
  on-tertiary-container: '#4d89bb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#ffdbd1'
  secondary-fixed-dim: '#ffb59f'
  on-secondary-fixed: '#3b0a00'
  on-secondary-fixed-variant: '#81280a'
  tertiary-fixed: '#cee5ff'
  tertiary-fixed-dim: '#96ccff'
  on-tertiary-fixed: '#001d32'
  on-tertiary-fixed-variant: '#004a75'
  background: '#fdf9f4'
  on-background: '#1d1b19'
  surface-variant: '#e6e2dd'
typography:
  display-large:
    fontFamily: Playfair Display
    fontSize: 84px
    fontWeight: '700'
    lineHeight: 90%
    letterSpacing: -0.02em
  headline-editorial:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 110%
  body-main:
    fontFamily: Newsreader
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  technical-label:
    fontFamily: IBM Plex Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.4'
  note-accent:
    fontFamily: Newsreader
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: 0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 32px
  margin-desktop: 80px
  margin-mobile: 24px
  container-max: 1440px
---

## Brand & Style
This design system is built on the metaphor of a "creative desk"—a curated, tactile workspace where analog artifacts meet digital precision. It evokes the feeling of an art director’s physical mood board, blending the high-end sophistication of a fashion editorial with the raw, functional aesthetic of a technical workstation.

The style is a hybrid of **Minimalism** and **Tactile Skeuomorphism**. It prioritizes generous whitespace and a "poster-like" composition while using realistic depth and rotation to give elements a physical presence. The emotional response is one of curated intimacy, intellectual curiosity, and timeless craft.

## Colors
The palette is rooted in the organic warmth of physical media. The foundation is a "paper-white" background that reduces eye strain and provides a soft, reflective quality. 

- **Foundation:** The primary background uses `#fffaf5`, providing a warm, cream-toned surface.
- **Ink:** Typography is strictly handled in matte blacks and soft charcoals to mimic printed ink rather than digital hex-black.
- **Accents:** Restrained use of "International Orange" (`#e97451`) for highlights and "Muted Steel Blue" (`#4682b4`) for interactive technical elements. These colors should appear as if they were applied with a highlighter or a ballpoint pen.

## Typography
The typographic hierarchy creates a dialogue between the expressive and the systematic.

- **Expressive Headers:** Use *Playfair Display* in large scales and italics. This mimics the masthead of a high-end magazine.
- **Literary Body:** *Newsreader* is used for long-form content, providing a comfortable, scholarly reading experience that feels like a published essay.
- **Technical Precision:** *IBM Plex Mono* is reserved for metadata, terminal snippets, and functional labels, providing a "teletype" contrast to the organic serif faces.
- **Handwritten Accents:** For side-notes and annotations, use a stylistic serif with increased kerning or a handwritten-style script font to simulate ink on the page.

## Layout & Spacing
The layout ignores standard symmetrical grids in favor of an **asymmetrical, poster-like composition**. It treats the viewport as a physical canvas.

- **The Canvas:** Content is organized using a 12-column grid, but elements should frequently break the grid, overlapping one another or sitting in unconventional "floating" positions.
- **Whitespace:** Use aggressive whitespace (margins of 80px+) to isolate key artifacts and create a sense of importance.
- **Responsive Reflow:** On mobile, the "floating" objects stack vertically, but maintain their subtle rotations and overlapping "edge-to-edge" shadows to preserve the tactile depth.

## Elevation & Depth
This design system uses **Ambient Shadows** to simulate a three-dimensional desk surface. Depth is not communicated through brightness, but through the softness and spread of the shadow.

- **Layer 0 (Base):** The warm paper background.
- **Layer 1 (The Desk):** Sticky notes and flat clippings. Use a very tight, 2px blur shadow with 5% opacity.
- **Layer 2 (The Artifact):** Polaroids and terminal windows. These feature a multi-layered shadow (10px blur, 10% opacity) and a subtle 1-3 degree rotation (Z-axis).
- **Layer 3 (The Focus):** Elements currently being "held" or hovered. The shadow expands to 20px blur, and the rotation levels out to 0, simulating the object being picked up from the desk.

## Shapes
Shapes are defined by their physical counterparts.

- **Artifacts:** Polaroids and terminal snippets use sharp corners or a very slight `0.25rem` radius to mimic cut paper and plastic.
- **Interface Elements:** Buttons and interactive fields follow the `rounded-sm` (0.25rem) logic, appearing more like stamped or embossed areas than digital bubbles.
- **Film Strips:** Use hard edges with circular "perforation" cutouts on the top and bottom edges.

## Components
Consistent styling for core elements:

- **Polaroids:** Image containers with a thick bottom white border and a thin inner stroke. They should always have a random `-2deg` to `+2deg` rotation.
- **Sticky Notes:** Square containers using the accent colors (soft orange/blue) with a slight "curl" shadow effect on the bottom right corner.
- **Terminal Snippets:** Dark mode blocks (`#121212`) using *IBM Plex Mono*. These look like low-contrast windows with a header bar containing three simple dots (window controls).
- **Buttons:** Text-only with a heavy underline or a simple thin-border rectangle. No gradients; use solid matte fills for hover states.
- **Film Strips:** Horizontal scrolling containers for galleries, featuring the characteristic black sprocket-hole borders of 35mm film.
- **Checkboxes:** Styled as hand-drawn "X" marks or simple square boxes that look stamped onto the page.