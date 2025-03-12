import { supabase } from '../utils/db.js';
import bcrypt from 'bcrypt';  // For password hashing

// Create new user (Partner-based)
const createUser = async (name_1, name_2, partner1_email, partner2_email, password_hash) => {
  const hashedPassword = await bcrypt.hash(password_hash, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([{ 
      name_1, 
      name_2, 
      partner1_email, 
      partner2_email, 
      password_hash: hashedPassword 
    }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};


// Get user by email (Either partner1 or partner2)
const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .or(`partner1_email.eq.${email},partner2_email.eq.${email}`) // Check both fields
    .maybeSingle();
  console.log("data");
  if (error) throw new Error(error.message);
  return data;
};


// Get user by ID
const getMediaByUser = async (userID) => {
  console.log(userID);
  const { data, error } = await supabase
    .from('media')
    .select('media_url, media_type, uploaded_at, albums!inner(user_id)')  // Join albums to get user_id
    .eq('albums.user_id', userID);  // Filter by user ID

  if (error) throw error;
  return data;
};

export { createUser, getUserByEmail, getMediaByUser };
