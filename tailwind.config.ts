import type { Config } from 'tailwindcss';

// โทเคนจาก _design/nititech.md (Juris Vanguard): พื้นดำ ทอง Aureum ฟ้า Cyan ส้ม Amber
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: { DEFAULT: '#0A0B0E', 2: '#101217', 3: '#161A23' },
        gold: { DEFAULT: '#D4AF37', bright: '#F2CA50', dim: '#735C00' },
        cyan: { DEFAULT: '#00F0FF', dim: '#00686F' },
        amber: { DEFAULT: '#FF7A00', soft: '#FFC19E' },
        ink: { DEFAULT: '#F5F6F8', 2: '#8E93A0', 3: '#4F5462' },
        line: { DEFAULT: 'rgba(255,255,255,0.08)', 2: 'rgba(255,255,255,0.16)' },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'var(--font-thai)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-newsreader)', 'var(--font-thai-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'var(--font-thai)', 'ui-monospace', 'monospace'],
      },
      borderRadius: { DEFAULT: '4px', lg: '8px' },
      boxShadow: {
        aureum: '0 0 32px -4px rgba(212,175,55,0.15)',
        'aureum-hover': '0 0 20px rgba(212,175,55,0.35)',
        cyan: '0 0 40px -6px rgba(0,240,255,0.18)',
        amber: '0 0 32px -4px rgba(255,122,0,0.20)',
      },
    },
  },
  plugins: [],
};

export default config;
