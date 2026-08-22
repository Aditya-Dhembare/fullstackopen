import stylistic from '@stylistic/eslint-plugin'

export default [
  {
    files: ['**/*.js'],
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@stylistic/linebreak-style': ['error', 'unix']
    }
  }
]