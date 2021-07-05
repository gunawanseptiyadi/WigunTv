const response = require('../helpers/response')

const { getAllLoginModel, postLoginModel, updateDataLoginModel } = require('../models/loginModel')

module.exports = {
    getAllLogin: async (req, res) => {
            try {
                const result = await getAllLoginModel()
                return response.response(res, 200, 'Success get all login data', result);
            } catch (error) {
                return response.response(res, 400, "Bad Request")
            }
    },
    insertLogin: async (req, res) => {
        try {
            // console.log();
            const result = await postLoginModel(req.body);
            return response.response(res, 200, 'Success post login data', result);
        } catch (error) {
            return response.response(res, 400, "Bad Request")
        }
    },
    updateDataLogin: async (req, res) => {
        try {
            // console.log();
            const result = await updateDataLoginModel(req.body, req.params.id);
            return response.response(res, 200, `Success update login data with id : ${req.params.id}`, result);
        } catch (error) {
            return response.response(res, 400, "Bad Request")
        }
    },
};