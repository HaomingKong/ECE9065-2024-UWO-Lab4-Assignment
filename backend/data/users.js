import bcrypt from 'bcryptjs'

const users = [
	// Admin user
	{
		name: 'a',
		email: 'a@qq.com',
		password: bcrypt.hashSync('12345', 10), //  10 = num rounds
		isAdmin: true,
	},
	// Standard users
	{
		name: 'b',
		email: 'b@qq.com',
		password: bcrypt.hashSync('12345', 10), //  10 = num rounds
	},
	{
		name: 'c',
		email: 'c@qq.com',
		password: bcrypt.hashSync('12345', 10), //  10 = num rounds
	},
]

export default users
