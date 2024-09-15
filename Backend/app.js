const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");

const app = express();

// Usa el middleware de cookie-parser
app.use(cookieParser());

// Habilitar solicitudes CORS con credenciales
app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}));

//nos ayuda a analizar el cuerpo de la solicitud POST
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//cargamos el archivo de rutas
app.use("/", require('./routes/indexRoutes'));

app.listen(process.env.PORT||3300,() => {
    console.log("Servidor corriendo en el puerto 3300");
});

module.exports = app;