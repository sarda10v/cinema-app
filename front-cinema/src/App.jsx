import React from "react";
import Cinema from "./components/Cinema/Cinema";
import { Route, Routes } from "react-router-dom";
import CinemaSpecific from "./components/CinemaSpecific/CinemaSpecific";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Cinema />} />
      <Route path="/cinema/:id" element={<CinemaSpecific />} />
    </Routes>
  );
};

export default App;
