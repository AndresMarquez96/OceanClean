const express = require("express");
const router = express.Router();
const query1 = require("../controller/selectCamp");
const query2 = require("../controller/choosenCamp");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: true }));

async function getAllData(req, res, next) {
  try {
    const Orca = req.cookies.Orca;
    const [camps, choCamp] = await Promise.all([query1.selectCamp(req), query2.choosenCamp(Orca)]);
    res.status(200).json({ camps, choCamp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Database error" });
  }
}

// Aplicar el middleware de sesión antes de la función principal
router.get("/", getAllData);

module.exports = router;
