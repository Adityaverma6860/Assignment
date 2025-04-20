// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "./Header";

// const EmployeeList = () => {
//   const navigate = useNavigate();

//   const dummyEmployees = [
//     { id: 1, name: "Hukum", email: "hukum@test.com" },
//     { id: 2, name: "Yash", email: "yash@test.com" },
//   ];

//   return (
//     <div className="p-6">
//       <Header />
//       <div className="max-w-2xl mx-auto bg-white shadow-md rounded p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold">Employee List</h2>
//           <button
//             onClick={() => navigate("/create")}
//             className="bg-black text-white px-4 py-2 rounded "
//           >
//             Add Employee
//           </button>
//         </div>
//         <ul className="space-y-4">
//           {dummyEmployees.map((emp) => (
//             <li
//               key={emp.id}
//               className="border p-4 rounded"
//             >
//               <p className="font-medium">{emp.name}</p>
//               <p className="text-sm text-gray-500">{emp.email}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default EmployeeList;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/employees/");
        if (response.ok) {
          const data = await response.json();
          setEmployees(data.employees || []); 
        } else {
          console.error("Failed to fetch employees");
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="p-6">
      <Header />
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Employee List</h2>
          <button
            onClick={() => navigate("/create")}
            className="bg-black text-white px-4 py-2 rounded "
          >
            Add Employee
          </button>
        </div>
        <ul className="space-y-4">
          {employees.map((emp) => (
            <li key={emp._id} className="border p-4 rounded flex items-center gap-4">
              {emp.profilePic && (
                <img
                  src={emp.profilePic}
                  alt={emp.name}
                  className="w-12 h-12 object-cover rounded-full"
                />
              )}
              <div>
                <p className="font-medium">{emp.name}</p>
                <p className="text-sm text-gray-500">{emp.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployeeList;


