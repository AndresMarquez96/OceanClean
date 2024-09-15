const express = require("express");
const router = express.Router();
const { logIn } = require("../controller/logIn");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", async (req, res, next) => {
  const { login, password } = req.body;

  try {
    const result = await logIn(login, password);

    if (result.length > 0) {
      // Inicio de sesión exitoso
      const userId = result[0].idUser;

      res.cookie("Orca", userId); // Cambiar el valor de la cookie

      res.status(200).json({ success: true, userId });
    } else {
      // Credenciales inválidas
      const errorType = "Login";
      res.json({  });
    }
  } catch (error) {
    const errorType = "Login";
    res.status(500).json({
      success: false
    });
    
  }
});

module.exports = router;