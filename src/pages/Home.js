import CustomCalendar from "../components/CustomCalendar";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>달력 | Calimemo</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <CustomCalendar />
    </>
  );
}
