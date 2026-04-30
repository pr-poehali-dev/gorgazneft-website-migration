import { useState } from "react";
import Icon from "@/components/ui/icon";
import { COURSES } from "./data";

export default function EnrollmentFooter() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", course: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* ENROLLMENT FORM */}
      <section id="enrollment" className="py-20" style={{ background: "hsl(214,32%,96%)" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "hsl(218,72%,28%)" }}>Регистрация</div>
            <h2 className="font-golos text-3xl sm:text-4xl font-black mb-3" style={{ color: "hsl(218,72%,18%)" }}>Запись на курс</h2>
            <div className="section-divider mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">Заполните форму — менеджер свяжется с вами в течение рабочего дня и подтвердит запись</p>
          </div>

          <div className="bg-white rounded-xl border border-border p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4" style={{ background: "hsl(218,72%,18%)" }}>
                  <Icon name="CheckCircle" size={32} className="text-white" />
                </div>
                <h3 className="font-golos text-xl font-bold mb-2" style={{ color: "hsl(218,72%,18%)" }}>Заявка принята!</h3>
                <p className="text-muted-foreground text-sm">Спасибо! Наш менеджер свяжется с вами в ближайшее рабочее время.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-sm font-medium underline" style={{ color: "hsl(218,72%,28%)" }}>
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide text-muted-foreground">Ваше имя *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Иван Иванов" className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 transition-shadow" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide text-muted-foreground">Телефон *</label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 transition-shadow" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide text-muted-foreground">Email *</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="example@mail.ru" className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 transition-shadow" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide text-muted-foreground">Выберите курс</label>
                  <select value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 transition-shadow bg-white">
                    <option value="">— Выберите из списка —</option>
                    {COURSES.map((c) => (
                      <option key={c.title} value={c.title}>{c.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide text-muted-foreground">Комментарий</label>
                  <textarea rows={3} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} placeholder="Уточнения по форме обучения, дате или другие вопросы..." className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 transition-shadow resize-none" />
                </div>
                <button type="submit" className="w-full py-4 rounded-lg font-golos font-bold text-base transition-opacity hover:opacity-90 flex items-center justify-center gap-2 text-white" style={{ background: "hsl(218,72%,28%)" }}>
                  <Icon name="Send" size={18} />
                  Отправить заявку
                </button>
                <p className="text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "hsl(218,72%,28%)" }}>Связаться</div>
            <h2 className="font-golos text-3xl sm:text-4xl font-black mb-3" style={{ color: "hsl(218,72%,18%)" }}>Контакты</h2>
            <div className="section-divider mx-auto" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "MapPin", title: "Адрес", value: "Респ. Башкортостан, г. Сибай, ул. Куйбышева, д. 20, офис 32", sub: "Пн–Пт, 09:00–18:00" },
              { icon: "Phone", title: "Телефон", value: "+7 (495) 000-00-00", sub: "Звонки и WhatsApp" },
              { icon: "Mail", title: "Email", value: "gorgazneft@mail.ru", sub: "Ответим в течение дня", href: "mailto:gorgazneft@mail.ru" },
              { icon: "Users", title: "ВКонтакте", value: "vk.com/gazneft2013", sub: "Новости и акции", href: "https://vk.com/gazneft2013" },
            ].map((c) => (
              <div key={c.title} className="border border-border rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "hsl(218,72%,18%)" }}>
                  <Icon name={c.icon} size={20} className="text-white" fallback="Phone" />
                </div>
                <div className="font-golos font-bold text-sm mb-1" style={{ color: "hsl(218,72%,18%)" }}>{c.title}</div>
                {"href" in c ? (
                  <a href={c.href} className="text-sm font-medium mb-1 block hover:underline" style={{ color: "hsl(218,72%,28%)" }}>{c.value}</a>
                ) : (
                  <div className="text-sm font-medium mb-1">{c.value}</div>
                )}
                <div className="text-xs text-muted-foreground">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-border" style={{ background: "hsl(218,72%,12%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img
                src="https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/bucket/903e3ea5-717d-4657-8d0e-ac0bb45a114b.png"
                alt="ГорГазНефть"
                className="h-8 w-8 object-contain brightness-0 invert"
              />
              <span className="font-golos font-black text-white text-sm">АНО ДПО «Учебный центр ГорГазНефть»</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: "О центре", href: "#about" },
                { label: "Курсы", href: "#courses" },
                { label: "Документы", href: "#documents" },
                { label: "Контакты", href: "#contacts" },
              ].map((l) => (
                <a key={l.label} href={l.href} className="text-white/40 hover:text-white/70 text-xs transition-colors">{l.label}</a>
              ))}
              <a href="https://vk.com/gazneft2013" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/70 text-xs transition-colors flex items-center gap-1">
                <Icon name="Users" size={12} />
                ВКонтакте
              </a>
              <a href="mailto:gorgazneft@mail.ru" className="text-white/40 hover:text-white/70 text-xs transition-colors flex items-center gap-1">
                <Icon name="Mail" size={12} />
                gorgazneft@mail.ru
              </a>
            </div>
            <div className="text-white/30 text-xs">© 2026 АНО ДПО «Учебный центр ГорГазНефть»</div>
          </div>
        </div>
      </footer>
    </>
  );
}