module.exports = {
  // extends: 'holium',
  plugins: ['import'],
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'error',
    // Since React 17 and typescript 4.1 you can safely disable the rule
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-unused-prop-types': 'off',
    'no-plusplus': 'off',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    'jsx-a11y/tabindex-no-positive': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'import/no-cycle': 'off',
    'no-console': 'off',
    'react/default-props-match-prop-types': 'off',
    'operator-assignment': 'off',
    'react/static-property-placement': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    'one-var': 'off',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve('./.holium/configs/webpack.config.eslint.ts'),
      },
      typescript: {
        react: require.resolve('./node_modules/@types/react/index.d.ts'),
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
