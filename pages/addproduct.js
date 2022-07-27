
import { useState } from "react";
import {parseCookies} from "nookies";
import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import baseUrl from '../helpers/baseUrl'
const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [media, setMedia] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

 const productDataSaved=()=>{
  console.log('Data Saved from Method!')
  toast.success('Product Data Saved Successfully!', {
    position: toast.POSITION.TOP_RIGHT
  })
 }
 const productDataErr=()=>{
  console.log('Data Error from Method!')
  toast.error('Product Data Not Saved,Try Again!',{
    position: toast.POSITION.TOP_RIGHT
  })
 }

  const handleSubmit = async (e) => {
    console.log("add product");
    console.log("values:--", name, price, category, description, media);
    console.log("done");
    e.preventDefault();
    try {
      const mediaUrl = await imageUpload();
      const res = await fetch(`${baseUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          mediaUrl,
          description,
          category,
        }),
      });
      const res2 = await res.json();
      if (res2.error) {
      productDataErr()
        console.log(res2.error)
      } else {
        productDataSaved()
        console.log('Data Saved!')
      }
    } catch (err) {
      console.log(err);
    }
  };
  const imageUpload = async () => {
    const data = new FormData();
    data.append("file", media);
    data.append("upload_preset", "storedb");
    data.append("cloud_name", "ds3ksrocs");
    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/ds3ksrocs/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const res2 = await res.json();
    return res2.url;
  };

  return (
    <div className="container border border-3 border-dark p-5 my-3 text-dark bg-body">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-bold fs-5">
            Name of Product:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Product Name..."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label fw-bold fs-5">
            Select Category:
          </label>
          <select
            className="form-select "
            aria-label=".form-select-sm example"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option defaultValue={category}>Select Category of Product</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothes">Clothes</option>
            <option value="Jewellery">Jewellery</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label fw-bold fs-5">
            Image:
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
            onChange={(e) => setMedia(e.target.files[0])}
          />
          <img
            className="responsive-img text-center m-3 w-25"
            src={media ? URL.createObjectURL(media) : ""}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label fw-bold fs-5">
            Price:
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="Enter Product Price..."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-bold fs-5">
            Description:
          </label>
          <textarea
            className="form-control"
            placeholder="Enter Product Description...."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            rows="6"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-warning fs-6 fw-bold">
          Add New Product
        </button>
      </form>
     
 </div>
    
  );
};
export async function getServerSideProps(ctx){
  const cookie = parseCookies(ctx)
  console.log('cookie',cookie)
   const user =  cookie.user ? JSON.parse(cookie.user) : ""
   console.log('user',user)
  if(user.role == 'user' || user.role == '' ){
      const {res} = ctx
      res.writeHead(302,{Location:"/"})
      res.end()
  }


  return {
      props:{}
  }
}
export default AddProduct;
