const response = require("../helpers/response");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const {
  getAllLoginModel,
  postLoginModel,
  updateDataLoginModel,
  loginUsersModel,
  patchPassModel
} = require("../models/loginModel");

module.exports = {
  loginUsers: async (req, res) => {
    try {
        console.log(req.body)
      const { username, password } = req.body;
      const checkDataUser = await loginUsersModel(username);
      console.log(checkDataUser)
      if (checkDataUser.length > 0) {
        const checkPassword = bcrypt.compareSync(
          password,
          checkDataUser[0].password
        );
        if (checkPassword) {

        //   const { id_log, username, email } = checkDataUser[0];
        //   const payload = {
        //     id_log,
        //     username,
        //     email,
        //   };
        //   const token = jwt.sign(payload, "RAHASIA", { expiresIn: "3h" });
        //   const result = { ...payload, token };

          return response.response(res, 200, "You are Loging in !");
        } else {
          return response.response(res, 400, "Password Incorrect !");
        }
      } else {
        return response.response(res, 400, "username not registered !");
      }
    } catch (error) {
        console.log(error)
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  patchPassword: async (req, res) => {
    try {
      const { id } = req.params;
      const { password } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const encryptPassword = bcrypt.hashSync(password, salt);
      const setPass = {
        password: encryptPassword,
      };
      const checkId = await getUsersByIdModel(id);
      if (checkId.length > 0) {
        const result = await patchPassModel(setPass, id);
        return helper.response(res, 200, "Success Patch User Data", result);
      } else {
        return helper.response(res, 404, `Password By Id : ${id} Not Found`);
      }
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  getAllLogin: async (req, res) => {
    try {
      const result = await getAllLoginModel();
      return response.response(res, 200, "Success get all login data", result);
    } catch (error) {
      return response.response(res, 400, "Bad Request");
    }
  },
  insertLogin: async (req, res) => {
    try {
      // console.log();
      const result = await postLoginModel(req.body);
      return response.response(res, 200, "Success post login data", result);
    } catch (error) {
      return response.response(res, 400, "Bad Request");
    }
  },
  updateDataLogin: async (req, res) => {
    try {
      // console.log();
      const result = await updateDataLoginModel(req.body, req.params.id);
      return response.response(
        res,
        200,
        `Success update login data with id : ${req.params.id}`,
        result
      );
    } catch (error) {
      return response.response(res, 400, "Bad Request");
    }
  },
};
