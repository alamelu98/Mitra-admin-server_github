const express=require("express")

const {loginAdmin,enterlogin,viewAllCustomer}=require("../controller/admin")
const {getAllDetails}=require("../controller/dashboard.js")


const router=express.Router()

router.route("/").get(loginAdmin).post(enterlogin)

router.route("/users").get(viewAllCustomer)

router.route("/dashboard").get(getAllDetails)

module.exports=router
