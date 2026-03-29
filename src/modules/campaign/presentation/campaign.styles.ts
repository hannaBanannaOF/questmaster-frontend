import styled, { DefaultTheme } from 'styled-components';

import { CampaignStatus } from '../domain/campaign-status.types';

export const DmSpan = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary.default};
  gap: ${({ theme }) => theme.spacing.xs};
`;

const statusStyles = (theme: DefaultTheme) => ({
  [CampaignStatus.DRAFT]: `
    background-color: ${theme.colors.status.draft.soft};
    border: 1px solid ${theme.colors.status.draft.default};
    color: ${theme.colors.status.draft.default};
  `,
  [CampaignStatus.ARCHIVED]: `
    background-color: ${theme.colors.status.archived.soft};
    border: 1px solid ${theme.colors.status.archived.default};
    color: ${theme.colors.status.archived.default};
  `,
  [CampaignStatus.PAUSED]: `
    background-color: ${theme.colors.status.paused.soft};
    border: 1px solid ${theme.colors.status.paused.default};
    color: ${theme.colors.status.paused.default};
  `,
  [CampaignStatus.ACTIVE]: `
    background-color: ${theme.colors.status.playing.soft};
    border: 1px solid ${theme.colors.status.playing.default};
    color: ${theme.colors.status.playing.default};
  `,
});

export const StatusBadge = styled.span<{ $status: CampaignStatus }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.xl};

  ${({ $status, theme }) => statusStyles(theme)[$status]}
`;
