// Single source of truth for hex values. NativeWind classNames (bg-primary,
// text-textSecondary, etc.) handle most styling, but icon `color` props and
// Animated values still need real hex strings — pull them from here so
// there's never a second, drifting copy of the palette.
//
// IMPORTANT: these values must match `theme.extend.colors` in
// tailwind.config.js at the project root. If you change one, change both.
export const colors = {
  background: "#12141C",
  surface: "#1B1E29",
  surfaceElevated: "#232634",
  border: "#2A2E3D",

  textPrimary: "#F5F6FA",
  textSecondary: "#9297A8",
  textMuted: "#6B7080",

  primary: "#3DDC84",
  primaryDark: "#2BB86B",
  gem: "#A78BFA",
  coin: "#F2C94C",

  rarity: {
    common: "#9297A8",
    rare: "#4DA3FF",
    epic: "#A78BFA",
    legendary: "#F2C94C",
  },

  danger: "#F26B6B",
  overlay: "rgba(10, 11, 16, 0.6)",
} as const;