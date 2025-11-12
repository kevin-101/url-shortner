import { redis } from "@/lib/redis";
import { supabaseServer } from "@/lib/supabase";
import { notFound, redirect } from "next/navigation";

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data, error } = await supabaseServer
    .from("links")
    .select("url")
    .eq("slug", slug)
    .single();

  console.log(data);

  if (!data || error) {
    notFound();
  }

  await redis.incr(`clicks:${slug}`);

  redirect(data.url);
}
