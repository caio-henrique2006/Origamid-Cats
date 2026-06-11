import { supabase } from "./supabase";

export class Auth {
  async isAuthenticated() {
    const { data } = await supabase.auth.getSession();
    return !!data?.session;
  }

  async getUserID() {
    const { data } = await supabase.auth.getUser();
    return data?.user?.id;
  }

  async getUserName() {
    const { data } = await supabase.auth.getUser();
    return data?.user?.user_metadata?.full_name || "Usuário Desconhecido";
  }

  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  }

  async register(email, password, displayName) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: displayName } },
    });
    if (error) throw error;
    return data;
  }
}
