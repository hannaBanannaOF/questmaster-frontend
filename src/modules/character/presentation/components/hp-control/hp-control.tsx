'use client';

import { Minus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useId, useState, useTransition } from 'react';

import { Button, Stack, Text, useToast } from '@/src/design';
import type { ActionResult } from '@/src/lib/actions';
import { useErrorMessage } from '@/src/modules/shared/presentation/hooks/use-action-feedback';

import { clampHp } from '../../../domain';
import styles from './hp-control.module.css';

/** Espera o jogador parar de clicar antes de salvar. */
const SAVE_DELAY_MS = 500;

interface HpControlProps {
  current: number;
  max: number;
  editable: boolean;
  /** Server Action já vinculada ao id do personagem. */
  updateHp: (hp: number) => Promise<ActionResult<number>>;
}

/** Barra de PV com +/−; atualiza na hora e salva em lote depois de uma pausa. */
export function HpControl({
  current,
  max,
  editable,
  updateHp,
}: HpControlProps) {
  const t = useTranslations();
  const { toast } = useToast();
  const errorMessage = useErrorMessage();
  const labelId = useId();
  const [isSaving, startTransition] = useTransition();

  const [value, setValue] = useState(current);
  // Quando o servidor devolve um valor novo (revalidação), ele vira a verdade
  const [serverValue, setServerValue] = useState(current);
  if (current !== serverValue) {
    setServerValue(current);
    setValue(current);
  }

  useEffect(() => {
    if (value === current) return;

    const timeout = setTimeout(() => {
      startTransition(async () => {
        const result = await updateHp(value);
        if (!result.ok) {
          setValue(current);
          toast({
            type: 'error',
            title: t('character.toast.error.update'),
            message: errorMessage(result.message),
          });
        }
      });
    }, SAVE_DELAY_MS);

    return () => clearTimeout(timeout);
  }, [value, current, updateHp, t, toast, errorMessage]);

  const change = (delta: number) =>
    setValue((previous) => clampHp(previous + delta, max));

  const percent = max > 0 ? (clampHp(value, max) / max) * 100 : 0;

  return (
    <Stack direction="column" align="stretch" gap="xxs">
      <Stack justify="space-between">
        <Text tone="muted" id={labelId}>
          {t('character.controls.hp')}
        </Text>
        <span className={styles.value}>
          {value} / {max}
        </span>
      </Stack>
      <div
        className={styles.track}
        role="meter"
        aria-labelledby={labelId}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
      >
        <div
          className={styles.fill}
          style={{ width: `${percent}%` }}
          data-updating={isSaving || undefined}
        />
      </div>
      {editable && (
        <Stack justify="center">
          <Button
            variant="muted"
            icon={<Minus size={14} />}
            aria-label={t('character.controls.decrease')}
            disabled={value <= 0}
            onClick={() => change(-1)}
          />
          <Button
            variant="muted"
            icon={<Plus size={14} />}
            aria-label={t('character.controls.increase')}
            disabled={value >= max}
            onClick={() => change(1)}
          />
        </Stack>
      )}
    </Stack>
  );
}
