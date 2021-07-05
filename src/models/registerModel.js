const client = require("../config/postgre");

module.exports = {
    getAllRegisterModel: () => {
        return new Promise((resolve, reject) => {
            client.query("SELECT * FROM register", (error, result) => {
                if(!error) {
                    resolve(result.rows);
                    //kenapa rows karena datanya ada di dalam rows
                } else {
                    reject(new Error(error));
                }
            });
        });
    },
    postRegisterModel: (data, photo) => {
        return new Promise((resolve, reject) => {
            client.query("INSERT INTO register (first_name, last_name, email, tgl_lahir, gender, photo_profil) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_reg, first_name, last_name, email, tgl_lahir, gender, photo_profil",
            [data.first_name, data.last_name, data.email, data.tgl_lahir, data.gender, photo], 
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
    updateDataRegisterModel: (data, id) => {
        return new Promise((resolve, reject) => {
            client.query(
            `UPDATE register SET first_name = '${data.first_name}', last_name = '${data.last_name}', email = '${data.email}', tgl_lahir = '${data.tgl_lahir}', gender = '${data.gender}' WHERE id_reg = ${id}
                RETURNING id_reg, first_name, last_name, email, tgl_lahir, gender`, 
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