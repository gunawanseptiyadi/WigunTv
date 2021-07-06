const response = require("../helpers/response");

const {
  getAllRegisterModel,
  postRegisterModel,
  updateDataRegisterModel,
} = require("../models/registerModel");

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
