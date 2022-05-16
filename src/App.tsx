import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Graph from "./routes/Graph";
import Ranking from "./routes/Ranking";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Graph />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </Layout>
  );
}

export default App;
