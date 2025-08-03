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
    {
      pattern: /^(p|pt|pr|pb|pl|px|py|m|mt|mr|mb|ml|mx|my|w|h|gap)-\[\w+(-\w+)*\]$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /^(min-w|min-h|max-w|max-h)-\[\w+(-\w+)*\]$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    forms,
  ],
} satisfies Config;
