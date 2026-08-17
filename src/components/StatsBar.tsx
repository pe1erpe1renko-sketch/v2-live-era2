export function StatsBar() {
  return (
    <section className="border-y border-rule bg-surface">
      <div className="mx-auto grid max-w-[1440px] divide-y divide-rule px-8 lg:grid-cols-3 lg:divide-x lg:divide-y-0 lg:px-16">
        {/* ЧАСТЬ 1 */}
        <div className="py-8 lg:pr-8">
          <p className="type-label text-ink3">В доступе</p>
          <p className="mt-2 flex items-baseline text-[28px] font-light leading-none text-ink">
            8 моделей
          </p>
        </div>

        {/* ЧАСТЬ 2 */}
        <div className="py-8 lg:px-8">
          <p className="type-label text-ink3">Первый ролик</p>
          <p className="mt-2 flex items-baseline text-[28px] font-light leading-none text-ink">
            Бесплатно, без карты
          </p>
        </div>

        {/* ЧАСТЬ 3 */}
        <div className="py-8 lg:pl-8">
          <p className="type-label text-ink3">На выходе</p>
          <p className="mt-2 text-[28px] font-light leading-none text-ink">
            MP4 без водяных знаков
          </p>
        </div>
      </div>
    </section>
  );
}
