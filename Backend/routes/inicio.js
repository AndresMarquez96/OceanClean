const express = require("express");
const router = express.Router();
const query2 = require("../controller/countUsers");
const query3 = require("../controller/countCamp");
const query4 = require("../controller/countOrg");
const query5 = require("../controller/imgAllOrg");

function getAllData(req, res, next) {
  Promise.all([query2.countUsers(req), query3.countCamp(req), query4.countOrg(req), query5.imgAllOrg(req)])
    .then(([numUser, numCamp, numOrg, imgOrg]) => {
      res.status(200).json({ numUser, numCamp, numOrg, imgOrg });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false });
    });
}

router.get("/", getAllData);

module.exports = router;