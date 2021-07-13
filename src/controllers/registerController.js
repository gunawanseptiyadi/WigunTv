const response = require("../helpers/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  getUserByIdModel,
  getAllRegisterModel,
  postRegisterModel,
  updateDataRegisterModel,
} = require("../models/registerModel");

const { registerUsersModel } = require("../models/loginModel");

module.exports = {
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      // console.log(id)
      const result = await getUserByIdModel(id);
      // const fullName = result.first_name +" "+ result.last_name
      // const newResult = {
      //   fullName,
      //   ...result 
      // }

      return response.response(
        res,
        200,
        `Success get register id data = ${id}`,
        newResult
      );
    } catch (error) {
      console.log(error);
      return response.response(res, 400, "Bad Request");
    }
  },

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
      if (req.body.gender == "Male" || req.body.gender == "Female") {
        const result = await postRegisterModel(req.body, req.file.filename);
        const { username, password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const encryptPassword = bcrypt.hashSync(password, salt);
        console.log(result[0].id_reg);
        const setData = {
          username,
          password: encryptPassword,
          id_reg: result[0].id_reg,
        };
        await registerUsersModel(setData);
        return response.response(
          res,
          200,
          "Success post register data",
          result
        );
      } else {
        return response.response(res, 400, "Gender is undefined");
      }
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
