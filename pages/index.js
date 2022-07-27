import ProductList from "../components/ProductList";
import { Container, Row } from "react-bootstrap";
import baseUrl from '../helpers/baseUrl'
const Home = ({ products }) => {
  return (
    <>
      <Container className="my-3 p-3">
        <Row md={4} className="justify-content-start disp-product">
          {products.map((product, index) => (
            <ProductList product={product} key={index} />
          ))}
        </Row>
      </Container>
    </>
  );
};
export async function getServerSideProps() {
  const res = await fetch(`${baseUrl}/api/products`);
  const data = await res.json();

  return {
    props: {
      products: data,
    },
  };
}
export default Home;
