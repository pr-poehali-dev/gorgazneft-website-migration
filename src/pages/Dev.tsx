import { useState } from "react";
import Icon from "@/components/ui/icon";

const SERVICES = [
  {
    icon: "Globe",
    title: "Сайты и лендинги",
    desc: "Корпоративные сайты, лендинги, каталоги, сайты-визитки. Современный дизайн, адаптация под мобильные устройства, SEO-оптимизация.",
  },
  {
    icon: "AppWindow",
    title: "Веб-приложения",
    desc: "Личные кабинеты, CRM, порталы, онлайн-сервисы. Автоматизация бизнес-процессов под ваши задачи.",
  },
  {
    icon: "MonitorSmartphone",
    title: "Программы и автоматизация",
    desc: "Десктопные и мобильные приложения, боты, интеграции с внешними сервисами, автоматизация рутинных задач.",
  },
];

const STEPS = [
  { num: "01", title: "Заявка", desc: "Оставьте заявку — свяжемся в течение дня" },
  { num: "02", title: "Обсуждение", desc: "Выясняем задачу, сроки и стоимость" },
  { num: "03", title: "Разработка", desc: "Делаем, показываем промежуточный результат" },
  { num: "04", title: "Сдача", desc: "Передаём готовый продукт с поддержкой" },
];

export default function Dev() {
  const [form, setForm] = useState({ name: "", phone: "", task: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("https://functions.poehali.dev/send-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          course: "Разработка сайтов / приложений",
          message: form.task,
        }),
      });
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "hsl(218,72%,10%)" }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10" style={{ background: "hsl(218,72%,10%)/95", backdropFilter: "blur(8px)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <img
              src="https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/bucket/903e3ea5-717d-4657-8d0e-ac0bb45a114b.png"
              alt="ГорГазНефть"
              className="h-9 w-9 object-contain"
            />
            <div>
              <div className="font-bold text-xs leading-tight text-white/60">АНО ДПО</div>
              <div className="font-black text-sm leading-tight" style={{ color: "hsl(42,80%,52%)" }}>УЦ ГорГазНефть</div>
            </div>
          </a>
          <a
            href="/"
            className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors"
          >
            <Icon name="ArrowLeft" size={14} />
            На главную
          </a>
        </div>
      </header>

      <div className="pt-24 pb-20">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6" style={{ background: "hsl(42,80%,52%)", color: "hsl(218,72%,10%)" }}>
            <Icon name="Code2" size={13} />
            Разработка под ключ
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-6">
            Сайты, программы<br />и приложения
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
            Создаём цифровые продукты для бизнеса — от простого лендинга до сложной автоматизации
          </p>
          <a
            href="#order"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
            style={{ background: "hsl(42,80%,52%)", color: "hsl(218,72%,10%)" }}
          >
            <Icon name="Send" size={16} />
            Оставить заявку
          </a>
        </section>

        {/* Services */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-xl font-bold text-white text-center mb-8">Что мы делаем</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {SERVICES.map((s) => (
              <div key={s.title} className="rounded-2xl p-6 border border-white/10" style={{ background: "hsl(218,65%,16%)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "hsl(42,80%,52%)" }}>
                  <Icon name={s.icon} size={20} style={{ color: "hsl(218,72%,10%)" }} />
                </div>
                <h3 className="font-bold text-white text-base mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-xl font-bold text-white text-center mb-8">Как мы работаем</h2>
          <div className="grid sm:grid-cols-4 gap-4">
            {STEPS.map((s, i) => (
              <div key={s.num} className="relative flex flex-col items-center text-center">
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute top-5 left-1/2 w-full h-px" style={{ background: "hsl(218,65%,30%)" }} />
                )}
                <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black mb-3" style={{ background: "hsl(42,80%,52%)", color: "hsl(218,72%,10%)" }}>
                  {s.num}
                </div>
                <div className="font-bold text-white text-sm mb-1">{s.title}</div>
                <div className="text-white/40 text-xs leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Form */}
        <section id="order" className="max-w-xl mx-auto px-4 sm:px-6 py-12">
          <div className="rounded-2xl p-8 border border-white/10" style={{ background: "hsl(218,65%,16%)" }}>
            <h2 className="text-xl font-bold text-white mb-2">Оставить заявку</h2>
            <p className="text-white/50 text-sm mb-6">Свяжемся в течение рабочего дня и обсудим детали</p>

            {sent ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "hsl(42,80%,52%)" }}>
                  <Icon name="Check" size={28} style={{ color: "hsl(218,72%,10%)" }} />
                </div>
                <div className="font-bold text-white text-lg mb-1">Заявка отправлена!</div>
                <div className="text-white/50 text-sm">Свяжемся с вами в ближайшее время</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs text-white/50 mb-1.5">Ваше имя</label>
                  <input
                    type="text"
                    required
                    placeholder="Иван Иванов"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm text-white placeholder-white/20 border border-white/15 focus:outline-none focus:border-white/40 transition-colors"
                    style={{ background: "hsl(218,72%,12%)" }}
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5">Телефон</label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (___) ___-__-__"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm text-white placeholder-white/20 border border-white/15 focus:outline-none focus:border-white/40 transition-colors"
                    style={{ background: "hsl(218,72%,12%)" }}
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5">Что нужно сделать?</label>
                  <textarea
                    rows={4}
                    placeholder="Опишите задачу: сайт-визитка, интернет-магазин, программа учёта..."
                    value={form.task}
                    onChange={(e) => setForm({ ...form, task: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm text-white placeholder-white/20 border border-white/15 focus:outline-none focus:border-white/40 transition-colors resize-none"
                    style={{ background: "hsl(218,72%,12%)" }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ background: "hsl(42,80%,52%)", color: "hsl(218,72%,10%)" }}
                >
                  {loading ? <Icon name="Loader2" size={16} className="animate-spin" /> : <Icon name="Send" size={16} />}
                  {loading ? "Отправляем..." : "Отправить заявку"}
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}