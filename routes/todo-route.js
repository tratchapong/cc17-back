const express = require('express')
const authenticate = require('../middlewares/authenticate')
const router = express.Router()
authenticate

router.get('/', (req,res,next)=> {
	console.log('in todoRoute get /')
	console.log(req.user)
	res.json({msg : `Hello, ${req.user.username}`})
})
router.post('/', ()=>{})
router.put('/:id', ()=>{})
router.delete('/:id', ()=>{})
router.get('/all-status', ()=>{})

module.exports = router