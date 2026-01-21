import { useState } from "react";
import { Header } from "./Components/Header";
import { Form } from "./Components/Form";
import { SuccessTable } from "./Components/SuccessTable";

export default function App() {
  const [view, setView] = useState("form");

  return (
    <>
      <Header view={view} setView={setView} />
      {view === "form" && <Form />}
      {view === "success" && <SuccessTable />}
    </>
  );
}
