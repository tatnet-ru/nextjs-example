import { findTools, normalizeFilters } from "../../../lib/catalog";

export const dynamic = "force-dynamic";
export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const filters = normalizeFilters(
    params.get("q") ?? "",
    params.get("category") ?? "Все",
  );
  const items = findTools(filters.query, filters.category);
  return Response.json(
    {
      items,
      total: items.length,
      filters,
      generatedAt: new Date().toISOString(),
      requestId: crypto.randomUUID(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
