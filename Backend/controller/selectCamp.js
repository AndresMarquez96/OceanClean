const { connection } = require("../config.db");

const selectCamp = (req) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT campaigns.*, organizations.imageOrg  FROM campaigns JOIN organizations ON campaigns.idOrgFK = organizations.idOrg WHERE CONCAT(campaigns.dateCamp, ' ', campaigns.hourCamp) > NOW() AND campaigns.softDel = 0 ORDER BY CONCAT(campaigns.dateCamp, ' ', campaigns.hourCamp) ASC;",
      
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

module.exports = {
    selectCamp,
};