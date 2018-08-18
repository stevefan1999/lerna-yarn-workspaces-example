module.exports = {
  extends: ['standard'],
  parser: 'babel-eslint',
  rules: {
    'no-global-assign': ['error', { exceptions: ['require'] }]
  }
}
