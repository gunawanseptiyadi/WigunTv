const router = require("express").Router();

const register = require('./routes/registerRoute')

const login = require('./routes/loginRoute')

router.use('/register', register)

router.use('/auth', login)

module.exports = router;