const { connection } = require("../config.db");

const selectUserCamp = (sesion) => {
  return new Promise((resolve, reject) => {
    connection.query(

      "SELECT campaigns.*, organizations.imageOrg FROM campaigns JOIN organizations ON campaigns.idOrgFK = organizations.idOrg JOIN participate ON participate.idCampFK = campaigns.idCamp WHERE participate.idUserFK = "+sesion+" AND campaigns.softDel = 0 ORDER BY campaigns.dateCamp ASC, campaigns.hourCamp ASC;",
      [sesion],
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
  selectUserCamp
};