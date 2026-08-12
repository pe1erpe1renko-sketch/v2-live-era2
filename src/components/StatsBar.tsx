export function StatsBar() {
  return (
    <section className="border-y border-rule bg-surface">
      <div className="mx-auto grid max-w-[1440px] divide-y divide-rule px-8 lg:grid-cols-3 lg:divide-x lg:divide-y-0 lg:px-16">
        {/* ЧАСТЬ 1 */}
        <div className="py-8 lg:pr-8">
          <p className="type-label text-ink3">В доступе</p>
          <p className="mt-2 flex items-baseline text-ink">
            <span className="text-[32px] font-light leading-none lg:text-[40px]">10</span>
            <span className="ml-2.5 text-[32px] font-light leading-none text-ink3 lg:ml-2.5 lg:text-[40px]">моделей</span>
          </p>
        </div>

        {/* ЧАСТЬ 2 */}
        <div className="py-8 lg:px-8">
          <p className="type-label text-ink3">Первый ролик</p>
          <p className="mt-2 flex items-center text-ink">
            <span className="block h-2 w-2 shrink-0 rounded-full bg-gold2" />
            <span className="ml-3 text-[22px] font-light leading-none lg:text-[28px]">Бесплатно, без карты</span>
          </p>
        </div>

        {/* ЧАСТЬ 3 */}
        <div className="py-8 lg:pl-8">
          <p className="type-label text-ink3">На выходе</p>
          <p className="mt-2 text-[22px] font-light leading-none text-ink lg:text-[28px]">
            MP4 без водяных знаков
          </p>
        </div>
      </div>
    </section>
  );
}
