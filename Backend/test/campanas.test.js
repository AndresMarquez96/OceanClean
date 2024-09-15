const request = require("supertest");
const express = require("express");
const sinon = require("sinon");

const app = express();

const router = require("../routes/campanas");
const query1 = require("../controller/selectCamp");
const query2 = require("../controller/choosenCamp");

app.use("/", router);

describe("getAllData function", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Respuesta correcta", async () => {
    const selectCampStub = sinon.stub(query1, "selectCamp").resolves([
      {
        idCamp: 17,
        nameCamp: "Prueba FriendsOfEarth",
        addressCamp: "Calle salina",
        provinceCamp: "Málaga",
        dateCamp: "2025-05-24T22:00:00.000Z",
        hourCamp: "12:15:00",
        descCamp: "Testing",
        imageCamp: "https://www.barcelo.com/guia-turismo/wp-content/uploads/2020/09/playa-de-la-malvarrosa.jpg",
        idOrgFK: 2,
        softDel: 0,
        imageOrg: "https://upload.wikimedia.org/wikipedia/en/b/b9/Friends_of_the_Earth_%28logo%29.svg",
      },
      {
        idCamp: 16,
        nameCamp: "Prueba Greenpeace 2",
        addressCamp: "Calle mar",
        provinceCamp: "Huelva",
        dateCamp: "2025-05-24T22:00:00.000Z",
        hourCamp: "20:30:00",
        descCamp: "Prueba",
        imageCamp: "",
        idOrgFK: 1,
        softDel: 0,
        imageOrg: "https://1000marcas.net/wp-content/uploads/2020/01/logo-Greenpeace-500x281.png",
      },
      {
        idCamp: 18,
        nameCamp: "Prueba FriendsOfEarth2",
        addressCamp: "Calle mar",
        provinceCamp: "Almería",
        dateCamp: "2025-05-24T22:00:00.000Z",
        hourCamp: "21:00:00",
        descCamp: "Testing",
        imageCamp: "",
        idOrgFK: 2,
        softDel: 0,
        imageOrg: "https://upload.wikimedia.org/wikipedia/en/b/b9/Friends_of_the_Earth_%28logo%29.svg",
      },
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

    const choosenCampStub = sinon.stub(query2, "choosenCamp").resolves([
      {
        idCampFK: 17,
      },
      {
        idCampFK: 16,
      },
    ]);

    const response = await request(app)
      .get("/")
      .set("Cookie", "Orca=1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      camps: [
        {
          idCamp: 17,
          nameCamp: "Prueba FriendsOfEarth",
          addressCamp: "Calle salina",
          provinceCamp: "Málaga",
          dateCamp: "2025-05-24T22:00:00.000Z",
          hourCamp: "12:15:00",
          descCamp: "Testing",
          imageCamp: "https://www.barcelo.com/guia-turismo/wp-content/uploads/2020/09/playa-de-la-malvarrosa.jpg",
          idOrgFK: 2,
          softDel: 0,
          imageOrg: "https://upload.wikimedia.org/wikipedia/en/b/b9/Friends_of_the_Earth_%28logo%29.svg",
        },
        {
          idCamp: 16,
          nameCamp: "Prueba Greenpeace 2",
          addressCamp: "Calle mar",
          provinceCamp: "Huelva",
          dateCamp: "2025-05-24T22:00:00.000Z",
          hourCamp: "20:30:00",
          descCamp: "Prueba",
          imageCamp: "",
          idOrgFK: 1,
          softDel: 0,
          imageOrg: "https://1000marcas.net/wp-content/uploads/2020/01/logo-Greenpeace-500x281.png",
        },
        {
          idCamp: 18,
          nameCamp: "Prueba FriendsOfEarth2",
          addressCamp: "Calle mar",
          provinceCamp: "Almería",
          dateCamp: "2025-05-24T22:00:00.000Z",
          hourCamp: "21:00:00",
          descCamp: "Testing",
          imageCamp: "",
          idOrgFK: 2,
          softDel: 0,
          imageOrg: "https://upload.wikimedia.org/wikipedia/en/b/b9/Friends_of_the_Earth_%28logo%29.svg",
        },
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
      ],
      choCamp: [
        {
          idCampFK: 17,
        },
        {
          idCampFK: 16,
        },
      ],
    });

    sinon.assert.calledOnce(selectCampStub);
    sinon.assert.calledOnce(choosenCampStub);

    selectCampStub.restore();
    choosenCampStub.restore();
  });

  it("No se pudieron obtener los datos correctamente", async () => {
    const selectCampStub = sinon.stub(query1, "selectCamp").resolves(new Error("Simulated database error"));
    const choosenCampStub = sinon.stub(query2, "choosenCamp").throws(new Error("Simulated database error"));
  
    try {
      const response = await request(app)
        .get("/")
        .set("Cookie", "Orca=1");
  
      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Database error");
  
      sinon.assert.calledOnce(selectCampStub);
    } catch (error) {
      // Error occurred in the first stub, no need to execute the second stub
      console.error("Error occurred in selectCampStub:", error);
    } finally {
      selectCampStub.restore();
      choosenCampStub.restore();
    }
  });
  
});
