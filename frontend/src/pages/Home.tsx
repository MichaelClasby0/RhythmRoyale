import { FormEvent, useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../config";

function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [findingRoom, setFindingRoom] = useState(false);
  const [error, setError] = useState(false);

  const onFormSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setFindingRoom(true);
      const res = await fetch(
        `${backendUrl}/api/room?${new URLSearchParams({ name: name })}`
      );

      if (res.status === 200) {
        navigate(`/game/${await res.text()}`);
      } else {
        setError(true);
      }
    },
    [name, navigate]
  );

  if (error) {
    return <p>Failed to find a room please try again later</p>;
  }

  if (findingRoom) {
    return <p>Finding a room ...</p>;
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        onSubmit={onFormSubmit}
        style={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "70px" }}>Rhythm Royale</h1>
        <div style={{ height: "2vh" }} />
        <Form.Control
          size="lg"
          type="text"
          placeholder="Nickname"
          onChange={({ target: { value } }) => setName(value)}
          value={name}
          style={{
            width: "100%",
          }}
        />
        <div style={{ height: "1vh" }} />
        <Button
          type="submit"
          variant="success"
          style={{
            width: "100%",
          }}
        >
          Play
        </Button>
      </Form>
    </div>
  );
}

export default Home;
