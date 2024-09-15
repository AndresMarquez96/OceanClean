const request = require("supertest");
const express = require("express");
const sinon = require("sinon");
const app = express();

const router = require("../routes/crearUser");
const query1 = require("../controller/insertUser");

app.use("/", router);

describe("insertUser Router", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Respuesta correcta", async () => {
    const insertUserStub = sinon.stub(query1, "postUser").resolves({});
  
    const response = await request(app)
      .post("/")
      .send({
        userNameUser: "Robot",
        passUser: "123456789",
        photoUser: "1",
        nameUser: "Robot",
        surnameUser: "Robot",
        secondSurnameUser: "Robot",
        birthDateUser: "11/01/2001",
        emailUser: "Robot@robot.com",
        phoneUser: 1233456789,
        addressUser: "calle robot"
      });
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      result: {
        
      }
    });
    expect(insertUserStub.calledOnce).toBe(true);
  
    insertUserStub.restore();
  });
  
  it("No se puede crear correctamente", async () => {
    const insertUserStub = sinon.stub(query1, "postUser").rejects(new Error("Error de set"));

    const response = await request(app)
      .post("/")
      .send({userNameUser: "",
      passUser: "",
      photoUser: "",
      surnameUser: "",
      secondSurnameUser: "",
      birthDateUser: "",
      emailUser: "",
      phoneUser: 0,
      addressUser: ""})

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ success: false });
    expect(insertUserStub.calledOnce).toBe(true);

    insertUserStub.restore();
  });
});
