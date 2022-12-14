import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema.Types

const orderSchema  = new mongoose.Schema({
    user:{
        type:ObjectId,
        ref:"User"
    },
    products:[
        {
            quantity:{type:Number,default:1},
            product:{type:ObjectId,ref:"product"}
       }
    ],
  
},{
    timestamps:true
})


export default mongoose.models.Order || mongoose.model("Order",orderSchema)