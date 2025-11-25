import { useEffect, useState } from "react";
import views from "../data/views";
import serverAPI from "../data/serverAPI";
export default function Component({ props }) {
  const [query, setQuery] = useState([]);

  useEffect(() => {
    // example: use first view name
    async function load(){
      const fetchedView = await fetchView(props.selectedAction)
      console.log(fetchView)
      const tableToDisplay = convertToTable(fetchedView)
      console.log(tableToDisplay)
      setQuery(tableToDisplay)
    }
    load()
  }, [props.selectedAction]);

	useEffect(() => {
		console.log(query)
	}, [query])

  return (
    <div className="w-[90%] h-[90%] flex justify-center items-center">
      <div>
        {query.map((row, i) => (
          <div key={i} className="flex">
            {row.map((cell, j) => (
              <Cell key={j} value={cell} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}


async function fetchView(viewName) {
  try {
    const viewEndPoint = serverAPI() + `/views/${viewName}`;
    console.log(viewEndPoint);

    const resp = await fetch(viewEndPoint);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

    const data = await resp.json();
    console.log("View data:", data);

    return data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

function Cell({ value }) {
  return <div className="p-1 border border-amber-50 w-30 overflow-scroll bg-white h-10 
  cursor-pointer hover:bg-amber-50 active:h-fit active:w-fit">{value}</div>;
}

function convertToTable(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  // Get column names from first object
  const headers = Object.keys(data[0]);

  // Map each object into a row of values
  const rows = data.map(obj =>
    headers.map(h => {
      const value = obj[h];
      return value === null ? "null" : value;  // convert null → "null"
    })
  );

  return [headers, ...rows];
}



