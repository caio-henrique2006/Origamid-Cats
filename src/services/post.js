import { supabase } from "./supabase";
import { Auth } from "./auth";

export class Post {
  auth;
  constructor() {
    this.auth = new Auth();
  }

  async getPosts() {
    const user_id = await this.auth.getUserID();
    if (!user_id) {
      throw new Error("Oxi, não tá logado ?");
    }

    let { data, error } = await supabase
      .from("poste")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  async sendPost({ userId, description, title, local, imageFile }) {
    const user_id = await this.auth.getUserID();
    if (!user_id) {
      throw new Error("Oxi, não tá logado ?");
    }

    const { path, publicUrl } = await this.sendImage(user_id, imageFile);

    const { data, error } = await supabase
      .from("poste")
      .insert([
        {
          user_id: user_id,
          title: title,
          description: description,
          local: local,
          image_url: publicUrl,
        },
      ])
      .select();

    if (error) throw error;
    return data;
  }

  async getPostById(id) {
    const { data, error } = await supabase
      .from("poste")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  async deletePost(id) {
    const { data, error } = await supabase.from("poste").delete().eq("id", id);

    if (error) throw error;
    return data;
  }

  async sendImage(user_id, imageFile, bucket = "poste_image") {
    const fileExtension = imageFile?.name?.split(".").pop() || "jpg";
    const filePath = `${user_id}/${Date.now()}.${fileExtension}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, imageFile, {
        upsert: true,
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return {
      path: data.path,
      publicUrl: publicUrlData.publicUrl,
    };
  }
}
