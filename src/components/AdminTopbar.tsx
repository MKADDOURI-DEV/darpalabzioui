'use client';

import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import Link from 'next/link';

interface AdminTopbarProps {
  title: string;
  subtitle?: string;
}

export default function AdminTopbar({ title, subtitle }: AdminTopbarProps) {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 flex-shrink-0">
      <div>
        <h1 className="text-base font-semibold text-foreground">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Search">
          <Search size={18} />
        </button>
        <button className="relative p-2 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Notifications">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-terracotta rounded-full" />
        </button>
        <Link href="/sign-up-login" className="flex items-center gap-2 pl-3 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-terracotta/15 border border-terracotta/30 flex items-center justify-center">
            <User size={14} className="text-terracotta" />
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-semibold text-foreground">Admin</div>
            <div className="text-xs text-muted-foreground">Labzioui</div>
          </div>
        </Link>
      </div>
    </header>
  );
}