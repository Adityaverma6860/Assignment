

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Create from "./components/Create";
import EmployeeList from "./components/EmployeeList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/create" element={<Create/>} />
        <Route path="/employees" element={<EmployeeList />} />
        {/* <Route path="/edit/:id" element={<EditEmployee />} />  */}

      </Routes>
    </BrowserRouter>
  );
};

export default App;

