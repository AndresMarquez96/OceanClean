const { connection } = require("../config.db");

const countOrg = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT COUNT(*) AS num_org FROM organizations;", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
    countOrg
};