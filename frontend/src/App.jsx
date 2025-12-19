import { useState } from "react";

export default function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function testApi() {
    setError("");
    setResult(null);

    try {
      const res = await fetch("http://localhost:5000/health");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Request failed");
    }
  }

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Frontend</h1>

      <button onClick={testApi}>Test backend /health</button>

      {error && (
        <p style={{ marginTop: 16, color: "crimson" }}>
          Error: {error}
        </p>
      )}

      {result && (
        <pre style={{ marginTop: 16 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
