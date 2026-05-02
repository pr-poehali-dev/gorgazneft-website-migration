import { useState } from "react";
import Icon from "@/components/ui/icon";

const FAQ = [
  {
    q: "Какие документы нужны для поступления на курсы?",
    a: "Паспорт, диплом об образовании (среднее профессиональное или высшее), документы о предыдущей квалификации (если есть). Для повышения квалификации — также трудовая книжка или справка с места работы.",
  },
  {
    q: "Какой документ я получу после обучения?",
    a: "После повышения квалификации выдаётся удостоверение государственного образца. После профессиональной переподготовки — диплом о профессиональной переподготовке. Все документы признаются Ростехнадзором.",
  },
  {
    q: "Можно ли пройти обучение онлайн?",
    a: "Да, большинство программ доступны в онлайн-формате. Занятия проходят через личный кабинет, в удобное для вас время. Итоговая аттестация также проводится дистанционно.",
  },
  {
    q: "Сколько времени занимает обучение?",
    a: "Зависит от программы: курсы повышения квалификации — от 24 до 250 часов (от 3 дней до 5 недель). Профессиональная переподготовка — от 250 часов (2–4 месяца). Конкретные сроки указаны в расписании.",
  },
  {
    q: "Признаются ли ваши удостоверения в других регионах России?",
    a: "Да. Мы работаем на основании лицензии Министерства образования Республики Башкортостан № Л035-01198-02/03314706. Выданные документы действительны на всей территории РФ и признаются Ростехнадзором.",
  },
  {
    q: "Возможно ли корпоративное обучение для группы сотрудников?",
    a: "Да, мы организуем корпоративное обучение под ключ: составляем программу под ваше предприятие, согласуем расписание, проводим аттестацию. Свяжитесь с нами для расчёта стоимости.",
  },
  {
    q: "Как записаться на курс?",
    a: "Заполните заявку на сайте или позвоните по номеру +7 (905) 005-36-19. Менеджер свяжется с вами в течение одного рабочего дня, уточнит детали и оформит договор.",
  },
  {
    q: "Есть ли рассрочка или корпоративные скидки?",
    a: "Для физических лиц доступна рассрочка на срок обучения. Для юридических лиц и групп от 5 человек предусмотрены корпоративные скидки. Уточняйте при записи.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest font-semibold mb-3 text-primary/60">Частые вопросы</div>
          <h2 className="font-golos text-3xl sm:text-4xl font-black text-primary">
            Ответы на вопросы
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <div
              key={i}
              className="border border-border rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left bg-white hover:bg-muted/40 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-golos font-semibold text-primary text-base">{item.q}</span>
                <Icon
                  name="ChevronDown"
                  size={20}
                  className={`flex-shrink-0 text-primary/50 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 pt-1 text-foreground/70 text-sm leading-relaxed border-t border-border bg-muted/20">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
