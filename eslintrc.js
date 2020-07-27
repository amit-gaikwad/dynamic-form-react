const ERROR = 2;
const WARN = 1;
const IGNORE = 0;

module.exports = {
  root: true,
  env: { es6: true, browser: true, jest: true, node: true },
  plugins: ['import', 'babel', 'react', 'prettier'],
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {
    L: true
  },
  rules: {
    strict: IGNORE,
    'no-dupe-keys': ERROR,
    'no-irregular-whitespace': [ERROR, { skipStrings: false }],
    'no-undef': ERROR,
    'no-global-assign': ERROR,
    'babel/semi': [ERROR, 'always'],
    curly: WARN,
    eqeqeq: ERROR,
    'no-console': [ERROR, { allow: ['warn', 'error'] }],
    'babel/new-cap': IGNORE,
    'no-underscore-dangle': ERROR,
    quotes: [
      ERROR,
      'single',
      {
        allowTemplateLiterals: true
      }
    ],
    'no-magic-numbers': [WARN, { ignore: [0, 1, 1024, 2, 16, 8, 12, 4, 10] }],
    'import/imports-first': [ERROR, 'absolute-first'],
    'import/newline-after-import': ERROR,
    'array-callback-return': ERROR,
    'dot-notation': ERROR,
    'no-alert': ERROR,
    'no-eq-null': ERROR,
    'no-empty': ERROR,
    'no-ternary': ERROR,
    'no-multiple-empty-lines': [
      ERROR,
      {
        max: 1
      }
    ],
    'import/no-default-export': ERROR,
    'no-duplicate-imports': ERROR,
    'no-empty-function': ERROR,
    'no-eval': ERROR,
    'no-extend-native': ERROR,
    'no-floating-decimal': ERROR,
    'babel/no-invalid-this': ERROR,
    'no-lone-blocks': ERROR,
    'no-loop-func': ERROR,
    'no-multi-spaces': ERROR,
    'no-multi-str': ERROR,
    'no-native-reassign': ERROR,
    'no-param-reassign': ERROR,
    'no-proto': ERROR,
    'no-redeclare': ERROR,
    'no-script-url': ERROR,
    'no-self-assign': ERROR,
    'no-self-compare': ERROR,
    'no-sequences': ERROR,
    'no-throw-literal': ERROR,
    'no-unused-expressions': WARN,
    'no-void': ERROR,
    yoda: ERROR,
    'no-shadow': ERROR,
    'no-unused-vars': [
      ERROR,
      {
        vars: 'all',
        args: 'after-used'
      }
    ],
    'no-use-before-define': WARN,
    'array-bracket-spacing': [ERROR, 'never'],
    camelcase: [
      IGNORE,
      {
        properties: 'always'
      }
    ],
    'brace-style': ERROR,
    'quote-props': [
      'error',
      'as-needed',
      {
        keywords: false
      }
    ],
    'comma-spacing': [
      ERROR,
      {
        before: false,
        after: true
      }
    ],
    'comma-style': [ERROR, 'last'],
    'eol-last': ERROR,
    'key-spacing': [
      ERROR,
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    'keyword-spacing': [
      ERROR,
      {
        overrides: {
          for: {
            after: true
          }
        }
      }
    ],
    'no-trailing-spaces': ERROR,
    'linebreak-style': [ERROR, 'unix'],
    'new-parens': ERROR,
    'no-confusing-arrow': ERROR,
    'no-const-assign': ERROR,
    'no-dupe-class-members': ERROR,
    'prefer-template': ERROR,
    'no-debugger': ERROR,
    indent: [ERROR, ERROR, { SwitchCase: WARN }],
    semi: [ERROR, 'always'],
    'babel/camelcase': IGNORE,
    'babel/object-curly-spacing': IGNORE,
    'babel/quotes': IGNORE,
    'babel/no-unused-expressions': ERROR,
    'babel/valid-typeof': ERROR,
    'react/jsx-first-prop-new-line': ERROR,
    'react/display-name': IGNORE, // Prevent missing displayName in a React component definition
    //"react/jsx-quotes": [ERROR, "double", "avoid-escape"], // Enforce quote style for JSX attributes
    //'react/jsx-no-undef': ERROR, // Disallow undeclared variables in JSX
    'react/jsx-sort-props': IGNORE, // Enforce props alphabetical sorting
    'react/jsx-uses-react': ERROR, // Prevent React to be incorrectly marked as unused
    'react/jsx-uses-vars': ERROR, // Prevent variables used in JSX to be incorrectly marked as unused
    'react/no-did-mount-set-state': ERROR, // Prevent usage of setState in componentDidMount
    'react/no-did-update-set-state': ERROR, // Prevent usage of setState in componentDidUpdate
    'react/no-multi-comp': IGNORE, // Prevent multiple component definition per file
    'react/no-unknown-property': ERROR, // Prevent usage of unknown DOM property
    'react/prop-types': [ERROR, { ignore: ['children'] }], // Prevent missing props validation in a React component definition
    'react/react-in-jsx-scope': ERROR, // Prevent missing React when using JSX
    'react/self-closing-comp': ERROR, // Prevent extra closing tags for components without children
    //"react/wrap-multilines": ERROR // Prevent missing parentheses around multilines JSX,
    'react/jsx-no-bind': [
      ERROR,
      {
        ignoreDOMComponents: false,
        ignoreRefs: false,
        allowArrowFunctions: true,
        allowFunctions: false,
        allowBind: true
      }
    ],
    //asdfasdfasdfafafsfa new keys,
    'prettier/prettier': ERROR,
    'react/jsx-props-no-spreading': 0,
    'no-mixed-operators': ERROR,
    'no-unsafe-negation': ERROR,
    'no-bitwise': ERROR
  }
};
