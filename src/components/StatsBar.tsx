export function StatsBar() {
  return (
    <section className="border-y border-rule bg-surface">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-8 px-8 py-6 lg:px-16">
        <div className="min-w-[180px]">
          <p className="type-label">Моделей в доступе</p>
          <p className="mt-3 text-[36px] font-light leading-none text-ink">10</p>
        </div>

        <div className="min-w-[220px] border-rule2 lg:border-l lg:pl-8">
          <p className="type-label">Статус</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="block h-[6px] w-[6px] rounded-full bg-gold2" />
            <span className="type-label text-ink">Первая генерация бесплатна</span>
          </div>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-6">
          <span className="rounded-full bg-gold3 px-3 py-1.5 text-[12px] text-gold">
            Реставрация включена
          </span>
          <span className="type-label">MP4 · Без водяных знаков</span>
        </div>
      </div>
    </section>
  );
}
