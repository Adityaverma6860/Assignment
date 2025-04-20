// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "./Header";

// const Create = () => {
//   const [form, setForm] = useState({});
//   const [image, setImage] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file)); 
//       setForm({ ...form, image: file }); 
//     }
//   };

//   const handleSubmit = () => {
//     console.log("Created:", form);
//     navigate("/employees");
//   };

//   return (
//     <div>
//       <Header />
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//           <h2 className="text-2xl font-bold mb-4 text-center">Create Employee</h2>

//           <input
//             name="name"
//             placeholder="Name"
//             onChange={handleChange}
//             className="w-full mb-3 p-2 border rounded"
//           />
//           <input
//             name="email"
//             placeholder="Email"
//             onChange={handleChange}
//             className="w-full mb-3 p-2 border rounded"
//           />
//           <input
//             name="mobile"
//             placeholder="Mobile"
//             onChange={handleChange}
//             className="w-full mb-3 p-2 border rounded"
//           />
//           <input
//             name="designation"
//             placeholder="Designation"
//             onChange={handleChange}
//             className="w-full mb-4 p-2 border rounded"
//           />

//           <input
//             type="file"
//             name="image"
//             onChange={handleImageChange}
//             className="w-full mb-4 p-2 border rounded"
//           />
          
//           {image && (
//             <div className="mb-4 text-center">
//               <img src={image} alt="Selected Preview" className="w-32 h-32 object-cover rounded" />
//             </div>
//           )}

//           <button
//             onClick={handleSubmit}
//             className="w-full bg-black text-white py-2 rounded "
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Create;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Create = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    gender: "",
    designation: "",
    course: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setForm((prevForm) => ({
        ...prevForm,
        image: file,
      }));
    }
  };

  // Submit form
  const handleSubmit = async () => {
    // Basic validation
    if (
      !form.name ||
      !form.email ||
      !form.mobileNumber ||
      !form.gender ||
      !form.designation ||
      !form.course
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("mobileNumber", form.mobileNumber);
    formData.append("gender", form.gender);
    formData.append("designation", form.designation);
    formData.append("course", form.course);
    if (form.image) {
      formData.append("profilePic", form.image);
    }

    try {
      const response = await fetch("http://localhost:5000/employees/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Employee created:", result);
        navigate("/employees");
      } else {
        const error = await response.json();
        console.error("Failed to create employee:", error);
        alert("Failed to create employee");
      }
    } catch (error) {
      console.error("Error while creating employee:", error);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Create Employee</h2>

          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            name="mobileNumber"
            placeholder="Mobile Number"
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />

          <select
            name="gender"
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            name="designation"
            placeholder="Designation"
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            name="course"
            placeholder="Course"
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mb-4 p-2 border rounded"
          />

          {imagePreview && (
            <div className="mb-4 text-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
