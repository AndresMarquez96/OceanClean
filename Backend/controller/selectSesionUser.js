const { connection } = require("../config.db");

const selectSesionUser = (sesion) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE idUser = "+sesion+";",
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
  selectSesionUser
};