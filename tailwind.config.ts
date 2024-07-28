import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        dark: '#171717',
        'dark-gray': '#212121',
        'light-gray': '#868686',
        'blog-blue': '#007BFF',
        'secondary-blue': '#218cff',
      },
      fontSize: {
        heading: '2.5rem',
        subheading: '2rem',
      },
      gridTemplateColumns: {
        'auto-fill-350': 'repeat(auto-fill, minmax(350px, 1fr))',
        'auto-fit-350': 'repeat(auto-fit, minmax(350px, 1fr))',
      },
    },
  },
  plugins: [],
};
export default config;
