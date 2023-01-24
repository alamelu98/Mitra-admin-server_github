const mongoose=require("mongoose")


const CartSchema=mongoose.Schema(
    {
    
         cart:  
                [
                 {name:{
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
