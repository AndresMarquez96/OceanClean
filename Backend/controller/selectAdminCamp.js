const { connection } = require("../config.db");

const selectAdminCamp = (Session) => {
  return new Promise((resolve, reject) => {

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
                "SELECT campaigns.*, organizations.imageOrg, (SELECT COUNT(*) FROM participate WHERE participate.idCampFK = campaigns.idCamp) AS countPart FROM campaigns JOIN organizations ON campaigns.idOrgFK = organizations.idOrg WHERE campaigns.idOrgFK = ? AND campaigns.softDel = 0 ORDER BY campaigns.dateCamp DESC, campaigns.hourCamp ASC;",
                [idOrg],
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
    selectAdminCamp,
};