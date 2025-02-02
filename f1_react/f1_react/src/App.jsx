import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const F1DataViewer = () => {
  const [year, setYear] = useState("");
  const [round, setRound] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!year || isNaN(year)) {
      setError("Please enter a valid year.");
      setResults([]);
      return;
    }

    let url = `https://ergast.com/api/f1/${year}`;
    if (round && !isNaN(round)) {
      url += `/${round}`;
    }
    url += ".json";

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Data not found for the specified year and round.");
      const data = await response.json();
      setResults(data.MRData?.RaceTable?.Races || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResults([]);
    }
  };

  return (
    <div className="container mt-4 text-light bg-dark p-4 rounded">
      <h1 className="text-danger text-center">F1 Data Viewer</h1>
      <div className="mb-3">
        <label className="form-label">Year:</label>
        <input type="text" className="form-control" value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g., 2023" />
      </div>
      <div className="mb-3">
        <label className="form-label">Round (optional):</label>
        <input type="text" className="form-control" value={round} onChange={(e) => setRound(e.target.value)} placeholder="e.g., 1" />
      </div>
      <button className="btn btn-danger w-100" onClick={fetchData}>Fetch F1 Data</button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {results.length > 0 && (
        <div className="mt-4">
          <h2 className="text-danger">Results:</h2>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Race Name</th>
                <th>Date</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {results.map((race) => (
                <tr key={race.round}>
                  <td>
                    <a href={race.url} target="_blank" rel="noopener noreferrer" className="text-danger">
                      {race.raceName}
                    </a>
                  </td>
                  <td>{race.date}</td>
                  <td>{race.Circuit.Location.locality}, {race.Circuit.Location.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default F1DataViewer;
