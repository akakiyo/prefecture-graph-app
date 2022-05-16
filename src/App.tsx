import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Graph from "./routes/Graph";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Graph />} />
      </Routes>
    </Layout>
  );
}

export default App;
