// Consume & Create brand tokens.
// Single source of truth for the shared studio. Change here → every template updates.
//
// Real brand fonts (see consumeandcreate.co): "GT Walsheim" (body + display),
// "GT Walsheim Pro Condensed Bold" (large headlines), "Playfair Display" (editorial),
// "Marker" (playful script). These are licensed and not bundled — we use a
// geometric system-ui stack as a close fallback. To load the real files, drop
// .woff2 files into public/fonts/ and add @font-face rules, then swap the stacks below.

export const BRAND = {
  dark: "#232020",
  darkSoft: "rgba(35,32,32,0.82)",
  light: "#e7e7e7",
  cream: "#f5f1e8",
  white: "#ffffff",
  accent: "#ff4f1a",

  fontStack: {
    sans: '"Inter", "Helvetica Neue", system-ui, -apple-system, sans-serif',
    serif: '"Playfair Display", Georgia, "Times New Roman", serif',
    script: '"Marker", "Brush Script MT", cursive',
  },

  radius: {
    sharp: 0,
    sm: 4,
    md: 12,
  },

  // Uppercase tracked-out label style used repeatedly on the site.
  label: {
    textTransform: "uppercase" as const,
    letterSpacing: 4,
    fontWeight: 600,
  },
};

export const pad2 = (n: number) => String(n).padStart(2, "0");
