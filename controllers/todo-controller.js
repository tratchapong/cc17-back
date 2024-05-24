const prisma = require('../models')
const customError = require('../utils/customError')
const tryCatch = require('../utils/tryCatch')

module.exports.getTodoByUser = tryCatch( async (req, res, next) => {
	const todos = await prisma.todo.findMany({
		where : { userId : req.user.id}
	})
	res.json(todos)
} )