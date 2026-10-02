import React from 'react';

type BookingStatus = 'nouvelle' | 'attente' | 'confirmee' | 'refusee' | 'annulee' | 'terminee';

const STATUS_CONFIG: Record<BookingStatus, { label: string; className: string }> = {
  nouvelle: { label: 'Nouvelle demande', className: 'status-nouvelle' },
  attente: { label: 'En attente', className: 'status-attente' },
  confirmee: { label: 'Confirmée', className: 'status-confirmee' },
  refusee: { label: 'Refusée', className: 'status-refusee' },
  annulee: { label: 'Annulée', className: 'status-annulee' },
  terminee: { label: 'Terminée', className: 'status-terminee' },
};

interface StatusBadgeProps {
  status: BookingStatus;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center rounded-sm font-medium ${config.className} ${
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1'
      }`}
    >
      {config.label}
    </span>
  );
}