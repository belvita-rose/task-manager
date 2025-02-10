const { Given, When, Then } = require('@cucumber/cucumber');
const request = require('supertest');
const app = require('../server');

Given('the user provides a valid email and password', async function () {
  this.email = 'user@example.com';
  this.password = 'password123';
});

When('the user submits the registration form', async function () {
  this.response = await request(app).post('/auth/register').send({
    email: this.email,
    password: this.password
  });
});

Then('the user should be registered successfully', function () {
  expect(this.response.status).toBe(201);
});
