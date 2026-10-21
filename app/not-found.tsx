import Link from "next/link";
export default function NotFound() {
  return (
    <section className="detail">
      <p className="category">404</p>
      <h1>Такой карточки нет.</h1>
      <p>Вернитесь в каталог и выберите инструмент из списка.</p>
      <Link className="primary-link" href="/">
        Открыть каталог
      </Link>
    </section>
  );
}
