const { connection } = require("../config.db");

const countCamp = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT COUNT(*) AS num_camp FROM campaigns WHERE softDel = 0 AND CONCAT(dateCamp, ' ', hourCamp) > NOW();", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
    countCamp
};