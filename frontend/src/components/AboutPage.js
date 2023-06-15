import React from "react";
import { Container } from "react-bootstrap";

const AboutPage = () => {
    return(
        <Container>
            <div className="about-page">
                
                <h1 className="about-sub-heading" id="about"><strong>GIFTY</strong></h1>
                <p>Gifty allows you to create your unique wishlist and share it with your friends and family.</p>
            </div>
        </Container>
    );
}

export default AboutPage;