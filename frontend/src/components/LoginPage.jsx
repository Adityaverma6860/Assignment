import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      localStorage.setItem("user", username);
      navigate("/dashboard");
    } else {
      alert("Enter valid credentials");
    }
  };

  return (
    <div>
      <Header />

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Login Page</h2>

          <div className="space-y-4">
            <input
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            <button
              onClick={handleLogin}
              className="w-full bg-black text-white p-3 rounded mt-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "./Header"; // Optional, remove if not using it

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     if (!username || !password) {
//       alert("Enter valid credentials");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/users/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Store user info in localStorage (like name or full user object)
//         localStorage.setItem("user", JSON.stringify(data.user));
//         navigate("/dashboard");
//       } else {
//         alert(data.message || "Login failed");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <Header />

//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
//           <h2 className="text-2xl font-bold mb-6 text-center">Login Page</h2>

//           <div className="space-y-4">
//             <input
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
//             />

//             <button
//               onClick={handleLogin}
//               className="w-full bg-black text-white p-3 rounded mt-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
//             >
//               Login
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;




