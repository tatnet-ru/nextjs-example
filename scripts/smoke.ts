import assert from "node:assert/strict";

const base = new URL(process.argv[2] || "http://localhost:3000");
const request = (path: string) =>
  fetch(new URL(path, base), { signal: AbortSignal.timeout(30000) });
const [home1, home2, filtered, api1, api2, detail, missing, health] =
  await Promise.all([
    request("/"),
    request("/"),
    request("/?q=React"),
    request("/api/tools?q=React"),
    request("/api/tools?q=React"),
    request("/tools/nextjs"),
    request("/tools/missing-example"),
    request("/api/health"),
  ]);
for (const response of [home1, home2, filtered, api1, api2, detail, health]) {
  assert.equal(response.status, 200, response.url);
}
const [html1, html2, filteredHtml, json1, json2, detailHtml, healthJson] =
  await Promise.all([
    home1.text(),
    home2.text(),
    filtered.text(),
    api1.json(),
    api2.json(),
    detail.text(),
    health.json(),
  ]);
const requestId = (html: string) =>
  html.match(/data-request-id="([^"]+)"/)?.[1];
assert.ok(requestId(html1), "ID SSR-ответа должен находиться в исходном HTML");
assert.notEqual(
  requestId(html1),
  requestId(html2),
  "SSR должен выполняться на каждый запрос",
);
assert.ok(
  filteredHtml.includes("Next.js") && !filteredHtml.includes("/tools/astro"),
  "SSR-фильтрация",
);
assert.deepEqual(
  json1.items.map((item: { slug: string }) => item.slug),
  ["nextjs"],
);
assert.notEqual(
  json1.requestId,
  json2.requestId,
  "API должен выполнять новый запрос",
);
assert.equal(api1.headers.get("cache-control"), "no-store");
assert.ok(
  detailHtml.includes("Next.js") &&
    detailHtml.includes("Официальная документация"),
);
assert.equal(missing.status, 404);
assert.equal(healthJson.status, "ok");
console.log(
  `Проверено ${base.origin}: HTTP, SSR без JavaScript, серверный поиск, API, no-store, карточка, 404, health.`,
);
