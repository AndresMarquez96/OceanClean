const express = require("express");
const supertest = require("supertest");
const sinon = require("sinon");
const { expect } = require("chai");

const router = require("../routes/organizaciones");
const query1 = require("../controller/SelectAllOrg");

describe("Organizaciones Router", () => {
  let app;
  let selectAllOrgStub;

  beforeEach(() => {
    app = express();

    selectAllOrgStub = sinon.stub(query1, "selectAllOrg").resolves([
      {
        imageOrg: "https://1000marcas.net/wp-content/uploads/2020/01/logo-Greenpeace-500x281.png",
        nameOrg: "Greenpeace",
        descOrg: "Greenpeace es una organización global sin fines de lucro que trabaja en la protección del medio ambiente y la promoción de soluciones sostenibles. Con presencia en más de 55 países, Greenpeace se dedica a la defensa de los océanos, la protección de la biodiversidad y la lucha contra el cambio climático. A través de campañas y acciones directas, Greenpeace busca generar conciencia y promover un futuro más limpio y saludable para nuestro planeta."
      },
      {
        imageOrg: "https://upload.wikimedia.org/wikipedia/en/b/b9/Friends_of_the_Earth_%28logo%29.svg",
        nameOrg: "Friends of the Earth",
        descOrg: "Friends of the Earth es una organización internacional comprometida con la protección del medio ambiente y la promoción de la sostenibilidad. Trabajamos en la conservación de la biodiversidad, la lucha contra el cambio climático y la promoción de prácticas respetuosas con el planeta. Nuestro objetivo es generar conciencia y promover acciones positivas para preservar nuestro entorno natural."
      }
    ]);

    app.use("/", router);
  });

  afterEach(() => {
    selectAllOrgStub.restore();
  });

  it("Respuesta Correcta", async () => {
    const agent = supertest.agent(app);

    const response = await agent.get("/");
    expect(response.status).to.equal(200);
    expect(response.body.Org).to.deep.equal([
      {
        imageOrg: "https://1000marcas.net/wp-content/uploads/2020/01/logo-Greenpeace-500x281.png",
        nameOrg: "Greenpeace",
        descOrg: "Greenpeace es una organización global sin fines de lucro que trabaja en la protección del medio ambiente y la promoción de soluciones sostenibles. Con presencia en más de 55 países, Greenpeace se dedica a la defensa de los océanos, la protección de la biodiversidad y la lucha contra el cambio climático. A través de campañas y acciones directas, Greenpeace busca generar conciencia y promover un futuro más limpio y saludable para nuestro planeta."
      },
      {
        imageOrg: "https://upload.wikimedia.org/wikipedia/en/b/b9/Friends_of_the_Earth_%28logo%29.svg",
        nameOrg: "Friends of the Earth",
        descOrg: "Friends of the Earth es una organización internacional comprometida con la protección del medio ambiente y la promoción de la sostenibilidad. Trabajamos en la conservación de la biodiversidad, la lucha contra el cambio climático y la promoción de prácticas respetuosas con el planeta. Nuestro objetivo es generar conciencia y promover acciones positivas para preservar nuestro entorno natural."
      }
    ]);

    expect(selectAllOrgStub.calledOnce).to.be.true;
  });

  it("No se pudieron obtener los datos correctamente", async () => {
    const agent = supertest.agent(app);
  
    selectAllOrgStub.rejects(new Error("Error simulado"));
  
    const response = await agent.get("/");
    expect(response.status).to.equal(500);
    expect(response.body).to.deep.equal({ success: false });
  
    expect(selectAllOrgStub.calledOnce).to.be.true;
  });
});
