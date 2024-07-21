const request = require("supertest");
const app = require("../app");

describe("Operaciones CRUD de linsijStream", () => {
  it("debe registrar un nuevo usuario", async () => {
    const res = await request(app).post("/api/users/register").send({
      email: "test3442@example.com",
      password: "Linsi$1234",
      nombre: "Test User",
      genero: "Femenino",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("msg", "Usuario registrado");
  });

  it("debería responder con estado 200 en la ruta de login", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "test3442@example.com",
      password: "Linsi$1234",
    });
    expect(response.statusCode).toBe(200);
  });

  it("error en el login", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "test344@example.com",
      password: "Linsi$12",
    });
    expect(response.statusCode).toBe(500);
  });

  it("pregunta por artista pero hay error ", async () => {
    const response = await request(app).get("/api/users/search").send();
    expect(response.statusCode).toBe(401);
  });

  it("debería buscar un artista pero da error 401 falta token", async () => {
    const response = await request(app)
      .get("/api/users/search?query=Beyoncé")
      .send();
    const status = response.statusCode;
    expect(status).toBe(401);
  });

  it("debería entrar  pero da error 401 falta token", async () => {
    const response = await request(app).get("/api/users/welcome").send();
    const status = response.statusCode;
    expect(status).toBe(401);
  });
});
