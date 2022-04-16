import { Helmet } from "react-helmet";

export const helmets = (
  <Helmet
    title={`CALI MEMO | ${pathname}`}
    description="즐거운 다이어리 생활"
    htmlAttributes={{ lang: "ko" }}
    meta={[
      {
        charset: "UTF-8",
      },
      {
        name: "viewport",
        content:
          "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover",
      },
      {
        "http-equiv": "X-UA-Compatible",
        content: "IE=edge",
      },
      {
        name: "og:title",
        content: "CALI MEMO",
      },
      {
        name: "og:description",
        content: "CALI MEMO",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:image",
        content: "http://www.calimemo.info/favicon.ico",
      },
    ]}
    link={[
      {
        rel: "shortcut icon",
        href: "/favicon.ico",
      },
    ]}
  />
);
