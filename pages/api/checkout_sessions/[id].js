// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export default async function handler(req, res) {
//   const id = req.query.id;
//   console.log('sesson id',id)
//   try {
//     if (!id.startsWith('cs_')) {
//       throw Error('Incorrect CheckoutSession ID.');
//     }
//   const sessiono = await stripe.checkout.sessions.retrieve(id,{
//     expand: ['line_items'],
//   });
//   console.log('session recieve data..........',sessiono)
//   // // note there may be more than one line item, but this is how you access the price ID.
//   // console.log(sessiono.line_items.data[0].price.id);
//   // // the product ID is accessible on the Price object.
//   // console.log(sessiono.line_items.data[0].price.product);
//   //   res.status(200).json(sessiono);

//   } catch (err) {
//     console.log('check id err',err)
//     res.status(500).json({ statusCode: 500, message: err.message });
//   }
// }

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const id = req.query.id;

  try {
    if (!id.startsWith('cs_')) {
      throw Error('Incorrect CheckoutSession ID.');
    }
    const checkout_session = await stripe.checkout.sessions.retrieve(id);

    res.status(200).json(checkout_session);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}