// API pública da apresentação (consumida pelas rotas em src/app)
export {
  getCampaignBySlug,
  getCampaignCounts,
  getCampaigns,
} from './campaign.loaders';
export * from './campaign-list.params';
export * from './components/campaign-detail/campaign-detail-skeleton';
export * from './components/campaign-list-results/campaign-list-skeleton';
export * from './components/campaign-row/campaign-row';
export * from './components/campaign-status-chip/campaign-status-chip';
export * from './components/create-campaign-button/create-campaign-button';
export * from './views/campaign-details-view';
export * from './views/campaign-list-view';
export * from './views/campaign-not-found-view';
