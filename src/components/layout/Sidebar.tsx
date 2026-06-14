import Link from "next/link";
import {
  BarChart3,
  BookOpenText,
  FileSpreadsheet,
  FlaskConical,
  Layers3,
  Settings2,
  Truck,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: BarChart3 },
  { href: "/scenario", label: "Scenario", icon: Layers3 },
  { href: "/input/production", label: "Produksi", icon: Settings2 },
  { href: "/input/feedstock", label: "Feedstock", icon: Truck },
  { href: "/analysis/sensitivity", label: "Sensitivity", icon: FlaskConical },
  { href: "/reports", label: "Reports", icon: FileSpreadsheet },
];

export function Sidebar() {
  return (
    <aside className="panel h-full rounded-2xl p-5">
      <div className="space-y-3 border-b border-white/10 pb-5">
        <p className="text-xs uppercase tracking-[0.28em] text-accent-cyan">
          BIOMIX
        </p>
        <div>
          <h1 className="font-display text-2xl font-semibold text-text-primary">
            Feasibility Engine
          </h1>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Local-first dashboard untuk simulasi kelayakan pellet biomassa.
          </p>
        </div>
      </div>

      <nav className="mt-6 space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-sm text-text-secondary transition hover:border-white/10 hover:bg-white/5 hover:text-text-primary"
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-2 text-accent-green">
          <BookOpenText className="h-4 w-4" />
          <span className="text-xs uppercase tracking-[0.2em]">
            Blueprint Locked
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-text-secondary">
          Semua formula dan acceptance criteria mengikuti blueprint repo ini.
        </p>
      </div>
    </aside>
  );
}
