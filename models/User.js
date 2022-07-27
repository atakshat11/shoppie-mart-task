import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      birthDate: {
        type: Date,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phoneNumber: {
        type: Number,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      confirmPassword: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
        default: "user",
        enum: ["user", "admin", "root"],
      },
},{
  timestamps:true  
})


export default  mongoose.models.User || mongoose.model('User',userSchema)