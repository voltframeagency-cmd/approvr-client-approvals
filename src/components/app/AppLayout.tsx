import { Link, useLocation, Outlet } from 'react-router-dom';
import { CheckCircle2, LayoutDashboard, FolderKanban, Bell, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/dashboard/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/dashboard/notifications', icon: Bell, label: 'Notifications', badge: 2 },
  { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

const AppLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 flex-col border-r bg-card fixed inset-y-0">
        <div className="flex items-center gap-2 px-5 h-16 border-b">
          <CheckCircle2 className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Approvr</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(item => {
            const active = location.pathname === item.to || (item.to !== '/dashboard' && location.pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                  active ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto h-5 min-w-[20px] flex items-center justify-center text-xs bg-primary/10 text-primary">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">AR</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Alex Rivera</p>
              <p className="text-xs text-muted-foreground truncate">Rivera Design Co</p>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted mt-1">
            <LogOut className="h-4 w-4" />
            Sign out
          </Link>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-14 px-4 border-b bg-card">
        <div className="flex items-center gap-2 font-bold">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          Approvr
        </div>
        <div className="flex items-center gap-2">
          {navItems.map(item => {
            const active = location.pathname === item.to;
            return (
              <Link key={item.to} to={item.to} className={cn('p-2 rounded-lg', active ? 'text-primary' : 'text-muted-foreground')}>
                <item.icon className="h-5 w-5" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-60 min-h-screen">
        <div className="p-6 md:p-10 pt-20 md:pt-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
