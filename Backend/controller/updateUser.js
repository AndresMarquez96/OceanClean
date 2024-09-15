const { connection } = require("../config.db");

const updateUser = (userNameUser, passUser, birthDateUser, nameUser, surNameUser, secondSurnameUser, emailUser, phoneUser, addressUser, photoUser, idUser) => {
  return new Promise((resolve, reject) => {
    // Verificar si el nombre de usuario ya existe en la base de datos
    connection.query(
      "SELECT * FROM users WHERE userNameUser = ? AND NOT idUser = ?",
      [userNameUser, idUser],
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
                    // El nombre de usuario no existe, realizar la actualización en la base de datos
                    connection.query(
                      "UPDATE users SET userNameUser = ?, passUser = ?, birthDateUser = ?, nameUser = ?, surnameUser = ?, secondSurnameUser = ?, emailUser = ?, phoneUser = ?, addressUser = ?, photoUser = ? WHERE idUser = ?",
                      [userNameUser, passUser, birthDateUser, nameUser, surNameUser, secondSurnameUser, emailUser, phoneUser, addressUser, photoUser, idUser],
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
  updateUser
};