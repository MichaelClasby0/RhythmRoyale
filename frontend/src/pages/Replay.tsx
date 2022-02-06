import PrimaryContent from "../layout/PrimaryContent";
import useKeyPress from "../hooks/useKeyPress";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Anim} from "../components/Visualisation";

export default function Replay() {
    return (
            <Container>
                <Row>
                    <Col><Anim original={undefined} correct={true}/></Col>
                    <Col><Anim original={undefined} correct={false}/></Col>
                </Row>
            </Container>
    );
}
