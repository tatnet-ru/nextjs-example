import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findTool } from "../../../lib/catalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const tool = findTool((await params).slug);
  return tool ? { title: tool.name, description: tool.description } : {};
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const tool = findTool((await params).slug);
  if (!tool) notFound();
  return (
    <article className="detail">
      <Link className="back" href="/">
        ← Весь каталог
      </Link>
      <div className={`mark large ${tool.color}`} aria-hidden="true">
        {tool.mark}
      </div>
      <p className="category">{tool.category}</p>
      <h1>{tool.name}</h1>
      <p className="detail-lead">{tool.description}</p>
      <p>{tool.details}</p>
      <a className="primary-link" href={tool.url}>
        Официальная документация <span aria-hidden="true">↗</span>
      </a>
      <div className="detail-foot">
        Карточка — серверный компонент Next.js. Адрес можно открыть напрямую.
      </div>
    </article>
  );
}
