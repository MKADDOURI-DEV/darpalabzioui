import React from 'react';
import { BOOKING_REQUESTS } from '@/lib/mockData';
import { CalendarDays, Users, BedDouble } from 'lucide-react';

export default function UpcomingArrivals() {
  // Filter confirmed bookings with upcoming check-ins
  const upcoming = BOOKING_REQUESTS?.filter((b) => b?.status === 'confirmee')?.slice(0, 4);

  return (
    <div>
      <h3 className="font-serif text-base font-semibold text-foreground mb-4">Arrivées à venir</h3>
      {upcoming?.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <CalendarDays size={24} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm">Aucune arrivée prévue</p>
        </div>
      ) : (
        <div className="space-y-3">
          {upcoming?.map((booking) => (
            <div key={booking?.id} className="flex items-start gap-3 p-3 rounded-sm border border-border hover:bg-muted/40 transition-colors">
              <div className="w-10 h-10 rounded-sm bg-deep-green/10 flex items-center justify-center flex-shrink-0">
                <CalendarDays size={16} className="text-deep-green" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-foreground truncate">{booking?.guestName}</div>
                <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BedDouble size={11} />
                    {booking?.roomName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={11} />
                    {booking?.adults} adulte{booking?.adults > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs font-semibold text-dark-brown">{booking?.checkIn}</div>
                <div className="text-xs text-muted-foreground">{booking?.nights} nuit{booking?.nights > 1 ? 's' : ''}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}