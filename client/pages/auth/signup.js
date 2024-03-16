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

const SignUp = () => {
  const router = useRouter();

  const [snakeBarState, setSnakeBarState] = useState({
    messages: [],
    type: "",
  });

  const formUtils = useInput(
    {
      values: {
        email: "",
        password: "",
      },
      touched: {
        email: false,
        password: false,
      },
      errors: {
        email: false,
        password: false,
      },
      errMsg: {
        email: "",
        password: "",
      },
    },
    validateFunction
  );

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/users/sign-up", {
        email: formUtils.enteredValue.email,
        password: formUtils.enteredValue.password,
      });

      setSnakeBarState({
        messages: ["User is registered successfully"],
        type: "success",
      });

      router.push("/");
    } catch (error) {
      setSnakeBarState({ messages: error.response.data.errors, type: "error" });
    }
  };

  return (
    <>
      <Container>
        <Card>
          <Card.Body>
            <h3>Sign Up</h3>
            <Form
              onSubmit={(e) => {
                submitForm(e);
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  placeholder="Enter email"
                  value={formUtils.enteredValue.email}
                  onChange={(e) => {
                    formUtils.valueChangeHandler("email", e);
                  }}
                  onBlur={(e) => {
                    formUtils.blurEventHandler("email", e);
                  }}
                />
                {formUtils.hasError.email && (
                  <Alert message={formUtils.errorMsg.email} />
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={formUtils.enteredValue.password}
                  onChange={(e) => {
                    formUtils.valueChangeHandler("password", e);
                  }}
                  onBlur={(e) => {
                    formUtils.blurEventHandler("password", e);
                  }}
                />
                {formUtils.hasError.password && (
                  <Alert message={formUtils.errorMsg.password} />
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

const validateFunction = (name, value, formValues) => {
  if (name === "email") {
    if (value === "") {
      return { errorMsg: "Field is mandatory", hasError: true };
    }
  } else if (name === "password") {
    if (value === "") {
      return { errorMsg: "Field is mandatory", hasError: true };
    }
  }
  return { errorMsg: "", hasError: false };
};

export default SignUp;
