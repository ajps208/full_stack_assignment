import { useEffect, useState } from "react";
import { api } from "./Services/api";
import { Loader } from "./Components/Loader";

export default function App() {
  const [view, setView] = useState("form");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (view === "success") {
      setLoading(true);
      api.get("/success")
        .then(res => setData(res.data))
        .finally(() => setLoading(false));
    }
  }, [view]);

  return (
    <>
      <Header view={view} setView={setView} />
      {view === "form" && <Form />}
      {view === "success" && (loading ? <Loader /> : <SuccessTable data={data} />)}
    </>
  );
}
