export function StatsBar() {
  return (
    <section className="border-y border-rule bg-surface">
      <div className="mx-auto grid max-w-[1440px] divide-y divide-rule px-8 lg:grid-cols-3 lg:divide-x lg:divide-y-0 lg:px-16">
        {/* Left */}
        <div className="py-6 lg:pr-8">
          <p className="type-label text-ink3">В доступе</p>
          <p className="mt-1 flex items-baseline text-ink">
            <span className="text-[44px] font-light leading-none">10</span>
            <span className="ml-3 text-[24px] font-light leading-none">моделей</span>
          </p>
        </div>

        {/* Middle */}
        <div className="py-6 lg:px-8">
          <div className="flex items-center">
            <span className="block h-[6px] w-[6px] shrink-0 rounded-full bg-gold2" />
            <span className="ml-2.5 text-[15px] text-ink">Первая генерация бесплатна</span>
          </div>
          <p className="mt-1 text-[12px] text-ink3">карта не нужна</p>
        </div>

        {/* Right */}
        <div className="py-6 lg:pl-8">
          <p className="text-[13px] text-ink2">Реставрация входит в сценарий</p>
          <p className="text-[13px] text-ink2">MP4 без водяных знаков</p>
        </div>
      </div>
    </section>
  );
}
