import { Employee } from '../model/employee.js';
import uploadSingleImageOnCloudinary from '../config/cloudinary.js'; 
// Create a new employee

export const createEmployee = async (req, res) => {
  try {
    const { name, email, gender, mobileNumber, designation, course } = req.body;

    const profilePicPath = req.file ? req.file.path : null;
    if (!profilePicPath) {
      return res.status(400).json({ error: 'No profile picture uploaded' });
    }

    const uploadedImage = await uploadSingleImageOnCloudinary(profilePicPath);

    if (uploadedImage?.error) {
      return res.status(uploadedImage.status || 500).json({ error: uploadedImage.error });
    }

    const newEmployee = new Employee({
      name,
      email,
      gender,
      mobileNumber,
      designation,
      course,
      profilePic: uploadedImage.secure_url,
    });

    await newEmployee.save();

    res.status(201).json({
      info: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    res.status(400).json({
      info: "Employee creation failed",
      error: error.message,
    });
  }
};


// New function for searching employees with pagination

export const searchEmployees = async (req, res) => {
    try {
      const { search, page = 1, limit = 10 } = req.query;
  
      const parsedLimit = parseInt(limit);
      const parsedPage = parseInt(page);
      const skip = (parsedPage - 1) * parsedLimit;
  
      const query = {};
      console.log("search is ->",search);
  
      // Search by name, email, or designation (exclude dates from regex)
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { designation: { $regex: search, $options: 'i' } }
        ];
      }
  
      console.log("query is ->",query);
      const employees = await Employee.find(query)
        .skip(skip)
        .limit(parsedLimit)
        .sort({ createdAt: -1 }); // Newest first
  
      const totalEmployees = await Employee.countDocuments(query);
      const totalPages = Math.ceil(totalEmployees / parsedLimit);
  
      res.status(200).json({
        employees,
        totalPages,
        currentPage: parsedPage,
        totalEmployees,
        resultsCount: employees.length
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Update getEmployees to focus on pagination and sorting
export const getEmployees = async (req, res) => {
    try {
        const { sortBy, order, page = 1, limit = 10 } = req.query;  
        const parsedPage = parseInt(page);
        const parsedLimit = parseInt(limit);

        // Sorting functionality
        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === 'desc' ? -1 : 1;
        }

        // Pagination
        const skip = (parsedPage - 1) * parsedLimit;

        const employees = await Employee.find()
            .sort(sortOptions)
            .skip(skip)
            .limit(parsedLimit);

        const totalEmployees = await Employee.countDocuments();
        const totalPages = Math.ceil(totalEmployees / parsedLimit);

        res.status(200).json({ employees, totalPages, currentPage: parsedPage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single employee by ID
export const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an employee by ID
export const updateEmployee = async (req, res) => {
    try {
        const profilePic = req.file ? req.file.path : null;
        console.log("image" ,profilePic)
        const uploadedImage = await uploadSingleImageOnCloudinary(profilePic);
        if(uploadedImage.error){
            console.error("Cloudinary upload error:", uploadedImage.error);
            return res.status(500).json({ info: "Employee creation failed", error: uploadedImage.error });
        }
        console.log("url is",uploadedImage);
        if(!uploadedImage) {
           return res.status(400).json({ error: 'No images uploaded' });
        }

        const updatedData = {
            ...req.body,
            profilePic: uploadedImage.secure_url
        };


        const employee = await Employee.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an employee by ID
export const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

