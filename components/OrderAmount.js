import React, { useEffect, useState } from "react";
import { Card, Col, ListGroup, Row, Button } from "react-bootstrap";
import getStripe from "../helpers/get-stripe";
import baseUrl from "../helpers/baseUrl";

const redirectToCheckout = async (products) => {
  console.log('redirect product detail 2',products)
  const data=products.map((i) =>
   ({
 
    currency: 'INR',
    name:'https://dashboard.stripe.com/b/acct_1LPMS1SB9jHHvF3Z' && i.product.name,
    amount:i.product.price * 100,
    price:i.price,
    quantity:i.quantity,
    images:[i.product.mediaUrl]
  })
  )
console.log('item',data)

try {

  const res = await fetch(`${baseUrl}/api/checkout_sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
   data
    }),
  });
var res2 = await res.json();
  console.log('res2',res2)
  if (res2.error) {
    console.log('res2 error',res2.error)
  } else {
    console.log('Data Saved .......!')
  }
} catch (err) {
  console.log('catch errr',err);
}
  // Redirect to checkout
  const stripe = await getStripe();
  await stripe.redirectToCheckout( {sessionId:res2.id} );

 
};
const OrderAmount = ({ products }) => {
  // console.log('redirect product detail 1',products)
 
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
     
        <Button variant="success" onClick={()=>redirectToCheckout(products)}>
          Proceed To Checkout
        </Button>
      </div>
    </>
  );
};

export default OrderAmount;
