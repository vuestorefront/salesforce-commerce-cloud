import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
import { generateBaseConfig } from '../../rollup.base.config';

export default [
  generateBaseConfig(pkg),
  generateBaseConfig({
    ...pkg,
    input: 'src/index.server.ts',
    main: 'server/index.js',
    module: null
  })
];
