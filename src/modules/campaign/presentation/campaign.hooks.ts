import { useQuery } from '@tanstack/react-query';

import { getCampaignsUseCase } from '../application/get-campaigns.usecase';

export function useCampaigns() {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: getCampaignsUseCase,
  });
}
