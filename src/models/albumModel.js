import { supabase } from '../utils/db.js';

// Create new album
const createAlbum = async (userId, albumName = 'My Album', coverUrl = null) => {
  const { data, error } = await supabase
    .from('albums')
    .insert([{ user_id: userId, album_name: albumName, cover_url: coverUrl }]);
  
  if (error) throw error;
  return data;
};

// Get albums by user ID
const getAlbumsByUser = async (userId) => {
  const { data, error } = await supabase
    .from('albums')
    .select('*')
    .eq('user_id', userId);
  
  if (error) throw error;
  return data;
};

export { createAlbum, getAlbumsByUser };
