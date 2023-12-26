import React, { useState } from "react";
import axios from "axios";
import {
  VictoryChart,
  VictoryBar,
  VictoryTooltip,
  VictoryTheme,
} from "victory";

function App() {
  const [username, setUsername] = useState("");
  const [contributionsData, setContributionsData] = useState(null);

  const handleFetchContributions = async () => {
    const data = username.trim();
    if (data === "") {
      alert("Please Enter Username");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/contributions",
          { username }
        );
        setContributionsData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Github Contributions Chart</h1>
      <div>
        <label>Enter GitHub Username: </label>
        <input
          style={{
            padding: "5px",
            paddingLeft: "10px",
            outline: "none",
            borderRadius: "10px",
            border: "1px solid red",
            borderBottom: "2px solid red",
            marginLeft: "5px",
          }}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          style={{
            marginLeft: "10px",
            cursor: "pointer",
            backgroundColor: "#49108B",
            border: "none",
            padding: "10px",
            borderRadius: "10px",
            color: "white",
          }}
          onClick={handleFetchContributions}
        >
          Fetch Contributions
        </button>
      </div>

      {contributionsData && (
        <div>
          <h2>Total Contributions: {contributionsData.totalContributions}</h2>
          <VictoryChart theme={VictoryTheme.material} width={1200} height={200}>
            <VictoryBar
              data={contributionsData.weeks[0].contributionDays}
              x="date"
              y="contributionCount"
              labels={({ datum }) =>
                `Count: ${datum.contributionCount}\nDate: ${datum.date}`
              }
              labelComponent={<VictoryTooltip />}
            />
          </VictoryChart>
        </div>
      )}
    </div>
  );
}

export default App;
