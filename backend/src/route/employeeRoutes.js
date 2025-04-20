import express from 'express';
const router = express.Router();
import {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    searchEmployees
} from '../controller/employeeControllers.js';
import upload from '../middleware/multer.js';



// Route to create a new employee
router.post('/', upload.single('profilePic'), createEmployee);
router.get('/', getEmployees);
router.get('/search', searchEmployees);
router.get('/:id', getEmployeeById);
router.put('/:id', upload.single('profilePic'), updateEmployee);
router.delete('/:id', deleteEmployee);


export default router;
