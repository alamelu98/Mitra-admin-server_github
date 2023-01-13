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
    const newprints=prints.map((eachitem)=>{return {_id:eachitem._id,name:eachitem.name,price:eachitem.price,styles:eachitem.styles,stockQuantity:eachitem.stockQuantity,inStock:eachitem.inStock,productImage:eachitem.productImage,url:`https://sore-ox-knickers.cyclic.app/prints/${eachitem._id}`}})
    console.log(newprints)
    res.status(StatusCode.OK).json({
             newprints
         })
    
})


const postPrints=asyncWrapper(async (req,res)=>
{

    console.log(req.file.path,"pppp")
    console.log(req.body)
    try{
       const result=await cloudinary.uploader.upload(req.file.path,{
        folder:"MitraPrints"
        }       )
       console.log("####")
       console.log(result.url)
       const data_req={...req.body,productImage:result.url}
       const prints=await Prints.create(data_req)
       const newprints={_id:prints._id,name:prints.name,price:prints.price,styles:prints.styles,stockQuantity:prints.stockQuantity,inStock:prints.inStock,productImage:prints.productImage,url:`https://sore-ox-knickers.cyclic.app/prints/${prints._id}`}
    //    prints.map((eachitem)=>{return {_id:eachitem._id,name:eachitem.name,price:eachitem.price,styles:eachitem.styles,stockQuantity:eachitem.stockQuantity,inStock:eachitem.inStock,productImage:eachitem.productImage,url:`https://sore-ox-knickers.cyclic.app/prints/${eachitem._id}`}})

   
           res.status(StatusCode.OK).json({
               newprints
           })
    }
    catch(error)
    {
        console.log(error)
    }
  
   
   
})

const UpdatePrints=asyncWrapper(async(req,res)=>
{
    const id=req.params.printsid
    // console.log(req.file.path,"pppp")

    console.log(req.body)
    try{
        if(req.file===undefined)
        {
             data_req={...req.body}
             
        }
     else{
        const result=await cloudinary.uploader.upload(req.file.path,{
            folder:"Mitra"
            }       )
           console.log("####")
           console.log(result.url)
            data_req={...req.body,productImage:result.url}

        
     }
    
    console.log(data_req)
     const prints=await Prints.findByIdAndUpdate(id,data_req)
     const newprints={_id:prints._id,name:prints.name,price:prints.price,styles:prints.styles,stockQuantity:prints.stockQuantity,inStock:prints.inStock,productImage:prints.productImage,url:`https://sore-ox-knickers.cyclic.app/prints/${prints._id}`}

    if(!prints){
        throw new BadRequestError("product not found")
    }
    
    res.status(StatusCode.OK).json({
       message:`Item updated `,
       newprints
      
    })}
    catch(error)
    {
        console.log(error)
    }
  
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
    const newprints={_id:prints._id,name:prints.name,price:prints.price,styles:prints.styles,stockQuantity:prints.stockQuantity,inStock:prints.inStock,productImage:prints.productImage,url:`https://sore-ox-knickers.cyclic.app/prints/${prints._id}`}

    if(!prints){
        throw new BadRequestError("Product not found")
    }
    res.status(StatusCode.OK).json({
        prints:newprints
    })
})

module.exports={getAllPrints,postPrints,UpdatePrints,deletePrints,getEachPrints}
