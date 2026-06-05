import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_LINKS } from "./data";
import { useAccessibility } from "@/contexts/AccessibilityContext";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAccessible, toggle } = useAccessibility();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <img
            src="https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/bucket/903e3ea5-717d-4657-8d0e-ac0bb45a114b.png"
            alt="ГорГазНефть"
            className="h-10 w-10 object-contain"
          />
          <div>
            <div className="font-golos font-bold text-xs leading-tight" style={{ color: "hsl(218,72%,18%)" }}>АНО ДПО</div>
            <div className="font-golos font-black text-sm leading-tight" style={{ color: "hsl(42,80%,42%)" }}>УЦ ГорГазНефть</div>
          </div>
        </div>

        <nav className="hidden xl:flex items-center gap-5">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-xs font-medium uppercase tracking-wide text-foreground/70 hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <button
          onClick={toggle}
          title={isAccessible ? "Обычная версия" : "Версия для слабовидящих"}
          className="inline-flex items-center justify-center w-8 h-8 rounded border transition-colors flex-shrink-0"
          style={isAccessible
            ? { background: "hsl(42,80%,42%)", color: "#fff", borderColor: "hsl(42,80%,42%)" }
            : { background: "transparent", color: "hsl(218,72%,28%)", borderColor: "hsl(218,72%,28%)" }
          }
        >
          <Icon name="Eye" size={15} />
        </button>

        <a href="#enrollment" className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-white transition-opacity hover:opacity-90 flex-shrink-0" style={{ background: "hsl(218,72%,28%)" }}>
          <Icon name="PenLine" size={13} />
          Записаться
        </a>

        <button className="xl:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-border py-4 px-4">
          <a
            href="#enrollment"
            className="flex items-center justify-center gap-2 py-3 rounded text-sm font-semibold text-white mb-4"
            style={{ background: "hsl(218,72%,28%)" }}
            onClick={() => setMobileOpen(false)}
          >
            <Icon name="PenLine" size={15} />
            Записаться на курс
          </a>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="block py-2.5 text-sm font-medium border-b border-border last:border-0" onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}