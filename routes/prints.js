const express=require("express")
const router=express.Router()
const {getAllPrints,postPrints,UploadImage,UpdatePrints,deletePrints,getEachPrints}=require("../controller/prints")
const multer=require("multer")

const storage = multer.diskStorage({})

  const fileFilter=(req,file,cb)=>
  {
    if(file.mimetype==='image/png' || file.mimetype === 'image/jpeg')
    {
        cb(null,true)
    }
    else{
        cb(null,false)
    }
  }
  const upload = multer({ storage: storage ,fileFilter:fileFilter})


router.route("/").get(getAllPrints).post(upload.single("productImage"),postPrints)


router.route("/:printsid").get(getEachPrints).delete(deletePrints)
router.route("/:printsid/:update").patch(UpdatePrints)
module.exports=router
