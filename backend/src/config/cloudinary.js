import { v2 as cloudinary } from 'cloudinary';
import { statSync, existsSync, unlinkSync } from 'fs';
import dotenv from 'dotenv';
dotenv.config();

// Configure Cloudinary with environment variables

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  folder: process.env.CLOUDINARY_FOLDER,
});


const SIZE_LIMIT = 2 * 1024 * 1024; // 2MB size limit

/**
 * Uploads a single image to Cloudinary.
 * @param {string} filePath - Local path to the image file.
 * @returns {Promise<Object>} - Cloudinary response or error.
 */
const uploadSingleImageOnCloudinary = async (filePath) => {
  try {
    // Check file size before uploading
    const stats = statSync(filePath);
    if (stats.size > SIZE_LIMIT) {
      return {
        error: `File exceeds 2MB limit. Size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`,
        status: 400,
      };
    }

    // Upload to Cloudinary
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: 'image',
      folder: 'employee-profile-pictures', // Optional: organize uploads
    });
    console.log("response is ->",response);
    return response;
  } catch (error) {
    return {
      error: `Cloudinary upload failed: ${error.message}`,
      status: 500,
    };
  } finally {
    // Always clean up local file
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
  }
};

export default uploadSingleImageOnCloudinary;
