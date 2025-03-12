import express from 'express';
import { upload, uploadMedia, getAlbumMedia, getUserMedia } from '../controllers/mediaController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const mediaRoutes = express.Router();

// Route to upload multiple media files
mediaRoutes.post('/upload/:album_id', authenticateUser, upload, uploadMedia);

// Route to fetch media by album ID
mediaRoutes.get('/:album_id', authenticateUser, getAlbumMedia);

// Route to fetch media by user ID
mediaRoutes.get('/images/:user_id', authenticateUser, getUserMedia);

export { mediaRoutes };
