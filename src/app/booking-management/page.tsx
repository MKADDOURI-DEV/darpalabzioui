import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = { robots: { index: false, follow: false } };
import BookingManagementClient from './components/BookingManagementClient';

export default function BookingManagementPage() {
  return <BookingManagementClient />;
}