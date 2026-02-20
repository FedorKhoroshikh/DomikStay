import type { MetadataRoute } from "next";

const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/",             priority: 1.0, changeFrequency: "weekly"  },
  { path: "/gallery",      priority: 0.9, changeFrequency: "monthly" },
  { path: "/availability", priority: 0.9, changeFrequency: "weekly"  },
  { path: "/book",         priority: 0.9, changeFrequency: "monthly" },
  { path: "/reviews",      priority: 0.7, changeFrequency: "weekly"  },
  { path: "/location",     priority: 0.7, changeFrequency: "yearly"  },
  { path: "/terms",        priority: 0.5, changeFrequency: "yearly"  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
