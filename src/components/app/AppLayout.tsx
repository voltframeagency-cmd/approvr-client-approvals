import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Bell, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/brand/Logo';
import { ThemeToggle } from '@/components/app/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { useWorkspace } from '@/hooks/use-workspace';
import { useNotifications } from '@/hooks/use-projects';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/dashboard/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
  { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: workspace } = useWorkspace();
  const { data: notifications } = useNotifications();

  const unreadCount = notifications?.filter(n => !n.read).length || 0;
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-[240px] flex-col border-r bg-card fixed inset-y-0">
        <div className="flex items-center px-6 h-16 border-b">
          <Link to="/dashboard" className="flex items-center gap-3">
            <Logo variant="small" />
            <Badge className="bg-primary/10 text-primary border-none text-[10px] font-black uppercase tracking-widest px-1.5 py-0">Beta</Badge>
          </Link>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map(item => {
            const active = item.to === '/dashboard' 
              ? location.pathname === '/dashboard'
              : location.pathname.startsWith(item.to);
            const badge = item.label === 'Notifications' ? unreadCount : 0;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all duration-300 relative group',
                  active ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {active && (
                  <motion.div layoutId="sidebar-active" className="absolute inset-0 rounded-xl bg-primary/[0.06] border border-primary/10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }} />
                )}
                {active && (
                  <motion.div layoutId="sidebar-indicator" className="absolute left-0 w-1 h-4 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }} />
                )}
                <item.icon className={cn("h-4 w-4 relative z-10 transition-transform duration-300 group-hover:scale-110", active ? "text-primary" : "")} />
                <span className="relative z-10">{item.label}</span>
                {badge > 0 && (
                  <Badge variant="secondary" className="ml-auto h-5 min-w-[20px] flex items-center justify-center text-[10px] bg-primary/10 text-primary relative z-10 font-bold border-none">
                    {badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="px-3 pb-6 space-y-4">
          {workspace && (
            <div className="px-4 py-4 rounded-2xl bg-gradient-to-br from-card via-card to-card text-foreground shadow-xl relative overflow-hidden group border border-border/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent)]" />
              <div className="relative z-10 flex flex-col gap-2">
                <Badge className="w-fit bg-primary/20 text-primary hover:bg-primary/30 border-none text-[8px] font-black tracking-widest px-1.5 py-0 uppercase">Founder Beta</Badge>
                <p className="text-[11px] font-bold tracking-tight truncate">{workspace.name}</p>
              </div>
            </div>
          )}

          <div className="border-t pt-4">
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-emerald-500 flex items-center justify-center text-[11px] font-bold text-white shadow-sm ring-1 ring-primary/20">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold truncate tracking-tight text-foreground">{displayName}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <ThemeToggle className="h-8 w-8 rounded-lg text-muted-foreground" />
              <button onClick={handleSignOut} className="flex items-center gap-3 px-3 py-2 rounded-xl text-[12px] text-muted-foreground hover:text-destructive hover:bg-destructive/[0.04] transition-all duration-200 group">
                <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-14 px-3 border-b bg-card/95 backdrop-blur-xl">
        <Link to="/dashboard"><Logo variant="small" /></Link>
        <div className="flex items-center gap-0.5">
          <ThemeToggle className="h-9 w-9 rounded-xl text-muted-foreground" />
          {navItems.map(item => {
            const active = item.to === '/dashboard' ? location.pathname === '/dashboard' : location.pathname.startsWith(item.to);
            return (
              <Link key={item.to} to={item.to} className={cn('p-2.5 rounded-xl transition-colors relative', active ? 'text-primary bg-primary/[0.08]' : 'text-muted-foreground')}>
                <item.icon className="h-4 w-4" />
                {item.label === 'Notifications' && unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-[240px] min-h-screen bg-muted/30 overflow-x-hidden">
        <div className="px-4 py-4 md:p-10 lg:p-12 pt-[72px] md:pt-10 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
