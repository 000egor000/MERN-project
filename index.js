const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.route.js'))
app.use('/api/todo', require('./routes/todo.route.js'))
async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://admin:admin@cluster0.go9srqq.mongodb.net/?retryWrites=true&w=majority'
    )
    app.listen(PORT, () => console.log(`Cервер работает на порту ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}
start()
