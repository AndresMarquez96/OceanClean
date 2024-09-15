const { connection } = require("../config.db");

const delUserInCamp = (Session, idCamp) => {
    return new Promise((resolve, reject) => {

    const deleteQuery = 'DELETE FROM participate WHERE idUserFK = ? AND idCampFK = ?';
    var deleteParams = [Session, idCamp];

    const delPromise = new Promise((resolve, reject) => {
        connection.query(deleteQuery, deleteParams, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });

    resolve(delPromise);
});
};

module.exports = {
    delUserInCamp
};