export const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative flex items-center justify-center w-20 h-20">
        {/* Spinner */}
        <div className="absolute inset-0 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />

        {/* Text inside */}
        <span className="text-xs font-semibold text-slate-600">
          Loading...
        </span>
      </div>
    </div>
  );
};
