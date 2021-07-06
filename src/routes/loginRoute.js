const router = require('express').Router();

const { getAllLogin, insertLogin, updateDataLogin, loginUsers  } = require('../controllers/loginController')

router.get('/', getAllLogin);

router.post('/', loginUsers);

router.patch('/:id', updateDataLogin);

module.exports = router;