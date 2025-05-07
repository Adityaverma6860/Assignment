// const jwt = require('jsonwebtoken');

// const jwtAuthMiddleware = (req,res,next)=> {

//     // first check request headers has authorization  or not
//     const authorization = req.headers.authorization
//     if (!authorization) return res.status(401).json({error:'Token Not Found'});

//     // Extract the jwt token from the request headers

//    const token = req.headers.authorization.splite(' ')[1];
//    if(!token) return res.status(401).json({ error : 'Unauthorized'});
//     try{
//         //  Veryfy the JWT token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET,{expiresIn:30});
//         // Attach user information to request object
//         req.user = decoded
//         // userData, req.EncodedData,EncodedData
//         next();
//     }catch(err){
//         console.error(err);
//         res.status(401).json({ error: 'Invalid token'});
//     }
// }
// // Function to Generate JWT token

// const GenerateToken =(userData) => {
//     // Generate a new JWT token using data
//     return jwt.sign(userData,process.env.JWT_SECRET);
// }

// module.exports = {jwtAuthMiddleware,GenerateToken}



import jwt from "jsonwebtoken";

export const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ error: "Token Not Found" });
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

export const GenerateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "1d" });
};
