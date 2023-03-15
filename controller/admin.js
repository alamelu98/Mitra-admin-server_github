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
    const cart_user=await Promise.all(allUsers.map(async(each)=>
      {
        //console.log(typeof(each))
        const id1=each._id.toString()
        
        const cart1=await cart.findOne({userID:id1})
        //console.log(cart1)
        if(!cart1){
              return {_id:each._id,name:each.name,email:each.email,password:each.password,phoneNumber:each.phoneNumber,address:each.address,date:each.date,carts:"no cart items"} 
           
        }
        else{
               return {_id:each._id,name:each.name,email:each.email,password:each.password,phoneNumber:each.phoneNumber,address:each.address,date:each.date,carts:cart1}
        }
    
       
    }))
    console.log(cart_user)
    res.status(200).json({items:cart_user})
})

module.exports={loginAdmin,enterlogin,viewAllCustomer}
