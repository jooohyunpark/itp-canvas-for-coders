export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const protectedRoutes: string[] = ["/week"]

export const noindexRoutes: string[] = ["/verify"]
