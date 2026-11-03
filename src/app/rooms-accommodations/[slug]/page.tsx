import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import RoomDetailClient from './RoomDetailClient';
import { ROOMS } from '@/lib/mockData';

export function generateStaticParams() {
  return ROOMS.filter((r) => r.active).map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = ROOMS.find((r) => r.slug === slug);
  return room ? { title: `${room.name} | Riad Dar Pa Labzioui`, description: room.description } : {};
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = ROOMS.find((r) => r.slug === slug && r.active);
  if (!room) notFound();
  return <RoomDetailClient slug={room.slug} />;
}
