const { connection } = require("../config.db");

const selectAllOrg = (req) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT imageOrg, nameOrg, descOrg FROM organizations;",
  
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
    selectAllOrg,
};