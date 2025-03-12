import path from 'path';

// Define allowed file types
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];

const getMediaType = (filename) => {
  const ext = path.extname(filename).toLowerCase();

  if (IMAGE_EXTENSIONS.includes(ext)) {
    return 'image';
  } else if (VIDEO_EXTENSIONS.includes(ext)) {
    return 'video';
  } else {
    return 'unknown';
  }
};

export{ getMediaType };