import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl },
    { url: `${siteUrl}/week1` },
    { url: `${siteUrl}/week2` },
    { url: `${siteUrl}/week3` },
    { url: `${siteUrl}/week4` },
    { url: `${siteUrl}/week5` },
    { url: `${siteUrl}/week6` },
  ]
}
