import { Crown, Link2, Swords } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Alert, Surface } from '@/src/design';
import { CreateCampaignButton } from '@/src/modules/campaign';
import { CreateCharacterButton } from '@/src/modules/character';

import styles from '../../dashboard.module.css';

/** Primeiro acesso: duas portas de mesmo peso e o atalho de quem já tem convite. */
export function WelcomeChoices() {
  const t = useTranslations('dashboard.welcome');

  const choices = [
    {
      key: 'player',
      icon: <Swords />,
      steps: ['create', 'join'],
      action: (
        <CreateCharacterButton label={t('player.action')} variant="primary" />
      ),
    },
    {
      key: 'dm',
      icon: <Crown />,
      steps: ['create', 'invite'],
      action: (
        <CreateCampaignButton label={t('dm.action')} variant="secondary" />
      ),
    },
  ] as const;

  return (
    <>
      <ul className={styles.choices}>
        {choices.map(({ key, icon, steps, action }) => (
          <li key={key}>
            <Surface
              as="article"
              className={styles.choice}
              aria-labelledby={`welcome-${key}`}
            >
              <span className={styles.role} data-tone={key} aria-hidden>
                {icon}
              </span>
              <h2 id={`welcome-${key}`}>{t(`${key}.title`)}</h2>
              <ol className={styles.steps}>
                {steps.map((step) => (
                  <li key={step}>{t(`${key}.steps.${step}`)}</li>
                ))}
              </ol>
              <div className={styles.choiceAction}>{action}</div>
            </Surface>
          </li>
        ))}
      </ul>
      <Alert
        icon={<Link2 />}
        title={t('invite.title')}
        description={t('invite.message')}
      />
    </>
  );
}
