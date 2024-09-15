const request = require("supertest");
const express = require("express");
const sinon = require("sinon");
const app = express();

const router = require("../routes/apuntar");
const query1 = require("../controller/setUserInCamp");

app.use("/", router);

describe("UserInCamp Router", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Respuesta correcta", async () => {
    const setUserInCampStub = sinon.stub(query1, "setUserInCamp").resolves({});

    const response = await request(app)
      .post("/")
      .send({ idCamp: 15 })
      .set("Cookie", "Orca=1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, result: {} });
    expect(setUserInCampStub.calledOnce).toBe(true);

    setUserInCampStub.restore();
  });

  it("No se puedo hacer el create correctamente", async () => {
    const setUserInCampStub = sinon.stub(query1, "setUserInCamp").rejects(new Error("Error de set"));

    const response = await request(app)
      .post("/")
      .send({ idCamp: 0 })
      .set("Cookie", "Orca=0");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ success: false });
    expect(setUserInCampStub.calledOnce).toBe(true);

    setUserInCampStub.restore();
  });
});
