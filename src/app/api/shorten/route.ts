import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { ensureHttps, isValidUrl } from "@/lib/isValidUrl";

export async function POST(req: Request) {
  const { url, customSlug } = await req.json();

  // Validate URL
  if (!isValidUrl(url)) {
    return NextResponse.json(
      { error: "Invalid URL. Please enter a valid link." },
      { status: 400 }
    );
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
    return NextResponse.json(
      { error: "Slug already taken. Please choose another." },
      { status: 400 }
    );
  }

  // Insert new link
  const { data, error } = await supabaseServer
    .from("links")
    .insert([{ slug, url: httpsUrl }])
    .select()
    .single();

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to shorten URL" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${data.slug}`,
  });
}
