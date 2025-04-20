import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";

const EditEmploye = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleUpdate = () => {
    alert(`Employee ${id} updated`);
    navigate("/employees");
  };

  return (
    <div className="flex justify-center">
      <Header />
      <h2>Edit Employee ID: {id}</h2>
      <input placeholder="Name" /><br />
      <input placeholder="Email" /><br />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditEmploye;
