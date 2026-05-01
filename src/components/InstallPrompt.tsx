import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("pwa-dismissed")) return;

    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !(window.navigator as unknown as { standalone?: boolean }).standalone;
    if (ios) {
      setIsIOS(true);
      setTimeout(() => setVisible(true), 3000);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setVisible(true), 3000);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") dismiss();
    setDeferredPrompt(null);
  };

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
    localStorage.setItem("pwa-dismissed", "1");
  };

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-sm mx-auto animate-slide-up">
      <div className="rounded-2xl shadow-2xl p-4 border border-white/10" style={{ background: "hsl(218,72%,14%)" }}>
        <button onClick={dismiss} className="absolute top-3 right-3 text-white/40 hover:text-white/80 transition-colors">
          <Icon name="X" size={16} />
        </button>

        <div className="flex items-start gap-3">
          <img
            src="https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/files/d63ea72c-28a8-4f75-ad11-6c802dcf0cec.jpg"
            alt="ГорГазНефть"
            className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="font-golos font-bold text-white text-sm mb-0.5">Установите приложение</div>
            <div className="text-white/60 text-xs leading-relaxed">
              {isIOS
                ? 'Нажмите на кнопку "Поделиться" в Safari, затем "На экран домой"'
                : "Добавьте сайт на главный экран для быстрого доступа"}
            </div>
          </div>
        </div>

        {isIOS ? (
          <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
            <Icon name="Share" size={15} className="text-white/60 flex-shrink-0" />
            <span className="text-white/50 text-xs">Safari → Поделиться →</span>
            <span className="text-white text-xs font-semibold">На экран домой</span>
          </div>
        ) : (
          <button
            onClick={handleInstall}
            className="mt-3 w-full py-2.5 rounded-xl font-golos font-bold text-sm transition-opacity hover:opacity-90"
            style={{ background: "hsl(42,90%,52%)", color: "hsl(218,72%,12%)" }}
          >
            Установить
          </button>
        )}
      </div>
    </div>
  );
}
