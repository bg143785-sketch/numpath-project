import React, { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./Home";
import Result from "./Result";
import Registration from "./Registration";
import MatchMaking from "./MatchMaking";
import UserProfile from "./UserProfile";
import Blog from "./Blog";
import ChatUI from "./ChatUI";

const App = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    day: "",
    month: "",
    year: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });

  const handleInputChange = (field, value) => {
    console.log("Input changed:", field, value);

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const { name, day, month, year } = formData;

    if (!isLoggedIn) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (name && day && month && year) {
      console.log("Submitting formData:", formData);
      navigate("/result");
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      day: "",
      month: "",
      year: "",
    });

    navigate("/");
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
            />
          }
        />

        <Route
          path="/result"
          element={
            isLoggedIn ? (
              <Result formData={formData} onReset={handleReset} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/login"
          element={<Registration setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route path="/Matchmaking" element={<MatchMaking />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/ChatUI" element={<ChatUI />} />
      </Routes>
    </div>
  );
};

export default App;
