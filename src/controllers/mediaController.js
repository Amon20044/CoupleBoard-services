import { addMedia, getMediaByAlbum, getMediaByUser } from '../models/mediaModel.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import { upload } from '../utils/multer.js';
import { getMediaType } from '../utils/fileTypeChecker.js';
// Upload media to Cloudinary & save in Supabase
const uploadMedia = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    
    const album_id = req.params.album_id;
    const uploadedMedia = [];
    
    for (const file of req.files) {
      // Get media type from the file's original name
      const media_type = getMediaType(file.originalname);
      console.log("Media Type:", media_type); // Debugging: Check media type
      
      // Make sure media_type is valid according to your database constraint
      if (media_type === 'unknown') {
        console.log("Skipping file with unknown media type:", file.originalname);
        continue;
      }
      
      const media_url = await uploadToCloudinary(file.buffer, media_type);
      console.log(media_url, album_id, media_type);
      
      const media = await addMedia(album_id, media_url, media_type);
      uploadedMedia.push(media);
    }
    
    res.status(201).json({
      message: "Media uploaded successfully",
      media: uploadedMedia
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: error.message });
  }
};
// Get media by album ID
const getAlbumMedia = async (req, res) => {
  try {
    const { album_id } = req.params;
    const media = await getMediaByAlbum(album_id);
    res.json({ media });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve media', error: error.message });
  }
};
const getUserMedia = async (req, res) => {
  try {
    const { user_id } = req.params;  // Extract user_id from URL
    console.log("User ID:", user_id);  // Debugging: Check if user_id is received

    const media = await getMediaByUser(user_id);  // Fetch media for the user
    res.json({ media });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve media', error: error.message });
  }
};


export { upload, uploadMedia, getAlbumMedia , getUserMedia};