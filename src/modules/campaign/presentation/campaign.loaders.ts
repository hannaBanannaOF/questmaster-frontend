import 'server-only';

import { notFound } from 'next/navigation';
import { cache } from 'react';

import { NotFoundError } from '@/src/lib/errors';

import { campaignUseCases } from '../campaign.container';

// cache() deduplica chamadas no mesmo request (ex.: generateMetadata + página)

export const getCampaigns = cache(() => campaignUseCases.listCampaigns());

export const getCampaignBySlug = cache(async (slug: string) => {
  try {
    return await campaignUseCases.getCampaignBySlug(slug);
  } catch (error) {
    if (error instanceof NotFoundError) notFound();
    throw error;
  }
});
