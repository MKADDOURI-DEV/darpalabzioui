'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import AdminSidebar from '@/components/AdminSidebar';
import AdminTopbar from '@/components/AdminTopbar';
import KPICards from './KPICards';
import RecentRequestsTable from './RecentRequestsTable';
import UpcomingArrivals from './UpcomingArrivals';

const BookingTrendChart = dynamic(() => import('./BookingTrendChart'), { ssr: false });
const StatusDistributionChart = dynamic(() => import('./StatusDistributionChart'), { ssr: false });

export default function AdminDashboardClient() {
  useEffect(() => {
    // Backend integration point: check auth session
    const auth = localStorage.getItem('dpl_admin_auth');
    if (!auth) {
      window.location.href = '/sign-up-login';
    }
  }, []);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopbar
          title="Tableau de bord"
          subtitle="Vue d'ensemble — Riad Dar Pa Labzioui"
        />

        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Last Updated */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Données au 02 octobre 2026 · 09:38
            </p>
            <div className="flex items-center gap-1.5 text-xs text-deep-green">
              <div className="w-1.5 h-1.5 rounded-full bg-deep-green animate-pulse" />
              En ligne
            </div>
          </div>

          {/* KPI Cards */}
          <KPICards />

          {/* Charts Row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-card border border-border rounded-sm p-5 shadow-warm-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-serif text-base font-semibold text-foreground">Demandes de réservation</h3>
                  <p className="text-xs text-muted-foreground">7 dernières semaines</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-terracotta inline-block" /> Reçues
                  <span className="w-2 h-2 rounded-full bg-deep-green inline-block ml-2" /> Confirmées
                </div>
              </div>
              <BookingTrendChart />
            </div>

            <div className="bg-card border border-border rounded-sm p-5 shadow-warm-sm">
              <div className="mb-4">
                <h3 className="font-serif text-base font-semibold text-foreground">Répartition des statuts</h3>
                <p className="text-xs text-muted-foreground">12 demandes au total</p>
              </div>
              <StatusDistributionChart />
            </div>
          </div>

          {/* Table + Arrivals Row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-card border border-border rounded-sm p-5 shadow-warm-sm">
              <RecentRequestsTable />
            </div>
            <div className="bg-card border border-border rounded-sm p-5 shadow-warm-sm">
              <UpcomingArrivals />
            </div>
          </div>

          {/* Room Status Mini Grid */}
          <div className="bg-card border border-border rounded-sm p-5 shadow-warm-sm">
            <h3 className="font-serif text-base font-semibold text-foreground mb-4">État des chambres</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { id: 'room-status-001', name: 'Chambre Zellige', status: 'Occupée 8–10 oct.', color: 'text-terracotta', bg: 'bg-terracotta/8' },
                { id: 'room-status-002', name: 'Chambre Moucharabieh', status: 'Occupée 10–13 oct.', color: 'text-terracotta', bg: 'bg-terracotta/8' },
                { id: 'room-status-003', name: 'Chambre Argan', status: 'Disponible', color: 'text-deep-green', bg: 'bg-deep-green/8' },
                { id: 'room-status-004', name: 'Suite Patio', status: 'Demande en cours', color: 'text-brass', bg: 'bg-brass/8' },
                { id: 'room-status-005', name: 'Chambre Terrasse', status: 'En attente confirm.', color: 'text-blue-600', bg: 'bg-blue-50' },
              ]?.map((r) => (
                <div key={r?.id} className={`${r?.bg} border border-border rounded-sm p-3`}>
                  <div className="text-xs font-semibold text-foreground mb-1 leading-tight">{r?.name}</div>
                  <div className={`text-xs ${r?.color} font-medium`}>{r?.status}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}