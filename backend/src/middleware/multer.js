import multer, { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";

import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 

const uploadDir = join(__dirname, "../imageUploads/assets"); 
console.log(uploadDir);


// Ensure the directory exists     
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
  console.log(`Created directory: ${uploadDir}`);
}
//  Multer
// Multer storage configuration
const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only jpg, jpeg, and png files are allowed!'));
  }
  cb(null, true);
};

// Multer upload instance for multiple images (Max: 5 files)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB per file
});

export default upload ;