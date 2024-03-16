import buildClient from "../../api/build.client";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CustomizedSnackbar from "../../components/ui/SnakeBar";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const ShowTicket = ({ ticket }) => {
  const router = useRouter();

  const [snakeBarState, setSnakeBarState] = useState({
    messages: [],
    type: "",
  });

  const orderTicket = async (ticketId) => {
    try {
      const { data } = await axios.post(`/api/order/create`, {
        ticketId: ticketId,
      });
      setSnakeBarState({
        messages: ["order created successfully"],
        type: "success",
      });

      router.push(`/order/${data._id}`);
    } catch (error) {
      setSnakeBarState({ messages: error.response.data.errors, type: "error" });
    }
  };

  return (
    <>
      <Container>
        <Card
          style={{
            width: "50%",
            margin: "auto",
          }}
        >
          <Card.Body>
            <h5>{`Ticket - ${ticket._id}`}</h5>
            <Row style={{ display: "flex", justifyContent: "flex-start" }}>
              <Col>
                <b>Title</b>
              </Col>
              <Col>{ticket.title}</Col>
            </Row>
            <Row style={{ display: "flex", justifyContent: "flex-start" }}>
              <Col>
                <b>Price</b>
              </Col>
              <Col>{ticket.price}</Col>
            </Row>
            <br></br>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="outline-danger"
                type="Purchase"
                onClick={(e) => {}}
              >
                Back
              </Button>
              <Button
                variant="primary"
                type="Purchase"
                onClick={(e) => {
                  orderTicket(ticket._id);
                }}
              >
                Submit
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
      <CustomizedSnackbar
        messages={snakeBarState.messages}
        type={snakeBarState.type}
      />
    </>
  );
};

ShowTicket.getInitialProps = async (context) => {
  const { id } = context.query;
  const { data } = await buildClient(context.req).get(
    `/api/ticket/show-ticket/${id}`
  );
  return { ticket: data };
};

export default ShowTicket;
