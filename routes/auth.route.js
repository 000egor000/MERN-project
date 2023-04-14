const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const { registaration, login } = require('../controllers/auth.controller')

router.post(
  '/registaration',
  [
    check('email', 'Неккоректный email').isEmail(),
    check('password', 'Неккоректный пароль').isLength({ min: 6 }),
  ],
  registaration
)

router.post(
  '/login',
  [
    check('email', 'Неккоректный email').exists(),
    check('password', 'Неккоректный пароль').exists(),
  ],
  login
)
module.exports = router
