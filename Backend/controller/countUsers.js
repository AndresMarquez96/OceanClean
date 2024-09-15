const { connection } = require("../config.db");

const countUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT COUNT(*) AS num_users FROM users;", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  countUsers
};