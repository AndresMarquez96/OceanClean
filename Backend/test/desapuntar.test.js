const request = require("supertest");
const express = require("express");
const sinon = require("sinon");
const app = express();

const router = require("../routes/desapuntar");
const query1 = require("../controller/delUserInCamp");

app.use("/", router);

describe("delUserInCamp Router", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Borrado correcto", async () => {
    const delUserInCampStub = sinon.stub(query1, "delUserInCamp").resolves({});

    const response = await request(app)
      .post("/")
      .send({ idCamp: 16 })
      .set("Cookie", "Orca=1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, result: {} });
    expect(delUserInCampStub.calledOnce).toBe(true);

    delUserInCampStub.restore();
  });

  it("No se pudo borrar los datos correctamente ", async () => {
    const delUserInCampStub = sinon.stub(query1, "delUserInCamp").rejects(new Error("Error de set"));

    const response = await request(app)
      .post("/")
      .send({ idCamp: 0 })
      .set("Cookie", "Orca=0");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ success: false });
    expect(delUserInCampStub.calledOnce).toBe(true);

    delUserInCampStub.restore();
  });
});
