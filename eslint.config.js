import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const APPLICATION_FILES = ['resources/js/**/*.{ts,tsx}', 'vite.config.ts'];

const forApplication = (config) => ({
    ...config,
    files: APPLICATION_FILES,
});

export default tseslint.config(
    {
        ignores: [
            'bootstrap/ssr/**',
            'node_modules/**',
            'public/**',
            'resources/js/actions/**',
            'resources/js/routes/**',
            'resources/js/wayfinder/**',
            'storage/**',
            'vendor/**',
        ],
    },
    {
        ...eslint.configs.recommended,
        files: ['*.{js,mjs,cjs}'],
        languageOptions: {
            globals: globals.node,
        },
    },
    ...tseslint.configs.recommendedTypeChecked.map(forApplication),
    ...tseslint.configs.stylisticTypeChecked.map(forApplication),
    forApplication(react.configs.flat.recommended),
    forApplication(react.configs.flat['jsx-runtime']),
    forApplication(reactHooks.configs.flat['recommended-latest']),
    forApplication(jsxA11y.flatConfigs.recommended),
    forApplication(reactRefresh.configs.vite),
    {
        files: APPLICATION_FILES,
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    fixStyle: 'inline-type-imports',
                },
            ],
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            '@typescript-eslint/no-misused-promises': [
                'error',
                {
                    checksVoidReturn: {
                        attributes: false,
                    },
                },
            ],
            'jsx-a11y/no-autofocus': 'off',
            'react-refresh/only-export-components': [
                'error',
                {
                    allowConstantExport: true,
                },
            ],
        },
    },
    {
        files: ['resources/js/**/*.d.ts'],
        rules: {
            '@typescript-eslint/consistent-type-definitions': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
        },
    },
    {
        files: ['resources/js/components/ui/**/*.{ts,tsx}'],
        rules: {
            'react-refresh/only-export-components': 'off',
        },
    },
    prettier,
);
