import next from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier';

const config = [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'public/**'] },
  ...next,
  prettier,
  {
    rules: {
      '@next/next/no-img-element': 'error',
    },
  },
];

export default config;
