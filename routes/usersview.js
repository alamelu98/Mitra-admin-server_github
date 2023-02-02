const express=require("express")

const {viewAllCustomer}=require("../controller/admin")


const router=express.Router()



router.route("/users").get(viewAllCustomer)


module.exports=router