import Icon from "@/components/ui/icon";
import { COURSES, PROGRAMS, TEACHERS, SCHEDULE, DOCUMENTS, REVIEWS } from "./data";

export default function MainSections() {
  return (
    <>
      {/* HERO */}
      <section id="hero" className="relative pt-16 min-h-screen flex items-center overflow-hidden" style={{ background: "hsl(218,72%,18%)" }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/f415e2a2-fa8b-4728-944f-33b65a8ab140.jpg)` }} />
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5" style={{ background: "linear-gradient(135deg, transparent 0%, hsl(210,80%,60%) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: "linear-gradient(to top, hsl(218,72%,14%), transparent)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 border border-white/20 text-white/70">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(42,90%,52%)" }}></span>
              Лицензированный образовательный центр
            </div>
            <h1 className="font-golos text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Профессиональное{" "}
              <span style={{ color: "hsl(42,90%,52%)" }}>образование</span>{" "}
              для специалистов
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
              Повышение квалификации и профессиональная переподготовка. Дипломы государственного образца. Онлайн и очный формат.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#enrollment" className="inline-flex items-center gap-2 px-6 py-3.5 rounded font-semibold text-sm transition-opacity hover:opacity-90" style={{ background: "hsl(42,90%,52%)", color: "hsl(218,72%,10%)" }}>
                <Icon name="PenLine" size={16} />
                Записаться на курс
              </a>
              <a href="#courses" className="inline-flex items-center gap-2 px-6 py-3.5 rounded font-semibold text-sm border border-white/30 text-white hover:bg-white/10 transition-colors">
                Все курсы
                <Icon name="ArrowRight" size={16} />
              </a>
            </div>

            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/15">
              {[
                { num: "2 000+", label: "Выпускников" },
                { num: "20+", label: "Программ" },
                { num: "7 лет", label: "На рынке" },
                { num: "98%", label: "Трудоустройство" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-golos text-2xl font-black" style={{ color: "hsl(42,90%,52%)" }}>{s.num}</div>
                  <div className="text-xs text-white/60 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block animate-fade-in">
            <div className="rounded-xl border border-white/15 p-8 space-y-4" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div className="text-white/50 text-xs uppercase tracking-widest mb-4">Ближайшие старты</div>
              {SCHEDULE.slice(0, 4).map((s) => (
                <div key={s.course} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                  <div>
                    <div className="text-white text-sm font-medium">{s.course}</div>
                    <div className="text-white/50 text-xs mt-0.5">{s.format} · {s.duration}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold" style={{ color: "hsl(42,90%,52%)" }}>{s.start}</div>
                    <div className="text-white/40 text-xs">{s.seats}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "hsl(218,72%,28%)" }}>О центре</div>
              <h2 className="font-golos text-3xl sm:text-4xl font-black mb-2" style={{ color: "hsl(218,72%,18%)" }}>Образовательный центр «Профессионал»</h2>
              <div className="section-divider mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-4">
                Мы — лицензированный образовательный центр дополнительного профессионального образования, работающий с 2017 года. За это время более 2 000 специалистов прошли обучение и получили документы государственного образца.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Центр специализируется на программах повышения квалификации и профессиональной переподготовки в области управления, экономики, юриспруденции и охраны труда. Очный и дистанционный формат.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: "ShieldCheck", title: "Государственная лицензия", desc: "Документы установленного образца" },
                  { icon: "Wifi", title: "Дистанционный формат", desc: "Учитесь из любой точки России" },
                  { icon: "Clock", title: "Гибкий график", desc: "Без отрыва от производства" },
                  { icon: "Headphones", title: "Поддержка куратора", desc: "На всём пути обучения" },
                ].map((f) => (
                  <div key={f.title} className="flex gap-3 p-4 rounded-lg bg-muted/40 border border-border">
                    <div className="mt-0.5 w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{ background: "hsl(218,72%,18%)" }}>
                      <Icon name={f.icon} size={16} className="text-white" fallback="Star" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-foreground">{f.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                { q: "Какие документы выдаются по завершении?", a: "Удостоверение о повышении квалификации или диплом о профессиональной переподготовке. Все документы внесены в государственный реестр." },
                { q: "Можно ли учиться без отрыва от работы?", a: "Да. Большинство программ доступны в дистанционном формате с гибким расписанием. Вы получаете доступ к материалам 24/7." },
                { q: "Есть ли рассрочка оплаты?", a: "Да, мы предлагаем рассрочку на 3 и 6 месяцев без переплат. Подробности уточняйте у менеджера при записи." },
                { q: "Как долго длится обучение?", a: "Повышение квалификации — от 16 до 250 часов (1–8 недель). Профессиональная переподготовка — от 250 часов (2–6 месяцев)." },
              ].map((item, i) => (
                <details key={i} className="group border border-border rounded-lg overflow-hidden">
                  <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-sm select-none list-none">
                    {item.q}
                    <Icon name="ChevronDown" size={16} className="text-muted-foreground flex-shrink-0 ml-2 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="py-20" style={{ background: "hsl(214,32%,96%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "hsl(218,72%,28%)" }}>Форматы обучения</div>
            <h2 className="font-golos text-3xl sm:text-4xl font-black mb-3" style={{ color: "hsl(218,72%,18%)" }}>Образовательные программы</h2>
            <div className="section-divider mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PROGRAMS.map((p) => (
              <div key={p.name} className="bg-white rounded-xl border border-border p-8 hover:shadow-lg transition-shadow group">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style={{ background: "hsl(218,72%,18%)" }}>
                  <Icon name={p.icon} size={22} className="text-white" fallback="BookOpen" />
                </div>
                <div className="font-golos text-xl font-bold mb-2" style={{ color: "hsl(218,72%,18%)" }}>{p.name}</div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
                <div className="inline-flex px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "hsl(218,72%,18%)", color: "white" }}>
                  {p.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "hsl(218,72%,28%)" }}>Обучение</div>
            <h2 className="font-golos text-3xl sm:text-4xl font-black mb-3" style={{ color: "hsl(218,72%,18%)" }}>Популярные курсы</h2>
            <div className="section-divider mx-auto" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((c) => (
              <div key={c.title} className="border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 group">
                <div className="p-6 border-b border-border" style={{ background: "hsl(218,72%,18%)" }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-medium mb-2 text-white/60">{c.category}</div>
                      <h3 className="font-golos font-bold text-white text-lg leading-tight">{c.title}</h3>
                    </div>
                    <div className="ml-3 flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)" }}>
                      <Icon name={c.icon} size={18} className="text-white" fallback="BookOpen" />
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <div className="flex flex-wrap gap-3 mb-5">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Icon name="Clock" size={13} />{c.duration}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Icon name="Monitor" size={13} />{c.format}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-golos text-xl font-black" style={{ color: "hsl(218,72%,18%)" }}>{c.price}</div>
                    <a href="#enrollment" className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded transition-opacity hover:opacity-80" style={{ background: "hsl(42,90%,52%)", color: "hsl(218,72%,10%)" }}>
                      Записаться
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHERS */}
      <section id="teachers" className="py-20" style={{ background: "hsl(214,32%,96%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "hsl(218,72%,28%)" }}>Наставники</div>
            <h2 className="font-golos text-3xl sm:text-4xl font-black mb-3" style={{ color: "hsl(218,72%,18%)" }}>Преподаватели</h2>
            <div className="section-divider mx-auto" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEACHERS.map((t) => (
              <div key={t.name} className="bg-white rounded-xl border border-border p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "hsl(218,72%,18%)" }}>
                  <Icon name="User" size={28} className="text-white" />
                </div>
                <div className="font-golos font-bold text-base mb-1 leading-tight" style={{ color: "hsl(218,72%,18%)" }}>{t.name}</div>
                <div className="text-xs font-medium mb-1" style={{ color: "hsl(42,90%,42%)" }}>{t.title}</div>
                <div className="text-xs text-muted-foreground mb-2">{t.subject}</div>
                <div className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon name="Star" size={11} className="text-yellow-500" />
                  {t.exp}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "hsl(218,72%,28%)" }}>Учебный план</div>
            <h2 className="font-golos text-3xl sm:text-4xl font-black mb-3" style={{ color: "hsl(218,72%,18%)" }}>Расписание курсов</h2>
            <div className="section-divider mx-auto" />
          </div>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "hsl(218,72%,18%)" }}>
                  {["Курс", "Начало", "Продолжительность", "Формат", "Места", ""].map((h) => (
                    <th key={h} className="text-left px-5 py-4 text-white/80 font-semibold text-xs uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SCHEDULE.map((s, i) => (
                  <tr key={s.course} className={i % 2 === 0 ? "bg-white" : "bg-muted/30"}>
                    <td className="px-5 py-4 font-medium">{s.course}</td>
                    <td className="px-5 py-4 font-semibold" style={{ color: "hsl(218,72%,28%)" }}>{s.start}</td>
                    <td className="px-5 py-4 text-muted-foreground">{s.duration}</td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-muted">{s.format}</span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{s.seats}</td>
                    <td className="px-5 py-4">
                      <a href="#enrollment" className="text-xs font-semibold px-3 py-1.5 rounded transition-opacity hover:opacity-80 inline-block" style={{ background: "hsl(218,72%,18%)", color: "white" }}>
                        Записаться
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section id="documents" className="py-20" style={{ background: "hsl(218,72%,18%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-widest font-semibold mb-3 text-white/50">Правовая база</div>
            <h2 className="font-golos text-3xl sm:text-4xl font-black mb-3 text-white">Документы центра</h2>
            <div className="section-divider mx-auto" style={{ background: "hsl(42,90%,52%)" }} />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DOCUMENTS.map((d) => (
              <div key={d.name} className="rounded-xl border border-white/15 p-6 hover:border-white/30 transition-colors cursor-pointer group" style={{ background: "hsl(218,65%,24%)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "hsl(42,90%,52%)" }}>
                  <Icon name={d.icon} size={20} fallback="FileText" style={{ color: "hsl(218,72%,10%)" }} />
                </div>
                <div className="font-golos font-bold text-white text-sm leading-tight mb-2">{d.name}</div>
                <div className="text-white/40 text-xs">{d.num}</div>
                <div className="mt-3 flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all" style={{ color: "hsl(42,90%,52%)" }}>
                  Посмотреть <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "hsl(218,72%,28%)" }}>Мнения</div>
            <h2 className="font-golos text-3xl sm:text-4xl font-black mb-3" style={{ color: "hsl(218,72%,18%)" }}>Отзывы слушателей</h2>
            <div className="section-divider mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={14} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">«{r.text}»</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "hsl(218,72%,18%)" }}>
                    <Icon name="User" size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
