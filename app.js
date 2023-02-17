require("dotenv").config()

const express=require("express")
const app= express()
const port=process.env.PORT||5000
const printRoute=require("./routes/prints")
const originalsRoute=require("./routes/originals")
const cartRoute=require("./routes/cart")
const userSignupRoute=require("./routes/usersignup")
const adminRoute=require("./routes/admin")
const userview=require("./routes/usersview")
const connectDB=require("./db/connectDB")
const mongoose=require("mongoose")
const notFound=require("./middleware/not_found")
const error_handler=require("./middleware/error_handles")
const adminAuth=require("./middleware/adminAuth")
const userAuth=require("./middleware/userAuth")
const bodyParser = require("body-parser");
const helmet=require("helmet");
const cors=require("cors")
const xss=require("xss-clean")
const rateLimiter=require("express-rate-limit")

app.use(express.json())




mongoose.set('strictQuery', true);




app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );


  
app.use(helmet())
app.use(cors())
app.use(xss())

app.get("/",(req,res)=>
{
    res.send("Ecom api/")
})

app.use('/uploads',express.static('uploads'))

app.use("/user",userSignupRoute)
app.use("/admin/prints",adminAuth,printRoute)
app.use("/prints",printRoute)
app.use("/admin/users",adminAuth,userview)
app.use("/admin",adminRoute)
app.use("/admin/originals",adminAuth,originalsRoute)
app.use("/originals",originalsRoute)
app.use("/cart/checkout",userAuth,cartRoute)
app.use("/admin/cart",adminAuth,cartRoute)
app.use("/cart",cartRoute)

app.use(rateLimiter(
    {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    }
))



app.use(notFound)
app.use(error_handler)
const start=async ()=>
{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>
        {
            console.log("Server is listening")
        })
    }
    catch(error){
        console.log(error)
    }
  
}


start()


