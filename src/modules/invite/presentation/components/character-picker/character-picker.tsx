import { Heart, UserCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card, IconText, List, ListItem, Stack, Title } from '@/src/design';
import type { CharacterSummary } from '@/src/modules/character/domain';

import styles from './character-picker.module.css';

interface CharacterPickerProps {
  characters: CharacterSummary[];
  /** Nome do campo enviado no form. */
  name: string;
  legend: string;
  /** Ficha marcada ao renderizar (ex.: a escolhida antes de um erro). */
  defaultValue?: string;
  /** Id da mensagem de erro do campo, para leitores de tela. */
  errorId?: string;
}

/** Lista de fichas como rádios nativos: escolher funciona mesmo sem JS. */
export function CharacterPicker({
  characters,
  name,
  legend,
  defaultValue,
  errorId,
}: CharacterPickerProps) {
  const t = useTranslations('character.list');

  return (
    <fieldset
      className={styles.fieldset}
      aria-invalid={errorId ? true : undefined}
      aria-describedby={errorId}
    >
      <legend className="visually-hidden">{legend}</legend>
      <List>
        {characters.map((character) => (
          <ListItem key={character.slug}>
            <Card as="label" className={styles.option}>
              <input
                type="radio"
                name={name}
                value={character.slug}
                required
                defaultChecked={character.slug === defaultValue}
                className="visually-hidden"
              />
              <Stack align="center" justify="space-between">
                <Stack direction="column" gap="xxs">
                  <Title order={4}>{character.name}</Title>
                  {character.currentHp !== undefined && (
                    <IconText tone="muted" icon={<Heart size={12} />}>
                      {t('hp', { value: character.currentHp })}
                    </IconText>
                  )}
                </Stack>
                <span className={styles.check} aria-hidden>
                  <UserCheck size={20} />
                </span>
              </Stack>
            </Card>
          </ListItem>
        ))}
      </List>
    </fieldset>
  );
}
