import multer from 'multer';

// Use memory storage (avoids saving files locally)
const storage = multer.memoryStorage();

// File filter (allow only images/videos)
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif|mp4|mov|avi/;
  const extname = allowedFileTypes.test(file.originalname.toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (mimetype && extname) return cb(null, true);
  return cb(new Error('Only images and videos are allowed!'), false);
};

// File upload settings
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file limit
  fileFilter
});


export { upload };