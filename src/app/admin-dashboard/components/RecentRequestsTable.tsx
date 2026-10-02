import React from 'react';
import Link from 'next/link';
import { BOOKING_REQUESTS } from '@/lib/mockData';
import StatusBadge from '@/components/StatusBadge';
import { ArrowRight } from 'lucide-react';

export default function RecentRequestsTable() {
  const recent = BOOKING_REQUESTS?.slice(0, 6);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-base font-semibold text-foreground">Demandes récentes</h3>
        <Link href="/booking-management" className="text-xs text-terracotta hover:underline flex items-center gap-1">
          Voir tout <ArrowRight size={12} />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-3 pr-4">Référence</th>
              <th className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-3 pr-4">Client</th>
              <th className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-3 pr-4 hidden md:table-cell">Chambre</th>
              <th className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-3 pr-4 hidden lg:table-cell">Arrivée</th>
              <th className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-3 pr-4 hidden xl:table-cell">Nuits</th>
              <th className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-3">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {recent?.map((booking) => (
              <tr key={booking?.id} className="hover:bg-muted/40 transition-colors group">
                <td className="py-3 pr-4">
                  <span className="font-mono text-xs text-muted-foreground">{booking?.reference}</span>
                </td>
                <td className="py-3 pr-4">
                  <div className="font-medium text-sm text-foreground">{booking?.guestName}</div>
                  <div className="text-xs text-muted-foreground">{booking?.guestNationality}</div>
                </td>
                <td className="py-3 pr-4 hidden md:table-cell">
                  <span className="text-sm text-foreground">{booking?.roomName}</span>
                </td>
                <td className="py-3 pr-4 hidden lg:table-cell">
                  <span className="text-sm text-foreground">{booking?.checkIn}</span>
                </td>
                <td className="py-3 pr-4 hidden xl:table-cell">
                  <span className="text-sm tabular-nums text-foreground">{booking?.nights}</span>
                </td>
                <td className="py-3">
                  <StatusBadge status={booking?.status} size="sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}