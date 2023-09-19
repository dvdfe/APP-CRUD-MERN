import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Terms from "../../pages/Terms";
import EditProfil from "../EditProfil";

const index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/edit-profil" element={<EditProfil />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default index;
