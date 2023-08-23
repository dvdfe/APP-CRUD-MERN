import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";

const index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default index;