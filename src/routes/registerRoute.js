const router = require('express').Router();

const { getAllRegister, insertRegister, updateDataRegister } = require('../controllers/registerController')

const uploadPhoto = require('../middleware/multerProfile')

router.get('/', getAllRegister);

router.post('/', uploadPhoto, insertRegister);

router.patch('/:id', updateDataRegister);

// router.delete('/:id', deleteDataRegister)

module.exports = router;