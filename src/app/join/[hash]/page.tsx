import type { Metadata } from 'next';

import { getInvite, InviteView } from '@/src/modules/invite';

interface JoinPageProps {
  params: Promise<{ hash: string }>;
}

export async function generateMetadata({
  params,
}: JoinPageProps): Promise<Metadata> {
  const { hash } = await params;
  const invite = await getInvite(hash);
  return { title: invite.campaignName };
}

export default async function JoinPage({ params }: JoinPageProps) {
  const { hash } = await params;
  return <InviteView hash={hash} />;
}
