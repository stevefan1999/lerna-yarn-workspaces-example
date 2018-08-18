module.exports = {
  extends: ['standard'],
  parser: 'babel-eslint',
  rules: {
    'no-global-assign': ['error', { exceptions: ['require'] }],
    'no-conditional-assignment': false,
    'no-duplicate-imports': false,
    'no-empty': false,
    'no-floating-promises': false,
    'no-unused-expression': false,
    'return-undefined': true,
    'space-before-function-paren': [true, 'never'],
    typedef: [
      true,
      'call-signature',
      'property-declaration',
      'parameter',
      'member-variable-declaration'
    ]
  }
}
