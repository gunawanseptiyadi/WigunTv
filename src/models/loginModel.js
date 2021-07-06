const client = require("../config/postgre");

module.exports = {
  registerUsersModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO auth SET ?", setData, (error, result) => {
        if (!error) {
          const newResult = {
            id_log: result.insertId,
            ...setData,
          };
          delete newResult.users_password;
          resolve(newResult);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  loginUsersEmailModel: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT id_log, username, email, password FROM register a inner join auth b on a.id_reg = b.id_reg",
        email,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  patchPassModel: (setPass, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE auth SET ? WHERE id_log = ?",
        [setPass, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              id_log: id,
              ...setPass,
            };
            resolve(newResult);
          } else {
            console.log(error);
            reject(new Error(error));
          }
        }
      );
    });
  },
  getAllLoginModel: () => {
    return new Promise((resolve, reject) => {
      client.query("SELECT * FROM auth", (error, result) => {
        if (!error) {
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
      client.query(
        "INSERT INTO auth (username, password) VALUES ($1, $2) RETURNING id_log, username, password",
        [data.username, data.password],
        (error, result) => {
          if (!error) {
            resolve(result.rows);
            //kenapa rows karena datanya ada di dalam rows, klo dihilangkan maka ketika di SEND, datanya
            // tidak kelihatan di hasil dari postman
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  updateDataLoginModel: (data, id) => {
    return new Promise((resolve, reject) => {
      client.query(
        `UPDATE auth SET username = '${data.username}', password = '${data.password}' WHERE id_log = ${id}
                RETURNING id_log, username, password`,
        (error, result) => {
          if (!error) {
            resolve(result.rows);
            // kenapa rows karena datanya ada di dalam rows, klo dihilangkan maka ketika di SEND, datanya
            // tidak kelihatan di hasil dari postman
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
};
