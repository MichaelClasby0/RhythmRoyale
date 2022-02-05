import React from "react";
import "./Layout.scss"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function PrimaryContent(props) {
    return (
        <Container>
            <Row className="primary-content--wrap align-items-center">
                <Col>
                    <div className="primary-content">
                        {props.children}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}