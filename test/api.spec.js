const supertest = require("supertest");
const app = require("../app.js");
const truncate = require("../utils/truncate");

truncate.user()

const user = {
  name: "sabrina",
  email: "sabrina@mail.com",
  password: "password123",
  token: ''
};

describe("Test /auth/register endpoint", () => {
  // postiive
  test("Register berhasil: email belum terdaftar", async () => {
    try {
      const res = await supertest(app).post("/auth/register").send(user);

      console.log(res.body);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("name");
      expect(res.body.data).toHaveProperty("email");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("user created!");
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  // negative
  test("Register gagal: email sudah terdaftar", async () => {
    try {
      const res = await supertest(app).post("/auth/register").send({
        name: "sabrina",
        email: "sabrina@mail.com",
        password: "password123",
      });

      expect(res.body).toHaveProperty("status");
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("email already used!");
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error"); // test gagal karena err != 'error'
    }
  });
});

// login
describe("TEST /auth/login endpoint", () => {
  // positive
  test("Login berhasil: email dan password valid", async () => {
    try {
      const res = await supertest(app).post("/auth/login").send(user);
      console.log(res.body);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("token");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("login success!");

      user.token = res.body.data.token;
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  // negative
  test("Login gagal: email dan password valid", async () => {
    try {
      const res = await supertest(app)
        .post("/auth/login")
        .send({
          email: user.email,
          password: `${user.password}4`,
        });
      console.log(res.body);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("credential is not valid!");
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// whoami
describe("TEST /auth/whoami endpoint", () => {
  test("Fetch user berhasil: token di provide", async () => {
    try {
      const res = await supertest(app)
        .get("/auth/whoami")
        .set({ Authorization: user.token });
        
      console.log("USER TOKEN YANG DITERIMA : ", user.token);
      console.log(res.body);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("name");
      expect(res.body.data).toHaveProperty("email");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("fetch user success!");
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  test("Fetch user gagal: token salah", async () => {
    try {
      const res = await supertest(app).get("/auth/whoami");

      console.log(res.body);

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("you're not authorized!");
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});
