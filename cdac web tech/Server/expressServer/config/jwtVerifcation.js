const jwt = require("jsonwebtoken")
const JWTsecretKey="this-is-a-secret-jwtkey-for-tokens"

const authVerifyMiddleware=(req,res,next)=>{ //next means it is a middleware
    const token = req.cookies.token
    if(!token){
        return res.json({msg:"token not found"})
    }
    const decoded=jwt.verify(token,JWTsecretKey)

    const user =decoded
    req.user=user
    next() //ends middleware excution  and run the res
}


module.exports={authVerifyMiddleware, JWTsecretKey}