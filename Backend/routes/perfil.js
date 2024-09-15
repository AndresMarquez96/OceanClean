const express = require("express");
const router = express.Router();
const query1 = require("../controller/selectSesionUser");
const query2 = require("../controller/selectUserCamp");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: true }));

function getAllData(req, res, next) {
  const Session = req.cookies.Orca;
  
  Promise.all([query1.selectSesionUser(Session), query2.selectUserCamp(Session)])
    .then(([user, camp]) => {
      res.status(200).json({ user, camp });
    })
    .catch((error) => {
      console.error("Error en la base de datos:", error);
      res.status(500).json({ success: false, error: "Database error" });
    });
}

router.get("/", getAllData);


module.exports = router;