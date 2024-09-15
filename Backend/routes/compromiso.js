const express = require("express");
const router = express.Router();
const query1 = require("../controller/countUsers");
const query2 = require("../controller/countCamp");
const query3 = require("../controller/countOrg");


function getAllData(req, res, next) {
  Promise.all([query1.countUsers(req), query2.countCamp(req), query3.countOrg(req)])
    .then(([numUser, numCamp, numOrg]) => {
      res.status(200).json({ numUser, numCamp, numOrg});
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false });
    });
}


router.get("/", getAllData);

module.exports = router;