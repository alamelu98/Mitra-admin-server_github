const mongoose=require("mongoose")


const CartSchema=mongoose.Schema(
    {
    userID:{type:mongoose.Types.ObjectId,
    trim:true,
required:[true,"UserId is must"]},
        totalPayment:{type:Number,
    trim:true,
required:[true,"Payment must"]},
         orderComplete:{
type:Boolean,
trim:true,
required:[true,"order complete"]

     },
         cart:  
                [
                 {
                    _id:{
                        type:mongoose.Types.ObjectId,
                        trim:true,
                        required:[true,"Id is must"],
                    },
                    name:{
                    type:String,
                    trim:true,
                    required:[true,"Originals name is must"],
                },
                price:{
                    type:Number,
                    required:[true,"Price is must"]
                },
               quantity:{
                    type:Number,
                    required:[true,"Stock quantity is needed"],
                    default:1
                },
                   productImage: {
        type: String, 
        required: true }
            }
                ]
               
                
           
               
            
        
           
           
           
       
    
            })


module.exports=mongoose.model("Cart",CartSchema)
