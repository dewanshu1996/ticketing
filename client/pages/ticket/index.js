import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import useInput from "../../hooks/useInput";
import Alert from "../../components/ui/Alert";
import axios from "axios";
import CustomizedSnackbar from "../../components/ui/SnakeBar";
import { useState } from "react";
import { useRouter } from "next/router";

const validateFunction = (name, value, formValues) => {
  return { errorMsg: "", hasError: false };
};

const Ticket = () => {
  const router = useRouter();
  const [snakeBarState, setSnakeBarState] = useState({
    messages: [],
    type: "",
  });

  const formUtils = useInput(
    {
      values: {
        title: "",
        price: "",
      },
      touched: {
        title: false,
        price: false,
      },
      errors: {
        title: false,
        price: false,
      },
      errMsg: {
        title: "",
        price: "",
      },
    },
    validateFunction
  );

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/ticket/new-ticket", {
        title: formUtils.enteredValue.title,
        price: formUtils.enteredValue.price,
      });

      setSnakeBarState({
        messages: ["Ticket created successfully"],
        type: "success",
      });
      router.push("/tickets");
    } catch (error) {
      setSnakeBarState({ messages: error.response.data.errors, type: "error" });
    }
  };

  return (
    <>
      <Container>
        <Card>
          <Card.Body>
            <h3>Create A New Ticket</h3>
            <Form
              onSubmit={(e) => {
                submitForm(e);
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  placeholder="Enter title"
                  value={formUtils.enteredValue.title}
                  onChange={(e) => {
                    formUtils.valueChangeHandler("title", e);
                  }}
                  onBlur={(e) => {
                    formUtils.blurEventHandler("title", e);
                  }}
                />
                {formUtils.hasError.title && (
                  <Alert message={formUtils.errorMsg.title} />
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  placeholder="Enter price"
                  value={formUtils.enteredValue.price}
                  onChange={(e) => {
                    formUtils.valueChangeHandler("price", e);
                  }}
                  onBlur={(e) => {
                    formUtils.blurEventHandler("price", e);
                  }}
                />
                {formUtils.hasError.price && (
                  <Alert message={formUtils.errorMsg.price} />
                )}
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => {
                  submitForm(e);
                }}
              >
                Submit
              </Button>
            </Form>
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

export default Ticket;
