import { useEffect, useState } from "react";
import { api } from "./Services/api";
import { Loader } from "./Components/Loader";
import { Header } from "./Components/Header";
import { Form } from "./Components/Form";
import { SuccessTable } from "./Components/SuccessTable";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

<ToastContainer autoClose={3000} />;

export default function App() {
  const [view, setView] = useState("form");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch success data
  useEffect(() => {
    if (view === "success") {
      setLoading(true);
      api
        .get("/success")
        .then((res) => setData(res.data))
        .finally(() => setLoading(false));
    }
  }, [view]);

  return (
    <>
    {/* header */}
      <Header view={view} setView={setView} />
      {/* show form  and success table*/}
      {view === "form" && <Form />}
      {view === "success" &&
        (loading ? <Loader /> : <SuccessTable data={data} />)}

      {/* show toast */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
