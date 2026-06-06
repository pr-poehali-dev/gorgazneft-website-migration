import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Course {
  title: string;
  hours: string;
  format: string;
  price: string;
  type: string;
}

interface Profession {
  title: string;
  image: string;
  icon: string;
  color: string;
  courses: Course[];
}

const PROFESSIONS: Profession[] = [
  {
    title: "Бурение, ремонт скважин, спецтехника",
    image: "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/60860649-ae57-4d8f-8ba9-5e23cc63e905.jpg",
    icon: "Drill",
    color: "from-amber-900/80 to-amber-700/60",
    courses: [
      { title: "Бурильщик эксплуатационных и разведочных скважин", hours: "72 ч", format: "Очно / Онлайн", price: "от 8 500 ₽", type: "Повышение квалификации" },
      { title: "Машинист буровой установки", hours: "40 ч", format: "Онлайн", price: "от 5 500 ₽", type: "Повышение квалификации" },
      { title: "Оператор по ремонту скважин", hours: "72 ч", format: "Очно / Онлайн", price: "от 9 000 ₽", type: "Повышение квалификации" },
      { title: "Мастер по ремонту скважин", hours: "144 ч", format: "Онлайн", price: "от 14 000 ₽", type: "Проф. переподготовка" },
      { title: "Слесарь по ремонту бурового оборудования", hours: "40 ч", format: "Очно / Онлайн", price: "от 6 000 ₽", type: "Повышение квалификации" },
    ],
  },
  {
    title: "Добыча, подготовка и переработка нефти и газа",
    image: "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/8e3f8400-fd0f-4ebb-8f41-192ec09e4d4b.jpg",
    icon: "Flame",
    color: "from-orange-900/80 to-orange-700/60",
    courses: [
      { title: "Оператор по добыче нефти и газа", hours: "72 ч", format: "Очно / Онлайн", price: "от 8 500 ₽", type: "Повышение квалификации" },
      { title: "Оператор товарный", hours: "40 ч", format: "Онлайн", price: "от 5 500 ₽", type: "Повышение квалификации" },
      { title: "Мастер по добыче нефти, газа и конденсата", hours: "144 ч", format: "Очно / Онлайн", price: "от 15 000 ₽", type: "Проф. переподготовка" },
      { title: "Аппаратчик переработки нефти и газа", hours: "72 ч", format: "Онлайн", price: "от 9 000 ₽", type: "Повышение квалификации" },
      { title: "Оператор газового хозяйства", hours: "40 ч", format: "Очно / Онлайн", price: "от 6 000 ₽", type: "Повышение квалификации" },
      { title: "Технолог нефтегазопереработки", hours: "250 ч", format: "Заочно", price: "от 22 000 ₽", type: "Проф. переподготовка" },
    ],
  },
  {
    title: "Подъёмные сооружения",
    image: "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/5083e032-797b-4b13-8cd2-ba3136b24fb6.jpg",
    icon: "ArrowUpFromLine",
    color: "from-sky-900/80 to-sky-700/60",
    courses: [
      { title: "Стропальщик (ПБ 10-382)", hours: "32 ч", format: "Очно / Онлайн", price: "от 4 500 ₽", type: "Повышение квалификации" },
      { title: "Машинист крана (крановщик)", hours: "72 ч", format: "Очно", price: "от 9 500 ₽", type: "Повышение квалификации" },
      { title: "Ответственный за безопасное производство работ кранами", hours: "40 ч", format: "Онлайн", price: "от 6 500 ₽", type: "Повышение квалификации" },
      { title: "Специалист по надзору за безопасной эксплуатацией ПС", hours: "72 ч", format: "Очно / Онлайн", price: "от 10 000 ₽", type: "Проф. переподготовка" },
    ],
  },
  {
    title: "Охрана труда",
    image: "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/5f86e2bf-3d0d-4eba-970f-b4b54e0ff349.jpg",
    icon: "HardHat",
    color: "from-green-900/80 to-green-700/60",
    courses: [
      { title: "Специалист по охране труда", hours: "72 ч", format: "Очно / Онлайн", price: "от 7 500 ₽", type: "Повышение квалификации" },
      { title: "Руководители и специалисты по ОТ (40 ч)", hours: "40 ч", format: "Онлайн", price: "от 4 500 ₽", type: "Повышение квалификации" },
      { title: "Охрана труда — профессиональная переподготовка", hours: "250 ч", format: "Заочно", price: "от 18 000 ₽", type: "Проф. переподготовка" },
      { title: "Первая помощь пострадавшим", hours: "16 ч", format: "Очно / Онлайн", price: "от 3 000 ₽", type: "Повышение квалификации" },
      { title: "Обучение по охране труда работников организаций", hours: "16 ч", format: "Онлайн", price: "от 2 500 ₽", type: "Повышение квалификации" },
    ],
  },
  {
    title: "Промышленная и экологическая безопасность",
    image: "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/e1454983-88d4-4f8d-b018-569ee0f0dbb9.jpg",
    icon: "ShieldCheck",
    color: "from-teal-900/80 to-teal-700/60",
    courses: [
      { title: "Промышленная безопасность (А.1 — общие требования)", hours: "40 ч", format: "Онлайн", price: "от 5 000 ₽", type: "Повышение квалификации" },
      { title: "Промышленная безопасность нефтегазовых объектов (Б.1.1)", hours: "40 ч", format: "Онлайн", price: "от 5 500 ₽", type: "Повышение квалификации" },
      { title: "Экологическая безопасность предприятия", hours: "72 ч", format: "Очно / Онлайн", price: "от 8 500 ₽", type: "Повышение квалификации" },
      { title: "Специалист в области охраны ОС", hours: "250 ч", format: "Заочно", price: "от 20 000 ₽", type: "Проф. переподготовка" },
      { title: "Декларирование промышленной безопасности", hours: "40 ч", format: "Онлайн", price: "от 6 000 ₽", type: "Повышение квалификации" },
      { title: "Пожарная безопасность на опасных производственных объектах", hours: "24 ч", format: "Онлайн", price: "от 4 000 ₽", type: "Повышение квалификации" },
    ],
  },
  {
    title: "Тепловые энергоустановки и газовое хозяйство",
    image: "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/24643d0a-f9e5-4a1d-915c-b047d3880b64.jpg",
    icon: "Thermometer",
    color: "from-red-900/80 to-red-700/60",
    courses: [
      { title: "Ответственный за газовое хозяйство организации", hours: "40 ч", format: "Онлайн", price: "от 5 500 ₽", type: "Повышение квалификации" },
      { title: "Оператор котельной", hours: "72 ч", format: "Очно / Онлайн", price: "от 8 000 ₽", type: "Повышение квалификации" },
      { title: "Слесарь по эксплуатации и ремонту газового оборудования", hours: "72 ч", format: "Очно", price: "от 9 000 ₽", type: "Повышение квалификации" },
      { title: "Теплоэнергетика и теплотехника", hours: "250 ч", format: "Заочно", price: "от 19 000 ₽", type: "Проф. переподготовка" },
      { title: "Ответственный за безопасную эксплуатацию тепловых установок", hours: "40 ч", format: "Онлайн", price: "от 6 000 ₽", type: "Повышение квалификации" },
    ],
  },
  {
    title: "Электробезопасность",
    image: "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/d4de8972-be74-4ac5-889b-82bf91ba54bb.jpg",
    icon: "Zap",
    color: "from-yellow-900/80 to-yellow-700/60",
    courses: [
      { title: "Электробезопасность, I группа", hours: "8 ч", format: "Онлайн", price: "от 1 500 ₽", type: "Допуск" },
      { title: "Электробезопасность, II–III группа (до 1000 В)", hours: "16 ч", format: "Онлайн", price: "от 3 000 ₽", type: "Допуск" },
      { title: "Электробезопасность, IV группа (выше 1000 В)", hours: "24 ч", format: "Очно / Онлайн", price: "от 5 000 ₽", type: "Допуск" },
      { title: "Электробезопасность, V группа (ответственный)", hours: "40 ч", format: "Очно / Онлайн", price: "от 7 000 ₽", type: "Повышение квалификации" },
    ],
  },
  {
    title: "Безопасность дорожного движения",
    image: "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/2022c4ee-961a-4423-a2fe-4a284b511adf.jpg",
    icon: "Car",
    color: "from-blue-900/80 to-blue-700/60",
    courses: [
      { title: "Специалист по БДД (ответственный за организацию перевозок)", hours: "72 ч", format: "Очно / Онлайн", price: "от 8 500 ₽", type: "Повышение квалификации" },
      { title: "Диспетчер автомобильного транспорта", hours: "40 ч", format: "Онлайн", price: "от 5 500 ₽", type: "Повышение квалификации" },
      { title: "Контролёр технического состояния транспортных средств", hours: "40 ч", format: "Онлайн", price: "от 5 500 ₽", type: "Повышение квалификации" },
    ],
  },
  {
    title: "ДОПОГ",
    image: "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/d47de243-89e7-479a-b63c-05cb1bb527cb.jpg",
    icon: "Truck",
    color: "from-orange-900/80 to-orange-700/60",
    courses: [
      { title: "Подготовка водителей транспортных средств, перевозящих опасные грузы (базовый курс)", hours: "32 ч", format: "Очно", price: "от 10 000 ₽", type: "Свидетельство ДОПОГ" },
      { title: "Перевозка опасных грузов в цистернах (специализация)", hours: "16 ч", format: "Очно", price: "от 6 000 ₽", type: "Свидетельство ДОПОГ" },
      { title: "Перевозка взрывчатых веществ (специализация)", hours: "16 ч", format: "Очно", price: "от 6 500 ₽", type: "Свидетельство ДОПОГ" },
    ],
  },
  {
    title: "Взрывные работы",
    image: "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/250f4081-e45a-4f08-a498-459ee045f876.jpg",
    icon: "AlertTriangle",
    color: "from-stone-900/80 to-stone-700/60",
    courses: [
      { title: "Взрывник (мастер-взрывник)", hours: "72 ч", format: "Очно", price: "от 12 000 ₽", type: "Повышение квалификации" },
      { title: "Руководитель взрывных работ", hours: "144 ч", format: "Очно / Онлайн", price: "от 18 000 ₽", type: "Проф. переподготовка" },
      { title: "Обращение с взрывчатыми материалами", hours: "40 ч", format: "Очно / Онлайн", price: "от 8 000 ₽", type: "Повышение квалификации" },
      { title: "Промышленная безопасность — взрывные работы (Б.7)", hours: "40 ч", format: "Онлайн", price: "от 6 000 ₽", type: "Повышение квалификации" },
    ],
  },
  {
    title: "Вспомогательная горноспасательная команда",
    image: "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/0e96920c-ff54-42f7-997d-16c415fd0a41.jpg",
    icon: "Users",
    color: "from-slate-900/80 to-slate-700/60",
    courses: [
      { title: "Подготовка членов вспомогательной горноспасательной команды", hours: "40 ч", format: "Очно", price: "от 9 000 ₽", type: "Повышение квалификации" },
      { title: "Командир ВГСК", hours: "72 ч", format: "Очно", price: "от 14 000 ₽", type: "Повышение квалификации" },
      { title: "Ликвидация аварий на горнодобывающих предприятиях", hours: "40 ч", format: "Очно / Онлайн", price: "от 8 500 ₽", type: "Повышение квалификации" },
    ],
  },
];

const TYPE_COLORS: Record<string, string> = {
  "Повышение квалификации": "bg-blue-50 text-blue-700 border-blue-200",
  "Проф. переподготовка": "bg-amber-50 text-amber-700 border-amber-200",
  "Свидетельство ДОПОГ": "bg-orange-50 text-orange-700 border-orange-200",
  "Допуск": "bg-green-50 text-green-700 border-green-200",
};

export default function ProfessionsSection() {
  const [selected, setSelected] = useState<Profession | null>(null);

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
            Нажмите на направление — откроется список доступных курсов с ценами и сроками
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROFESSIONS.map((p) => (
            <button
              key={p.title}
              onClick={() => setSelected(p)}
              className="group relative overflow-hidden rounded-2xl cursor-pointer text-left w-full"
              style={{ minHeight: "220px" }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${p.image})` }}
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${p.color} transition-opacity duration-300`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.25)" }}>
                  <Icon name="BookOpen" size={11} />
                  {p.courses.length} курсов
                </span>
              </div>

              <div className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "hsl(42,90%,52%)" }}>
                <Icon name={p.icon} size={20} style={{ color: "hsl(218,72%,10%)" }} fallback="BookOpen" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-golos font-bold text-white text-lg leading-tight mb-3 drop-shadow-sm">
                  {p.title}
                </h3>
                <div className="flex items-center gap-2 text-white/80 text-xs font-medium group-hover:gap-3 transition-all">
                  Смотреть курсы
                  <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-colors duration-300 pointer-events-none" />
            </button>
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
            <a href="#enrollment"
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{ background: "hsl(218,72%,28%)" }}>
              <Icon name="MessageCircle" size={16} />
              Получить консультацию
            </a>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(10,20,50,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
            style={{ background: "white" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="relative h-36 overflow-hidden rounded-t-2xl flex-shrink-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${selected.image})` }}
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${selected.color}`} />
              <div className="absolute inset-0 bg-black/40" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                <Icon name="X" size={16} className="text-white" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "hsl(42,90%,52%)" }}>
                    <Icon name={selected.icon} size={18} style={{ color: "hsl(218,72%,10%)" }} fallback="BookOpen" />
                  </div>
                  <h3 className="font-golos font-black text-white text-lg leading-tight">{selected.title}</h3>
                </div>
              </div>
            </div>

            {/* Courses list */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="font-golos font-bold text-base" style={{ color: "hsl(218,72%,18%)" }}>
                  Доступные курсы
                </div>
                <span className="text-xs text-muted-foreground">{selected.courses.length} программы</span>
              </div>

              <div className="space-y-3">
                {selected.courses.map((c, i) => (
                  <div key={i} className="border border-border rounded-xl p-4 hover:shadow-sm transition-shadow">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-sm leading-tight flex-1" style={{ color: "hsl(218,72%,15%)" }}>
                        {c.title}
                      </h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium flex-shrink-0 ${TYPE_COLORS[c.type] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}>
                        {c.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Icon name="Clock" size={12} />{c.hours}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Icon name="Monitor" size={12} />{c.format}
                      </span>

                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="#enrollment"
                  onClick={() => setSelected(null)}
                  className="flex-1 py-3.5 rounded-xl font-golos font-bold text-sm text-white text-center transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ background: "hsl(218,72%,28%)" }}
                >
                  <Icon name="PenLine" size={16} />
                  Записаться на курс
                </a>
                <a
                  href="mailto:gorgazneft@mail.ru"
                  className="flex-1 py-3.5 rounded-xl font-golos font-bold text-sm text-center transition-colors flex items-center justify-center gap-2 border border-border hover:bg-muted/50"
                  style={{ color: "hsl(218,72%,28%)" }}
                >
                  <Icon name="Mail" size={16} />
                  Задать вопрос
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}