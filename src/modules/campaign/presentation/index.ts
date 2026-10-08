// API pública da apresentação (consumida pelas rotas em src/app)
export { getCampaignBySlug, getCampaigns } from './campaign.loaders';
export * from './components/campaign-card/campaign-card';
export * from './components/campaign-status-badge/campaign-status-badge';
export * from './components/create-campaign-button/create-campaign-button';
export * from './views/campaign-details-view';
export * from './views/campaign-list-view';
export * from './views/campaign-not-found-view';
