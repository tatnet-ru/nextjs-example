import { expect, test } from "bun:test";
import { findTool, findTools, normalizeFilters } from "../lib/catalog";
import { GET } from "../app/api/tools/route";

test("поиск учитывает регистр, описание и выбранную категорию", () => {
  expect(findTools("REACT").map((x) => x.slug)).toEqual(["nextjs"]);
  expect(findTools("база данных").map((x) => x.slug)).toEqual(["postgresql"]);
  expect(findTools("React", "Данные")).toEqual([]);
  expect(findTools("", "Данные").map((x) => x.slug)).toEqual([
    "postgresql",
    "valkey",
  ]);
});
test("неизвестные фильтры и длинный ввод обрабатываются предсказуемо", () => {
  expect(normalizeFilters("  Bun  ", "unknown")).toEqual({
    query: "Bun",
    category: "Все",
  });
  expect(normalizeFilters("x".repeat(1000)).query).toHaveLength(120);
  expect(findTools("<script>alert(1)</script>")).toEqual([]);
  expect(findTool("missing")).toBeUndefined();
});
test("API использует ту же фильтрацию, что и SSR, и не кэширует ответы", async () => {
  const request = new Request(
    "https://example.test/api/tools?q=React&category=" +
      encodeURIComponent("Фреймворки"),
  );
  const response = GET(request);
  const json = await response.json();
  expect(json.items).toEqual(findTools("React", "Фреймворки"));
  expect(json.total).toBe(1);
  expect(response.headers.get("cache-control")).toBe("no-store");
  expect(new Date(json.generatedAt).toISOString()).toBe(json.generatedAt);
  expect(json.requestId).not.toBe((await GET(request).json()).requestId);
});
