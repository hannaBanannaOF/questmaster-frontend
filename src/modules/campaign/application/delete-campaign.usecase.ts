import { deleteCampaignAPI } from '../infra/campaign.api';

export const deleteCampaignUseCase = (id: number) => deleteCampaignAPI(id);
