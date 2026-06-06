import { supabase } from '../lib/supabase';

export const signUp = async ({ name, phone, email, password, role }) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { error: error.message };

  const { error: profileError } = await supabase
    .from('profiles')
    .insert({ id: data.user.id, name, phone, role });

  if (profileError) return { error: profileError.message };
  return { user: { ...data.user, name, phone, role } };
};

export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (profileError) return { error: 'Profile not found. Please sign up.' };
  return { user: { ...data.user, ...profile } };
};

export const logout = async () => {
  await supabase.auth.signOut();
};
