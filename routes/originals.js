const express=require("express")
const router=express.Router()
const {getAllOriginals,postOriginals,UpdateOriginals,deleteOriginals,getEachOriginals}=require("../controller/originals")



router.route("/").get(getAllOriginals).post(postOriginals)


router.route("/:Originalsid").get(getEachOriginals).delete(deleteOriginals)
router.route("/:Originalsid/:update").patch(UpdateOriginals)

module.exports=router
