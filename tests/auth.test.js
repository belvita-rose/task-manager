const request = require('supertest');
const app = require('../server');

let server; // Déclare une variable pour le serveur

beforeAll((done) => {
  server = app.listen(5001, () => done()); // Démarre le serveur avant les tests
});

afterAll((done) => {
  server.close(() => done()); // Ferme le serveur après les tests
});

describe("POST /auth/register", () => {
  it("should return a 400 if email or password is invalid", async () => {
    const res = await request(server)
      .post('/auth/register')
      .send({ email: "", password: "short" });
    expect(res.status).toBe(400);
  });

  it("should register a new user", async () => {
    const res = await request(server)
      .post('/auth/register')
      .send({ email: "user@example.com", password: "password123" });
    expect(res.status).toBe(201);
  });
});
