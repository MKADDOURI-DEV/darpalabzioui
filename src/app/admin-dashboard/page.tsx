import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = { robots: { index: false, follow: false } };
import AdminDashboardClient from './components/AdminDashboardClient';

export default function AdminDashboardPage() {
  return <AdminDashboardClient />;
}