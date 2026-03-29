import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, PenTool, GitMerge, Activity, 
  ShieldCheck, BarChart3, Settings, Bell, Search, 
  User, Menu, X, Sparkles, ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: PenTool, label: 'Content Studio', path: '/studio' },
  { icon: GitMerge, label: 'Pipeline', path: '/pipeline' },
  { icon: Activity, label: 'Agents', path: '/agents' },
  { icon: ShieldCheck, label: 'Compliance', path: '/compliance' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-foreground/10 backdrop-blur-sm lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static z-50 bg-card border-r border-border flex flex-col h-full transition-all duration-300 ease-in-out",
        collapsed ? "w-[68px]" : "w-64",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className={cn("h-16 flex items-center border-b border-border transition-all", collapsed ? "px-3 justify-center" : "px-5")}>
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-glow shrink-0">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="ml-3 overflow-hidden">
              <span className="font-bold text-base tracking-tight text-foreground block leading-tight">ContentOps</span>
              <span className="text-[10px] font-semibold text-primary uppercase tracking-widest">AI Platform</span>
            </div>
          )}
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className={cn("flex-1 overflow-y-auto py-3 space-y-0.5", collapsed ? "px-2" : "px-3")}>
          {!collapsed && (
            <div className="px-3 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">
              Navigation
            </div>
          )}
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                  collapsed ? "px-0 py-2.5 justify-center" : "px-3 py-2.5",
                  isActive 
                    ? "bg-primary/10 text-primary shadow-sm" 
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {isActive && (
                  <div className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full",
                    collapsed && "left-0"
                  )} />
                )}
                <Icon className={cn("w-[18px] h-[18px] shrink-0", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse button */}
        <div className="hidden lg:block px-3 py-2 border-t border-border">
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>

        {/* User area */}
        <div className={cn("border-t border-border transition-all", collapsed ? "p-2" : "p-3")}>
          {collapsed ? (
            <div className="w-9 h-9 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
          ) : (
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-accent transition-colors cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 ring-2 ring-primary/10">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="truncate flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate leading-tight">Admin User</p>
                <p className="text-xs text-muted-foreground truncate">admin@contentops.ai</p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="h-14 glass border-b border-border flex items-center justify-between px-4 lg:px-6 shrink-0 z-10">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative w-full max-w-xs hidden sm:block">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-9 pr-3 py-1.5 bg-accent/60 border border-transparent rounded-lg text-sm focus:bg-card focus:border-border focus:ring-1 focus:ring-primary/20 transition-all outline-none text-foreground placeholder:text-muted-foreground"
              />
              <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-medium text-muted-foreground bg-background px-1.5 py-0.5 rounded border border-border hidden md:inline">⌘K</kbd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden md:inline mr-2">
              {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-agent-error rounded-full ring-2 ring-card"></span>
            </button>
            <div className="h-5 w-px bg-border mx-1 hidden sm:block"></div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-accent px-2.5 py-1 rounded-lg border border-border">
              <span className="w-1.5 h-1.5 rounded-full bg-agent-completed"></span>
              Marketing
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
