import 'server-only';

import { notFound } from 'next/navigation';
import { cache } from 'react';

import { NotFoundError } from '@/src/lib/errors';
import { PAGE_SIZE, toPageRequest } from '@/src/lib/pagination';

import type { CampaignListFilters } from '../application';
import { campaignUseCases } from '../campaign.container';
import type { CampaignRole } from '../domain';

// cache() deduplica chamadas no mesmo request (ex.: generateMetadata + página)

/** Uma página da lista de campanhas; `size` muda só em prévias (ex.: dashboard). */
export const getCampaigns = (
  filters: CampaignListFilters,
  page: number,
  size = PAGE_SIZE,
) => campaignUseCases.listCampaigns(filters, toPageRequest(page, size));

export const getCampaignCounts = cache((role?: CampaignRole) =>
  campaignUseCases.countCampaignsByStatus(role),
);

export const getCampaignBySlug = cache(async (slug: string) => {
  try {
    return await campaignUseCases.getCampaignBySlug(slug);
  } catch (error) {
    if (error instanceof NotFoundError) notFound();
    throw error;
  }
});
