const response = require("../helpers/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  getAllRegisterModel,
  postRegisterModel,
  updateDataRegisterModel,
} = require("../models/registerModel");

const {
    registerUsersModel
} = require("../models/loginModel");

module.exports = {
  getAllRegister: async (req, res) => {
    try {
      const result = await getAllRegisterModel();
      return response.response(
        res,
        200,
        "Success get all register data",
        result
      );
    } catch (error) {
      return response.response(res, 400, "Bad Request");
    }
  },
  insertRegister: async (req, res) => {
    try {
      console.log(req.file.filename);
      const result = await postRegisterModel(req.body, req.file.filename);
      const { username, password } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const encryptPassword = bcrypt.hashSync(password, salt);
      console.log(result[0].id_reg);
      const setData = {
        username,
        password: encryptPassword,
        id_reg: result[0].id_reg
      };
      await registerUsersModel(setData);
      return response.response(res, 200, "Success post register data", result);
    } catch (error) {
      console.log(error);
      return response.response(res, 400, "Bad Request");
    }
  },
  updateDataRegister: async (req, res) => {
    try {
      // console.log();
      const result = await updateDataRegisterModel(req.body, req.params.id);
      return response.response(
        res,
        200,
        `Success update register data with id : ${req.params.id}`,
        result
      );
    } catch (error) {
      return response.response(res, 400, "Bad Request");
    }
  },
};
