import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/"); 
    window.location.reload(); 
  };

  return (
    <div className="bg-gray-200 p-4 mb-5 flex items-center justify-between">
      <span className="font-bold text-lg">Employee Panel</span>
      {user && (
        <div className="flex gap-x-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/employees")}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Employees List
          </button>
          <button
            onClick={handleLogout}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>
      )}
    </div>
  );
};

export default Header;
