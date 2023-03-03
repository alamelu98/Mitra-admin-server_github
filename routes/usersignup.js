const express=require("express")

const router=express.Router()
const {userLoginin,newUserRegister}=require("../controller/usersignup")

router.route("/signup").post(newUserRegister)
router.route("/shipping").patch(updateShip)
router.route("/login").post(userLoginin)

module.exports=router
