const express = require("express");
const router = express.Router();
const query1 = require("../controller/selectAdminCamp");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: true }));


function getAllData(req, res, next) {
  // Obtener el valor de la cookie de sesión
  const Orca = req.cookies.Orca;
  
  Promise.all([query1.selectAdminCamp(Orca)])
    .then(([adminCamp]) => {
      res.status(200).json({ adminCamp });
    })
    .catch((error) => {
      console.error("Error en la base de datos:", error);
      res.status(500).json({ success: false, error: "Database error" });
    });
}

// Aplicar el middleware de sesión antes de la función principal
router.get("/", getAllData);

module.exports = router;