import { createAlbum, getAlbumsByUser } from '../models/albumModel.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import { getMediaType } from '../utils/fileTypeChecker.js';

const createNewAlbum = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    // console.log(req.user.userId);
    if (!req.user || !req.user.userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const userId = req.user.userId; // Extract userId from authenticated request
    const { album_name , description } = req.body;
    const firstFile = req.files?.[0];
    const media_type = getMediaType(firstFile.originalname);
    const cover_url = await uploadToCloudinary(firstFile.buffer, media_type);
    const album = await createAlbum(userId, album_name, description, cover_url);
   
    res.status(201).json({ message: 'Album created', album });
  } catch (error) {
    res.status(500).json({ message: 'Album creation failed', error });
  }
};

// Get Albums by User
const getUserAlbums = async (req, res) => {
  try {
    const user_id  = req.user.userId;
    console.log(user_id);
    if (!user_id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const albums = await getAlbumsByUser(user_id);
    res.json({ albums });

  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve albums', error });
  }
};


export { createNewAlbum, getUserAlbums};
