import mongoose, { mongo } from "mongoose";
function initDB(){
    if(mongoose.connections[0].readyState){
        console.log('Already Connected with Database!')
        return
    }
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    mongoose.connection.on('connected',()=>{
        console.log('Successfully connected with MONGO Database.')
    })
    mongoose.connection.on('error',(err)=>{
        console.log('Connection Failed',err)
    })
}

export default initDB