const bcrypt = require('bcryptjs')
const prisma = require('../models')
const customError = require('../utils/customError')

module.exports.register = async (req,res,next)=>{
	const {username, password, confirmPassword, email} = req.body
	try {
		// รับ body {username, password, confirmPassword, email}
		console.log(username)

		// validation
		// if( !username || !password || !confirmPassword) {
		if( !(username && password && confirmPassword)) {
			// const error = new Error("Fill all Input")
			// error.statusCode = 400
			return next(customError('Fill all Input', 400))
		}
		if(password !== confirmPassword) {
			throw(customError("check confirmPassword", 400))
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

	}catch(err){
		next(err)
	}
}
module.exports.login = (req, res, next) => {
	res.json({msg: 'in login'})
}

module.exports.me = (req, res, next) => {
	res.json({msg : 'in getMe'})
}

// module.exports = { register, login, me }