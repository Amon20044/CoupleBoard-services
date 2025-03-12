import fs from 'fs';
import multer from 'multer';
import path from 'path';

// Ensure 'uploads' folder exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Creates the folder if it doesn't exist
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files in 'uploads/' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter (allow only images & videos)
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.mp4', '.mov', '.avi', '.mkv'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    return cb(null, true);
  }
  return cb(new Error('Only images and videos are allowed!'), false);
};

// Upload instance for multiple files (max 100 files, each max 2GB)
const upload = multer({
  storage,
  limits: { fileSize: 2000 * 1024 * 1024 }, // 2GB file limit
  fileFilter
}).array('files', 100); // Accept multiple files

export { upload };
