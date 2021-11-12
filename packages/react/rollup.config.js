import Ts from 'rollup-plugin-typescript2'

export default {
    input: [
        'src/index.ts', // then will be used to import ALL the components
        'src/atoms/Button/index.ts', // then will be used to import JUST the button
        'src/atoms/Color/index.ts',
        'src/atoms/Margin/index.ts',
        'src/molecules/Select/index.ts',
    ],
    output: {
        dir: 'lib',
        format: 'esm',
        sourcemap: true
    },
    plugins: [Ts()], // Compiles the Typescript
    preserveModules: true,
    external: ['react', '@ds.j/foundation']
}