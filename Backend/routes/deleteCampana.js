const express = require("express");
const router = express.Router();
const query1 = require("../controller/updateCamp");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", (req, res, next) => {
    const {
      idCamp
    } = req.body;
  
    query1.updateCamp(
      idCamp
    )
      .then((result) => {
        res.status(200).json({ success: true, result });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ success: false });
      });
  });
  
  module.exports = router;