import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Container, Row} from "react-bootstrap";
import DeleteModal from "../../components/DeleteModal.js";
import { parseCookies } from "nookies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faMoneyCheckDollar,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import baseUrl from '../../helpers/baseUrl'
const Product = ({ product }) => {
  console.log(product);

  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";
  if (router.isFallback) {
    return <h3>loading...</h3>;
  }

  const AddToCart = async () => {
    // console.log(cookie.token,typeof(cookie.token))
    const res = await fetch(`${baseUrl}/api/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookie.token,
      },
      body: JSON.stringify({
        quantity,
        productId: product._id,
      }),
    });
    const carddata=await res.json()
    console.log('carddata',carddata)
  };

  return (
    <>
      <Container>
        <Row className="border border-dark border-4 bg-light p-5 m-3">
          <img
            src={product.mediaUrl}
            className="border border-secondary border-2 rounded mx-auto w-25"
          />
          <h1 className="text-dark fw-bolder mb-4">{product.name}</h1>
          <span>
            <h4>
              <u>Description</u>:
            </h4>
            <p>{product.description}</p>
          </span>

          <div>
            <h4>
              <u>Category</u>
            </h4>
          </div>
          <p>{product.Category}</p>
          <div>
            <h4>
              <u>Rating</u>:{}
            </h4>
          </div>
          <p>{product.rating}</p>
          <h2>
            Price:<strong>&#8377; {product.price}</strong>
          </h2>
          <div className=" my-1 py-1">
            <h4>
              <strong>Quantity:</strong>
              <Button
                variant="warning"
                className="m-2 fs-5 py-2"
                onClick={() => {
                  setQuantity(quantity - 1);
                }}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>

              <input
                type="text"
                style={{ width: "80px", margin: "15px 10px", padding: "10px" }}
                value={quantity}
                min={0}
                //  onChange={(e)=>setQuantity(Number(e.target.value))}
                placeholder="Qunatity"
                className="border border-warning bg-warning"
              />
              <Button
                variant="warning"
                className="m-2 fs-5 py-2"
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </h4>
          </div>

          <div className="text-center ">
            <Button
              variant="primary"
              className="mx-5 fs-5"
              onClick={() => AddToCart()}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="mx-2" />
              Add To Cart
            </Button>
            <Button variant="success" className="mx-5 fs-5">
              <FontAwesomeIcon icon={faMoneyCheckDollar} className="mx-2 " />
              Buy Now
            </Button>
          </div>
        </Row>
        {/* Only for admin side access for delete product */}
        {user.role != "user" && <DeleteModal product={product} />}
      </Container>
    </>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`api/product/${id}`);
  const data = await res.json();
  return {
    props: { product: data },
  };
}
// export async function getStaticProps({params:{id}}) {
//     const res = await fetch(`${baseUrl}/api/product/${id}`)
//     const data = await res.json()
//     return {
//       props: {product:data}
//     }
//   }

// export async function getStaticPaths() {
//     return {
//       paths: [
//         { params: { id:"5f0f502b9cb9363990f3de6c" } }
//       ],
//       fallback: true
//   }
// }

export default Product;
