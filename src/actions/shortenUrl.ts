"use server";

import { ensureHttps, isValidUrl } from "@/lib/isValidUrl";
import { supabaseServer } from "@/lib/supabase";
import { refresh } from "next/cache";

export async function shortenUrl(url: string, customSlug?: string) {
  // Validate URL
  if (!isValidUrl(url)) {
    return { error: "Invalid URL. Please enter a valid link." };
  }

  //prefix https to url if not already
  const httpsUrl = ensureHttps(url);

  // Generate or use custom slug
  const slug = customSlug?.trim() || Math.random().toString(36).substring(2, 8);

  // Check for duplicate slug
  const { data: existing } = await supabaseServer
    .from("links")
    .select("slug")
    .eq("slug", slug)
    .single();

  if (existing) {
    return { error: "Slug already taken. Please choose another." };
  }

  // Insert new link
  const { data, error } = await supabaseServer
    .from("links")
    .insert([{ slug, url: httpsUrl }])
    .select()
    .single();

  if (error) {
    console.error(error);
    return { error: "Failed to shorten URL" };
  }

  refresh();

  return { shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${data.slug}` };
}
