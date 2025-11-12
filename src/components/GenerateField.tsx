"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Session } from "next-auth";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import Link from "next/link";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function GenerateField({
  session,
}: {
  session: Session | null;
}) {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setShortUrl("");

    if (!session?.user) {
      setError("Login to continue");
      setIsLoading(false);
      return;
    }

    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, customSlug }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    setShortUrl(data.shortUrl);
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full items-center"
      >
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-3">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="text"
              placeholder="eg: google.com"
              className="h-12"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="customslug">Custom slug (optional)</Label>
            <Input
              id="customslug"
              type="text"
              className="h-12"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <Button variant="outline" className="h-12" disabled={isLoading}>
          {isLoading ? (
            <span className="flex gap-2 items-center">
              <Spinner className="size-5" /> Please wait...
            </span>
          ) : (
            "Generate"
          )}
        </Button>
      </form>

      {error && (
        <div className="w-full">
          <p className="text-center text-xl">{error}</p>
        </div>
      )}

      {shortUrl && (
        <div className="flex flex-col gap-2 items-center w-full">
          <p className="text-center text-lg">Shortned url:</p>
          <div className="flex gap-2 w-full justify-center items-center">
            <Button variant="link" asChild>
              <Link className="text-xl" href={shortUrl}>
                {shortUrl}
              </Link>
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(shortUrl);
                toast("Link copied");
              }}
              variant="outline"
            >
              <Copy />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
