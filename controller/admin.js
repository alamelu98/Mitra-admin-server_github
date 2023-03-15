const asyncWrapper = require("../middleware/async");
const Admin=require("../models/admin")
const UnAuthError=require("../error/unauthenticated");
const UserLogin = require("../models/UserLogin");
const cart=require("../models/cart")



const loginAdmin=asyncWrapper(async(req,res)=>
{
    const tempUser={
        username:"ALDE123",
        password:"Alde@345"
    }
    console.log("hello")

    await Admin.create({...tempUser})
    
    res.status(200).json({message:"Login with your username and password"})
})

const enterlogin=asyncWrapper(async(req,res)=>
{
    const {username,password}=await req.body
    if(!username || !password){
      throw  new UnAuthError("Enter the details")    }
    const user=await Admin.findOne({username})
    if(!user)
    {
        throw new UnAuthError("Customer not found")    }
    const isSamePass=await user.compareAdminPassword(password)
    if(!isSamePass)
    {
       throw new UnAuthError("Invalid Password")    }
    const token=user.getToken()

    res.status(200).json({message:"Succesfully logged in",user_token:token})
})

const viewAllCustomer=asyncWrapper(async(req,res)=>
{
    var carts
    const allUsers=await UserLogin.find()
    const cart_user=await Promise.all(allUsers.map((each)=>
      {
        const cart1=cart.findOne({userID:each._id})
        if(cart1){
           carts=cart1.cart
        }
        else{
            carts="no cart data"
        }
        return {...each,carta:carts}
    }))

    res.status(200).json({items:cart_user})
})

module.exports={loginAdmin,enterlogin,viewAllCustomer}
