import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import useGiftyData from '../hooks/useGiftyData';
import { useState } from 'react';
import {Button, Modal, Form, Row, Col} from "react-bootstrap";
import { storage } from '../firebase';
import { v4 } from 'uuid';
import EditModal from './EditModal';

function ItemCard(){

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showDetails, setShowDetails] = useState(false);
    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails = () => setShowDetails(true);

    const [image, setImage] = useState();
    
    const [details] = useState({
        itemId: "",
        itemName: "",
        image: "",
        link: ""
    });
    
    function editItem(item){

        handleShowDetails();
        
        details.itemId = item.id;
        details.itemName= item.itemName;
        details.image= item.image;
        details.link= item.link;

    }

    const listItems = useGiftyData().data?.map((item) => 
        <div className='card' key={item.id} onClick={() => editItem(item)}>
            <div className='card_img'>
                <img src={item.image} alt='item_image'/>
            </div>
            <div className='card_header'>
                <h3>{item.itemName}</h3>
            </div>
            <a href={item.link} target="_blank" rel="noreferrer" className='nav-link'>
                <button className='btn btn-sm btn-secondary'>VISIT ITEM ON WEB</button>
            </a>
        </div>
    );

  
    const submitHandler = e => {
        e.preventDefault();
        const imageRef = ref(storage, `item_images/${image.name + v4()}`); 

        uploadBytes(imageRef, image).then(() => {
            getDownloadURL(imageRef).then((url) => {
                details.itemName= e.target.itemName.value;
                details.image= url;
                details.link= e.target.link.value;
                
                fetch(`http://localhost:8080/wishlist`,{
                    method:"POST",
                    headers:{
                        'Accept' : 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        itemName: details.itemName,
                        image: details.image,
                        link: details.link
                    })
                })
                .then(response => {
                    return response.json()
                }) 
                .then(window.location.reload(false));
            })
            .catch(error => {
                console.log(error.message, "error getting the image url");
            });
        });
    };
  
    return (
      <>
        <div className='main_content'>
            {listItems}
        </div>
        
        <div className='btn btn-circle btn-xl' onClick={handleShow}>
            <i className="fa fa-3x fa-plus-circle"></i>
        </div>

        <Modal show={show} onHide={handleClose} className='modal modal-lg'> 
            <Modal.Header closeButton className='modal-header text-center' style={{backgroundColor:"rgb(200, 200, 200)"}}> 
            <Modal.Title className='modal-title w-100'>Add New Item</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor:"#272b34"}}>
            <Form onSubmit={submitHandler}>
                <Row>
                <Form.Group as={Row} className="mb-3" controlId="itemName">
                    <Col className='col-md-3'>
                    <Form.Label className="form-label">Price</Form.Label>
                    </Col>
                    <Col>
                    <Form.Control className="form-input" type="text" placeholder="Item Name" required/>
                    </Col>
                </Form.Group>
                </Row>

                <Row>
                <Form.Group as={Row} className="mb-3" controlId="image">
                    <Col className='col-md-3'>
                    <Form.Label className="form-label">Image</Form.Label>
                    </Col>
                    <Col>
                    <Form.Control 
                        className="form-input" 
                        type="file" 
                        accept='.jpg, .jpeg, .png, .webp' 
                        onChange={(event) => {
                            setImage(event.target.files[0])
                        }}
                        required/>
                    </Col>
                </Form.Group>
                </Row>

                <Row>
                <Form.Group as={Row} className="mb-3" controlId="link">
                    <Col className='col-md-3'>
                    <Form.Label className="form-label">Link</Form.Label>
                    </Col>
                    <Col>
                    <Form.Control className="form-input" type="url" pattern="https://.*" placeholder="Item Link" required/>
                    </Col>
                </Form.Group>
                </Row>

                <Button className="add_item_button" variant="success" type="submit">
                    Add Item
                </Button>
            </Form>
            </Modal.Body>
        </Modal>

        <Modal show={showDetails} onHide={handleCloseDetails} className='modal modal-lg'>
            <Modal.Header closeButton className='modal-header text-center' style={{backgroundColor:"rgb(200, 200, 200)"}}>
            <Modal.Title className='modal-title w-100'>Edit Item</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor:"#272b34"}}>
                <img src={details.image} className="modalImage" alt="modal_image"/>
                <input 
                    className="form-input" 
                    type="file" 
                    accept='.jpg, .jpeg, .png, .webp' 
                    onChange={(event) => {

                        const imageRef = ref(storage, `item_images/${event.target.files[0].name + v4()}`); 

                        uploadBytes(imageRef, event.target.files[0]).then(() => {
                            getDownloadURL(imageRef).then((url) => {
                                fetch(`http://localhost:8080/wishlist/${details.itemId}`,{
                                    method:"PUT",
                                    headers:{
                                        'Accept' : 'application/json',
                                        'Content-Type':'application/json'
                                    },
                                    body: JSON.stringify({
                                        itemName: details.itemName,
                                        image: url,
                                        link: details.link
                                    })
                                })
                                .then(response => {
                                    return response.json()
                                })
                                    .then(window.location.reload(false))
                                });
                            
                        console.log("yes");
                        });
                    }}
                />
                <EditModal details={details} setImage={setImage}/>
            </Modal.Body>
        </Modal>
        
        <div>
            
        </div>
      </>
    );
  }
  
  export default ItemCard;