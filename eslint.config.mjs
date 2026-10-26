import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';

export default defineConfig(
  // 1. Base ESLint recommended rules
  eslint.configs.recommended,

  // 2. TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,

  // 3. React plugin recommended rules
  pluginReact.configs.flat.recommended,

  // 4. React Hooks rules
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
    },
  },

  // 5. Project-specific configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },

  // 6. Ignore patterns
  {
    ignores: ['dist/**', 'build/**', 'node_modules/**'],
  },
);
