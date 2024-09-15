const { connection } = require("../config.db");

const postUser = (userNameUser, passUser, birthDateUser, nameUser, surNameUser, secondSurnameUser, emailUser, phoneUser, addressUser, photoUser) => {
  return new Promise((resolve, reject) => {
    // Verificar si el nombre de usuario ya existe en la base de datos
    connection.query(
      "SELECT * FROM users WHERE userNameUser = ?",
      [userNameUser],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            // El nombre de usuario ya existe, enviar un error
            reject("equal");
          } else {
            // Verificar si el nombre de usuario coincide con alguna campaña
            connection.query(
              "SELECT * FROM organizations WHERE nameOrg = ?",
              [nameUser],
              (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  if (results.length > 0) {
                    // El nombre de usuario coincide con una campaña, enviar un error
                    reject("nameOrg");
                  } else {
                    // El nombre de usuario no existe, realizar la inserción en la base de datos
                    connection.query(
                      "INSERT INTO users (userNameUser, passUser, birthDateUser, nameUser, surNameUser, secondSurnameUser, emailUser, phoneUser, addressUser, photoUser, roleUser) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                      [userNameUser, passUser, birthDateUser, nameUser, surNameUser, secondSurnameUser, emailUser, phoneUser, addressUser, photoUser, 1],
                      (error, results) => {
                        if (error) {
                          reject(error);
                        } else {
                          resolve(results);
                        }
                      }
                    );
                  }
                }
              }
            );
          }
        }
      }
    );
  });
};

module.exports = {
  postUser
};