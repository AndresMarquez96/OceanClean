const { connection } = require("../config.db");

const imgAllOrg = (req) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT imageOrg FROM organizations WHERE imageOrg IS NOT NULL;",
  
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
  imgAllOrg,
};