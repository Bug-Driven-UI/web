import { eslint } from '@siberiacancode/eslint';

export default eslint({
    typescript: true,
    react: true,
    next: true,
    rules: {
        'react-refresh/only-export-components': 'off',
        'node/prefer-global/process': 'off',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'ts/no-require-imports': 'off',
        'unicorn/prefer-node-protocol': 'off'
    },
    plugins: ['@next/eslint-plugin-next']
});