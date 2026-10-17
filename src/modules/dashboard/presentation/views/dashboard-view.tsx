import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { ButtonLink } from '@/src/design';
import { CriticalFailure } from '@/src/modules/shared/presentation';
import { getCurrentUserOrNull, getDisplayName } from '@/src/modules/user';

import { DashboardTabs } from '../components/dashboard-tabs/dashboard-tabs';
import { DmPanel } from '../components/dm-panel/dm-panel';
import { PlayerPanel } from '../components/player-panel/player-panel';
import { RoleNudge } from '../components/role-nudge/role-nudge';
import { WelcomeChoices } from '../components/welcome-choices/welcome-choices';
import { getDashboardData } from '../dashboard.loaders';
import styles from '../dashboard.module.css';
import {
  buildDashboardViewModel,
  type DashboardVM,
} from '../dashboard.view-model';

/** Home do app: busca os dados, monta o ViewModel e entrega para a tela. */
export async function DashboardView({ view }: { view?: string }) {
  const [data, user] = await Promise.all([
    getDashboardData(),
    getCurrentUserOrNull(),
  ]);

  return (
    <DashboardScreen
      vm={buildDashboardViewModel(data, view)}
      name={user ? getDisplayName(user) : undefined}
    />
  );
}

/** Só desenha o estado que o ViewModel decidiu. */
function DashboardScreen({ vm, name }: { vm: DashboardVM; name?: string }) {
  const t = useTranslations('dashboard');

  if (vm.kind === 'welcome') {
    return (
      <div className={styles.page}>
        <Greeting
          title={
            name ? t('welcome.greetingNamed', { name }) : t('welcome.greeting')
          }
          subtitle={t('welcome.subtitle')}
        />
        <WelcomeChoices />
      </div>
    );
  }

  const greeting = name ? t('greetingNamed', { name }) : t('greeting');

  if (vm.kind === 'unavailable') {
    return (
      <div className={styles.page}>
        <Greeting title={greeting} subtitle={t('subtitle')} />
        <CriticalFailure
          title={t('unavailable.title')}
          message={t('unavailable.message')}
          hint={t('unavailable.hint')}
          secondaryAction={
            <ButtonLink href="/characters" variant="tertiary">
              {t('unavailable.openCharacters')}
            </ButtonLink>
          }
        />
      </div>
    );
  }

  const { panel } = vm;

  return (
    <div className={styles.page}>
      <Greeting title={greeting} subtitle={t('subtitle')}>
        {vm.tabs && <DashboardTabs active={panel.tab} />}
      </Greeting>
      <div className={styles.panel}>
        {panel.tab === 'dm' ? (
          <DmPanel vm={panel} />
        ) : (
          <PlayerPanel vm={panel} />
        )}
        {vm.nudge && <RoleNudge role={vm.nudge} />}
      </div>
    </div>
  );
}

function Greeting({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children?: ReactNode;
}) {
  return (
    <header className={styles.hello}>
      <div>
        <h1>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      {children}
    </header>
  );
}
