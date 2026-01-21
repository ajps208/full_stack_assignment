import { useMemo, useState } from "react";
import { formatDate } from "../Helpers/helpers";



const ITEMS_PER_PAGE = 5;

export const SuccessTable = ({ data = [] }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Search filter
  const filteredData = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return data;

    return data.filter(
      (item) =>
        item.name?.toLowerCase().includes(q) ||
        item.email?.toLowerCase().includes(q) ||
        item.phoneNumber?.toLowerCase().includes(q),
    );
  }, [search, data]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, page]);

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">
            Successful Registrations
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Total successful registrations :
            <span className="ml-1 font-semibold text-slate-700">
              {filteredData.length}
            </span>
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full max-w-sm px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-600"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-100 rounded-lg">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-4 py-3 text-xs uppercase text-slate-400">
                Name
              </th>
              <th className="px-4 py-3 text-xs uppercase text-slate-400">
                Email
              </th>
              <th className="px-4 py-3 text-xs uppercase text-slate-400">
                Portfolio
              </th>
              <th className="px-4 py-3 text-xs uppercase text-slate-400">
                DOB
              </th>
              <th className="px-4 py-3 text-xs uppercase text-slate-400 text-right">
                Phone
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-sm text-slate-400"
                >
                  No records found
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium">{item.name}</td>

                  <td className="px-4 py-3 text-sm text-slate-500">
                    {item.email}
                  </td>

                  <td className="px-4 py-3 text-sm">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-sm text-slate-500">
                    {formatDate(item.dob)}
                  </td>

                  <td className="px-4 py-3 text-sm text-right font-mono">
                    {item.phoneNumber}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <div className="flex items-center justify-end gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 text-sm border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm text-slate-500">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 text-sm border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
