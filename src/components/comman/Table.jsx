const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto surface-card">
      <table className="w-full">
        <thead className="border-b border-[var(--border)]">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="text-left px-6 py-5 text-[var(--muted)] font-semibold"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b border-[var(--border)] hover:bg-[var(--surface-soft)] transition-colors"
            >
              {Object.values(row).map((cell, i) => (
                <td
                  key={i}
                  className="px-6 py-5 text-[var(--body-text)]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
