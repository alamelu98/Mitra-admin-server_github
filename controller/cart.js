const StatusCode=require("http-status")
const asyncWrapper=require("../middleware/async")
const Cart=require("../models/cart")
const BadRequestError=require("../error/badrequest")
const UnAuthError=require("../error/unauthenticated")
const userLogin=require("../models/UserLogin")
const Prints=require("../models/prints")
const Originals=require("../models/originals")

const getAllCart=asyncWrapper(async(req,res)=>
{
    const cart=await Cart.find()

    res.status(StatusCode.OK).json({
        cart:cart
    })
})




const postCart=asyncWrapper(async(req,res)=>
{
   
    const cart1= await Cart.create({...req.body,date:Date.now()})
    const subCart=await Promise.all(cart1.cart.map(async (eachitem)=>
    {
       console.log(eachitem._id)
      const prints1=await Prints.findById(eachitem._id)
      const originals1=await Originals.findById(eachitem._id)
      if(!prints1 && !originals1)
      {
        return " "
      }
    
      return eachitem
    }))
    console.log(subCart)
    if(subCart.includes(" "))
    {
        throw new UnAuthError("product not found")
    }
    // console.log(cart1)
    // res.status(StatusCode.OK).json({
    //     cart:subCart,
    // })
    var instance = new Razorpay({ key_id: 'rzp_test_DcVienImwqiSTx', key_secret: 'jQX0W67lKbsrb5ArV9f1xenG' })

instance.orders.create({
  amount: cart1.totalPayment,
  currency: "INR",
  receipt: "receipt#1",
  notes: {
    key1: "value3",
    key2: "value2"
  }
})
    res.status(StatusCode.OK).json({
        cart:cart1
    })
})

const UpdateCart=asyncWrapper(async(req,res)=>
{
    const id=req.params.Cartid
    
    
    const cart=await Cart.findByIdAndUpdate(id,{shipped:req.body.shipped})
    if(!cart){
        throw new BadRequestError("product not found")
    }
    
    res.status(StatusCode.OK).json({
       cart:cart
    })
  
})
const deleteCart=(req,res)=>
{
    res.status(StatusCode.OK).json({
        "message":"delete Cart"
    })
}
const getEachCart=(req,res)=>
{
    res.status(StatusCode.OK).json({
        "message":"get each Cart"
    })
}
module.exports={getAllCart,postCart,UpdateCart,deleteCart,getEachCart}
