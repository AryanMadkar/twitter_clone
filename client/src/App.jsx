import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFOund from "./pages/NotFOund";
import Homepage from "./pages/Homepage";
import Leftbar from "./components/Leftbar";
import Rightbar from "./components/Rightbar";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="flex flex-row justify-between w-full h-full p-2 overflow-x-hidden">
      <Leftbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<NotFOund />} />
      </Routes>
      <Rightbar />
    </div>
  );
}

export default App;
