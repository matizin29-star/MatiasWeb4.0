import { SITE } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = SITE.url.replace(/\/$/, "");
  const sections = [
    { id: "hero", priority: 1 },
    { id: "diferenciais", priority: 0.9 },
    { id: "portfolio", priority: 0.9 },
    { id: "metodo", priority: 0.8 },
    { id: "contato", priority: 0.8 },
  ];

  return sections.map(({ id, priority }) => ({
    url: `${baseUrl}/#${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
  }));
}
