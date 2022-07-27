import Cart from "../../models/Cart";
import Authenticated from "../../helpers/Authenticated";
import initDb from "../../helpers/initDB";
// import product from '../../models/Product'

initDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await fetchUserCart(req, res);
      break;
    case "PUT":
      await addProduct(req, res);
      break;
    case "DELETE":
      await removeProduct(req, res);
      break;
  }
};

const fetchUserCart = Authenticated(async (req, res) => {
    console.log('fetch Data')
    console.log('req',req.userId)
  const cart = await Cart.findOne({ User: req.userId }).populate(
    "products.product"
  );
//   console.log('cart ddata',cart)
  res.status(200).json(cart.products);
});

const addProduct = Authenticated(async (req, res) => {
    console.log('add product')
  const { quantity, productId } = req.body;

  const cart = await Cart.findOne({ User: req.userId });
  const pExists = cart.products.some(
    (pdoc) => productId === pdoc.product.toString()
  );

  if (pExists) {
    await Cart.findOneAndUpdate(
      { _id: cart._id, "products.product": productId },
      { $inc: { "products.$.quantity": quantity } }
    );
  } else {
    const newProduct = { quantity, product: productId };
    await Cart.findOneAndUpdate(
      { _id: cart._id },
      { $push: { products: newProduct } }
    );
  }
  res.status(200).json({ message: "product added to cart" });
});

const removeProduct = Authenticated(async (req, res) => {
  const { productId } = req.body;
  console.log('product delete id',productId)
  const cart = await Cart.findOneAndUpdate(
    { User: req.userId },
    { $pull: { products: { product: productId } } },
    { new: true }
  ).populate("products.product");
  console.log('updated cart data',cart)
  res.status(200).json(cart.products);

});
