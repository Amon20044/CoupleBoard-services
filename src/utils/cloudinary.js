import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
import { convertToWebP } from "./imageOptimizer.js"; // Ensure this function exists
import process from "process";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload buffer to Cloudinary (for memoryStorage)
const uploadToCloudinary = async (fileBuffer, mimeType) => {
  return new Promise(async (resolve, reject) => {
    if (!fileBuffer || fileBuffer.length === 0) {
      console.error("❌ File buffer is empty or undefined!");
      return reject(new Error("File buffer is empty!"));
    }

    console.log("✅ File buffer received, size:", fileBuffer.length);

    let uploadBuffer = fileBuffer;

    // Skip WebP conversion for GIFs & Videos
    if (mimeType != 'gif') {
      try {
        console.log("🔄 Converting image to WebP...");
        const webpBuffer = await convertToWebP(fileBuffer, mimeType);
        if (webpBuffer) {
          uploadBuffer = webpBuffer;
          console.log("✅ Conversion to WebP successful");
        }
      } catch (error) {
        console.error("❌ WebP conversion failed, using original buffer:", error);
      }
    } else {
      console.log("⏩ Skipping WebP conversion for GIF or Video");
    }

    // Upload to Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
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

    streamifier.createReadStream(uploadBuffer).pipe(stream);
  });
};

export { uploadToCloudinary };
