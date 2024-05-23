const express = require('express')
const router = express.Router()

router.get('/', (req,res,next)=> {
	console.log('in todoRoute get /')
	console.log(req.user)
	res.json('Get Todos')
})
router.post('/', ()=>{})
router.put('/:id', ()=>{})
router.delete('/:id', ()=>{})
router.get('/all-status', ()=>{})

module.exports = router