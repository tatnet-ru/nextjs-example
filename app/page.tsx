import Link from "next/link";
import { connection } from "next/server";
import { categories, findTools, normalizeFilters } from "../lib/catalog";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string | string[];
    category?: string | string[];
  }>;
}) {
  await connection();
  const params = await searchParams;
  const { query, category } = normalizeFilters(
    typeof params.q === "string" ? params.q : "",
    typeof params.category === "string" ? params.category : "Все",
  );
  const items = findTools(query, category);
  const generatedAt = new Date().toISOString();
  const requestId = crypto.randomUUID();
  const apiUrl = `/api/tools?${new URLSearchParams({ q: query, category })}`;
  return (
    <>
      <section className="intro">
        <div>
          <p className="intro-note">
            <span className="status-dot" />
            Открытый пример Next.js на Татнет
          </p>
          <h1>
            Инструменты для
            <br />
            следующего проекта.
          </h1>
          <p className="intro-description">
            Небольшая полка знакомых технологий. Найдите нужное, откройте
            карточку — или возьмите весь проект за основу своего приложения.
          </p>
        </div>
        <aside
          className="server-note"
          aria-label="Проверка серверного рендеринга"
        >
          <div className="server-note-top">
            <span className="status-dot" />
            Сформировано на сервере
          </div>
          <time dateTime={generatedAt}>{generatedAt}</time>
          <p>
            Обновите страницу: время и ID запроса изменятся. Поиск ниже тоже
            выполняется на сервере.
          </p>
          <code data-request-id={requestId}>{requestId}</code>
          <a href={apiUrl}>
            Посмотреть ответ API <span aria-hidden="true">↗</span>
          </a>
        </aside>
      </section>
      <section className="catalog" aria-labelledby="catalog-title">
        <div className="catalog-heading">
          <h2 id="catalog-title">Каталог</h2>
          <span>{items.length} из 6 инструментов</span>
        </div>
        <form className="filters" action="/" method="get" role="search">
          <div className="search-field">
            <label htmlFor="q">Поиск по названию и описанию</label>
            <input
              id="q"
              name="q"
              defaultValue={query}
              maxLength={120}
              placeholder="Например, React или база данных"
              type="search"
            />
          </div>
          <div>
            <label htmlFor="category">Категория</label>
            <select id="category" name="category" defaultValue={category}>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <button type="submit">Найти</button>
          {(query || category !== "Все") && (
            <Link className="reset" href="/">
              Сбросить
            </Link>
          )}
        </form>
        {items.length ? (
          <div className="grid">
            {items.map((tool) => (
              <Link
                className="tool"
                key={tool.slug}
                href={`/tools/${tool.slug}`}
              >
                <div className="tool-top">
                  <span aria-hidden="true" className={`mark ${tool.color}`}>
                    {tool.mark}
                  </span>
                  <span className="category">{tool.category}</span>
                </div>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <span className="tool-link">
                  Открыть карточку <span aria-hidden="true">↗</span>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty">
            <h3>Ничего не нашлось</h3>
            <p>Попробуйте другое название или выберите все категории.</p>
            <Link href="/">Показать весь каталог</Link>
          </div>
        )}
      </section>
      <section className="about-demo" aria-labelledby="about-title">
        <h2 id="about-title">Маленький проект, настоящий сервер.</h2>
        <p>
          Записи хранятся в коде: для запуска не нужны база данных и секреты.
          Страница формируется на каждый запрос, фильтры передаются в URL, а API
          возвращает тот же каталог в JSON.
        </p>
        <a href="https://github.com/tatnet-ru/nextjs-example#readme">
          Код, тесты и инструкция запуска <span aria-hidden="true">↗</span>
        </a>
      </section>
    </>
  );
}
