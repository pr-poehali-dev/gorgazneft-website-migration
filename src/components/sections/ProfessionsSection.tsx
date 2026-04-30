import Icon from "@/components/ui/icon";

const PROFESSIONS = [
  {
    title: "Бурение, ремонт скважин, спецтехника",
    image: "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/60860649-ae57-4d8f-8ba9-5e23cc63e905.jpg",
    icon: "Drill",
    count: "12 курсов",
    color: "from-amber-900/80 to-amber-700/60",
  },
  {
    title: "Добыча, подготовка и переработка нефти и газа",
    image: "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/8e3f8400-fd0f-4ebb-8f41-192ec09e4d4b.jpg",
    icon: "Flame",
    count: "18 курсов",
    color: "from-orange-900/80 to-orange-700/60",
  },
  {
    title: "Подъёмные сооружения",
    image: "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/5083e032-797b-4b13-8cd2-ba3136b24fb6.jpg",
    icon: "ArrowUpFromLine",
    count: "8 курсов",
    color: "from-sky-900/80 to-sky-700/60",
  },
  {
    title: "Охрана труда",
    image: "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/5f86e2bf-3d0d-4eba-970f-b4b54e0ff349.jpg",
    icon: "HardHat",
    count: "10 курсов",
    color: "from-green-900/80 to-green-700/60",
  },
  {
    title: "Промышленная и экологическая безопасность",
    image: "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/e1454983-88d4-4f8d-b018-569ee0f0dbb9.jpg",
    icon: "ShieldCheck",
    count: "15 курсов",
    color: "from-teal-900/80 to-teal-700/60",
  },
  {
    title: "Тепловые энергоустановки и газовое хозяйство",
    image: "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/24643d0a-f9e5-4a1d-915c-b047d3880b64.jpg",
    icon: "Thermometer",
    count: "9 курсов",
    color: "from-red-900/80 to-red-700/60",
  },
  {
    title: "Электробезопасность",
    image: "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/d4de8972-be74-4ac5-889b-82bf91ba54bb.jpg",
    icon: "Zap",
    count: "7 курсов",
    color: "from-yellow-900/80 to-yellow-700/60",
  },
  {
    title: "Безопасность дорожного движения",
    image: "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/2022c4ee-961a-4423-a2fe-4a284b511adf.jpg",
    icon: "Car",
    count: "5 курсов",
    color: "from-blue-900/80 to-blue-700/60",
  },
  {
    title: "ДОПОГ",
    image: "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/d47de243-89e7-479a-b63c-05cb1bb527cb.jpg",
    icon: "Truck",
    count: "4 курса",
    color: "from-orange-900/80 to-orange-700/60",
  },
  {
    title: "Взрывные работы",
    image: "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/250f4081-e45a-4f08-a498-459ee045f876.jpg",
    icon: "AlertTriangle",
    count: "6 курсов",
    color: "from-stone-900/80 to-stone-700/60",
  },
  {
    title: "Вспомогательная горноспасательная команда",
    image: "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/0e96920c-ff54-42f7-997d-16c415fd0a41.jpg",
    icon: "Users",
    count: "3 курса",
    color: "from-slate-900/80 to-slate-700/60",
  },
];

export default function ProfessionsSection() {
  return (
    <section id="professions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "hsl(218,72%,28%)" }}>
            Направления обучения
          </div>
          <h2 className="font-golos text-3xl sm:text-4xl font-black mb-3" style={{ color: "hsl(218,72%,18%)" }}>
            Обучение по профессиям
          </h2>
          <div className="section-divider mx-auto mb-4" />
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Выберите направление — получите список доступных курсов, сроки и стоимость обучения
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROFESSIONS.map((p) => (
            <a
              key={p.title}
              href="#enrollment"
              className="group relative overflow-hidden rounded-2xl cursor-pointer block"
              style={{ minHeight: "220px" }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${p.image})` }}
              />
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${p.color} transition-opacity duration-300`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Top badge */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.25)" }}>
                  <Icon name="BookOpen" size={11} />
                  {p.count}
                </span>
              </div>

              {/* Icon */}
              <div className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm"
                style={{ background: "hsl(42,90%,52%)", }}>
                <Icon name={p.icon} size={20} style={{ color: "hsl(218,72%,10%)" }} fallback="BookOpen" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-golos font-bold text-white text-lg leading-tight mb-3 drop-shadow-sm">
                  {p.title}
                </h3>
                <div className="flex items-center gap-2 text-white/80 text-xs font-medium group-hover:gap-3 transition-all">
                  Подробнее о курсах
                  <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-colors duration-300 pointer-events-none" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-6 rounded-2xl border border-border"
            style={{ background: "hsl(214,32%,96%)" }}>
            <div className="text-left">
              <div className="font-golos font-bold text-base" style={{ color: "hsl(218,72%,18%)" }}>
                Не нашли нужное направление?
              </div>
              <div className="text-sm text-muted-foreground">Свяжитесь с нами — подберём программу под ваши задачи</div>
            </div>
            <a
              href="#enrollment"
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{ background: "hsl(218,72%,28%)" }}
            >
              <Icon name="MessageCircle" size={16} />
              Получить консультацию
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
