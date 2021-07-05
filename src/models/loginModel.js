const client = require("../config/postgre");

module.exports = {
    getAllLoginModel: () => {
        return new Promise((resolve, reject) => {
            client.query("SELECT * FROM auth", (error, result) => {
                if(!error) {
                    resolve(result.rows);
                    //kenapa rows karena datanya ada di dalam rows
                } else {
                    reject(new Error(error));
                }
            });
        });
    },
    postLoginModel: (data) => {
        return new Promise((resolve, reject) => {
            client.query("INSERT INTO auth (username, password) VALUES ($1, $2) RETURNING id_log, username, password",
            [data.username, data.password], 
            (error, result) => {
                if(!error) {
                    resolve(result.rows);
                    //kenapa rows karena datanya ada di dalam rows, klo dihilangkan maka ketika di SEND, datanya
                    // tidak kelihatan di hasil dari postman
                } else {
                    reject(new Error(error));
                }
            });
        });
    },
    updateDataLoginModel: (data, id) => {
        return new Promise((resolve, reject) => {
            client.query(
            `UPDATE auth SET username = '${data.username}', password = '${data.password}' WHERE id_log = ${id}
                RETURNING id_log, username, password`, 
            (error, result) => {
                if(!error) {
                    resolve(result.rows);
                    // kenapa rows karena datanya ada di dalam rows, klo dihilangkan maka ketika di SEND, datanya
                    // tidak kelihatan di hasil dari postman
                } else {
                    reject(new Error(error));
                }
            });
        });
    },
};