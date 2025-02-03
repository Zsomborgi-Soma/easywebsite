import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const F1DataViewer = () => {
  const [year, setYear] = useState("");
  const [round, setRound] = useState("");
  const [teams, setTeams] = useState([]);
  const [circuits, setCircuits] = useState([]);
  const [team, setTeam] = useState("");
  const [circuit, setCircuit] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const populateTeamsAndCircuits = async () => {
    if (!year || isNaN(year)) return;
    try {
      const teamsRes = await fetch(`https://ergast.com/api/f1/${year}/constructors.json`);
      const circuitsRes = await fetch(`https://ergast.com/api/f1/${year}/circuits.json`);
      if (!teamsRes.ok || !circuitsRes.ok) throw new Error("Unable to fetch teams or circuits.");
      const teamsData = await teamsRes.json();
      const circuitsData = await circuitsRes.json();
      setTeams(teamsData.MRData.ConstructorTable.Constructors);
      setCircuits(circuitsData.MRData.CircuitTable.Circuits);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async () => {
    if (!year || isNaN(year)) {
      setError("Please enter a valid year.");
      return;
    }
    setError(null);
    setResults([]); // Clear previous results before fetching new data

    let url = `https://ergast.com/api/f1/${year}`;
    if (round && !isNaN(round)) url += `/${round}`;
    if (team) url += `/constructors/${team}`;
    if (circuit) url += `/circuits/${circuit}`;
    url += "/results.json";

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Data not found for the specified criteria.");
      const data = await response.json();
      setResults(data.MRData?.RaceTable?.Races || []);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5 text-light" style={{ backgroundColor: "#1e1e1e", padding: "20px", borderRadius: "10px" }}>
      <h1 className="text-danger">F1 Data Viewer</h1>
      <div className="mb-3">
        <label className="form-label">Year:</label>
        <input type="text" className="form-control" value={year} onChange={(e) => setYear(e.target.value)} onBlur={populateTeamsAndCircuits} placeholder="e.g., 2023" />
        <label className="form-label">Round (optional):</label>
        <input type="text" className="form-control" value={round} onChange={(e) => setRound(e.target.value)} placeholder="e.g., 1" />
        <label className="form-label">Team (optional):</label>
        <select className="form-select" value={team} onChange={(e) => setTeam(e.target.value)}>
          <option value="">All Teams</option>
          {teams.map((t) => (
            <option key={t.constructorId} value={t.constructorId}>{t.name}</option>
          ))}
        </select>
        <label className="form-label">Circuit (optional):</label>
        <select className="form-select" value={circuit} onChange={(e) => setCircuit(e.target.value)}>
          <option value="">All Circuits</option>
          {circuits.map((c) => (
            <option key={c.circuitId} value={c.circuitId}>{c.circuitName}</option>
          ))}
        </select>
        <button className="btn btn-danger mt-3" onClick={fetchData}>Fetch F1 Data</button>
      </div>
      <h2 className="text-danger">Results:</h2>
      {error && <p className="text-warning">{error}</p>}
      {results.length > 0 ? (
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Race Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {results.map((race) => (
              race.Results.map((result) => (
                <tr key={`${race.raceName}-${result.Constructor.name}`}>
                  <td><a href={race.url || "#"} target="_blank" className="text-danger">{race.raceName}</a></td>
                  <td>{race.date}</td>
                  <td>{`${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`}</td>
                  <td>{result.Constructor.name}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      ) : <p>No race data available.</p>}
    </div>
  );
};

export default F1DataViewer;
