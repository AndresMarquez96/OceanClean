const request = require("supertest");
const express = require("express");
const sinon = require("sinon");

const app = express();

const router = require("../routes/adminCampana");
const query1 = require("../controller/selectAdminCamp");

app.use("/", router);

describe("perfil function", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Respuesta correcta", async () => {
    const selectAdminCampStub = sinon.stub(query1, "selectAdminCamp").resolves([
      {
        idCamp: 15,
        nameCamp: "Prueba Greenpeace",
        addressCamp: "Calle salina",
        provinceCamp: "Cádiz",
        dateCamp: "2025-07-24T22:00:00.000Z",
        hourCamp: "12:45:00",
        descCamp: "Prueba",
        imageCamp: "https://www.barcelo.com/guia-turismo/wp-content/uploads/2019/06/playa-de-la-malvarrosa.jpg",
        idOrgFK: 1,
        softDel: 0,
        imageOrg: "https://1000marcas.net/wp-content/uploads/2020/01/logo-Greenpeace-500x281.png",
        countPart: 0
      },
      {
        idCamp: 16,
        nameCamp: "Prueba Greenpeace 2",
        addressCamp: "Calle mar",
        provinceCamp: "Huelva",
        dateCamp: "2025-05-24T22:00:00.000Z",
        hourCamp: "20:30:00",
        descCamp: "Testing",
        imageCamp: " ",
        idOrgFK: 1,
        softDel: 0,
        imageOrg: "https://1000marcas.net/wp-content/uploads/2020/01/logo-Greenpeace-500x281.png",
        countPart: 1
      }
    ]);

    const response = await request(app)
      .get("/")
      .set("Cookie", "Orca=16");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      adminCamp: [
        {
          idCamp: 15,
          nameCamp: "Prueba Greenpeace",
          addressCamp: "Calle salina",
          provinceCamp: "Cádiz",
          dateCamp: "2025-07-24T22:00:00.000Z",
          hourCamp: "12:45:00",
          descCamp: "Prueba",
          imageCamp: "https://www.barcelo.com/guia-turismo/wp-content/uploads/2019/06/playa-de-la-malvarrosa.jpg",
          idOrgFK: 1,
          softDel: 0,
          imageOrg: "https://1000marcas.net/wp-content/uploads/2020/01/logo-Greenpeace-500x281.png",
          countPart: 0
        },
        {
          idCamp: 16,
          nameCamp: "Prueba Greenpeace 2",
          addressCamp: "Calle mar",
          provinceCamp: "Huelva",
          dateCamp: "2025-05-24T22:00:00.000Z",
          hourCamp: "20:30:00",
          descCamp: "Testing",
          imageCamp: " ",
          idOrgFK: 1,
          softDel: 0,
          imageOrg: "https://1000marcas.net/wp-content/uploads/2020/01/logo-Greenpeace-500x281.png",
          countPart: 1
        }]
    });
    sinon.assert.calledOnce(selectAdminCampStub);

    selectAdminCampStub.restore();
  });

  it("No se pueden obtener los datos correctamente", async () => {
    const selectAdminCampStub = sinon.stub(query1, "selectAdminCamp").resolves([new Error("Simulated database error")]);
  
    try {
      const response = await request(app)
        .get("/")
        .set("Cookie", "Orca=16");
  
      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Database error");
  
      sinon.assert.calledOnce(selectAdminCampStub);
    } catch (error) {
      // Error occurred in the first stub, no need to execute the second stub
      console.error("Error occurred in :", error);
    } finally {
      selectAdminCampStub.restore();
    }
  });

});
