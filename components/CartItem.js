import React, {useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parseCookies } from "nookies";
import {faMultiply} from "@fortawesome/free-solid-svg-icons";
import baseUrl from '../helpers/baseUrl'
const CartItem = ({ product }) => {

  console.log('product crt item',product)
  const [setCartProduct] = useState(product);
  const { token } = parseCookies();
  const handleRemove = async (pid) => {
    console.log("handle remove", pid);
    const res = await fetch(`${baseUrl}/api/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        productId: pid,
      }),
    });

    const updatedCart = await res.json();
    setCartProduct(updatedCart);
    console.log("updated card data", updatedCart);
  };
  // console.log("product1234", product);
  // const [quantity, setQuantity] = useState(product.quantity);
  const deliveryDate = new Date(
    Date.now() + 3600 * 1000 * 72
  ).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (!product) return "Your Cart is Empty!";
  const price = product.quantity * product.product.price
  /* ORDER ITEMS SECTION */
  return (
    <Card className="mt-3">
      <div className="text-end">
        {/*CLOSE BUTTON */}
        {/* <Button
          variant="close"
          onClick={() => dispatch(deleteFromCart(product.id))}
          className="p-3"
          aria-label="Close"
        /> */}
      </div>
      <Container>
        <Row>
          <Col
            md={4}
            className="d-flex align-items-center justify-content-center"
          >
            <img
              src={product.product.mediaUrl}
              style={{ height: "200px", width: "200px" }}
              className="img-thumbnail"
              alt="..."
            />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title className="text-danger">
                <h3>{product.product.name}</h3>
              </Card.Title>
              <h5>Category-{product.product.Category}</h5>
              <h5 className="text-success">
                Price- &#8377; {product.product.price}
              </h5>
              <h5 className="text-success">
              No of Item-
              <FontAwesomeIcon icon={faMultiply} className="mx-1"/>
              {product.quantity}
              
              </h5>
          
            
          <hr/>
              <h5 className="text-primary fw-bold">
                Total-Amount of {product.product.name}-&#8377; {price}
              </h5>
              <p className="mt-4">
                <i className="fa fa-check text-success " aria-hidden="true" />{" "}
                Delivery by <i className="fw-bold">{deliveryDate}</i>
              </p>
              <Button
                variant="danger"
                onClick={() => {
                  handleRemove(product.product._id);
                }}
              >
                Remove
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};
export default CartItem;
