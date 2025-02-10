const validateEmail = require('../utils/validateEmail');

test('valider un email valide', () => {
  expect(validateEmail('user@example.com')).toBe(true);
});

test('valider un email invalide', () => {
  expect(validateEmail('userexample.com')).toBe(false);
});
