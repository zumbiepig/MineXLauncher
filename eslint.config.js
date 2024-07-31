import eslint from '@eslint/js';
import { createRequire } from 'module';
import ts from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

const require = createRequire(import.meta.url);

export default {
    parser: parser,
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: './tsconfig.json' // Adjust if needed
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        'indent': ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        '@typescript-eslint/explicit-module-boundary-types': 'off' 
    },
    ignorePatterns: ['node_modules/', 'dist/'], 
};
