const router = require('express').Router();

const { getUserById, getAllRegister, insertRegister, updateDataRegister } = require('../controllers/registerController')

const { authorization } = require('../middleware/auth');

const uploadPhoto = require('../middleware/multerProfile')

router.get('/', getAllRegister);

router.post('/', uploadPhoto, insertRegister);

router.patch('/:id', authorization, updateDataRegister);

router.get('/:id', authorization, getUserById);

// router.delete('/:id', deleteDataRegister)

module.exports = router;