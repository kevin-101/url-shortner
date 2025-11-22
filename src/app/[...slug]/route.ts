import { redis } from "@/lib/redis";
import { supabaseServer } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { NextResponse, userAgent } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ slug: string[] }>;
  }
) {
  const { slug } = await params;

  const finalSlug = slug.join("/");

  const { data, error } = await supabaseServer
    .from("links")
    .select("url")
    .eq("slug", finalSlug)
    .single();

  console.log(data);

  if (!data || error) {
    notFound();
  }

  const ua = userAgent(req);
  console.log(ua);

  const analyticsEntry = {
    timestamp: Date.now(),
    browser: ua.browser.name,
    os: ua.os.name,
    device: ua.device.type || "desktop",
    ua: ua.ua,
  };

  await redis.incr(`clicks:${slug}`);

  await redis.lpush(`events:${slug}`, JSON.stringify(analyticsEntry));

  return NextResponse.redirect(data.url, 302);
}
