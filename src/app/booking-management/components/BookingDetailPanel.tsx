'use client';

import React, { useState } from 'react';
import type { BookingRequest } from '@/lib/mockData';
import StatusBadge from '@/components/StatusBadge';
import { X, Phone, Mail, MessageCircle, StickyNote, Save } from 'lucide-react';
import { toast } from 'sonner';

type BookingStatus = BookingRequest['status'];

const STATUS_OPTIONS: { value: BookingStatus; label: string }[] = [
  { value: 'nouvelle', label: 'Nouvelle demande' },
  { value: 'attente', label: 'En attente' },
  { value: 'confirmee', label: 'Confirmée' },
  { value: 'refusee', label: 'Refusée' },
  { value: 'annulee', label: 'Annulée' },
  { value: 'terminee', label: 'Terminée' },
];

interface BookingDetailPanelProps {
  booking: BookingRequest;
  onClose: () => void;
  onStatusChange: (id: string, status: BookingStatus) => void;
}

export default function BookingDetailPanel({ booking, onClose, onStatusChange }: BookingDetailPanelProps) {
  const [status, setStatus] = useState<BookingStatus>(booking.status);
  const [notes, setNotes] = useState(booking.notes);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Backend integration point: PATCH /api/bookings/:id { status, notes }
    await new Promise((resolve) => setTimeout(resolve, 800));
    onStatusChange(booking.id, status);
    setSaving(false);
    toast.success('Réservation mise à jour.');
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-dark-brown/40" onClick={onClose} />
      <div className="w-full max-w-lg bg-card border-l border-border shadow-warm-xl flex flex-col overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <div className="font-mono text-sm text-muted-foreground">{booking.reference}</div>
            <div className="font-serif text-lg font-semibold text-foreground mt-0.5">{booking.guestName}</div>
          </div>
          <button onClick={onClose} className="p-2 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Current Status */}
          <div className="flex items-center gap-3">
            <StatusBadge status={booking.status} />
            <span className="text-xs text-muted-foreground">Statut actuel</span>
          </div>

          {/* Guest Info */}
          <div className="border border-border rounded-sm p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Coordonnées client</h4>
            <div className="space-y-2">
              <a href={`tel:${booking.guestPhone}`} className="flex items-center gap-2 text-sm text-foreground hover:text-terracotta transition-colors">
                <Phone size={13} className="text-muted-foreground" />
                {booking.guestPhone}
              </a>
              <a href={`mailto:${booking.guestEmail}`} className="flex items-center gap-2 text-sm text-foreground hover:text-terracotta transition-colors">
                <Mail size={13} className="text-muted-foreground" />
                {booking.guestEmail}
              </a>
              <a
                href={`https://wa.me/${booking.guestPhone.replace(/\D/g, '')}?text=Bonjour%20${encodeURIComponent(booking.guestName)}%2C%20concernant%20votre%20demande%20${booking.reference}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground hover:text-terracotta transition-colors"
              >
                <MessageCircle size={13} className="text-muted-foreground" />
                Contacter via WhatsApp
              </a>
            </div>
          </div>

          {/* Stay Details */}
          <div className="border border-border rounded-sm p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Détails du séjour</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { label: 'Chambre', value: booking.roomName },
                { label: 'Arrivée', value: booking.checkIn },
                { label: 'Départ', value: booking.checkOut },
                { label: 'Durée', value: `${booking.nights} nuit${booking.nights > 1 ? 's' : ''}` },
                { label: 'Adultes', value: booking.adults },
                { label: 'Enfants', value: booking.children },
                { label: 'Nationalité', value: booking.guestNationality },
                { label: 'Source', value: booking.source },
              ].map((item) => (
                <div key={`detail-${item.label}`}>
                  <div className="text-xs text-muted-foreground mb-0.5">{item.label}</div>
                  <div className="font-medium text-foreground">{item.value}</div>
                </div>
              ))}
            </div>
            {booking.amount > 0 && (
              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Montant estimé</span>
                <span className="font-bold text-dark-brown tabular-nums">{booking.amount.toLocaleString()} MAD</span>
              </div>
            )}
          </div>

          {/* Special Requests */}
          {booking.specialRequests && (
            <div className="border border-brass/30 bg-brass/5 rounded-sm p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-brass mb-2">Demandes spéciales</h4>
              <p className="text-sm text-foreground leading-relaxed">{booking.specialRequests}</p>
            </div>
          )}

          {/* Status Change */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
              Modifier le statut
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as BookingStatus)}
              className="form-input"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={`status-opt-${opt.value}`} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-2">
              <StickyNote size={12} />
              Notes internes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="form-input resize-none text-sm"
              placeholder="Notes visibles uniquement par l'administration..."
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-border flex gap-3">
          <button onClick={onClose} className="btn-outline-dark flex-1 text-sm py-2.5">
            Fermer
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary flex-1 text-sm py-2.5 justify-center"
          >
            {saving ? (
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <>
                <Save size={14} />
                Enregistrer
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}