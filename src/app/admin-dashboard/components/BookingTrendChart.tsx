'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { WEEKLY_BOOKINGS } from '@/lib/mockData';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border rounded-sm shadow-warm-md p-3 text-xs">
      <div className="font-semibold text-foreground mb-2">Semaine {label}</div>
      {payload.map((entry) => (
        <div key={`tooltip-${entry.name}`} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-muted-foreground">{entry.name} :</span>
          <span className="font-semibold text-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function BookingTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={WEEKLY_BOOKINGS} barGap={4} barCategoryGap="30%">
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="week"
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
          axisLine={false}
          tickLine={false}
          width={24}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(196,98,45,0.05)' }} />
        <Legend
          wrapperStyle={{ fontSize: 11, fontFamily: 'var(--font-sans)', paddingTop: 8 }}
        />
        <Bar dataKey="requests" name="Demandes reçues" fill="var(--terracotta)" radius={[3, 3, 0, 0]} />
        <Bar dataKey="confirmed" name="Confirmées" fill="var(--deep-green)" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}