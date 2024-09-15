const express = require("express");
const router = express.Router();
const updateCamp = require("../controller/fullUpdateCamp");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: true }));


router.post("/", (req, res, next) => {
    const {
        idCamp, nameCamp, addressCamp, provinceCamp, dateCamp, hourCamp, descCamp, imageCamp
    } = req.body;
  
    const Session = req.cookies.Orca;

      updateCamp.fullUpdateCamp(
        idCamp, nameCamp, addressCamp, provinceCamp, dateCamp, hourCamp, descCamp, imageCamp, Session
      )
        .then((result) => {
          res.status(200).json({ success: true, result });
        })
        .catch((error) => {
          console.error("Error en la base de datos:", error);
          res.status(500).json({ success: false});
        });
    });
    
    module.exports = router;