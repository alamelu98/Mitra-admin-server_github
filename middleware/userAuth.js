const jwt=require("jsonwebtoken")
const UnAuthError = require("../error/unauthenticated")

const auth=(req,res,next)=>
{
    authToken=req.headers.authorization

    if(!authToken || !authToken.startsWith=="Bearer ")
    {
        throw new UnAuthError("Auth not detected")

    }

    const token=authToken.split(" ")[1]

    try{
        const payload=jwt.verify(token,process.env.JWT_SECRET_USER)
        req.user={userid:payload.userid,username:payload.Username,email:payload.userEmail}
        next()
    }
    catch(error)
    {
        throw new UnAuthError("Auth error")
    }

    
}
module.exports=auth
