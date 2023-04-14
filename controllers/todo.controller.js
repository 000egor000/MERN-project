const Todo = require('../models/Todo')

const add = async (req, res) => {
  try {
    const { text, userId } = req.body

    const todo = new Todo({
      owner: userId,
      text: text,
      status: false,
      important: false,
    })
    await todo.save()
    res.status(201).json(todo)
  } catch (error) {
    console.log(error)
  }
}

const get = async (req, res) => {
  const { userId } = req.body

  try {
    const todo = await Todo.find({
      owner: userId,
    })

    res.status(201).json(todo)
  } catch (error) {
    console.log(error)
  }
}

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
    })

    res.status(201).json(todo)
  } catch (error) {
    console.log(error)
  }
}
const completed = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
    })
    todo.status = !todo.status
    todo.save()
    res.status(201).json(todo)
  } catch (error) {
    console.log(error)
  }
}
const important = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
    })
    todo.important = !todo.important
    todo.save()
    res.status(201).json(todo)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  get,
  add,
  deleteTodo,
  completed,
  important,
}
