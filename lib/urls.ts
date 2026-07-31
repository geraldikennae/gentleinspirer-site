export function siteUrl(): string {
  return process.env.SITE_URL || "https://gentleinspirer.com";
}

export function unsubscribeUrl(token: string): string {
  return `${siteUrl()}/api/letters/unsubscribe?token=${token}`;
}
