import { Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
// import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
// import { storage } from "../firebase";
// import { v4 } from "uuid";

const EditModal = ({ details, setImage }) => {

    console.log(details);

    const [newDetails] = useState({
        itemName: "",
        image: "",
        link: ""
    });

    const submitHandler = e => {
        e.preventDefault();
        
        newDetails.itemName= e.target.itemName.value;
        newDetails.image= details.image;
        newDetails.link= e.target.link.value;

        fetch(`http://localhost:8080/wishlist/${details.itemId}`,{
            method:"PUT",
            headers:{
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                itemName: newDetails.itemName,
                image: newDetails.image,
                link: newDetails.link
            })
        })
        .then(response => {
            return response.json()
        })
        .then(window.location.reload(false));
    };

    function deleteItem(){
        fetch(`http://localhost:8080/wishlist/${details.itemId}`,{
            method:"DELETE",
            headers:{
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            },
            body: null
            }) 
            .then(response => {
                return response.json()
            }) 
            .then(window.location.reload(false));
    }

    return(
        <Form onSubmit={submitHandler}>
            <Row>
            <Form.Group as={Row} className="mb-3" controlId="itemName">
                <Col className="col-md-3">
                <Form.Label className="form-label" >Name</Form.Label>
                </Col>
                <Col className="col-md-9">
                <Form.Control className="form-input" type="text" defaultValue={details.itemName} />
                </Col>
            </Form.Group>
            </Row>

            <Row>
            <Form.Group as={Row} className="mb-3" controlId="link">
                <Col className="col-md-3">
                <Form.Label className="form-label">Link</Form.Label>
                </Col>
                <Col>
                <Form.Control className="form-input" type="text" defaultValue={details.link} />
                </Col>
            </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Row} className="mb-3">
                    <Col>
                    <Button style={{float:"right", margin:"5px"}} type="submit" variant="success">Save Changes</Button>
                        <Button className="btn btn-danger" style={{float:"right", margin:"5px"}} onClick={() => deleteItem()}>
                            Remove Item
                        </Button>
                    </Col>
                </Form.Group>
            </Row>
            
        </Form>
    );
}

export default EditModal;