import React from "react";
import Header from "./Header";

const Dashboard = () => {
  const user = localStorage.getItem("user");

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center ">
      <h2>Welcome {user}</h2>
      </div>
    </div>
  );
};

export default Dashboard;
