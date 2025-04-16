import { addMedia, getMediaByAlbum, getMediaByUser } from '../models/mediaModel.js';
// import { uploadToCloudinary } from '../utils/cloudinary.js';
import { upload } from '../utils/multer.js';
import { getMediaType } from '../utils/fileTypeChecker.js';
// Upload media to Cloudinary & save in Supabase
const uploadMedia = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debugging: Check request body
    const urls = req.body; // Assuming req.body.urls contains the URLs of the uploaded files
    const album_id = req.params.album_id;
    for (const url of urls) {
      // Get media type from the file's original name

      const media_type = url.split('.').pop();
      console.log(media_type); // "jpg"
      console.log(url)

      const media = await addMedia(album_id, url, media_type);
      console.log("Media added:", media); // Debugging: Check if media is added successfully
    }

    res.status(201).json({
      message: "Media uploaded successfully",
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


export { upload, uploadMedia, getAlbumMedia, getUserMedia };