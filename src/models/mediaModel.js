import { supabase } from '../utils/db.js';

// Add media to album
const addMedia = async (albumId, mediaUrl, mediaType) => {
  const { data, error } = await supabase
    .from('media')
    .insert([{ album_id: albumId, media_url: mediaUrl, media_type: mediaType }]);
  
  if (error) throw error;
  return data;
};

// Get media by album ID
const getMediaByAlbum = async (albumId) => {
  const { data, error } = await supabase
    .from('media')
    .select('*')
    .eq('album_id', albumId);
  
  if (error) throw error;
  return data;
};

const getMediaByUser = async (userID) => {
  console.log(userID);
  try {
      const { data, error } = await supabase
          .from("media")
          .select("media_url, media_type, uploaded_at, albums(album_name)")
          .eq("albums.user_id", userID)
          .order("uploaded_at", { ascending: false });

      if (error) {
          console.error("❌ Error fetching user media:", error);
          return { success: false, error };
      }

      console.log("✅ Media fetched successfully:", data);
      return { success: true, data };
  } catch (err) {
      console.error("❌ Unexpected error:", err);
      return { success: false, error: err };
  }
};


export { addMedia, getMediaByAlbum , getMediaByUser};
