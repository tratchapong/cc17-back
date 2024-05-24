const express = require('express')
const authenticate = require('../middlewares/authenticate')
const { getTodoByUser } = require('../controllers/todo-controller')
const router = express.Router()


router.get('/', getTodoByUser)
router.post('/', ()=>{})
router.put('/:id', ()=>{})
router.delete('/:id', ()=>{})
router.get('/all-status', ()=>{})

module.exports = router