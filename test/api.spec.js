const request = require("supertest");
const app = require("../app.js");

describe("base.index function", () => {
  // positive
  test('res.json called { status: true, message: "Hello world!"', async () => {
    try {
      const res = await request(app).get("/");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("hello world!");
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });
});

describe("base.sum function", () => {
  // positive
  test('res.json called { status: true, message: "success", data: {x: x, y: y, result: x+y}', async () => {
    try {
      const x = 10;
      const y = 15;
      const result = x + y;

      const res = await request(app).post("/sum").send({ x, y });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("success");
      expect(res.body.data).toStrictEqual({ x, y, result });
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });

  /*
    Positive case:
    - Login email dan password benar -> expect berhasil
    
    Negative case:
    - kalau email salah -> expect error
    - kalau password salah -> expect error
    */
});

