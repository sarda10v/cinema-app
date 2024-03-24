import React from "react";
import { Cinema } from "./components/Cinema/Cinema";
import { Route, Routes } from "react-router-dom";
import CinemaSpecific from "./components/CinemaSpecific/CinemaSpecific";
import Admin from "./pages/Admin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Cinema />} />
      <Route path="/liked" element={<Cinema />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/cinema/:id" element={<CinemaSpecific />} />
    </Routes>
  );
};

export default AppRoutes;
