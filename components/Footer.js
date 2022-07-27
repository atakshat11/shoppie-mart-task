import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <div>
        <footer
          className="sticky-bottom"
          style={{ backgroundColor: "#191970", color: "white" }}
        >
          <Container className="py-4">
            <Row xs={1} md={5}>
              <Col>
                <h6 className="fw-bold fs-5 py-2">
                  <u>About</u>
                </h6>
                <div>Contact Us</div>
                <div>About Us</div>
                <div>Careers</div>
                <div>Shopie-Mart Stories</div>
                <div>Press</div>
                <div>Corporate Information</div>
              </Col>
              <Col>
                <h6 className="fw-bold fs-5 py-2">
                  <u>Help</u>
                </h6>
                <div>Payment</div>
                <div>Shipping</div>
                <div>FAQ</div>
                <div>Report Infringement</div>
                <div>Cancellation and Returns</div>
              </Col>
              <Col>
                <h6 className="fw-bold fs-5 py-2 ">
                  <u>Policy</u>
                </h6>
                <div>Return Policy</div>
                <div>Terms of Use</div>
                <div>Security</div>
                <div>Privacy</div>
                <div>Sitemap</div>
              </Col>
              <Col>
                <h6 className="fw-bold fs-5 py-2">
                  <u>Contact Us</u>
                </h6>
                <strong>Phone Number</strong>
                <div>0780475041</div>
                <br />
                <strong>Email</strong>
                <div>shoppiemart@gmail.com</div>
              </Col>
              <Col>
                <h6 className="fw-bold fs-5 py-2">
                  <u>Office Address</u>
                </h6>
                <div className="border border-dark">
                  1101-1105,Sankalp Iconic Tower, Near Newyork Timber Mart, Opp.
                  Vikramnagar Colony,Iscon Road,Ahmedabad,Gujarat-380054.
                </div>
              </Col>
            </Row>
            <hr />
            <Row className="mt-1 align-items-center text-center">
              <Col xs={6} md={12}>
                <strong className="fs-6 text-white ">
                  All Rights Reserved by Shopie-Mart &#169; 2005- 2022.
                </strong>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    </>
  );
};
export default Footer;
