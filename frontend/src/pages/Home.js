import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import axios from "axios";
import Post from "../components/Post";

const Home = () => {
  return (
    <div className="display">
      <Navigation />
      <div>
        <Post />
      </div>
    </div>
  );
};

export default Home;
