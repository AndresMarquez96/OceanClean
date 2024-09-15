const express = require("express");
const supertest = require("supertest");
const sinon = require("sinon");
const { expect } = require("chai");

const router = require("../routes/compromiso");
const query1 = require("../controller/countUsers");
const query2 = require("../controller/countCamp");
const query3 = require("../controller/countOrg");


describe("compromiso route", () => {
  let app;
  let countUsersStub;
  let countCampStub;
  let countOrgStub;
 

  beforeEach(() => {
    app = express();

    // Creamos un stub para cada función de consulta
    countUsersStub = sinon.stub(query1, "countUsers").resolves([{ num_users: 4 }]);
    countCampStub = sinon.stub(query2, "countCamp").resolves([{ num_camp: 8 }]);
    countOrgStub = sinon.stub(query3, "countOrg").resolves([{ num_org: 2 }]);

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
    expect(countUsersStub.calledOnce).to.be.true;
    expect(countCampStub.calledOnce).to.be.true;
    expect(countOrgStub.calledOnce).to.be.true;

    // Verificamos los datos de respuesta
    expect(response.body.numUser[0].num_users).to.equal(4);
    expect(response.body.numCamp[0].num_camp).to.equal(8);
    expect(response.body.numOrg[0].num_org).to.equal(2);
  });

  it("No se pudieron obtener los datos correctamente", async () => {
    // Hacemos que una de las funciones de consulta devuelva un error
    countUsersStub.rejects(new Error("Error de consulta"));
  
    const response = await supertest(app).get("/");
    expect(response.status).to.equal(500);
  
    // Verificamos que se hayan llamado las funciones de consulta
    expect(countUsersStub.calledOnce).to.be.true;
    expect(countCampStub.calledOnce).to.be.true;
    expect(countOrgStub.calledOnce).to.be.true;
    // Verificamos los datos de respuesta
    expect(response.body.success).to.be.false;
    expect(response.body.error).to.be.undefined;
  });
  
});
