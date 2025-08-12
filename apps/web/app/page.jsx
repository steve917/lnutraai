"use client";
import { useState } from "react";
import { api } from "../lib/api";
import ResultsChart from "../components/ResultsChart";

export default function Home() {
  const [token, setToken] = useState(null);
  const [csvName, setCsvName] = useState("");
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  async function doLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const r = await api("/auth/login", { method: "POST", body: { email, password }});
    setToken(r.access_token);
  }
  async function upload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploads/csv`, { method: "POST", body: fd });
    const j = await r.json();
    setCsvName(j.filename);
  }
  async function simulate(cohort) {
    setBusy(true);
    try {
      const r = await api("/simulate", { method: "POST", body: { cohort, parameters: {} }});
      setResult(r);
    } finally {
      setBusy(false);
    }
  }
  function exportPng() {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url; a.download = "simulation.png"; a.click();
  }
  return (
    <main>
      <h1 style={{color:"var(--text)"}}>{process.env.NEXT_PUBLIC_COMPANY_NAME}</h1>
      {!token && (
        <form onSubmit={doLogin} aria-label="Login form" className="card">
          <label>Email <input name="email" type="email" required aria-label="Email" /></label>
          <label>Password <input name="password" type="password" required aria-label="Password" /></label>
          <button className="btn" type="submit">Login</button>
        </form>
      )}
      {token && (
        <>
          <div className="card" role="region" aria-label="Onboarding and Upload">
            <p>Logged in. Upload CSV (optional): <input onChange={upload} type="file" accept=".csv" aria-label="Upload CSV" /></p>
            {csvName && <p>Uploaded: <strong>{csvName}</strong></p>}
            <div className="row">
              <button className="btn" onClick={() => simulate("SoC")} disabled={busy}>Run SoC</button>
              <button className="btn" onClick={() => simulate("FMD")} disabled={busy}>Run FMD</button>
              <button className="btn" onClick={exportPng} disabled={!result}>Export PNG</button>
            </div>
          </div>
          {result && (
            <div className="card" role="region" aria-label="Simulation Results">
              <ResultsChart data={result.chart} />
              <pre className="code">{JSON.stringify(result.metrics, null, 2)}</pre>
            </div>
          )}
        </>
      )}
    </main>
  );
}
