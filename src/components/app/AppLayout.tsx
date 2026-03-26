import { Link, useLocation, Outlet } from 'react-router-dom';
import { CheckCircle2, LayoutDashboard, FolderKanban, Bell, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/dashboard/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/dashboard/notifications', icon: Bell, label: 'Notifications', badge: 2 },
  { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

const AppLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-[240px] flex-col border-r bg-card fixed inset-y-0">
        <div className="flex items-center gap-2.5 px-5 h-16 border-b">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <span className="font-bold text-base">Approvr</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map(item => {
            const active = item.to === '/dashboard' 
              ? location.pathname === '/dashboard'
              : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition-all duration-200 relative',
                  active
                    ? 'bg-primary/[0.08] text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                )}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg bg-primary/[0.08]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <item.icon className="h-4 w-4 relative z-10" />
                <span className="relative z-10">{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto h-5 min-w-[20px] flex items-center justify-center text-[10px] bg-primary/10 text-primary relative z-10 font-semibold">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-[72px] left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent pointer-events-none" />
        <div className="px-3 py-4 border-t relative">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-xs font-semibold text-primary ring-1 ring-primary/10">AR</div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium truncate">Alex Rivera</p>
              <p className="text-[11px] text-muted-foreground truncate">Rivera Design Co</p>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors mt-1">
            <LogOut className="h-4 w-4" />
            Sign out
          </Link>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-14 px-4 border-b bg-card/95 backdrop-blur-xl">
        <div className="flex items-center gap-2 font-bold text-sm">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          Approvr
        </div>
        <div className="flex items-center gap-1">
          {navItems.map(item => {
            const active = item.to === '/dashboard' ? location.pathname === '/dashboard' : location.pathname.startsWith(item.to);
            return (
              <Link key={item.to} to={item.to} className={cn('p-2.5 rounded-lg transition-colors', active ? 'text-primary bg-primary/[0.08]' : 'text-muted-foreground')}>
                <item.icon className="h-4 w-4" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-[240px] min-h-screen">
        <div className="p-6 md:p-8 lg:p-10 pt-20 md:pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
