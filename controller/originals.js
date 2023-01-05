const asyncWrapper=require("../middleware/async")
const Originals=require("../models/originals")
const StatusCodes=require("http-status")
const BadRequestError=require("../error/badrequest")
const getAllOriginals=asyncWrapper(async(req,res)=>
{
    const originals=await Originals.find()

    res.status(StatusCodes.OK).json({
        originals:originals
    })
})
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const postOriginals=asyncWrapper(async(req,res)=>
{
   

   
    console.log(req.file.path,"pppp")
    console.log(req.body)
    try{
       const result=await cloudinary.uploader.upload(req.file.path,{
        folder:"MitraOriginals"
        }       )
       console.log("####")
       console.log(result.url)
       const data_req={...req.body,productImage:result.url}
       const originals=await Originals.create(data_req)
   
       res.status(StatusCodes.OK).json({
        originals:originals
    })
    }
    catch(error)
    {
        console.log(error)
    }
  
})

const UpdateOriginals=asyncWrapper(async(req,res)=>
{
    const id=req.params.Originalsid
   
    console.log(req.body)
    try{
        if(req.file===undefined)
        {
             data_req={...req.body}
             
        }
     else{
        const result=await cloudinary.uploader.upload(req.file.path,{
            folder:"MitraOriginals"
            }       )
           console.log("####")
           console.log(result.url)
            data_req={...req.body,productImage:result.url}

        
     }
    
    console.log(data_req)
    const originals=await Originals.findByIdAndUpdate(id,data_req)
    if(!originals){
        throw new BadRequestError("product not found")
    }
    
    res.status(StatusCodes.OK).json({
       message:`Item updated`
    })
}

catch(error)
{
    console.log(error)
}

})
const deleteOriginals=asyncWrapper(async(req,res)=>
{
    const id=req.params.Originalsid
    const originals=await Originals.findByIdAndDelete(id)
    if(!originals){
        throw new BadRequestError("Product not found")
    }
    res.status(StatusCodes.OK).json({
        "message":"delete Originals"
    })
})
const getEachOriginals=asyncWrapper(async(req,res)=>
{
    const id=req.params.Originalsid
    const originals=await Originals.findById(id)
    if(!originals){
        throw new BadRequestError("Product not found")
    }
    res.status(StatusCodes.OK).json({
        originals:originals
    })
})
module.exports={getAllOriginals,postOriginals,UpdateOriginals,deleteOriginals,getEachOriginals}
