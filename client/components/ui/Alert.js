import { BiError } from "react-icons/bi";
import Container from "react-bootstrap/Container";

export default (props) => {
  return (
    <Container
      style={{
        fontStyle: "bold",
        color: "red",
        display: "flex",
        alignItems: "center",
        gap: "3px",
      }}
    >
      <BiError />
      <div
        style={{
          fontSize: "12px",
        }}
      >
        {props.message}
      </div>
    </Container>
  );
};
