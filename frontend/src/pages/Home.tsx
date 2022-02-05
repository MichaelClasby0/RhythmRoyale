import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PrimaryContent from "../layout/PrimaryContent";
import { useNavigate } from "react-router-dom";
import {useState} from "react";

function Home() {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const onFormSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        localStorage.setItem("name", name)
        navigate("/lobby");
    }
    return(
        <PrimaryContent>
            <Form onSubmit={onFormSubmit}>
                <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Nickname"
                    onChange={({target:{value}}) => setName(value)}
                    value={name}
                />
                <br/>
                <br/>
                <Button type="submit" variant="success">Play</Button>
            </Form>
        </PrimaryContent>
    )
}

export default Home;