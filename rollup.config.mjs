import typescript from '@rollup/plugin-typescript';

export default [{
  input: 'src/github-actions.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'es'
  },
  plugins: [typescript()],
  external: [
    'node:fs/promises',
    'node:readline/promises',
    'node:stream',
    'node:fs',
    '@actions/core',
    '@actions/github',
    'big.js',
    'winston',
  ]
}];
