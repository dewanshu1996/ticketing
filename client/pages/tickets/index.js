import buildClient from "../../api/build.client";
import { Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Link from "next/link";

const Tickets = ({ tickets }) => {
  return (
    <>
      <Container>
        <Card>
          <Card.Body>
            <h1>Tickets</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((item) => (
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>
                      <Link href={`/tickets/${item._id}`}>Link</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

Tickets.getInitialProps = async (context) => {
  console.log(context);

  const { data } = await buildClient(context.req).get(
    "/api/ticket/show-tickets"
  );

  return { tickets: data };
};

export default Tickets;
