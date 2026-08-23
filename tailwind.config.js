/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Premium red · black · white
        bg: '#0B0B0D',
        bgDeep: '#050506',
        surface: '#151517',
        surface2: '#1F1F23',
        border: '#2A2A2F',
        borderStrong: '#3C3C43',
        // Text — white on black
        textPrimary: '#F5F5F6',
        textSecondary: '#B4B4BB',
        textMuted: '#6C6C74',
        // Canonical accents (red family)
        red: '#E5091A',
        redSoft: '#FF4D4D',
        crimson: '#B00711',
        redDim: '#3A0A0E',
        white: '#FFFFFF',
        coral: '#E5091A',
        coralDim: '#3A0A0E',
        purple: '#B00711',
        purpleDim: '#2A0709',
        peach: '#FF6B6B',
        peachDim: '#3A1010',
        rose: '#FF4D4D',
        cream: '#F5F5F6',
        // Legacy aliases → red family so older classes stay valid
        gold: '#E5091A',
        teal: '#E5091A',
        violet: '#B00711',
        indigo: '#8A0A12',
        pink: '#FF4D4D',
      },
      fontFamily: {
        title: ['Bangers', 'cursive'], // big anime-title accents
        display: ['Righteous', 'sans-serif'], // section headings
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: {
        content: '1040px',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(229,9,26,0.55)',
        glowTeal: '0 0 40px -8px rgba(229,9,26,0.45)',
        glowPurple: '0 0 40px -8px rgba(176,7,17,0.5)',
        glowPink: '0 0 40px -8px rgba(255,77,77,0.5)',
        lamp: '0 0 80px -10px rgba(229,9,26,0.4)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        drift: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        gridMove: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '48px 48px' },
        },
        petal: {
          '0%': { transform: 'translateY(-5vh) translateX(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(105vh) translateX(60px) rotate(360deg)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
        marquee: 'marquee 32s linear infinite',
        gridMove: 'gridMove 8s linear infinite',
      },
    },
  },
  plugins: [],
}
