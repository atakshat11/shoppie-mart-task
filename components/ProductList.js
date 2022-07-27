import Card from "react-bootstrap/Card";
import Link from 'next/link'
const ProductList=({product})=>{
    return (
        <>
          <Card className="m-2 bg-light border border-dark " style={{ width: "16rem"}} key={product._id}>
            <Card.Img
              className="align-self-center mb-2 mt-2 img-fluid"
              variant="top"
              style={{ height: "40vh", width: "35vh" }}
              src={product.mediaUrl}
            />
            <Card.Body>
            <Card.Title className="fs-5 fw-bolder text-truncate">
              {product.name}
            </Card.Title>
         
              <Card.Text >
                <span>   Price-</span><span className="fw-bold"> &#8377;{product.price}</span>
             
            </Card.Text>
            </Card.Body>
            <Link href={'/product/[id]'} as={`/product/${product._id}`}><button className="text-white mx-5 my-2 btn btn-primary">View Details</button></Link>
              </Card>
        </>
      );
    }
export default ProductList
