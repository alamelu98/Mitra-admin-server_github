const Prints=require("../models/prints")
const StatusCode=require("http-status")
const BadRequestError=require("../error/badrequest")
const asyncWrapper = require("../middleware/async")
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
const getAllPrints=asyncWrapper (async (req,res)=>
{
    const prints=await Prints.find()
 
     
         res.status(StatusCode.OK).json({
             prints
         })
    
})


const postPrints=asyncWrapper(async (req,res)=>
{

    console.log(req.file.path,"pppp")
    console.log(req.body)
    try{
       const result=await cloudinary.uploader.upload(req.file.path,{
        folder:"Mitra"
})
       console.log("####")
       console.log(result.url)
    }
    catch(error)
    {
        console.log(error)
    }
    const data_req={...req.body,productImage:result.url}
    const prints=await Prints.create(data_req)

        res.status(StatusCode.OK).json({
            prints
        })
   
   
})

const UpdatePrints=asyncWrapper(async(req,res)=>
{
    const id=req.params.printsid
    const update=req.params.update
    
    const prints=await Prints.findByIdAndUpdate(id,{[update]:"Hello"})
    if(!prints){
        throw new BadRequestError("product not found")
    }
    
    res.status(StatusCode.OK).json({
       message:`Item updated ${update}`
    })
})
const deletePrints=asyncWrapper(async(req,res)=>
{
    const id=req.params.printsid
    const prints=await Prints.findByIdAndDelete(id)
    if(!prints){
        throw new BadRequestError("Product not found")
    }
    res.status(StatusCode.OK).json({
        "message":"delete prints"
    })
})
const getEachPrints=asyncWrapper(async(req,res)=>
{
    const id=req.params.printsid
    const prints=await Prints.findById(id)
    if(!prints){
        throw new BadRequestError("Product not found")
    }
    res.status(StatusCode.OK).json({
        prints:prints
    })
})

module.exports={getAllPrints,postPrints,UpdatePrints,deletePrints,getEachPrints}
