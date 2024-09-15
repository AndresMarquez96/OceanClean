const request = require("supertest");
const express = require("express");
const app = express();

const router = require("../routes/cerrarSesion");
app.use("/", router);

describe("route cerrarsesion", () => {
  
  it("Respuesta correcta", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
    expect(response.header["set-cookie"]).toEqual([
      "Orca=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT","Orca=0; Path=/"
    ]);
  });

  
});