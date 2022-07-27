import initDB from '../../helpers/initDB'
import User from '../../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

initDB()

export default async (req,res)=>{
     const {email,password} = req.body
     try{
        if(!email || !password){
          return res.status(422).json({error:"Please add all the Fields"})
        }
      const user = await User.findOne({email})
      if(!user){
          return res.status(404).json({error:"User does not exist with this Email!"})
      }
        const doMatch =  await bcrypt.compare(password,user.password)
        if(doMatch){
            //Create Token
           const token =  jwt.sign({userId:user._id},process.env.JWT_SECRET,{
                expiresIn:"7d"
            })
            const {role,email} = user
            res.status(201).json({token,user:{role,email}})
        }else{
           return res.status(401).json({error:"Email or Password don't match"})
        }
     }catch(err){
         console.log(err)
     }
}