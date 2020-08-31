import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path : path.join(__dirname, '../.env')})
const jwt = require('jsonwebtoken');


module.exports = {
    verifyToken = (req, res, next) => {
        try {
            req.decoded = jwt.verify(req.header.authorization, JWT_secret)
            return next()
        } catch(error) {
            if(error.name === 'TokenExpiredError'){
                return res.status(419).send("verifyToken fail, Token was expired")
            }
            return res.status(401).send("verifyToken fail, invalid token")
        }
    }
}