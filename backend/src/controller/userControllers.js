// import User from '../model/user.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// export const registerUser = async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         if (!username || !email || !password) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }
//         const userExists = await User.findOne({ email }, { username });
//         if (userExists) {
//             return res.status(400).json({ message: 'User already exists' });
//         }
        
//         const newUser = await User({
//             username,       
//             email,
//             password : await bcrypt.hash(password, 10),
//         });

//         await newUser.save();
//         res.status(201).json({
//             info : "User created successfully",
//             _id: newUser._id,
//             username: newUser.username,
//             email: newUser.email,
//         }); 
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }


// export const loginUser = async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         if (!username || !password) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(400).json({ message: 'User does not exist' });
//         }
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: 'Invalid password' });
//         }
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
//         res.status(200).json({
//             info : "User logged in successfully",
//             _id: user._id,
//             username: user.username,
//             email: user.email,
//             token : token,
//         });
        

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }



import User from '../model/user.js';
import bcrypt from 'bcryptjs';
import { GenerateToken,} from '../middleware/jwt.js'; 

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = GenerateToken({ id: newUser._id });

        res.status(201).json({
            info: "User created successfully",
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            token: token,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = GenerateToken({ id: user._id });

        res.status(200).json({
            info: "User logged in successfully",
            _id: user._id,
            username: user.username,
            email: user.email,
            token: token,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


