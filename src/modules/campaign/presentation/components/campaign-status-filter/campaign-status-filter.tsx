'use client';

import Form from 'next/form';

import { Select, type SelectOption, Stack, Text } from '@/src/design';

import type { CampaignRole, CampaignStatus } from '../../../domain';

interface CampaignStatusFilterProps {
  role?: CampaignRole;
  status?: CampaignStatus;
  /** "Todos os status" primeiro, com valor vazio. */
  options: SelectOption[];
  labels: { status: string; apply: string };
}

/**
 * Filtro de status como form GET: navega ao escolher, mantém o papel e volta
 * pra página 1. Sem JS, o botão "Filtrar" envia o mesmo form.
 */
export function CampaignStatusFilter({
  role,
  status,
  options,
  labels,
}: CampaignStatusFilterProps) {
  return (
    <Form action="/campaigns">
      {role && <input type="hidden" name="role" value={role} />}
      <Stack align="center" gap="xs">
        <Text tone="muted" small>
          <label htmlFor="campaign-status-filter">{labels.status}</label>
        </Text>
        <Select
          id="campaign-status-filter"
          name="status"
          options={options}
          defaultValue={status ?? ''}
          onChange={(event) => event.currentTarget.form?.requestSubmit()}
        />
        <noscript>
          <button type="submit">{labels.apply}</button>
        </noscript>
      </Stack>
    </Form>
  );
}
