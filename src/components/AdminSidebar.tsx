'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  BarChart3,
} from 'lucide-react';

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, href: '/admin-dashboard' },
  { key: 'bookings', label: 'Réservations', icon: CalendarCheck, href: '/booking-management', badge: 3 },
  { key: 'rooms', label: 'Chambres', icon: BedDouble, href: '/admin-dashboard' },
  { key: 'clients', label: 'Clients', icon: Users, href: '/admin-dashboard' },
  { key: 'messages', label: 'Messages', icon: MessageSquare, href: '/admin-dashboard', badge: 5 },
  { key: 'reports', label: 'Rapports', icon: BarChart3, href: '/admin-dashboard' },
  { key: 'settings', label: 'Paramètres', icon: Settings, href: '/admin-dashboard' },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    // Backend integration point: clear session/token
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dpl_admin_auth');
    }
    window.location.href = '/sign-up-login';
  };

  return (
    <aside
      className="relative flex flex-col bg-dark-brown border-r border-ivory/10 transition-all duration-300 ease-in-out flex-shrink-0"
      style={{ width: collapsed ? 64 : 240 }}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 px-4 border-b border-ivory/10 overflow-hidden ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <AppLogo size={32} />
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="font-serif text-sm font-semibold text-ivory whitespace-nowrap">Dar Pa Labzioui</div>
            <div className="text-xs text-ivory/40 whitespace-nowrap">Administration</div>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-hidden">
        {NAV_ITEMS?.map((item) => {
          const isActive = pathname === item?.href;
          return (
            <Link
              key={`sidebar-${item?.key}`}
              href={item?.href}
              title={collapsed ? item?.label : undefined}
              className={`admin-sidebar-link relative ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-2' : ''}`}
              style={{ color: isActive ? 'var(--terracotta)' : undefined }}
            >
              <item.icon size={18} className="flex-shrink-0" />
              {!collapsed && (
                <span className="flex-1 text-sm">{item?.label}</span>
              )}
              {!collapsed && item?.badge && item?.badge > 0 && (
                <span className="ml-auto bg-terracotta text-ivory text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                  {item?.badge}
                </span>
              )}
              {collapsed && item?.badge && item?.badge > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-terracotta rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="py-3 px-2 border-t border-ivory/10 space-y-0.5">
        <button
          onClick={handleLogout}
          className={`admin-sidebar-link w-full ${collapsed ? 'justify-center px-2' : ''}`}
          title={collapsed ? 'Déconnexion' : undefined}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-terracotta shadow-warm-sm transition-colors z-10"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}