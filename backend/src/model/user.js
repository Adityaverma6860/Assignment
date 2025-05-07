import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });



const User = mongoose.model('User', userSchema);

export default User;



// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },
//   },
//   { timestamps: true }
// );

// // Middleware: Hash password before saving to DB
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next(); // Skip if password is not modified

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Instance method: Compare entered password with hashed password
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// const User = mongoose.model('User', userSchema);

// export default User;

