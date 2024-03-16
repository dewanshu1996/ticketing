import { useEffect } from "react";
import { useRouter } from "next/router";

const LandingPage = ({ currentUser }) => {
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/tickets");
    } else {
      router.push("auth/login");
    }
  }, []);

  return <div></div>;
};

LandingPage.getInitialProps = async (context) => {
  return {};
};

export default LandingPage;
