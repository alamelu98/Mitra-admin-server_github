const mongoose=require("mongoose")


const CartSchema=mongoose.Schema(
    {
    userID:{type:mongoose.Types.ObjectId,
    trim:true,
required:[true,"UserId is must"]},
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
