import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import loadable from "@loadable/component";
import Layouts from "./components/Layouts";
import useSWR from "swr";
import fetcher from "./utils/fetcher";
import { ToastContainer } from "react-toastify";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";

const Chart = loadable(() => import("./pages/Chart"));
const Login = loadable(() => import("./pages/Login"));
const Date = loadable(() => import("./pages/Date"));
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
    <>
      <HelmetProvider>
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
      </HelmetProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
