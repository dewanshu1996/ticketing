import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/header/Header";
import buildClient from "../api/build.client";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <Header currentUser={currentUser} />
      <Component {...pageProps} currentUser={currentUser} />
    </>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  let pageProps = {};

  const { data } = await buildClient(appContext.ctx.req).get(
    "/api/users/current-user"
  );

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return { pageProps, ...data };
};

export default AppComponent;
