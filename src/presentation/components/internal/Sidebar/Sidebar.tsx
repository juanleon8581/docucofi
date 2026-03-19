import { Logo } from "../../Logo/Logo";

export function Sidebar() {
  return (
    <aside className="max-w-64 min-h-full bg-sidebar border-r border-sidebar-border flex flex-col flex-1">
      <div className="p-6 border-b border-sidebar-border">
        <Logo />
      </div>
      <nav className="flex-1 p-4">
        {/* Navigation items will be added here */}
      </nav>
    </aside>
  );
}
