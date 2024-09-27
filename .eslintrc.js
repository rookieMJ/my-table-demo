// module.exports = {
//     "env": {
//         "browser": true,
//         "es6": true
//     },
//     "extends": "airbnb",
//     "globals": {
//         "Atomics": "readonly",
//         "SharedArrayBuffer": "readonly"
//     },
//     "parserOptions": {
//         "ecmaFeatures": {
//             "jsx": true
//         },
//         "ecmaVersion": 2018,
//         "sourceType": "module"
//     },
//     "plugins": [
//         "react"
//     ],
//     "rules": {
//     }
// };

module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'plugin:@typescript-eslint/recommended',
    //   'plugin:prettier/recommended', // 使用 prettier 插件
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    // plugins: ['@typescript-eslint', 'prettier'],
    plugins: ['@typescript-eslint'],
    rules: {
      // 根据需要配置规则
      'no-console': 'warn', // 禁止使用 console.log
      'no-debugger': 'warn', // 禁止使用 debugger
      '@typescript-eslint/no-explicit-any': 'warn', // 禁止使用 any 类型
    },
  };