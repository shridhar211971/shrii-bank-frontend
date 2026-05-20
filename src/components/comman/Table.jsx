const Table = ({
  columns,
  data,
}) => {

  return (
    <div
      className="
        overflow-x-auto
        bg-white/5
        border
        border-white/10
        rounded-3xl
      "
    >

      <table className="w-full">

        <thead
          className="
            border-b
            border-white/10
          "
        >

          <tr>

            {columns.map((column) => (

              <th
                key={column}
                className="
                  text-left
                  px-6
                  py-5
                  text-slate-300
                  font-semibold
                "
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
              className="
                border-b
                border-white/5
                hover:bg-white/5
              "
            >

              {Object.values(row).map(
                (cell, i) => (

                  <td
                    key={i}
                    className="
                      px-6
                      py-5
                      text-white
                    "
                  >
                    {cell}
                  </td>

                )
              )}

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default Table;