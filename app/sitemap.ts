import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl },
    { url: `${siteUrl}/week/1` },
    { url: `${siteUrl}/week/2` },
    { url: `${siteUrl}/week/3` },
    { url: `${siteUrl}/week/4` },
    { url: `${siteUrl}/week/5` },
    { url: `${siteUrl}/week/6` },
  ]
}
