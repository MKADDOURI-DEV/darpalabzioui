'use client';

import React, { useEffect, useState, useMemo } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminTopbar from '@/components/AdminTopbar';
import StatusBadge from '@/components/StatusBadge';
import BookingDetailPanel from './BookingDetailPanel';
import { BOOKING_REQUESTS } from '@/lib/mockData';
import type { BookingRequest } from '@/lib/mockData';
import {
  Search,
  Filter,
  Eye,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Download,
  Trash2,
  CheckSquare,
} from 'lucide-react';
import { toast } from 'sonner';

type SortField = 'reference' | 'guestName' | 'roomName' | 'checkIn' | 'nights' | 'amount' | 'status' | 'createdAt';
type SortDir = 'asc' | 'desc';
type BookingStatus = BookingRequest['status'];

const STATUS_FILTERS: { value: BookingStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'nouvelle', label: 'Nouvelles' },
  { value: 'attente', label: 'En attente' },
  { value: 'confirmee', label: 'Confirmées' },
  { value: 'refusee', label: 'Refusées' },
  { value: 'annulee', label: 'Annulées' },
  { value: 'terminee', label: 'Terminées' },
];

const PAGE_SIZE_OPTIONS = [10, 20, 50];

export default function BookingManagementClient() {
  const [bookings, setBookings] = useState<BookingRequest[]>(BOOKING_REQUESTS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [detailBooking, setDetailBooking] = useState<BookingRequest | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const auth = localStorage.getItem('dpl_admin_auth');
    if (!auth) window.location.href = '/sign-up-login';
  }, []);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronsUpDown size={12} className="text-muted-foreground opacity-40" />;
    return sortDir === 'asc'
      ? <ChevronUp size={12} className="text-terracotta" />
      : <ChevronDown size={12} className="text-terracotta" />;
  };

  const filtered = useMemo(() => {
    let result = bookings;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.guestName.toLowerCase().includes(q) ||
          b.reference.toLowerCase().includes(q) ||
          b.roomName.toLowerCase().includes(q) ||
          b.guestEmail.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all') {
      result = result.filter((b) => b.status === statusFilter);
    }
    result = [...result].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
    return result;
  }, [bookings, search, statusFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginated.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginated.map((b) => b.id)));
    }
  };

  const handleStatusChange = (id: string, status: BookingStatus) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    if (detailBooking?.id === id) {
      setDetailBooking((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const handleBulkDelete = () => {
    // Backend integration point: DELETE /api/bookings bulk
    setBookings((prev) => prev.filter((b) => !selectedIds.has(b.id)));
    toast.success(`${selectedIds.size} demande${selectedIds.size > 1 ? 's' : ''} supprimée${selectedIds.size > 1 ? 's' : ''}.`);
    setSelectedIds(new Set());
  };

  const handleExport = () => {
    // Backend integration point: GET /api/bookings/export
    toast.success('Export CSV en cours de préparation...');
  };

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    bookings.forEach((b) => { counts[b.status] = (counts[b.status] || 0) + 1; });
    return counts;
  }, [bookings]);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopbar
          title="Gestion des réservations"
          subtitle={`${filtered.length} demande${filtered.length > 1 ? 's' : ''} · Mis à jour le 02/10/2026`}
        />

        <main className="flex-1 overflow-y-auto px-6 py-6">
          {/* Status Filter Chips */}
          <div className="flex flex-wrap gap-2 mb-5">
            {STATUS_FILTERS.map((f) => (
              <button
                key={`filter-chip-${f.value}`}
                onClick={() => { setStatusFilter(f.value); setCurrentPage(1); }}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm border transition-all ${
                  statusFilter === f.value
                    ? 'bg-terracotta text-ivory border-terracotta' :'bg-card text-muted-foreground border-border hover:border-terracotta hover:text-terracotta'
                }`}
              >
                {f.label}
                {f.value !== 'all' && statusCounts[f.value] && (
                  <span className={`ml-1.5 ${statusFilter === f.value ? 'text-ivory/70' : 'text-muted-foreground'}`}>
                    ({statusCounts[f.value]})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Rechercher par nom, référence, chambre, email..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="form-input pl-9 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="btn-outline-dark text-xs px-3 py-2 flex items-center gap-1.5"
              >
                <Download size={13} />
                Exporter
              </button>
            </div>
          </div>

          {/* Bulk Action Bar */}
          {selectedIds.size > 0 && (
            <div className="mb-4 bg-terracotta/8 border border-terracotta/30 rounded-sm px-4 py-2.5 flex items-center gap-4 animate-slide-up">
              <CheckSquare size={15} className="text-terracotta" />
              <span className="text-sm font-medium text-terracotta">
                {selectedIds.size} sélectionné{selectedIds.size > 1 ? 's' : ''}
              </span>
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-medium px-3 py-1.5 rounded border border-red-200 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={12} />
                  Supprimer
                </button>
                <button
                  onClick={() => setSelectedIds(new Set())}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="bg-card border border-border rounded-sm shadow-warm-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="w-10 pl-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.size === paginated.length && paginated.length > 0}
                        onChange={toggleSelectAll}
                        className="accent-terracotta"
                        aria-label="Sélectionner tout"
                      />
                    </th>
                    {[
                      { key: 'reference' as SortField, label: 'Référence' },
                      { key: 'guestName' as SortField, label: 'Client' },
                      { key: 'roomName' as SortField, label: 'Chambre' },
                      { key: 'checkIn' as SortField, label: 'Arrivée' },
                      { key: 'checkOut' as SortField, label: 'Départ' },
                      { key: 'nights' as SortField, label: 'Nuits' },
                      { key: 'amount' as SortField, label: 'Montant' },
                      { key: 'status' as SortField, label: 'Statut' },
                    ].map((col) => (
                      <th
                        key={`th-${col.key}`}
                        onClick={() => handleSort(col.key)}
                        className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground py-3 px-3 cursor-pointer hover:text-foreground select-none whitespace-nowrap"
                      >
                        <span className="flex items-center gap-1">
                          {col.label}
                          <SortIcon field={col.key} />
                        </span>
                      </th>
                    ))}
                    <th className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground py-3 px-3 pr-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-16 text-center">
                        <Filter size={24} className="mx-auto mb-3 text-muted-foreground opacity-40" />
                        <p className="text-sm font-medium text-muted-foreground">Aucune demande ne correspond à votre recherche</p>
                        <p className="text-xs text-muted-foreground mt-1">Modifiez les filtres ou la recherche pour voir des résultats.</p>
                        <button
                          onClick={() => { setSearch(''); setStatusFilter('all'); }}
                          className="mt-3 text-xs text-terracotta hover:underline"
                        >
                          Réinitialiser les filtres
                        </button>
                      </td>
                    </tr>
                  ) : (
                    paginated.map((booking) => (
                      <tr
                        key={booking.id}
                        className={`hover:bg-muted/40 transition-colors group ${
                          selectedIds.has(booking.id) ? 'bg-terracotta/5' : ''
                        }`}
                      >
                        <td className="pl-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedIds.has(booking.id)}
                            onChange={() => toggleSelect(booking.id)}
                            className="accent-terracotta"
                            aria-label={`Sélectionner ${booking.reference}`}
                          />
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">{booking.reference}</span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-medium text-sm text-foreground whitespace-nowrap">{booking.guestName}</div>
                          <div className="text-xs text-muted-foreground">{booking.guestNationality}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-sm text-foreground whitespace-nowrap">{booking.roomName}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-sm tabular-nums text-foreground whitespace-nowrap">{booking.checkIn}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-sm tabular-nums text-foreground whitespace-nowrap">{booking.checkOut}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-sm tabular-nums text-foreground">{booking.nights}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-sm font-semibold tabular-nums text-foreground whitespace-nowrap">
                            {booking.amount > 0 ? `${booking.amount.toLocaleString()} MAD` : '—'}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <StatusBadge status={booking.status} size="sm" />
                        </td>
                        <td className="py-3 px-3 pr-4">
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => setDetailBooking(booking)}
                              title="Voir les détails"
                              className="p-1.5 rounded text-muted-foreground hover:text-terracotta hover:bg-terracotta/10 transition-colors"
                            >
                              <Eye size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>Afficher</span>
                <select
                  value={pageSize}
                  onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                  className="border border-border rounded-sm px-2 py-1 text-xs bg-card text-foreground"
                >
                  {PAGE_SIZE_OPTIONS.map((n) => (
                    <option key={`page-size-${n}`} value={n}>{n}</option>
                  ))}
                </select>
                <span>par page · {filtered.length} résultat{filtered.length > 1 ? 's' : ''}</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1.5 text-xs border border-border rounded-sm hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Préc.
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                  .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                    if (idx > 0 && typeof arr[idx - 1] === 'number' && (p as number) - (arr[idx - 1] as number) > 1) {
                      acc.push('...');
                    }
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, idx) =>
                    p === '...' ? (
                      <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground text-xs">…</span>
                    ) : (
                      <button
                        key={`page-btn-${p}`}
                        onClick={() => setCurrentPage(p as number)}
                        className={`w-7 h-7 text-xs rounded-sm border transition-colors ${
                          currentPage === p
                            ? 'bg-terracotta text-ivory border-terracotta' :'border-border hover:bg-muted text-foreground'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-2.5 py-1.5 text-xs border border-border rounded-sm hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Suiv.
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Detail Panel */}
      {detailBooking && (
        <BookingDetailPanel
          booking={detailBooking}
          onClose={() => setDetailBooking(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}