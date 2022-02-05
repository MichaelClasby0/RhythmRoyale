import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import PrimaryContent from "../layout/PrimaryContent";

function Home() {
    return(
        <PrimaryContent>
            <Form>
                <Form.Control size="lg" type="text" placeholder="Nickname" />
                <br/>
                <br/>
                <Button variant="success">Play</Button>
            </Form>
        </PrimaryContent>
    )
}

export default Home;