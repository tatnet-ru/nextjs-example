import type { Metadata } from "next";
import Link from "next/link";
import "./styles.css";

export const metadata: Metadata = {
  title: {
    default: "Полка разработчика — Next.js на Татнет",
    template: "%s — Полка разработчика",
  },
  description:
    "Открытый пример Next.js на Татнет: каталог с серверным поиском, страницами инструментов и JSON API. Код и инструкция доступны на GitHub.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <a className="skip" href="#main">
          Перейти к содержимому
        </a>
        <header className="header wrap">
          <Link className="wordmark" href="/">
            Полка
            <span className="wordmark-dot" />
          </Link>
          <nav aria-label="Основная навигация">
            <a href="https://github.com/tatnet-ru/nextjs-example">
              Исходный код
            </a>
            <a className="host-link" href="https://tatnet.ru/frameworks/nextjs">
              Next.js на Татнет <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </header>
        <main id="main" className="wrap">
          {children}
        </main>
        <footer className="footer wrap">
          <p>Учебный каталог. Next.js App Router, Node.js, Татнет.</p>
          <a href="https://github.com/tatnet-ru/nextjs-example#readme">
            Запустить свой экземпляр
          </a>
        </footer>
      </body>
    </html>
  );
}
