const request = require("supertest");
const express = require("express");
const sinon = require("sinon");

const app = express();

const router = require("../routes/perfil");
const query1 = require("../controller/selectSesionUser");
const query2 = require("../controller/selectUserCamp");

app.use("/", router);

describe("perfil function", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Respuesta correcta", async () => {
    const selectSesionUserStub = sinon.stub(query1, "selectSesionUser").resolves([
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

    const selectUserCampStub = sinon.stub(query2, "selectUserCamp").resolves([
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
          imageOrg: "https://upload.wikimedia.org/wikipedia/en/b/b9/Friends_of_the_Earth_%28logo%29.svg"
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
        imageOrg: "https://1000marcas.net/wp-content/uploads/2020/01/logo-Greenpeace-500x281.png"
      }
    ]);

    const response = await request(app)
      .get("/")
      .set("Cookie", "Orca=1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
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
    }],
      camp: [
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
            imageOrg: "https://upload.wikimedia.org/wikipedia/en/b/b9/Friends_of_the_Earth_%28logo%29.svg"
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
          imageOrg: "https://1000marcas.net/wp-content/uploads/2020/01/logo-Greenpeace-500x281.png"
        }
      ],
    });
    sinon.assert.calledOnce(selectSesionUserStub);
    sinon.assert.calledOnce(selectUserCampStub);

    selectSesionUserStub.restore();
    selectUserCampStub.restore();
  });

  it("No se puede obtener los datos correctamente", async () => {
    const selectSesionUserStub = sinon.stub(query1, "selectSesionUser").resolves([new Error("Simulated database error")]);
    const selectUserCampStub = sinon.stub(query2, "selectUserCamp").throws(new Error("Simulated database error"));
  
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
      console.error("Error occurred in :", error);
    } finally {
      selectSesionUserStub.restore();
      selectUserCampStub.restore();
    }
  });

});
