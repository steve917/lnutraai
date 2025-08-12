import React, { useState } from "react";
import { SafeAreaView, Text, Button, View } from "react-native";

export default function App() {
  const [token, setToken] = useState(null);
  const [result, setResult] = useState(null);
  async function login() {
    const r = await fetch(process.env.API_URL + "/auth/login", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ email:"user@example.com", password:"pass"})});
    const j = await r.json(); setToken(j.access_token);
  }
  async function simulate() {
    const r = await fetch(process.env.API_URL + "/simulate", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ cohort:"FMD", parameters:{} })});
    const j = await r.json(); setResult(j);
  }
  return (
    <SafeAreaView style={{ padding: 24 }}>
      {!token ? <Button title="Login" onPress={login} /> : <Button title="Run FMD" onPress={simulate} />}
      {result && <View><Text>Run: {result.run_id}</Text><Text>Δ weight: {result.metrics?.delta_weight}</Text></View>}
    </SafeAreaView>
  );
}
