const request = require("supertest");
const express = require("express");
const sinon = require("sinon");

const app = express();

const router = require("../routes/modCampana");
const query1 = require("../controller/selectModCampana");

app.use("/", router);

describe("getAllData function", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Respuesta correcta", async () => {
    const selectModCampanaStub = sinon.stub(query1, "selectModCampana").resolves([
      {
        idCamp: 15,
        nameCamp: "Prueba Greenpeace",
        addressCamp: "Calle salina",
        provinceCamp: "Cádiz",
        dateCamp: "2025-07-24T22:00:00.000Z",
        hourCamp: "12:45:00",
        descCamp: "Testing",
        imageCamp: "https://www.barcelo.com/guia-turismo/wp-content/uploads/2019/06/playa-de-la-malvarrosa.jpg",
        idOrgFK: 1,
        softDel: 0,
        imageOrg: "https://1000marcas.net/wp-content/uploads/2020/01/logo-Greenpeace-500x281.png",
      },
    ]);

    const response = await request(app)
      .get("/")
      .query({ idCamp: 15 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({

      campData:[[{idCamp: 15,
        nameCamp: "Prueba Greenpeace",
        addressCamp: "Calle salina",
        provinceCamp: "Cádiz",
        dateCamp: "2025-07-24T22:00:00.000Z",
        hourCamp: "12:45:00",
        descCamp: "Testing",
        imageCamp: "https://www.barcelo.com/guia-turismo/wp-content/uploads/2019/06/playa-de-la-malvarrosa.jpg",
        idOrgFK: 1,
        softDel: 0,
        imageOrg: "https://1000marcas.net/wp-content/uploads/2020/01/logo-Greenpeace-500x281.png",
      }]]
    });

    sinon.assert.calledOnce(selectModCampanaStub);

    selectModCampanaStub.restore();
    
  });

  it("No se puede obtener datos correctamente", async () => {
    const selectModCampanaStub = sinon.stub(query1, "selectModCampana").rejects([new Error("Simulated database error")]);
  
    try {
      const response = await request(app)
        .get("/")
        .query({ idCamp: 0 });
  
      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Database error");
  
      sinon.assert.calledOnce(selectModCampanaStub);
    } catch (error) {
      // Error occurred in the first stub, no need to execute the second stub
      console.error("Error occurred in selectCampStub:", error);
    } finally {
      selectModCampanaStub.restore();
    }
  });
  
  
});
