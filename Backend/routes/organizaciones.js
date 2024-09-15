const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const query1 = require("../controller/SelectAllOrg");

router.use(bodyParser.urlencoded({ extended: true }));

async function getAllData(req, res, next) {
  try {
    const [Org] = await Promise.all([query1.selectAllOrg(req)]);
    res.status(200).json({ Org });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}

router.get("/", getAllData);

module.exports = router;
