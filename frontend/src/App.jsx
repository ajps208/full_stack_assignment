import { useEffect, useState } from "react";
import { api } from "./Services/api";
import { Loader } from "./Components/Loader";
import { Header } from "./Components/Header";
import { Form } from "./Components/Form";
import { SuccessTable } from "./Components/SuccessTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [view, setView] = useState("form");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch data
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
    <div className="bg-[#f8fafc] text-slate-900 antialiased h-screen">
      {/* Header */}
      <Header view={view} setView={setView} />

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-lg">
          <div className="p-6">
            {/*form or success table  */}
            {view === "form" && <Form />}
            {view === "success" &&
              (loading ? <Loader /> : <SuccessTable data={data} />)}
          </div>
        </div>
      </main>
      
      {/* Toast container to notify */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
