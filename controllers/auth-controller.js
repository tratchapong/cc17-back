const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../models')
const customError = require('../utils/customError')
const tryCatch = require('../utils/tryCatch')

module.exports.register = tryCatch (async (req,res,next)=>{
	const {username, password, confirmPassword, email} = req.body
		// รับ body {username, password, confirmPassword, email}
		console.log(username)

		// validation
		// if( !username || !password || !confirmPassword) {
		if( !(username && password && confirmPassword)) {
			return next(customError('Fill all Input', 400))
		}
		if(password !== confirmPassword) {
			throw(customError("check confirmPassword", 400))
		}
		const userExist = await prisma.user.findUnique({
			where : { username : username} 
		})

		if(userExist) {
			throw(customError('user already exist', 400))
		}

		// hash password
		const hashedPassword = await bcrypt.hash(password, 10)
		const data = {
			username : username,
			password : hashedPassword,
			email: email
		}
		// create user ใน prisma.user

		const rs = await prisma.user.create({
			data : data
		})
		console.log(rs)
		res.json({msg: 'Register Sucessful'})
})

module.exports.login = tryCatch(async (req, res, next) => {
	const {username, password} = req.body
	// validation
	if( !(username && password )) {
		throw(customError('Fill all Input', 400))
	}
	const targetUser = await prisma.user.findUnique({
		where : { username : username} 
	})
	// find username in prisma.user
	if( !targetUser) {
		throw(customError('Invalid login',400))
	}
	// check password
	const pwOk = await bcrypt.compare(password, targetUser.password)
	if(!pwOk) {
		throw(customError('Invalid login',400))
	}
	// create jwt-token
		// make payload = { id }
		// jwt.sign + {expiresIn : '7d'}
	const payload = {id : targetUser.id}
	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn : '7d'
	})
	console.log(token)
	// responde jwt-token
	res.json({token: token})
})

module.exports.me = (req, res, next) => {
	res.json({msg : 'in getMe'})
}

// module.exports = { register, login, me }