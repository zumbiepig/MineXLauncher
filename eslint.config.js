import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
	rules: {
		'@typescript-eslint/ban-ts-comment': [
			'error',
			{
				'ts-expect-error': false,
				'ts-nocheck': false,
				'ts-check': true,
			},
		],
	},
});
