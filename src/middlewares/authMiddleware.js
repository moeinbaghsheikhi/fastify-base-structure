const jwt = require('jsonwebtoken')

async function authMiddleware(req, res) {
    try{
        let token = req.headers.authorization;

        if(!token) return res.status(401).send({ message: "لطفا توکن دسترسی را وارد کنید!" });

        token = token.split(' ')[1]

        // token validation
        const decoded = jwt.verify(token, "secretkey");
        req.user = decoded;
    } catch(error){
        return res.status(401).send({ message: "توکن نامعتبر!" })
    }
}

module.exports = authMiddleware;