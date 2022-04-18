import CustomCalendar from "../components/CustomCalendar";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>달력 | Calimemo</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="preload"
          href="http://api.calimemo.info/user"
          as="fetch"
          crossorigin="anonymous"
        ></link>
      </Helmet>
      <CustomCalendar />
    </>
  );
}
