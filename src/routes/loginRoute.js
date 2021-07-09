const router = require('express').Router();

const { authorization } = require('../middleware/auth');

const { getAllLogin, updateDataLogin, loginUsers  } = require('../controllers/loginController')

router.get('/', getAllLogin);

router.post('/', loginUsers);

router.patch('/:id', authorization, updateDataLogin);

module.exports = router;