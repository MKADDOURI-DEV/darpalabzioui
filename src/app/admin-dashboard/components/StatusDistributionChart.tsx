'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const STATUS_DATA = [
  { name: 'Confirmées', value: 3, color: '#2D5016' },
  { name: 'En attente', value: 3, color: '#3b82f6' },
  { name: 'Nouvelles', value: 3, color: '#B8860B' },
  { name: 'Refusées', value: 1, color: '#C4622D' },
  { name: 'Annulées', value: 1, color: '#78716c' },
  { name: 'Terminées', value: 1, color: '#3D2B1F' },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { color: string } }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || !payload[0]) return null;
  return (
    <div className="bg-card border border-border rounded-sm shadow-warm-md p-3 text-xs">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: payload[0].payload.color }} />
        <span className="text-foreground font-semibold">{payload[0].name}</span>
        <span className="text-muted-foreground">: {payload[0].value}</span>
      </div>
    </div>
  );
}

export default function StatusDistributionChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={STATUS_DATA}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
        >
          {STATUS_DATA.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: 10, fontFamily: 'var(--font-sans)' }}
          iconType="circle"
          iconSize={8}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}