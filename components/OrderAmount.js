import React, { useEffect, useState } from "react";
import { Card, Col, ListGroup, Row, Button } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import axios from  'axios'
import getStripe from "../helpers/get-stripe";
import baseUrl from "../helpers/baseUrl";
const OrderAmount = ({ products }) => {

     const handleCheckout = async (paymentInfo) => {
      console.log('payment-info',paymentInfo)
 // Create Stripe checkout
 const {
  data: { id },
} = await axios.post(`${baseUrl}/api/checkout_sessions`, {
  items: Object.entries(paymentInfo).map(([{ id, quantity }]) => ({
    price: id,
    quantity,
  })),
});

// Redirect to checkout
const stripe = await getStripe();
await stripe.redirectToCheckout({ sessionId: id });

        // const {token}=parseCookies()
        // console.log('token in cart dta handle check',token);
        // console.log(paymentInfo)
        // const res = await fetch(`${baseUrl}/api/payment`,{
        //     method:"POST",
        //     headers:{
        //        "Content-Type":"application/json",
        //       "Authorization":token 
        //     },
        //     body:JSON.stringify({
        //         paymentInfo
        //     })
        // })
        // const res2 = await res.json() 
      };

  const TotalPriceProceed = () => {

    console.log("product total pricce data", products);
    return (
      <div
        className="container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {products.length > 0 && (
          <StripeCheckout
            name="Shoppie-Mart"
            amount={(price > 1000 ? price : price + deliveryCharges) * 100}
            image={products.length > 0 ? products[0].product.mediaUrl : ""}
            currency="INR"
            shippingAddress={true}
            billingAddress={true}
            zipCode={true}
            stripeKey="pk_test_51LPMS1SB9jHHvF3Z4ZQOu2dSDWta7aBK9mvpCDfgrL1gh5wFpOFv52WdRqRxeIBBrAT8TrdJBV2idek1JF4ONweD00RxEHsfQs"
            token={(paymentInfo) => handleCheckout(paymentInfo)}
          >
            <Button variant="success">Proceed To Checkout</Button>
          </StripeCheckout>
        )}
      </div>
    );
  };

  console.log("productdata", products);
  const list = products;
  const [price, setPrice] = useState(0);
  const [items, setItems] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);

  useEffect(() => {
    console.log("list", list);
    let price = 0;
    let qty = 0;
    list.map((item) => {
      price += item.product.price * item.quantity;
      qty += item.quantity;
      return item;
    });
    console.log("price", price);
    setPrice(price);
    setItems(qty);
    setDeliveryCharges(price <= 25 ? 0 : 70);
  }, [list]);

  return (
    <>
      <Card className="order-amount mt-3">
        <Card.Header className="text-center" as="h5">
          Order Amount Details
        </Card.Header>
        <ListGroup>
          <ListGroup.Item>
            <h6 className="text-start text-uppercase fw-bold">
              Price Details
              <span className="text-secondary">{`(Items: ${items})`}</span>{" "}
            </h6>
          </ListGroup.Item>
          <ListGroup.Item>
            {/*PRICE ROW */}
            <Row>
              <Col md={6} className="text-start">
                <p>Price</p>
              </Col>
              <Col md={6} className="text-end">
                <p>&#8377; {price}</p>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            {/*DELIVERY CHARGES */}
            <Row>
              <Col md={6} className="text-start">
                <p>Delivery Charges</p>
              </Col>
              <Col md={6} className="text-end">
                <p>&#8377; {price > 1000 ? 0 : deliveryCharges}</p>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>

        {/*TOTAL AMOUNT */}
        <Card.Footer className="text-success">
          <Row>
            <Col md={6}>
              <p className="text-start fw-bold">Total Amount</p>
            </Col>
            <Col md={6} className="text-end">
              <p className="fw-bold">
                &#8377; {price > 1000 ? price : price + deliveryCharges}
              </p>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
      <div style={{ margin: "20px 0px 0px 110px" }} className="fs-5">
        <TotalPriceProceed />
      </div>
    </>
  );
};

export default OrderAmount;
