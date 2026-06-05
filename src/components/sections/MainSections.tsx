import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";
import { COURSES, COURSE_CATEGORIES, PROGRAMS, SCHEDULE, DOCUMENTS, REVIEWS, WORD_DOCS } from "./data";
import ProfessionsSection from "./ProfessionsSection";

type DocFile = { name: string; url: string; folder: string };

const COURSES_PER_PAGE = 12;

export default function MainSections() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [docsOpen, setDocsOpen] = useState(false);
  const docFiles: DocFile[] = WORD_DOCS;
  const [docSearch, setDocSearch] = useState("");
  const [docFolder, setDocFolder] = useState("Все");
  const [courseSearch, setCourseSearch] = useState("");
  const [courseCategory, setCourseCategory] = useState("Все");
  const [coursePage, setCoursePage] = useState(1);

  const docFolders = useMemo(() => {
    const set = new Set(docFiles.map((f) => f.folder));
    return ["Все", ...Array.from(set).sort()];
  }, [docFiles]);

  const filteredDocFiles = useMemo(() => {
    return docFiles.filter((f) => {
      const matchFolder = docFolder === "Все" || f.folder === docFolder;
      const matchSearch = !docSearch.trim() || f.name.toLowerCase().includes(docSearch.toLowerCase());
      return matchFolder && matchSearch;
    });
  }, [docFiles, docSearch, docFolder]);

  const filteredCourses = useMemo(() => {
    const q = courseSearch.toLowerCase();
    return COURSES.filter((c) => {
      const matchCat = courseCategory === "Все" || c.category === courseCategory;
      const matchSearch = !q || c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [courseSearch, courseCategory]);

  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
  const pagedCourses = filteredCourses.slice((coursePage - 1) * COURSES_PER_PAGE, coursePage * COURSES_PER_PAGE);

  function handleCategoryChange(cat: string) {
    setCourseCategory(cat);
    setCoursePage(1);
  }

  function handleSearch(val: string) {
    setCourseSearch(val);
    setCoursePage(1);
  }

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
              Лицензия № Л035-01198-02/03314706 · Минпросвещения РБ
            </div>
            <h1 className="font-golos text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Обучение специалистов{" "}
              <span style={{ color: "hsl(42,90%,52%)" }}>нефтяной, газовой</span>{" "}
              и горной отрасли
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
              Повышение квалификации и профессиональная переподготовка по стандартам Ростехнадзора. Дипломы государственного образца. Очно и онлайн.
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
                { num: "3 500+", label: "Выпускников" },
                { num: "23+", label: "Программ" },
                { num: "8 лет", label: "На рынке" },
                { num: "100%", label: "Сдают аттестацию" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-golos text-2xl font-black" style={{ color: "hsl(42,90%,52%)" }}>{s.num}</div>
                  <div className="text-xs text-white/60 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block animate-fade-in">
            <div className="rounded-xl border border-white/15 p-7" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div className="text-white/50 text-xs uppercase tracking-widest mb-5">Оплата обучения</div>
              <div className="flex gap-6 items-start">
                {/* QR-код */}
                <div className="flex-shrink-0">
                  <div className="rounded-lg overflow-hidden bg-white p-2" style={{ width: 130, height: 130 }}>
                    <img
                      src="https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/bucket/72c27b20-f126-4633-ac5e-1872acb88dc6.png"
                      alt="QR для оплаты"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-white/40 text-xs text-center mt-2">Сканируй и оплачивай</div>
                </div>
                {/* Реквизиты */}
                <div className="flex-1 space-y-2 text-xs">
                  <div>
                    <div className="text-white/40">Получатель</div>
                    <div className="text-white font-medium leading-snug">АНО ДПО «Учебный центр ГорГазНефть»</div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                    <div>
                      <div className="text-white/40">ИНН</div>
                      <div className="text-white">0268104892</div>
                    </div>
                    <div>
                      <div className="text-white/40">КПП</div>
                      <div className="text-white">026801001</div>
                    </div>
                    <div>
                      <div className="text-white/40">Банк</div>
                      <div className="text-white">АО «Альфа-Банк»</div>
                    </div>
                    <div>
                      <div className="text-white/40">БИК</div>
                      <div className="text-white">044525593</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-white/40">Счёт</div>
                      <div className="text-white font-mono">40703810880690000003</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Кнопка скачать квитанцию */}
              <button
                onClick={() => {
                  fetch("https://functions.poehali.dev/2f23b62a-53bf-429c-b05e-1b19433c6a91")
                    .then(r => r.blob())
                    .then(blob => {
                      const a = document.createElement("a");
                      a.href = URL.createObjectURL(blob);
                      a.download = "Квитанция_УЦ_ГорГазНефть.pdf";
                      a.click();
                      URL.revokeObjectURL(a.href);
                    });
                }}
                className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                style={{ background: "hsl(42,90%,52%)", color: "hsl(218,72%,10%)" }}
              >
                <Icon name="Download" size={15} />
                Скачать квитанцию (PDF)
              </button>
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
              <h2 className="font-golos text-3xl sm:text-4xl font-black mb-2" style={{ color: "hsl(218,72%,18%)" }}>АНО ДПО «Учебный центр ГорГазНефть»</h2>
              <div className="section-divider mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-4">
                Автономная некоммерческая организация дополнительного профессионального образования «Учебный центр ГорГазНефть» работает с 2018 года. За это время более 3 500 специалистов нефтяной, газовой и горнодобывающей отрасли прошли обучение и успешно прошли аттестацию в Ростехнадзоре.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Специализируемся на подготовке, переподготовке и повышении квалификации по требованиям промышленной безопасности. Работаем с крупными предприятиями ТЭК и горнодобывающего комплекса по всей России.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: "ShieldCheck", title: "Лицензия Минпросвещения РБ", desc: "№ Л035-01198-02/03314706, действует" },
                  { icon: "Wifi", title: "Дистанционный формат", desc: "Обучение из любой точки России" },
                  { icon: "HardHat", title: "Отраслевые эксперты", desc: "Преподаватели — практики из ТЭК" },
                  { icon: "Headphones", title: "Поддержка куратора", desc: "Помощь при прохождении аттестации" },
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
                { q: "Какие документы выдаются по завершении?", a: "Удостоверение о повышении квалификации или диплом о профессиональной переподготовке государственного образца, признаваемые Ростехнадзором при аттестации." },
                { q: "Можно ли учиться без отрыва от производства?", a: "Да. Большинство программ доступны в дистанционном формате — доступ к материалам 24/7, сдача тестов онлайн. Очные форматы проводятся в выходные дни." },
                { q: "Работаете ли вы с юридическими лицами?", a: "Да, мы заключаем договоры с организациями, выставляем счета, предоставляем все закрывающие документы. Корпоративным клиентам — скидки от 10%." },
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

      <ProfessionsSection />

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
          <div className="text-center mb-10">
            <div className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "hsl(218,72%,28%)" }}>Прайс 2026</div>
            <h2 className="font-golos text-3xl sm:text-4xl font-black mb-3" style={{ color: "hsl(218,72%,18%)" }}>Каталог курсов</h2>
            <div className="section-divider mx-auto mb-4" />
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              {COURSES.length} программ обучения · выдаются легитимные документы, вносятся в реестр Минтруда и ФИС ФРДО
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-lg mx-auto mb-6">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск по названию курса..."
              value={courseSearch}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ focusRingColor: "hsl(218,72%,28%)" } as React.CSSProperties}
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {["Все", ...COURSE_CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors border"
                style={
                  courseCategory === cat
                    ? { background: "hsl(218,72%,18%)", color: "white", borderColor: "hsl(218,72%,18%)" }
                    : { background: "white", color: "hsl(218,72%,28%)", borderColor: "hsl(214,32%,85%)" }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="text-xs text-muted-foreground mb-5">
            Найдено: <span className="font-semibold text-foreground">{filteredCourses.length}</span> курсов
            {totalPages > 1 && <span> · страница {coursePage} из {totalPages}</span>}
          </div>

          {/* Cards */}
          {pagedCourses.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {pagedCourses.map((c) => (
                <div key={c.id} className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5 group flex flex-col">
                  <div className="px-4 py-3 flex items-start justify-between gap-2" style={{ background: "hsl(218,72%,18%)" }}>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium mb-1 text-white/50">{c.category}</div>
                      <h3 className="font-golos font-bold text-white text-sm leading-snug">{c.title}</h3>
                    </div>
                    <div className="flex-shrink-0 w-7 h-7 rounded flex items-center justify-center mt-0.5" style={{ background: "rgba(255,255,255,0.12)" }}>
                      <Icon name={c.icon} size={14} className="text-white" fallback="BookOpen" />
                    </div>
                  </div>
                  <div className="px-4 py-2.5 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon name="Clock" size={11} />
                      <span>{c.hours}</span>
                    </div>
                    <a
                      href="#enrollment"
                      className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded transition-opacity hover:opacity-80"
                      style={{ background: "hsl(42,90%,52%)", color: "hsl(218,72%,10%)" }}
                    >
                      Записаться
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <Icon name="SearchX" size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">По вашему запросу ничего не найдено</p>
              <button onClick={() => { handleSearch(""); handleCategoryChange("Все"); }} className="mt-3 text-xs underline" style={{ color: "hsl(218,72%,28%)" }}>
                Сбросить фильтры
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setCoursePage((p) => Math.max(1, p - 1))}
                disabled={coursePage === 1}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center disabled:opacity-30 hover:bg-muted transition-colors"
              >
                <Icon name="ChevronLeft" size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - coursePage) <= 2)
                .reduce<(number | "...")[]>((acc, p, i, arr) => {
                  if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push("...");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === "..." ? (
                    <span key={`ellipsis-${i}`} className="w-8 text-center text-xs text-muted-foreground">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setCoursePage(p as number)}
                      className="w-8 h-8 rounded-lg border text-xs font-semibold transition-colors"
                      style={
                        coursePage === p
                          ? { background: "hsl(218,72%,18%)", color: "white", borderColor: "hsl(218,72%,18%)" }
                          : { borderColor: "hsl(214,32%,85%)", color: "hsl(218,72%,28%)" }
                      }
                    >
                      {p}
                    </button>
                  )
                )}
              <button
                onClick={() => setCoursePage((p) => Math.min(totalPages, p + 1))}
                disabled={coursePage === totalPages}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center disabled:opacity-30 hover:bg-muted transition-colors"
              >
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          )}

          <p className="text-center text-xs text-muted-foreground mt-8">
            * Большие часы — при первичном обучении; меньшие — при повышении квалификации. Для постоянных заказчиков — гибкая система скидок.
          </p>
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
              <div
                key={d.name}
                className="rounded-xl border border-white/15 p-6 hover:border-white/30 transition-colors cursor-pointer group"
                style={{ background: "hsl(218,65%,24%)" }}
                onClick={() => "img" in d && d.img ? setLightbox(d.img as string) : undefined}
              >
                {"img" in d && d.img ? (
                  <div className="w-full h-16 rounded-lg overflow-hidden mb-4 border border-white/10">
                    <img src={d.img as string} alt={d.name} className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "hsl(42,90%,52%)" }}>
                    <Icon name={d.icon} size={20} fallback="FileText" style={{ color: "hsl(218,72%,10%)" }} />
                  </div>
                )}
                <div className="font-golos font-bold text-white text-sm leading-tight mb-2">{d.name}</div>
                <div className="text-white/40 text-xs">{d.num}</div>
                <div className="mt-3 flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all" style={{ color: "hsl(42,90%,52%)" }}>
                  {"img" in d && d.img ? "Открыть" : "Посмотреть"} <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>

          {/* Нормативные документы Word */}
          <div className="mt-10">
            <button
              onClick={() => setDocsOpen((v) => !v)}
              className="w-full flex items-center justify-between px-6 py-4 rounded-xl border border-white/20 hover:border-white/40 transition-colors group"
              style={{ background: "hsl(218,65%,24%)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "hsl(42,90%,52%)" }}>
                  <Icon name="FolderOpen" size={18} style={{ color: "hsl(218,72%,10%)" }} />
                </div>
                <div className="text-left">
                  <div className="font-golos font-bold text-white text-sm">Нормативные и учебные документы</div>
                  <div className="text-white/50 text-xs mt-0.5">Положения, правила, образцы документов — для скачивания</div>
                </div>
              </div>
              <Icon
                name="ChevronDown"
                size={18}
                className="text-white/50 flex-shrink-0 transition-transform"
                style={{ transform: docsOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>

            {docsOpen && (
              <div className="mt-3 rounded-xl border border-white/15 overflow-hidden" style={{ background: "hsl(218,65%,22%)" }}>

                {/* Поиск */}
                <div className="p-4 border-b border-white/10">
                  <div className="relative">
                    <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="text"
                      placeholder="Поиск по названию документа..."
                      value={docSearch}
                      onChange={(e) => { setDocSearch(e.target.value); setDocFolder("Все"); }}
                      className="w-full pl-8 pr-4 py-2 rounded-lg text-sm text-white placeholder-white/30 border border-white/15 focus:outline-none focus:border-white/40 transition-colors"
                      style={{ background: "hsl(218,72%,18%)" }}
                    />
                  </div>
                </div>

                {/* Вкладки папок */}
                {docFolders.length > 2 && (
                  <div className="flex flex-wrap gap-1.5 px-4 py-3 border-b border-white/10">
                    {docFolders.map((folder) => {
                      const count = folder === "Все" ? docFiles.length : docFiles.filter((f) => f.folder === folder).length;
                      return (
                        <button
                          key={folder}
                          onClick={() => { setDocFolder(folder); setDocSearch(""); }}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors"
                          style={
                            docFolder === folder
                              ? { background: "hsl(42,90%,52%)", color: "hsl(218,72%,10%)" }
                              : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }
                          }
                        >
                          <Icon name="Folder" size={11} />
                          {folder}
                          <span className="opacity-60 text-xs">({count})</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Список файлов */}
                <div className="max-h-96 overflow-y-auto">
                  {filteredDocFiles.length === 0 ? (
                    <div className="text-center py-10 text-white/40 text-sm">
                      Ничего не найдено
                    </div>
                  ) : (
                    filteredDocFiles.map((f) => (
                      <div
                        key={f.url}
                        className="flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-colors group border-b border-white/5 last:border-0 cursor-pointer"
                        onClick={() => {
                          const proxyUrl = `https://functions.poehali.dev/548aba03-2077-4e1e-8440-b9b454902559?url=${encodeURIComponent(f.url)}&filename=${encodeURIComponent(f.name + ".docx")}`;
                          fetch(proxyUrl)
                            .then((r) => r.blob())
                            .then((blob) => {
                              const a = document.createElement("a");
                              a.href = URL.createObjectURL(blob);
                              a.download = `${f.name}.docx`;
                              a.click();
                              URL.revokeObjectURL(a.href);
                            });
                        }}
                      >
                        <div className="flex-shrink-0 w-7 h-7 rounded flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
                          <Icon name="FileText" size={14} className="text-white/60" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="block text-sm text-white/80 group-hover:text-white transition-colors leading-snug truncate">
                            {f.name.replace(/\.docx?$/i, "")}
                          </span>
                          {docFolder === "Все" && (
                            <span className="text-xs text-white/30 mt-0.5 block">{f.folder}</span>
                          )}
                        </div>
                        <Icon name="Download" size={14} className="flex-shrink-0 text-white/30 group-hover:text-white/70 transition-colors" />
                      </div>
                    ))
                  )}
                </div>

                {filteredDocFiles.length > 0 && (
                  <div className="px-5 py-3 border-t border-white/10 text-white/30 text-xs">
                    {filteredDocFiles.length} {filteredDocFiles.length === 1 ? "документ" : filteredDocFiles.length < 5 ? "документа" : "документов"}
                    {docFolder !== "Все" && ` · ${docFolder}`}
                  </div>
                )}
              </div>
            )}
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

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }}
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
            >
              <Icon name="X" size={16} /> Закрыть
            </button>
            <img src={lightbox} alt="Документ" className="w-full rounded-xl shadow-2xl" />
          </div>
        </div>
      )}
    </>
  );
}