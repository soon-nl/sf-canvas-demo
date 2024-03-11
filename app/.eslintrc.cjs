module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'airbnb',
		'airbnb/hooks',
		'airbnb-typescript',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
		'plugin:sonarjs/recommended',
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json'],
		tsconfigRootDir: __dirname,
	},
	plugins: ['@typescript-eslint', 'react', 'sonarjs'],
	rules: {
		'react/react-in-jsx-scope': 0,
		// Configure prettier
		'prettier/prettier': [
			'error',
			{
				printWidth: 80,
				endOfLine: 'lf',
				singleQuote: true,
				tabWidth: 2,
				indentStyle: 'space',
				useTabs: true,
				trailingComma: 'es5',
			},
		],
	},
	ignorePatterns: ['vite.config.ts'],
};
