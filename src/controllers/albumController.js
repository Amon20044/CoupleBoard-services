import { createAlbum, getAlbumsByUser } from '../models/albumModel.js';
// Create Album
const createNewAlbum = async (req, res) => {
  try {
    // console.log(req.user.userId);
    if (!req.user || !req.user.userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const userId = req.user.userId; // Extract userId from authenticated request
    const { album_name, cover_url } = req.body;
    const album = await createAlbum(userId, album_name, cover_url);

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

export { createNewAlbum, getUserAlbums };
