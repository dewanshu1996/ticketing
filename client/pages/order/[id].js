import buildClient from "../../api/build.client";
import { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";

const OrderById = ({ order, currentUser }) => {
  const [timeLeft, setTimeleft] = useState(0);

  useEffect(() => {
    const millis = Math.round((new Date(order.expired) - new Date()) / 1000);

    setTimeleft(millis);

    const timer = () => {
      setTimeleft((prevState) => prevState - 1);
    };

    const interval = setInterval(timer, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h3>{`Time left ${timeLeft}`}</h3>
      <StripeCheckout
        token={() => {
          console.log("callback");
        }}
        stripeKey="pk_test_51MDMFUSIRjEC2AoZ0yG8hoadSSbF8w4yMe2VO9PKgyfv44QkQ9pwcDS0EhCqEd2hS6FNsXZUGZBhRz9wsv52idRk00R00Vy3Gp"
        amount={order.amount}
        email={currentUser.email}
      />
    </div>
  );
};

OrderById.getInitialProps = async (context) => {
  const { id } = context.query;
  const { data } = await buildClient(context.req).get(`/api/order/${id}`);
  return { order: data };
};

export default OrderById;
