const mongoose=require("mongoose")



const OriginalsSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"Originals name is must"],
    },
    price:{
        type:Number,
        required:[true,"Price is must"]
    },
    styles:{
        type:String,
        required:[true,"Sizes and other styles is must"]

    },
    stockQuantity:{
        type:Number,
        required:[true,"Stock quantity is needed"],
        default:1
    },
    inStock:{
        type:Boolean,
        required:[true,"stock availablity should be mentioned"],
        default:false
    },
    productImage: {
        type: String, 
        required: true }


})




module.exports=mongoose.model("Originals",OriginalsSchema)
