import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";
import baseUrl from '../helpers/baseUrl'
export default function DeleteModal({ product }) {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("ID FOR DELETE PRODUCT:", product._id);
  const deleteProduct = async () => {
    const res = await fetch(`${baseUrl}/api/product/${product._id}`, {
      method: "DELETE",
    });
    console.log(res);
    router.push("/");
  };
  return (
    <>
      <Button className="btn btn-danger" onClick={handleShow}>
        Delete Product
      </Button>

      <Modal show={show} onHide={deleteProduct}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger text-center fw-bold fs-2">ALERT</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you Sure Delete Product <strong>{product.name}</strong>?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={deleteProduct}>
            Yes, I am sure
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
