const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.clearCookie("Orca");
    res.cookie("Orca", 0);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;