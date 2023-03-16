const StatusCode=require("http-status")
const asyncWrapper=require("../middleware/async")
const Cart=require("../models/cart")
const BadRequestError=require("../error/badrequest")
const UnAuthError=require("../error/unauthenticated")
const userLogin=require("../models/UserLogin")
const Prints=require("../models/prints")
const Originals=require("../models/originals")


const getAllDetails=asyncWrapper(async(req,res)=>
{
    const cart=await Cart.find()
    const users=await userLogin.find()
    const prints=await Prints.find()
    const originals=await Originals.find()

    const dashboard={
        cart:cart.length,
        users:users.length,
        prints:prints.length,
        originals:originals.length
    }
    res.status(StatusCode.OK).json({
        dashboard:dashboard
    })
})


module.exports={getAllDetails}