import { supabaseServer } from "./supabase";

export async function getLinks(): Promise<
  | {
      slug: string | null;
      url: string;
      created_at: string | null;
    }[]
  | null
> {
  const { data: links } = await supabaseServer
    .from("links")
    .select("slug, url, created_at")
    .order("created_at", { ascending: false });

  return links;
}
