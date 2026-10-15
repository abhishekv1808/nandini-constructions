import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-config-prettier';

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const config = [
  { ignores: ['.next/**', '.next-check/**', 'node_modules/**', 'next-env.d.ts', 'types/supabase.ts'] },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  prettier,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'gsap',
              message: 'Use loadGsap() from @/lib/motion/gsap (lazy, §3.7).',
              allowTypeImports: true,
            },
            {
              name: 'gsap/ScrollTrigger',
              message: 'Use loadGsap() from @/lib/motion/gsap (lazy, §3.7).',
              allowTypeImports: true,
            },
            { name: 'lenis', message: 'Lenis is owned by ScrollProvider (§3.7).', allowTypeImports: true },
          ],
        },
      ],
    },
  },
];

export default config;
