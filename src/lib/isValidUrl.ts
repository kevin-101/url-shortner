export function isValidUrl(url: string): boolean {
  try {
    const hasProtocol = /^https?:\/\//i.test(url);
    const testUrl = hasProtocol ? url : `https://${url}`;
    const parsed = new URL(testUrl);
    return Boolean(parsed.hostname);
  } catch {
    return false;
  }
}

export function ensureHttps(url: string): string {
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
}
