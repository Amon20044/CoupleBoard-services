import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import dotenv from 'dotenv';
import process from 'process';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload buffer to Cloudinary (for memoryStorage)
const uploadToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer || fileBuffer.length === 0) {
      console.error("❌ File buffer is empty or undefined!");
      return reject(new Error("File buffer is empty!"));
    }

    console.log("✅ File buffer received, size:", fileBuffer.length);

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) {
          console.error("❌ Cloudinary Upload Error:", error);
          return reject(new Error("Cloudinary upload failed"));
        } else {
          console.log("✅ Upload Success:", result.secure_url);
          return resolve(result.secure_url);
        }
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

export { uploadToCloudinary };
