import typescript from 'rollup-plugin-typescript2';

export function generateBaseConfig(pkg) {
  return {
    input: pkg.input || 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true
      },
      ...(pkg.module ? [{
        file: pkg.module,
        format: 'es',
        sourcemap: true
      }] : [])
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [
      typescript({
        // eslint-disable-next-line global-require
        typescript: require('typescript')
      })
    ]
  };
}
