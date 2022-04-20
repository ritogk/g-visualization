module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      "plugin:vue/vue3-recommended",
      "eslint:recommended",
      "prettier",
    ],
    rules: {
        // ESLintが使用する整形ルールのうち、自分がoffにしたいルールなどを指定する
      'vue/no-v-html': 'off', // v-htmlの使用について
      'vue/prop-name-casing': 'off', // Propsの変数の命名規則について
      'no-console': 'off', // console.log()の使用について
      'no-unused-vars': 'off', // 使われていない変数について
      'camelcase': 'off', // camelcaseについて
  
      // この先はPrettierのルール
      "prettier/prettier": [ 
        "error",
        {
          printWidth: 120,
          tabWidth: 2,
          useTabs: false,
          singleQuote: true,
          trailingComma: 'all',
          bracketSpacing: true,
          arrowParens: 'avoid',
          semi: false,
        },
      ]
    },
};