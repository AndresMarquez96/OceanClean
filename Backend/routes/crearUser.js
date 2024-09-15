const express = require("express");
const router = express.Router();
const insertUser = require("../controller/insertUser");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", (req, res, next) => {
  const {
    userNameUser,
    passUser,
    photoUser,
    nameUser,
    surnameUser,
    secondSurnameUser,
    birthDateUser,
    emailUser,
    phoneUser,
    addressUser
  } = req.body;

  insertUser.postUser(
    userNameUser,
    passUser,
    birthDateUser,
    nameUser,
    surnameUser,
    secondSurnameUser,
    emailUser,
    phoneUser,
    addressUser,
    photoUser
  )
  .then((result) => {
    res.status(200).json({ success: true, result });
  })
  .catch((error) => {
    let errorType;
    if (error === "equal") {
      errorType = "equal";
    } else if (error === "nameOrg") {
      errorType = "nameOrg";
    } else{
      errorType = error;
    }
    console.error("Error en la base de datos:", error);
    res.status(500).json({ success: false });
  });
});

module.exports = router;