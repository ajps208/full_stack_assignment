export const Header = ({ view, setView }) => {
  return (
    // Header
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-tight">
          Submit<span className="text-blue-600">Form</span>
        </h2>

        <nav className="flex gap-1 bg-slate-100 p-1 rounded-lg">
          {/* Form Button */}
          <button
            onClick={() => setView("form")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
              view === "form"
                ? "bg-white shadow text-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Form
          </button>
          {/* Records Button */}
          <button
            onClick={() => setView("success")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
              view === "success"
                ? "bg-white shadow text-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Records
          </button>
        </nav>
      </div>
    </header>
  );
};
