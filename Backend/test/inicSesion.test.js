const express = require("express");
const supertest = require("supertest");
const logInController = require("../controller/logIn");
const router = require("../routes/inicioSesion");

jest.mock("../controller/logIn");

describe("Prueba de caja blanca para el enrutador", () => {
  let app;
  let request;

  beforeAll(() => {
    app = express();
    request = supertest(app);

    // Configurar el enrutador en la aplicación Express
    app.use(router);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Respuesta Correcta", async () => {
    const mockUserId = 1;

    // Configurar el mock del controlador logIn
    logInController.logIn.mockResolvedValueOnce([{ idUser: mockUserId }]);

    // Realizar la solicitud POST al enrutador
    const response = await request.post("/").send({ login: "testing", password: "MTIzNDU2Nzg=" });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.userId).toBe(mockUserId);
  });


  it("No se pudieron obtener los datos correctamente", async () => {
  
    // Configurar el mock del controlador logIn para que arroje un error personalizado
    logInController.logIn.mockImplementation(() => {
      throw {
       
        success: false,
      };
    });
  
    // Realizar la solicitud POST al enrutador
    const response = await request.post("/").send({
      login: "usuario",
      password: "contraseña",
    });
  
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      success: false,
    });
  });
});
