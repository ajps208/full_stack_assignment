import { useEffect, useState } from "react";
import { Form } from "./Components/Form";
import { SuccessTable } from "./Components/SuccessTable";
import { api } from "./Services/api";
import { Header } from "./Components/Header";


export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await api.get("/success");
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data, "data in app");
  

  return (
    <>
      <Header />
      <Form refresh={fetchData} />
      {loading ? <p>Loading...</p> : <SuccessTable data={data} />}
    </>
  );
}
