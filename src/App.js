import { useState, useEffect } from "react";
import axios from "axios";
import ReactToolTip from "react-tooltip";
import MapChart from "./MapChart";
import "./App.css";

function App() {
  const [content, setContent] = useState("");
  const [country, setCountry] = useState("");
  const [data, setData] = useState();

  async function getData() {
    const response = await axios.get("https://corona-api.com/countries");

    if (response.data) {
      setData(response.data.data);
    }
  }

  function showData(country) {
    if (country === "United States of America") {
      country = "USA";
    }

    if (country === "S. Sudan") {
      country = "South Sudan";
    }

    if (country === "Dem. Rep. Congo") {
      country = "Congo";
    }

    for (let i = 0; i < data.length; i++) {
      if (country === data[i].name) {
        //return `I found it! code: ${data[i].code}`;
        return (
          <>
            <p>
              Confirmed cases:{" "}
              {data[i].latest_data.confirmed
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
            <p>
              Critical:{" "}
              {data[i].latest_data.critical
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
            <p>
              Deaths:{" "}
              {data[i].latest_data.deaths
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
            <p>
              Recovered:{" "}
              {data[i].latest_data.recovered
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
          </>
        );
      }
    }
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {data ? (
        <>
          <MapChart setTooltipContent={setContent} setCountry={setCountry} />
          <ReactToolTip multiline={true}>
            <p>{content}</p>
            {showData(country)}
          </ReactToolTip>
        </>
      ) : null}
    </div>
  );
}

export default App;
