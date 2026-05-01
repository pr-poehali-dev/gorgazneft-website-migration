import Header from "@/components/sections/Header";
import MainSections from "@/components/sections/MainSections";
import EnrollmentFooter from "@/components/sections/EnrollmentFooter";
import Icon from "@/components/ui/icon";
import InstallPrompt from "@/components/InstallPrompt";

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-ibm">
      <Header />
      <MainSections />

      {/* TESTING BLOCK */}
      <section className="py-16" style={{ background: "hsl(218,72%,12%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-xs uppercase tracking-widest font-semibold mb-3 text-white/50">Онлайн-тестирование</div>
          <h2 className="font-golos text-3xl sm:text-4xl font-black text-white mb-4">
            Пройдите проверку знаний
          </h2>
          <p className="text-white/60 text-base mb-8 max-w-xl mx-auto">
            Проверьте готовность к аттестации или оцените уровень знаний по охране труда и промышленной безопасности
          </p>
          <a
            href="https://ms.testsmart.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-golos font-bold text-lg transition-opacity hover:opacity-90 text-white"
            style={{ background: "hsl(42,90%,52%)", color: "hsl(218,72%,12%)" }}
          >
            <Icon name="ClipboardCheck" size={22} />
            Начать тестирование
            <Icon name="ArrowRight" size={20} />
          </a>
          <div className="mt-6 text-white/30 text-xs">ms.testsmart.ru — внешний сервис тестирования</div>
        </div>
      </section>

      <EnrollmentFooter />
      <InstallPrompt />
    </div>
  );
}