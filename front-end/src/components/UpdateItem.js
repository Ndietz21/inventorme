import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateItem() {
  const { id } = useParams();
  const [editItem, setEditItem] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/items/" + id)
      .then((res) => setEditItem(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    axios.put("http://localhost:8080/items/" + id, editItem).then((res) => {
      alert("item updated successfully");
      navigate("/items");
    });
  }

  return (
    <div>
      <h1 class="text-center">Update Item</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="m-5">
          <Form.Label>Item Name: </Form.Label>
          <Form.Control
            type="text"
            value={editItem.itemName}
            onChange={(e) => setEditItem(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formQuantity" className="m-5">
          <Form.Label>Quantity: </Form.Label>
          <Form.Control
            type="text"
            value={editItem.itemQuantity}
            onChange={(e) => setEditItem(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formDescription" className="m-5">
          <Form.Label>Description: </Form.Label>
          <Form.Control
            type="text"
            value={editItem.description}
            onChange={(e) => setEditItem(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className="mx-5" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
