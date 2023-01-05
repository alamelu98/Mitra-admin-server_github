const express=require("express")
const router=express.Router()
const {getAllOriginals,postOriginals,UpdateOriginals,deleteOriginals,getEachOriginals}=require("../controller/originals")

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

router.route("/").get(getAllOriginals).post(upload.single("productImage"),postOriginals)


router.route("/:Originalsid").get(getEachOriginals).delete(deleteOriginals).patch(upload.single("productImage"),UpdateOriginals)


module.exports=router
