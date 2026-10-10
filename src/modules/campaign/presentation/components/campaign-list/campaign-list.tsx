import { List, ListItem } from '@/src/design';

import type { CampaignSummary } from '../../../domain';
import { CampaignCard } from '../campaign-card/campaign-card';

export function CampaignList({ campaigns }: { campaigns: CampaignSummary[] }) {
  return (
    <List>
      {campaigns.map((campaign) => (
        <ListItem key={campaign.slug}>
          <CampaignCard campaign={campaign} />
        </ListItem>
      ))}
    </List>
  );
}
