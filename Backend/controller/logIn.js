const { connection } = require("../config.db");

const logIn = (login, pass) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT idUser, userNameUser FROM users WHERE userNameUser = ? AND passUser = ?",
      [login, pass],
      (error, results) => {
        if (error) {
          reject(error);
        } else if (results.length === 0) {
          reject(new Error("Credenciales inválidas"));
        } else {
          resolve(results);
        }
      }
    );
  });
};

module.exports = {
  logIn,
};