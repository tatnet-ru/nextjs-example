export const categories = [
  "Все",
  "Фреймворки",
  "Данные",
  "Инструменты",
] as const;
export type Category = (typeof categories)[number];
export type Tool = {
  slug: string;
  name: string;
  category: Exclude<Category, "Все">;
  description: string;
  details: string;
  url: string;
  color: string;
  mark: string;
};

export const tools: readonly Tool[] = [
  {
    slug: "nextjs",
    name: "Next.js",
    category: "Фреймворки",
    color: "ink",
    mark: "N",
    description:
      "React-приложения с серверным рендерингом и API в одном проекте.",
    details:
      "Этот каталог построен на Next.js App Router. Поиск выполняется в серверном компоненте, а Route Handler возвращает те же данные в JSON. Для запуска на Татнет используется standalone-сборка Node.js.",
    url: "https://nextjs.org/docs",
  },
  {
    slug: "astro",
    name: "Astro",
    category: "Фреймворки",
    color: "purple",
    mark: "A",
    description:
      "Сайты, блоги и документация с небольшим количеством JavaScript.",
    details:
      "Astro подходит для проектов, в которых главное — контент. Компоненты можно добавлять постепенно, оставляя большую часть страницы обычным HTML.",
    url: "https://docs.astro.build/",
  },
  {
    slug: "postgresql",
    name: "PostgreSQL",
    category: "Данные",
    color: "blue",
    mark: "P",
    description: "Реляционная база данных для приложений, аналитики и поиска.",
    details:
      "PostgreSQL хранит данные между запросами и перезапусками приложения. В этом учебном примере база не нужна: записи хранятся в исходном коде, чтобы каталог можно было запустить без секретов и дополнительных услуг.",
    url: "https://www.postgresql.org/docs/",
  },
  {
    slug: "valkey",
    name: "Valkey",
    category: "Данные",
    color: "green",
    mark: "V",
    description: "Хранилище в памяти для кэша, очередей и сессий.",
    details:
      "В реальном приложении внешнее хранилище помогает разделять состояние между экземплярами. Сам пример не использует Valkey и не демонстрирует постоянный или распределённый кэш.",
    url: "https://valkey.io/",
  },
  {
    slug: "typescript",
    name: "TypeScript",
    category: "Инструменты",
    color: "blue",
    mark: "TS",
    description:
      "Типы для JavaScript и понятные контракты между частями приложения.",
    details:
      "Тип Tool используется страницей каталога и API-роутом. Строгая проверка TypeScript помогает обнаружить ошибки до публикации. Проверить проект можно командой bun run typecheck.",
    url: "https://www.typescriptlang.org/docs/",
  },
  {
    slug: "bun",
    name: "Bun",
    category: "Инструменты",
    color: "sand",
    mark: "B",
    description:
      "Установка пакетов, запуск скриптов и тестов в одном инструменте.",
    details:
      "В примере Bun устанавливает зависимости и запускает тесты. Собранное Next.js-приложение работает на Node.js, поэтому использование Bun локально не требует Bun в продакшене.",
    url: "https://bun.sh/docs",
  },
];

export function normalizeFilters(query?: string, category?: string) {
  return {
    query: (query ?? "").trim().slice(0, 120),
    category: categories.includes(category as Category)
      ? (category as Category)
      : ("Все" as Category),
  };
}

export function findTools(query?: string, category?: string): Tool[] {
  const filters = normalizeFilters(query, category);
  const needle = filters.query.toLocaleLowerCase("ru");
  return tools.filter(
    (tool) =>
      (filters.category === "Все" || tool.category === filters.category) &&
      `${tool.name} ${tool.description} ${tool.category}`
        .toLocaleLowerCase("ru")
        .includes(needle),
  );
}

export function findTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}
