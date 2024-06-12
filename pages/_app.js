import App from "next/app";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";


class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <AppProvider
        i18n={{
          Polaris: {
            Common: {
              pagination: {
                next: "Next",
                previous: "Previous",
              },
            },
          },
        }}
      >
        <Component {...pageProps} />
      </AppProvider>
    );
  }
}

export default MyApp;
