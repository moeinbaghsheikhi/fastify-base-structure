const User = require('../models/User')

module.exports = { 
    async getAllUsers(page= 1, limit= 4){
        const limitFound = parseInt(limit)
        const offset = parseInt((page-1) * limit)

        const users = await User.findAll({ limit: limitFound, offset: offset })

        return users;
    }, 

    async getUserById(id){
        const user = await User.findOne({ where: { id } })

        return user
    },
    
    async getUserByMobile(mobile){
        const user = await User.findOne({ where: { mobile } })

        return user
    },

    async createUser(name, mobile, password){
        const newUser = await User.create({
            name, mobile, password
        });

        return newUser
    }
}