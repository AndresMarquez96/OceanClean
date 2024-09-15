const request = require("supertest");
const express = require("express");
const sinon = require("sinon");
const app = express();

const router = require("../routes/crearCampana");
const query1 = require("../controller/insertCamp");

app.use("/", router);

describe("insertCamp Router", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Respuesta correcta", async () => {
    const insertCampStub = sinon.stub(query1, "postCamp").resolves({});
  
    const response = await request(app)
      .post("/")
      .set("Cookie", "Orca=16")
      .send({
        nameCamp:"Testing",
        addressCamp:"Testing",
        provinceCamp:"Testing",
        dateCamp:"11/01/2001",
        hourCamp:"12:45",
        descCamp:"Testing",
        imageCamp:"",
      });
      
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      result: {
        
      }
    });
    expect(insertCampStub.calledOnce).toBe(true);
  
    insertCampStub.restore();
  });
  
  it("No se puede crear correctamente", async () => {
    const insertCampStub = sinon.stub(query1, "postCamp").rejects(new Error("Error de set"));

    const response = await request(app)
      .post("/")
      .set("Cookie", "Orca=16")
      .send({nameCamp:"",
      addressCamp:"",
      provinceCamp:"",
      dateCamp:"",
      hourCamp:"",
      descCamp:"",
      imageCamp:""})

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ success: false });
    expect(insertCampStub.calledOnce).toBe(true);

    insertCampStub.restore();
  });
});
