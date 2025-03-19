import path from 'path';

// Define allowed file types
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];
const GIF_EXTENSIONS = ['.gif'];

const getMediaType = (file) => {
  if (!file || !file.originalname) return 'unknown'; // Handle invalid input

  const ext = path.extname(file.originalname).toLowerCase();
  if (IMAGE_EXTENSIONS.includes(ext)) {
    return 'image';
  } else if (VIDEO_EXTENSIONS.includes(ext)) {
    return 'video';
  } else if (GIF_EXTENSIONS.includes(ext)) {
    return 'gif';
  } else {
    return 'unknown';
  }
};

export { getMediaType };
