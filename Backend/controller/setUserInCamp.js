const { connection } = require("../config.db");

const setUserInCamp = (Session, idCamp) => {
    return new Promise((resolve, reject) => {
    
    const insertQuery = 'INSERT INTO participate (idUserFK, idCampFK) VALUES (?, ?)';
    var insertParams = [Session, idCamp];

    const insertPromise = new Promise((resolve, reject) => {
        connection.query(insertQuery, insertParams, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });

    resolve(insertPromise);
});
};

module.exports = {
    setUserInCamp
};