const asyncWrapper=require("../middleware/async")
const BadRequestError=require("../error/badrequest")
const UnAuthError=require("../error/unauthenticated")
const userLogin=require("../models/UserLogin")



const userLoginin=asyncWrapper(async(req,res)=>
{
    const{email,password,}=req.body
    if(!email || !password)
    {
        throw new BadRequestError("Please provide the required values")

    }
    const user=await userLogin.findOne({email})

    if(!user)
    {
        throw new UnAuthError("user not found")

    }

    const isSame=user.compareUserPassword(password)

    if(!isSame)
    {
        throw  new UnAuthError("Password is incorrect")

    }
    const token=user.getToken()

    res.status(200).json({message:"Successfully loggedn in",userToken:token,userdetails_user:user})

})
const newUserRegister=asyncWrapper(async(req,res)=>
{
    const tempUser=await userLogin.create({
        ...req.body,date:Date.now()
    })
    const token=tempUser.getToken()
    res.status(200).json({message:"usercreated",userdetails_user:tempUser,userToken:token})

})
const updateShip=asyncWrapper(async(req,res)=>
{

    const id =req.body.userid
    
    const tempUser=await userLogin.findByIdAndUpdate(id,{...req.body})
    console.log(tempUser)

    res.status(200).json({message:"order created",userdetails:tempUser})

})


module.exports={userLoginin,newUserRegister,updateShip}
