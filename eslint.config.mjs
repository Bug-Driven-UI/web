import { eslint } from '@siberiacancode/eslint';

export default eslint(
  {
    typescript: true,
    react: true,
    next: true,
    ignores: ['generated/**', '**/*.yaml']
  },
  {
    name: 'bdui/rewrites',
    rules: {
      'ts/ban-ts-comment': 'off'
    }
  }
);
