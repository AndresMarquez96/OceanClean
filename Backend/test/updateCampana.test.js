const request = require("supertest");
const express = require("express");
const sinon = require("sinon");
const app = express();

const router = require("../routes/updateCampana");
const query1 = require("../controller/fullUpdateCamp");

app.use("/", router);

describe("fullUpdateCamp Router", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Respuesta correcta", async () => {
    const fullUpdateCampStub = sinon.stub(query1, "fullUpdateCamp").resolves({});
  
    const response = await request(app)
      .post("/")
      .set("Cookie", "Orca=15")
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
    expect(fullUpdateCampStub.calledOnce).toBe(true);
  
    fullUpdateCampStub.restore();
  });
  
  it("ENo se puede modificar correctamente", async () => {
    const fullUpdateCampStub = sinon.stub(query1, "fullUpdateCamp").rejects(new Error("Error de set"));

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
    expect(fullUpdateCampStub.calledOnce).toBe(true);

    fullUpdateCampStub.restore();
  });
});
