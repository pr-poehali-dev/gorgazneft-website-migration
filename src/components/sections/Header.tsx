import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_LINKS } from "./data";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: "hsl(218,72%,18%)" }}>
            <Icon name="GraduationCap" size={18} className="text-white" />
          </div>
          <div>
            <div className="font-golos font-bold text-sm leading-tight" style={{ color: "hsl(218,72%,18%)" }}>ОБРАЗОВАТЕЛЬНЫЙ ЦЕНТР</div>
            <div className="text-xs text-muted-foreground leading-tight">«ПРОФЕССИОНАЛ»</div>
          </div>
        </div>

        <nav className="hidden xl:flex items-center gap-5">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-xs font-medium uppercase tracking-wide text-foreground/70 hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#enrollment" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: "hsl(218,72%,28%)" }}>
          <Icon name="PenLine" size={15} />
          Записаться
        </a>

        <button className="xl:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-border py-4 px-4">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="block py-2.5 text-sm font-medium border-b border-border last:border-0" onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#enrollment" className="block mt-4 text-center py-2.5 rounded text-sm font-semibold text-white" style={{ background: "hsl(218,72%,28%)" }}>
            Записаться на курс
          </a>
        </div>
      )}
    </header>
  );
}
