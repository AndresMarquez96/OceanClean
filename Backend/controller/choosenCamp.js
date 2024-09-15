const { connection } = require("../config.db");

const choosenCamp = (userId) => {

  return new Promise((resolve, reject) => {
    
    connection.query(
      "SELECT idCampFK FROM participate WHERE idUserFK = "+userId+";",
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
    choosenCamp,
};