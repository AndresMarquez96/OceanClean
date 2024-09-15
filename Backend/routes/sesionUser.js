const express = require("express");
const router = express.Router();
const query1 = require("../controller/selectSesionUser");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: true }));

function getAllData(req, res, next) {

  if(!req.cookies.Orca){
    res.cookie("Orca", 0);
  }
  const Session = req.cookies.Orca;
  
  Promise.all([query1.selectSesionUser(Session)])
    .then(([user]) => {
      res.status(200).json({ user});
    })
    .catch((error) => {
      console.error("Error en la base de datos:", error);
      res.status(500).json({ success: false, error: "Database error" });
    });
}

router.get("/", getAllData);

module.exports = router;