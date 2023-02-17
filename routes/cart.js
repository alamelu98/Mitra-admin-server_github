const express=require("express")
const router=express.Router()
const {getAllCart,postCart,UpdateCart,deleteCart,getEachCart}=require("../controller/cart")



router.route("/").get(getAllCart)
router.route("/checkout").post(postCart)


router.route("/:Cartid").get(getEachCart).delete(deleteCart)

router.route("/:Cartid/quantity").patch(UpdateCart)
module.exports=router
