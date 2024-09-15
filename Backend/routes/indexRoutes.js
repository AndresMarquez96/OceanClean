const express = require("express");
const router = express.Router();

// Importamos cada ruta y las asociamos a su ruta correspondiente
const inicio = require("./inicio");
const campanas = require("./campanas");
const apuntar = require("./apuntar");
const compromiso = require("./compromiso");
const organizaciones = require("./organizaciones");
const InicSesion = require("./inicioSesion");
const desapuntar = require("./desapuntar");
const perfil = require("./perfil");
const crear = require("./crearUser");
const modificar = require("./modificarUser");
const sesion = require("./sesionUser");
const cerrarSesion = require("./cerrarSesion");
const crearCampana = require("./crearCampana");
const adminCampana = require("./adminCampana");
const deleteCampana = require("./deleteCampana");
const modCampana = require("./modCampana");
const updateCampana = require("./updateCampana");

// Asociamos cada ruta a su URL correspondiente
router.use("/inicio", inicio);
router.use("/campanas", campanas);
router.use("/apuntar", apuntar);
router.use("/compromiso", compromiso);
router.use("/organizaciones", organizaciones);
router.use("/inicioSesion", InicSesion);
router.use("/desapuntar", desapuntar);
router.use("/perfil", perfil);
router.use("/crear", crear);
router.use("/modificar", modificar);
router.use("/sesion", sesion);
router.use("/cerrarSesion", cerrarSesion);
router.use("/adminCampana", adminCampana);
router.use("/crearCampana", crearCampana);
router.use("/deleteCampana", deleteCampana);
router.use("/modCampana", modCampana);
router.use("/updateCampana", updateCampana);


module.exports = router;