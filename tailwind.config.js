/** @type {import('tailwindcss').Config} */
/**
 * Couleurs basées sur des variables CSS (hex): sans ceci, les modificateurs
 * d'opacité Tailwind (text-ivory/60, border-sand/20, bg-dark-brown/80...) ne
 * génèrent aucun CSS. color-mix() applique l'alpha correctement.
 */
const cssVar = (name) => ({ opacityValue }) =>
  opacityValue === undefined
    ? `var(${name})`
    : `color-mix(in srgb, var(${name}) calc(${opacityValue} * 100%), transparent)`;

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        background: cssVar('--background'),
        foreground: cssVar('--foreground'),
        primary: {
          DEFAULT: cssVar('--primary'),
          foreground: cssVar('--primary-foreground'),
        },
        secondary: {
          DEFAULT: cssVar('--secondary'),
          foreground: cssVar('--secondary-foreground'),
        },
        accent: {
          DEFAULT: cssVar('--accent'),
          foreground: cssVar('--accent-foreground'),
        },
        muted: {
          DEFAULT: cssVar('--muted'),
          foreground: cssVar('--muted-foreground'),
        },
        card: {
          DEFAULT: cssVar('--card'),
          foreground: cssVar('--card-foreground'),
        },
        border: cssVar('--border'),
        input: cssVar('--input'),
        ring: cssVar('--ring'),
        ivory: cssVar('--ivory'),
        sand: cssVar('--sand'),
        terracotta: cssVar('--terracotta'),
        'deep-green': cssVar('--deep-green'),
        brass: cssVar('--brass'),
        'dark-brown': cssVar('--dark-brown'),
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'calc(var(--radius) - 2px)',
        lg: 'calc(var(--radius) + 4px)',
        xl: 'calc(var(--radius) + 8px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(61,43,31,0.08)',
        'warm-md': '0 4px 16px rgba(61,43,31,0.12)',
        'warm-lg': '0 8px 32px rgba(61,43,31,0.16)',
        'warm-xl': '0 16px 48px rgba(61,43,31,0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-up': 'slideUp 0.5s ease forwards',
        'scale-in': 'scaleIn 0.2s ease forwards',
        'pulse-warm': 'pulseWarm 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        pulseWarm: {
          '0%, 100%': { backgroundColor: 'rgba(196,98,45,0.05)' },
          '50%': { backgroundColor: 'rgba(196,98,45,0.12)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};