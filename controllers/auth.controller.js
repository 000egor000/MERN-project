const User = require('../models/Users')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const registaration = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), message: 'Некоректные данные' })
    }

    const { email, password } = req.body
    const hachPassword = await bcrypt.hash(password, 12)

    const isUsed = await User.findOne({ email })
    if (isUsed) {
      return res.status(300).json({ message: 'Данный email уже создан' })
    }
    const user = new User({ email, password: hachPassword })
    await user.save()
    res.status(201).json({ message: 'Пользователь создан ' })
  } catch (error) {
    console.log(error)
  }
}

const login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), message: 'Некоректные данные' })
    }

    const { email, password } = req.body

    const isUsed = await User.findOne({ email })
    const isMatch = await bcrypt.compare(password, isUsed.password)
    if (!isUsed) {
      return res.status(300).json({ message: 'Данного email нет в базе!' })
    }
    if (!isMatch) {
      return res.status(300).json({ message: 'Пароли не совпадают' })
    }
    const jwtKey = '222222222111111'
    const token = jsonwebtoken.sign({ userId: isUsed._id }, jwtKey, {
      expiresIn: '1h',
    })
    res.json({ token, userId: isUsed._id, email })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  registaration,
  login,
}
