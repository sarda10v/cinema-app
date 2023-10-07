import React from "react";
import Cinema from "./components/Cinema/Cinema";
import { Route, Routes } from "react-router-dom";
import CinemaSpecific from "./components/CinemaSpecific/CinemaSpecific";
import Admin from "./components/pages/Admin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Cinema />} />
      <Route path="/administration" element={<Admin />} />
      <Route path="/cinema/:id" element={<CinemaSpecific />} />
    </Routes>
  );
};

export default AppRoutes;
