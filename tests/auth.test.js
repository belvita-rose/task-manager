const request = require('supertest');
const app = require('../server');

describe("POST /auth/register", () => {
  it("should return a 400 if email or password is invalid", async () => {
    const res = await request(app).post('/auth/register').send({ email: "", password: "short" });
    expect(res.status).toBe(400);
  });

  it("should register a new user", async () => {
    const res = await request(app).post('/auth/register').send({ email: "user@example.com", password: "password123" });
    expect(res.status).toBe(201);
  });
});
