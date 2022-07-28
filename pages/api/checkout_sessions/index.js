import Stripe from 'stripe';
import initDb from '../../../helpers/initDB'
initDb()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
var reqdata=req.body.data
  console.log('checkout body',typeof(reqdata),reqdata)
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: req?.body?.data,
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
      });
  
      res.status(200).json(session);

      //rehiuh
 
      // console.log('session data before order',session)
    // const newOrder= await new Order({
    //    user:req.userId,
    //    products:{
    //     quantity:reqdata.quantity,
    //     product:reqdata.id
    //    }
    //   // quantity:quantity,
    //   // price:product.amount
    // }).save()
    // console.log('new .........................order',newOrder)
    //   const cart = await Cart.findOne({User:req.userId}).populate("products.product")
    //   await Cart.findOneAndUpdate(
    //     {_id:cart._id},
    //     {$set:{products:[]}}
    // )
    }
     catch (err) {
      console.log('eerr begin')
      console.log('err data',err)
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}