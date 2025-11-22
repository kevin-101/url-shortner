"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Session } from "next-auth";
import { useState, useTransition } from "react";
import { Spinner } from "./ui/spinner";
import Link from "next/link";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { shortenUrl } from "@/actions/shortenUrl";
import { isValidUrl } from "@/lib/isValidUrl";

export default function GenerateField({
  session,
}: {
  session: Session | null;
}) {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setShortUrl("");

    if (!session?.user) {
      setError("Login to continue");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Invalid URL. Please enter a valid link.");
      return;
    }

    startTransition(async () => {
      const data = await shortenUrl(url, customSlug);

      if (data.error) {
        setError(data.error);
        return;
      }

      setShortUrl(data.shortUrl!);
    });
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
              disabled={isPending}
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
              disabled={isPending}
            />
          </div>
        </div>

        <Button variant="outline" className="h-12" disabled={isPending}>
          {isPending ? (
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
