module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // module is not defined 오류 해결
  },
  plugins: ['react', '@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    // 추가
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:react/jsx-runtime',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
    createDefaultProgram: true,
  },
  // import 에러 해결하기 위해 추가
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  rules: {
    // "off" or 0 - turn the rule off
    // "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
    // "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
    // "no-var": "off",
    'no-console': 'warn',
    'no-plusplus': 'off',
    'no-shadow': 'off',
    'vars-on-top': 'off',
    'no-underscore-dangle': 'off', // var _foo;
    'comma-dangle': 'off',
    'func-names': 'off', // setTimeout(function () {}, 0);
    'prefer-template': 'off',
    'no-nested-ternary': 'off',
    'max-classes-per-file': 'off',
    'consistent-return': 'off',
    'no-restricted-syntax': ['off', 'ForOfStatement'], // disallow specified syntax(ex. WithStatement)
    'prefer-arrow-callback': 'error', // Require using arrow functions for callbacks
    'require-await': 'error',
    'arrow-parens': ['warn', 'always'], // 화살표 함수 매개변수에 괄호 넣도록 강제시킴
    'no-param-reassign': ['error', { props: false }],
    'no-unused-expressions': [
      'error',
      {
        allowTernary: true, // a || b
        allowShortCircuit: true, // a ? b : 0
        allowTaggedTemplates: true,
      },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ], // prettier의 printWidth 옵션 대신 사용
    // 커스텀 셋팅 추가
    // prop-type validation 끔 (typescript가 컴파일 타임에 잡아주므로)
    'react/prop-types': 'off',
    // import react 강제성 끔 (react ver 17부턴 해줄 필요 없음)
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'warn', // 옵셔널 타입 지정 가능하도록 함
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    // type 은 따로 import 시킴
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
      },
    ],
    // jsx 코드 하단에 스타일 선언하기 위함
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: '@/**/**',
            group: 'parent',
            position: 'before',
          },
        ],
        alphabetize: { order: 'asc' },
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../'],
      },
    ],
    // arrow function으로 컴포넌트 정의하도록 강제
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    'react-hooks/exhaustive-deps': 'warn', // 디펜던시 빠진 것들 모두 추가하도록 함
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // default export 선호 끔
    'import/prefer-default-export': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          // un-ban a type that's banned by default
          '{}': false,
        },
      },
    ],
    // 윈도우에서 delete CR 오류뜨는 것을 막기 위함
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
