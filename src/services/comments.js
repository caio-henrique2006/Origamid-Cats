import { supabase } from "./supabase";
import { Auth } from "./auth";

export class Comments {
  auth;

  constructor() {
    this.auth = new Auth();
  }

  async getComments(post_id) {
    const user_id = await this.auth.getUserID();
    if (!user_id) {
      throw new Error("Oxi, não tá logado ?");
    }

    let { data, error } = await supabase
      .from("comentario")
      .select("*")
      .eq("poste_id", post_id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  async sendComments({ post_id, text }) {
    const user_id = await this.auth.getUserID();
    if (!user_id) {
      throw new Error("Oxi, não tá logado ?");
    }
    const user_name = await this.auth.getUserName();

    const { data, error } = await supabase
      .from("comentario")
      .insert([
        {
          user_name: user_name,
          user_id: user_id,
          poste_id: post_id,
          text: text,
        },
      ])
      .select("user_id, user_name, poste_id, text")
      .single();

    if (error) throw error;
    return data;
  }
}
