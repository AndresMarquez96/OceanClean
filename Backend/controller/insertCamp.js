const { connection } = require("../config.db");

const postCamp = (nameCamp, addressCamp, provinceCamp, dateCamp, hourCamp, descCamp, imageCamp, Session) => {
  return new Promise((resolve, reject) => {
    // Verificar si el nombre de usuario ya existe en la base de datos
    connection.query(
      "SELECT o.idOrg FROM users u JOIN organizations o ON u.nameUser = o.nameOrg WHERE u.idUser = ?;",
      [Session],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            const idOrg = results[0].idOrg;

            // El nombre de usuario no existe, realizar la inserción en la base de datos
            connection.query(
              "INSERT INTO campaigns (nameCamp, addressCamp, provinceCamp, dateCamp, hourCamp, descCamp, imageCamp, idOrgFK, softDel) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
              [nameCamp, addressCamp, provinceCamp, dateCamp, hourCamp, descCamp, imageCamp, idOrg, 0],
              (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(results);
                }
              }
            );
          } else {
            reject(new Error("No se encontró una organización correspondiente al usuario."));
          }
        }
      }
    );
  });
};

module.exports = {
  postCamp
};