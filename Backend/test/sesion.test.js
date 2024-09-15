const express = require("express");
const supertest = require("supertest");
const sinon = require("sinon");
const { expect } = require("chai");

const router = require("../routes/sesionUser");
const query1 = require("../controller/selectSesionUser");

describe("sesion route", () => {
  let app;
  let selectSesionUserStub;

  beforeEach(() => {
    app = express();

    // Creamos un stub para cada función de consulta
    selectSesionUserStub = sinon.stub(query1, "selectSesionUser").resolves([
      {
        idUser: 1,
        userNameUser: "TESTING",
        passUser: "MTIzNDU2Nzg=",
        birthDateUser: "1996-02-16T23:00:00.000Z",
        nameUser: "Andrés",
        surnameUser: "Márquez",
        secondSurnameUser: "Rubio",
        emailUser: "andres@gmail.com",
        phoneUser: 123456789,
        addressUser: "Calle Mar, n7, 3A",
        photoUser: "2",
        roleUser: 1
    },
    ]);

    app.use("/", router);
  });

  afterEach(() => {
    // Restablecemos los stubs después de cada prueba
    sinon.restore();
  });

  it("Respuesta correcta", async () => {
    const response = await supertest(app).get("/");
    expect(response.status).to.equal(200);

    // Verificamos que se hayan llamado las funciones de consulta
    expect(selectSesionUserStub.calledOnce).to.be.true;

    // Verificamos los datos de respuesta
    expect(response.body).to.deep.equal({
      user: [{
        idUser: 1,
        userNameUser: "TESTING",
        passUser: "MTIzNDU2Nzg=",
        birthDateUser: "1996-02-16T23:00:00.000Z",
        nameUser: "Andrés",
        surnameUser: "Márquez",
        secondSurnameUser: "Rubio",
        emailUser: "andres@gmail.com",
        phoneUser: 123456789,
        addressUser: "Calle Mar, n7, 3A",
        photoUser: "2",
        roleUser: 1
    }]});
  });

  it("No se pueden obtener los datos correctamente", async () => {
    // Hacemos que una de las funciones de consulta devuelva un error
    selectSesionUserStub.rejects(new Error("Error de consulta"));
  
    const response = await supertest(app).get("/");
    expect(response.status).to.equal(500);
  
    // Verificamos que se hayan llamado las funciones de consulta
    expect(selectSesionUserStub.calledOnce).to.be.true;
  
    // Verificamos los datos de respuesta
    expect(response.body.success).to.be.false;
  });
  
});
