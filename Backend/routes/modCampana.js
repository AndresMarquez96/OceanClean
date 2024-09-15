const express = require("express");
const router = express.Router();
const query1 = require("../controller/selectModCampana");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: true }));

function getAllData(req, res, next) {

  const idCamp = req.query.idCamp; 

  Promise.all([query1.selectModCampana(idCamp)])
    .then(([camp]) => {
      const campData = [camp];
      res.status(200).json({ campData });
    })
    .catch((error) => {
      console.error("Error en la base de datos:", error);
      res.status(500).json({ success: false, error: "Database error" });
    });
}

router.get("/", getAllData);

module.exports = router;