import love from 'eslint-config-love'
import astro from 'eslint-plugin-astro'

export default [
  ...astro.configs.recommended,
  {
    ...love,
    files: ['**/*.js', '**/*.ts'],
    rules: {
      ...love.rules,
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
    },
  },
]
