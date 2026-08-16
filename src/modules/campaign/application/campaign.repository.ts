import { Campaign, CampaignDetails, CampaignStatus } from '../domain';

export type CreateCampaignInput = {
  name: string;
  system: string;
  overview?: string;
};

export interface CampaignRepository {
  getCampaigns(): Promise<Campaign[]>;
  getCampaignDetails(id: number): Promise<CampaignDetails>;
  createCampaign(data: CreateCampaignInput): Promise<void>;
  deleteCampaign(id: number): Promise<void>;
  updateCampaignStatus(
    id: number,
    status: CampaignStatus,
  ): Promise<CampaignStatus>;
}
