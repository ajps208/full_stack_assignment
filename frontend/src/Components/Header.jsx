export const Header = ({ view, setView }) => {
  return (
    <header>
      <h2>Form Submission</h2>
      <button onClick={() => setView("form")}>Form</button>
      <button onClick={() => setView("success")}>Success Table</button>
    </header>
  );
};