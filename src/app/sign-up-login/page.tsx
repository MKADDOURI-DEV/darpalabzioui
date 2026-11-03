import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = { robots: { index: false, follow: false } };
import LoginPageClient from './components/LoginPageClient';

export default function LoginPage() {
  return <LoginPageClient />;
}