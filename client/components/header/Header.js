import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import buildClient from "../../api/build.client";
import axios from "axios";
import { useRouter } from "next/router";

const Headet = ({ currentUser }) => {
  const router = useRouter();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container
        style={{
          margin: "2px",
        }}
      >
        <Navbar.Brand href="/">Ticketing</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            {!currentUser && <Nav.Link href="/auth/login">Sign In</Nav.Link>}
            {currentUser && (
              <>
                <Nav.Link href="/ticket">Add A Ticket</Nav.Link>
                <Nav.Link href="/tickets">Show Tickets</Nav.Link>
                <Nav.Link
                  href="#"
                  onClick={async () => {
                    await axios.get("/api/users/sign-out");
                    router.push("/");
                  }}
                >
                  Sign Out
                </Nav.Link>
              </>
            )}
            {!currentUser && <Nav.Link href="/auth/signup">Sign Up</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Headet.getInitialProps = async ({ req }) => {
  try {
    const { data } = await buildClient(req).get("/api/users/current-user");
    return data;
  } catch (error) {
    return {};
  }
};

export default Headet;
