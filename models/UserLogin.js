require("dotenv").config()
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")

const userLogin=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name Required"],
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Email needed"],
        
    },
    password:{
        type:String,
        required:[true,"Password Required"],
        trim:true
    },
    phoneNumber:{
        type:Number,
        required:[true,"Number Required"],
        trim:true
    },
    address:{
        type:String,
        required:[true,"Address REQUIRED"],
        trim:true
    },date:{
        type:Date,
        required:[true,"Date added"]}
})
userLogin.pre("save",async function(next)
{
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()
})
userLogin.methods.compareUserPassword=async function(userPassword)
{
    const isSame= await bcrypt.compare(userPassword,this.password)
    return isSame
}

userLogin.methods.getToken=function()
{
    const token=jwt.sign({userid:this._id,userEmail:this.email,Username:this.name},process.env.JWT_SECRET_USER,{expiresIn:process.env.JWT_EXPIRY})
    return token
}


module.exports=mongoose.model("userLogin",userLogin)
