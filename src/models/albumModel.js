import { supabase } from '../utils/db.js';

// Create new album
const createAlbum = async (userId, albumName = 'My Album',desc, coverUrl = null) => {
  const { data, error } = await supabase
    .from('albums')
    .insert([{ user_id: userId, album_name: albumName, description:desc, cover_url: coverUrl }])
    .select();
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

async function addFavorite(userId, albumId) {
  const { data, error } = await supabaseClient
      .from('user_favorites')
      .insert([{ user_id: userId, album_id: albumId }]);

  if (error) {
      console.error('Error adding favorite:', error);
      return { success: false, error };
  }

  return { success: true, data };
}

export { createAlbum, getAlbumsByUser, addFavorite };
