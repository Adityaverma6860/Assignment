import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
    },
    gender: { 
        type: String, 
        required: true,
        enum: ['male', 'female', 'other'],
    },
    mobileNumber: { 
        type: String, 
        required: true 
    },
    designation: { 
        type: String, 
        required: true 
    },
    course: { 
        type: String, 
        required: true 
    },
    profilePic: { 
        type: String, 
        required: true
    },
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);
Employee.createIndexes({ name: 1, email: 1 }, { unique: true });

export { Employee };

