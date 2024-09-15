const { connection } = require("../config.db");

const selectModCampana = (idCamp) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM campaigns WHERE idCamp = "+idCamp+";",
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
    selectModCampana
};