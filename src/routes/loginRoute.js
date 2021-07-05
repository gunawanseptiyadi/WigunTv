const router = require('express').Router();

const { getAllLogin, insertLogin, updateDataLogin  } = require('../controllers/loginController')

router.get('/', getAllLogin);

router.post('/', insertLogin);

router.patch('/:id', updateDataLogin);

module.exports = router;