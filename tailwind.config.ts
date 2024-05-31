import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'xs': '320px',
        // => @media (min-width: 320px) { ... }

        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      colors: {
        'ab-primary': '#23c0fe',
        'ab-black': '#150C08',
        'ab-black-50': '#150C0850',
        'ab-black-70': '#150C0870',
        'ab-black-90': '#150C0890',
        'ab-white-a-50': '#FFFFFF50',
        'ab-white-a-80': '#FFFFFF80',
        'ab-gray': '#B8B8B8',
        'ab-purple': '#7013F2',
        'ab-purple-a-90': '#7013F290',
        'ab-orange': '#FFBF46',
        'ab-orange-a-80': '#FFBF4680',
        'ab-light-blue': '#D1F2FF',
        'ab-light-blue-a-80': '#D1F2FF80',
        'ab-light-blue-a-90': '#D1F2FF90',
        'ab-lilac': '#DF74FF',
      }
    },
  },
  plugins: [],
}
export default config
