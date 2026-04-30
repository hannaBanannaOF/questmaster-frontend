'use client';
import { useParams } from 'next/navigation';

export default function JoinCampaignPage() {
  const params = useParams();
  const rawHash = params.hash;

  return <>{rawHash}</>;
}
