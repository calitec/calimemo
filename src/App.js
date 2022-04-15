import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import loadable from "@loadable/component";
import Layouts from "./components/Layouts";
import useSWR, { useSWRConfig } from "swr";
import fetcher from "./utils/fetcher";
import Home from "./pages/Home";
import Chart from "./pages/Chart";
import Login from "./pages/Login";
import Date from "./pages/Date";

const Register = loadable(() => import("./pages/Register"));
const NotFound = loadable(() => import("./pages/NotFound"));

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data, error } = useSWR("/user", fetcher);
  let layout;

  useEffect(() => {
    const onUnauthorized = () => {
      navigate("/Login");
    };

    if (error && pathname !== "/Register") onUnauthorized();
  }, [data, error]);

  if (pathname == "/Login" || pathname == "/Register") {
  } else {
    layout = <Layouts />;
  }

  return (
    <Routes>
      <Route path="/" element={layout}>
        <Route index element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Date/:id" element={<Date />} />
        <Route path="/Chart" element={<Chart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
