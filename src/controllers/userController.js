const userService = require('../services/userService')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = { 
    async getAll(req, res){
        const { page, limit } = req.query;
        const users = await userService.getAllUsers(page, limit)
    
        res.status(200).send({ statusCode: 200, message: "لیست کاربران با موفقیت دریافت شد", data: users })
    },

    async getOne(req, res){
        const userId = req.params.id

        const user = await userService.getUserById(userId)
        
        if(!user) res.status(404).send({ statusCode: 404, message: `کاربر ${userId} پیدا نشد!` })
    
        res.status(200).send({ statusCode: 200, message: "کاربر با موفقیت دریافت شد", data: user })
    },

    async register(req, res){
        const { name, mobile, password } = req.body;

        try{
            // check alraedy exist user
            const existUser = await userService.getUserByMobile(mobile)
            if(existUser) return res.status(400).send({ statusCode: 400, message: `شماره موبایل تکراری است!` });

            // craete user
            const user = await userService.createUser(name, mobile, password);

            // generate token(jwt)
            const token = jwt.sign({ id: user.id, name: user.name, mobile: user.mobile }, "secretkey", { expiresIn: '1d' })

            res.status(200).send({ statusCode: 200, message: 'ثبت نام شما با موفقیت انجام شد!', data: { token } })
        } catch(err){
            res.status(500).send({ message: "Error craeting user!" })
        }
    },

    async login(req, res){
        const { mobile, password } = req.body;

        try{
            // find user
            const user = await userService.getUserByMobile(mobile)
            if(!user) return res.status(400).send({ statusCode: 400, message: `شماره موبایل وارد شده اشتباه است!` });

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch) return res.status(400).send({ statusCode: 400, message: `رمز عبور وارد شده اشتباه است!` });

            // generate token(jwt)
            const token = jwt.sign({ id: user.id, name: user.name, mobile: user.mobile }, "secretkey", { expiresIn: '1d' })

            res.status(200).send({ statusCode: 200, message: 'ورود شما با موفقیت انجام شد!', data: { token } })
        } catch(err){
            res.status(500).send({ message: "Error craeting user!" })
        }
    }
}