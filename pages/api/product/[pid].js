import Product from '../../../models/Product'
import initDB from '../../../helpers/initDB'

initDB()

export default async (req,res)=>{
    switch(req.method){
        case "GET":
          await getProduct(req,res) 
          break; 
        case "DELETE":
          await deleteProduct(req,res)
          break;
    }
    
}

//Detail of Single Product
const getProduct = async (req,res)=>{
    const {pid } =  req.query
     const product = await Product.findOne({_id:pid})
     res.status(200).json(product)
}

//Delete Product
const deleteProduct = async (req,res)=>{
    const {pid } =  req.query
    await Product.findByIdAndUpdate({_id:pid})
    res.status(200).json(
        console.log('Data Deleted Betaa.')
    )
}