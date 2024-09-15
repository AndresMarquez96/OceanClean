const request = require("supertest");
const express = require("express");
const sinon = require("sinon");
const app = express();

const router = require("../routes/modificarUser");
const query1 = require("../controller/updateUser");

app.use("/", router);

describe("updateUser Router", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Respuesta correcta", async () => {
    const updateUserStub = sinon.stub(query1, "updateUser").resolves({});

    const response = await request(app)
      .post("/")
      .send({
        userNameUser: "Robot",
        passUser: "123456789",
        birthDateUser: "2011-11-11",
        nameUser: "Robot",
        surnameUser: "Robot",
        secondSurnameUser: "Robot",
        emailUser: "Robot@robot.com",
        phoneUser: 1233456789,
        addressUser: "calle robot",
        photoUser: "1",
        idUser: 1
      })

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, result: {} });
    expect(updateUserStub.calledOnce).toBe(true);

    updateUserStub.restore();
  });

  it("No se modificar correctamente", async () => {
    const updateUserStub = sinon.stub(query1, "updateUser").rejects(new Error("Error de set"));

    const response = await request(app)
      .post("/")
      .send({
      userNameUser: "",
      passUser: "",
      photoUser: "",
      nameUser: "",
      surnameUser: "",
      secondSurnameUser: "",
      birthDateUser: "",
      emailUser: "",
      phoneUser: 0,
      addressUser: "",
      idUser: 0
    })

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ success: false });
    expect(updateUserStub.calledOnce).toBe(true);

    updateUserStub.restore();
  });
});
