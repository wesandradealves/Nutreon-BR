import type { Config } from "tailwindcss";
import forms from '@tailwindcss/forms';

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    '2xl:-mb-[6rem]',
    '--primary',
    'button',
    '-mb-[6rem]',
    '-mt-[6rem]',
    'pt-[6rem]',
    'pb-[6rem]',
    'p-6',
    'lg:ps-[150px]',
    'lg:pe-[150px]',
    'text-2xl',
    'lg:-mb-[6rem]',
    'lg:-mt-[6rem]',
    'pt-[100px]',
    'pb-[100px]',
    'pb-[200px]',
    'gap-[200px]',
    'lg:ms-auto',
    'lg:me-auto',
    'lg:m-auto',
    'sm:ms-auto',
    'sm:me-auto',
    'sm:m-auto',
    '-top-[8px]',
    '-right-[8px]',
    '-top-[10px]',
    '-right-[10px]',
    '-top-[12px]',
    '-right-[12px]',
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: '#e6fcfa',
          100: '#b3f5f0',
          200: '#80ede6',
          300: '#4de6dc',
          400: '#1adfd2',
          500: '#00e8d4', // Cor principal
          600: '#00b8a9',
          700: '#00897e',
          800: '#005953',
          900: '#002a28',
        },
        dark: {
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        }
      },
    },
  },
  plugins: [
    forms,
  ],
} satisfies Config;
