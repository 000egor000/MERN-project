const { Router } = require('express')
const router = Router()
const {
  add,
  get,
  deleteTodo,
  completed,
  important,
} = require('../controllers/todo.controller')

router.post('/add', add)
router.post('/get', get)
router.delete('/delete/:id', deleteTodo)
router.put('/completed/:id', completed)
router.put('/important/:id', important)

module.exports = router
