
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import CartItem from "../components/CartItem";
import OrderAmount from "../components/OrderAmount";
import { Card, Col, Container, Row } from "react-bootstrap";
import baseUrl from '../helpers/baseUrl'
const Cart = ({ token, error, products }) => {
  const router = useRouter();

  console.log("token in cart", token);
  if (!token) {
    toast.error("User Need To Login For Cart Access!", {
      position: toast.POSITION.TOP_RIGHT,
      toastId: "unique-random-text-xA5c574u9C754-",
    });
  } else if (token) {
    toast.success("User is Logged In and Verified!", {
      position: toast.POSITION.TOP_RIGHT,
      toastId: "unique-random-text-xdedAu9C754-",
    });
  } else {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "unique-random-text-xA5c5cd74u9C754-",
      });
      cookie.remove("user");
      cookie.remove("token");
      router.push("/login");
    }
  }
  return (
    <>
      <Container>
        <Card className="my-2 p-3 text-center">
          <h1 className="fw-bold bg-light p-2">My Cart</h1>
          <Container>
            {products.length === 0 ? (
              <>
                <h1 className="text-danger text-center">
                  Your Cart is Currently Empty!
                </h1>
                {/* <NoItems title="Your Cart is Currently Empty!" /> */}
                {/* <Button variant="success" onClick={shopnow}>
                  Shop now
                </Button> */}
              </>
            ) : (
              <Row className="text-end">
                {/*ORDER ITEMS SECTION*/}
                <Col md={8}>
                  {products.map((product, index) => (
                    <CartItem product={product} key={`cartitem_${index}`} />
                  ))}
                </Col>
                {/*ORDER AMOUNT SECTION */}
                <Col md={4}>
                  <OrderAmount products={products} />
                  
                 
                </Col>
                 
                {/* <div className="mt-3">
                  <Button
                    variant="primary"
                    // onClick={handleCheckout}
                  >
                    Proceed To Checkout
                  </Button>
                </div> */}
              </Row>
            )}
          </Container>
        </Card>
      </Container>
    </>
  );
};
export default Cart;

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  if (!token) {
    return {
      props: { products: [] },
    };
  }
  const res = await fetch(`${baseUrl}/api/cart`, {
    headers: {
      Authorization: token,
    },
  });
  console.log('product res,.....',res)
  const products = await res.json();
  if (products.error) {
    return {
      props: { error: products.error },
    };
  }
  console.log("products", products);
  return {
    props: { products, token },
  };
}
