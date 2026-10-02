import React from 'react';
import { BOOKING_STATS } from '@/lib/mockData';
import { CalendarCheck, Clock, AlertCircle, MessageSquare, BedDouble, TrendingUp } from 'lucide-react';

export default function KPICards() {
  const cards = [
    {
      id: 'kpi-pending',
      label: 'Nouvelles demandes',
      value: BOOKING_STATS?.pending,
      icon: AlertCircle,
      trend: '+2 aujourd\'hui',
      trendPositive: false,
      alert: true,
      description: 'En attente de réponse',
    },
    {
      id: 'kpi-confirmed',
      label: 'Séjours confirmés',
      value: BOOKING_STATS?.confirmed,
      icon: CalendarCheck,
      trend: 'Ce mois',
      trendPositive: true,
      alert: false,
      description: 'Réservations validées',
    },
    {
      id: 'kpi-arrivals',
      label: 'Arrivées (7 jours)',
      value: BOOKING_STATS?.upcoming7Days,
      icon: Clock,
      trend: 'Prochains départs : 3',
      trendPositive: true,
      alert: false,
      description: 'Voyageurs attendus',
    },
    {
      id: 'kpi-messages',
      label: 'Messages non lus',
      value: BOOKING_STATS?.unreadMessages,
      icon: MessageSquare,
      trend: '+3 nouvelles',
      trendPositive: false,
      alert: true,
      description: 'Formulaire de contact',
    },
    {
      id: 'kpi-rooms',
      label: 'Chambres actives',
      value: 5,
      icon: BedDouble,
      trend: 'Toutes disponibles',
      trendPositive: true,
      alert: false,
      description: 'Sur 5 chambres au total',
    },
    {
      id: 'kpi-occupancy',
      label: 'Taux d\'occupation',
      value: `${BOOKING_STATS?.occupancyRate}%`,
      icon: TrendingUp,
      trend: '+12% vs mois dernier',
      trendPositive: true,
      alert: false,
      description: 'Ce mois-ci',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards?.map((card) => (
        <div
          key={card?.id}
          className={`kpi-card ${card?.alert ? 'border-terracotta/40 bg-terracotta/5' : ''}`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`p-2 rounded-sm ${card?.alert ? 'bg-terracotta/15' : 'bg-muted'}`}>
              <card.icon size={16} className={card?.alert ? 'text-terracotta' : 'text-muted-foreground'} />
            </div>
            {card?.alert && (
              <div className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
            )}
          </div>
          <div className={`font-serif text-3xl font-bold tabular-nums mb-1 ${card?.alert ? 'text-terracotta' : 'text-foreground'}`}>
            {card?.value}
          </div>
          <div className="text-xs font-semibold text-foreground mb-0.5">{card?.label}</div>
          <div className="text-xs text-muted-foreground mb-2">{card?.description}</div>
          <div className={`text-xs font-medium ${card?.trendPositive ? 'text-deep-green' : 'text-terracotta'}`}>
            {card?.trend}
          </div>
        </div>
      ))}
    </div>
  );
}