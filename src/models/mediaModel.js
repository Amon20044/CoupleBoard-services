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
    // First, get all albums for this user
    const { data: userAlbums, error: albumError } = await supabase
      .from("albums")
      .select("id")
      .eq("user_id", userID);
    
    if (albumError) {
      console.error("❌ Error fetching user albums:", albumError);
      return { success: false, error: albumError };
    }
    
    if (!userAlbums || userAlbums.length === 0) {
      console.log("No albums found for this user");
      return { success: true, data: [] };
    }
    
    // Extract album IDs
    const albumIds = userAlbums.map(album => album.id);
    
    // Now get all media from these albums
    const { data, error } = await supabase
      .from("media")
      .select("media_url, media_type, uploaded_at, album_id")
      .in("album_id", albumIds)
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
