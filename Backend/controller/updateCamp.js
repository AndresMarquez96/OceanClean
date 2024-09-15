const { connection } = require("../config.db");

const updateCamp = (idCamp) => {
  return new Promise((resolve, reject) => {
    // Verificar si el nombre de usuario ya existe en la base de datos
    connection.query(
      "UPDATE campaigns SET softDel = 1 WHERE idCamp = ?",
      [idCamp],
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
  updateCamp
};
