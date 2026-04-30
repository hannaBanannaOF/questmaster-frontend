import styled, { DefaultTheme } from 'styled-components';

import { CampaignStatus } from '../domain/campaign-status.types';

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
  font-size: ${({ theme }) => theme.typography.body.fontSize.xs};
  ${({ $status, theme }) => statusStyles(theme)[$status]};
`;

export const InviteHashWrapper = styled.div`
  display: flex;
`;

export const InviteHashSpan = styled.span`
  border-radius: ${({ theme }) => theme.radius.xl} 0 0
    ${({ theme }) => theme.radius.xl};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  color: ${({ theme }) => theme.colors.text.muted};
  background-color: ${({ theme }) => theme.colors.card.foreground};
  font-size: ${({ theme }) => theme.typography.body.fontSize.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
`;

export const InviteHashCopyButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => theme.colors.card.foreground};
  border-radius: 0 ${({ theme }) => theme.radius.xl}
    ${({ theme }) => theme.radius.xl} 0;
  font-size: ${({ theme }) => theme.typography.body.fontSize.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  color: ${({ theme }) => theme.colors.text.primary};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;

  &:hover {
    cursor: pointer;
    filter: brightness(1.2);
  }

  &:active {
    filter: contrast(1.2);
  }
`;
