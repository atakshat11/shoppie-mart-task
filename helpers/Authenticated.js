import jwt from 'jsonwebtoken'

function Authenticated(icomponent){
    return (req,res)=>{
        const {authorization} = req.headers
        if(!authorization){
            return res.status(401).json({error:"You Must Logged In!"})
        }
        try{
            console.log('try auth')
              const {userId} = jwt.verify(authorization,process.env.JWT_SECRET) 
              req.userId = userId
              return icomponent(req,res)
        }catch(err){
            console.log('catch auth')
            console.log(err)
            return res.status(401).json({error:"You Must Logged In!"})
        }
       
    }
}


export default Authenticated