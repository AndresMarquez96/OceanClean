const request = require("supertest");
const express = require("express");
const sinon = require("sinon");
const app = express();

const router = require("../routes/deleteCampana");
const query1 = require("../controller/updateCamp");

app.use("/", router);

describe("UserInCamp Router", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Respuesta correcta", async () => {
    const deleteCampanaStub = sinon.stub(query1, "updateCamp").resolves({});

    const response = await request(app)
      .post("/")
      .send({ idCamp: 16 })

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, result: {} });
    expect(deleteCampanaStub.calledOnce).toBe(true);

    deleteCampanaStub.restore();
  });

  it("No se puede modificar correctamente", async () => {
    const deleteCampanaStub = sinon.stub(query1, "updateCamp").rejects(new Error("Error de set"));

    const response = await request(app)
      .post("/")
      .send({ idCamp: 0 })

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ success: false });
    expect(deleteCampanaStub.calledOnce).toBe(true);

    deleteCampanaStub.restore();
  });
});
