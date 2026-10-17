'use client';

import { ArrowRight, CircleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  type FormEvent,
  type ReactNode,
  useActionState,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Avatar,
  DetailSection,
  SectionHeader,
  SubmitButton,
  TextField,
  useToast,
} from '@/src/design';
import { type FormState, initialFormState } from '@/src/lib/actions';
import { TABLE_NAME_MAX } from '@/src/modules/campaign/presentation/campaign.schema';
import type { CharacterSummary } from '@/src/modules/character/domain';
import { useFormErrorToast } from '@/src/modules/shared/presentation/hooks/use-action-feedback';

import type { AcceptInviteField } from '../../invite.schema';
import styles from '../../views/invite.module.css';

type State = FormState<AcceptInviteField>;

const TAKEN = 'invite.character.taken';

interface AcceptInviteFormProps {
  /** Server Action já vinculada ao hash do convite. */
  action: (state: State, formData: FormData) => Promise<State>;
  campaignName: string;
  /** Sugestão para o apelido: o nome da conta. */
  defaultPlayerName?: string;
  /** Fichas do usuário que podem entrar (mesmo sistema, sem campanha). */
  mine: CharacterSummary[];
  /** Fichas prontas do mestre que ninguém escolheu. */
  premade: CharacterSummary[];
  /** Sem fichas próprias: a linha "Suas fichas" com "Criar personagem". */
  noneMine?: { message: string; action: ReactNode };
}

/**
 * Escolha da ficha (rádios nativos em cards: funciona sem JS) e o apelido.
 * Quem valida é a Server Action; aqui só o resumo, o foco e os avisos.
 */
export function AcceptInviteForm({
  action,
  campaignName,
  defaultPlayerName,
  mine,
  premade,
  noneMine,
}: AcceptInviteFormProps) {
  const t = useTranslations('invite');
  const tRoot = useTranslations();
  const { toast } = useToast();
  const [state, formAction] = useActionState(action, initialFormState as State);
  useFormErrorToast(state, 'invite.toast.error.join');

  const taken = state.fieldErrors?.character === TAKEN;
  const choiceError = taken ? undefined : state.fieldErrors?.character;
  const nameError = state.fieldErrors?.playerName;
  // Ficha pronta pega: a escolha é limpa; nos outros erros ela continua
  const keptChoice = taken ? '' : (state.values?.character ?? '');

  const [choice, setChoice] = useState(keptChoice);
  const [playerName, setPlayerName] = useState(
    state.values?.playerName ?? defaultPlayerName ?? '',
  );
  const groupRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  // A ficha pega some da lista na mesma resposta: o nome vem daqui
  const names = useRef(new Map<string, string>());
  for (const { slug, name } of [...mine, ...premade]) {
    names.current.set(slug, name);
  }

  useEffect(() => {
    if (state.status !== 'error') return;
    // O React limpa o form depois da action; o estado acompanha
    setChoice(keptChoice);
    if (taken) {
      toast({
        type: 'error',
        title: t('toast.error.taken'),
        message: t('character.taken', {
          name: names.current.get(state.values?.character ?? '') ?? '',
        }),
      });
    }
    if (choiceError) groupRef.current?.focus();
    else if (nameError) nameRef.current?.querySelector('input')?.focus();
  }, [state, keptChoice, taken, choiceError, nameError, toast, t]);

  const onChange = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.name === 'character') setChoice(target.value);
    if (target.name === 'playerName') setPlayerName(target.value);
  };

  const chosenName = choice ? names.current.get(choice) : undefined;
  const groups = [
    {
      key: 'mine',
      legend: t('character.mine'),
      sub: t('character.mineSub'),
      items: mine,
    },
    {
      key: 'premade',
      legend: t('character.premade'),
      sub: t('character.premadeSub'),
      items: premade,
    },
  ].filter((group) => group.items.length > 0);

  return (
    <form
      action={formAction}
      onChange={onChange}
      // A action valida e responde com a mensagem do app, no lugar do balão nativo
      noValidate
      className={styles.form}
    >
      <DetailSection labelledBy="invite-choose">
        <SectionHeader id="invite-choose" title={t('character.choose')} />
        <p className={styles.help}>
          {t('character.help', { campaign: campaignName })}
        </p>
        {choiceError && (
          <p
            className={styles.choiceError}
            role="alert"
            id="invite-choose-error"
          >
            <CircleAlert aria-hidden />
            {tRoot(choiceError)}
          </p>
        )}
        <div
          ref={groupRef}
          role="radiogroup"
          aria-labelledby="invite-choose"
          aria-describedby={choiceError ? 'invite-choose-error' : undefined}
          aria-invalid={choiceError ? true : undefined}
          tabIndex={-1}
          className={styles.groups}
        >
          {groups.map((group) => (
            <fieldset key={group.key} className={styles.group}>
              <legend className={styles.legend}>{group.legend}</legend>
              <ul className={styles.picks}>
                {group.items.map((character) => (
                  <li key={character.slug}>
                    <label className={styles.pick}>
                      <input
                        type="radio"
                        // Mesmo name nos dois grupos: uma escolha só
                        name="character"
                        value={character.slug}
                        defaultChecked={character.slug === keptChoice}
                        className="visually-hidden"
                      />
                      <span className={styles.pickTop}>
                        <Avatar name={character.name} size="lg" />
                        <span className={styles.radio} aria-hidden />
                      </span>
                      <span className={styles.pickName}>{character.name}</span>
                      <span className={styles.muted}>{group.sub}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
          ))}
          {noneMine && (
            <div className={styles.noneRow}>
              <span>
                <strong>{t('character.mine')}</strong>{' '}
                <span className={styles.muted}>· {noneMine.message}</span>
              </span>
              {noneMine.action}
            </div>
          )}
        </div>
      </DetailSection>

      <DetailSection labelledBy="invite-name">
        <SectionHeader id="invite-name" title={t('playerName.title')} />
        <div ref={nameRef}>
          <TextField
            name="playerName"
            label={t('playerName.label')}
            description={t('playerName.description')}
            required
            maxLength={TABLE_NAME_MAX}
            defaultValue={state.values?.playerName ?? defaultPlayerName}
            error={nameError ? tRoot(nameError) : undefined}
          />
        </div>
      </DetailSection>

      <div className={styles.joinRow} data-action-bar>
        <p className={styles.summary} aria-live="polite">
          {chosenName
            ? t.rich('summary.as', {
                name: playerName.trim() || '…',
                character: chosenName,
                strong: (chunks) => <strong>{chunks}</strong>,
              })
            : t('summary.pick')}
        </p>
        <SubmitButton
          variant="primary"
          size="lg"
          // Focável e enviável: sem escolha, a action responde e o foco vai à lista
          aria-disabled={!chosenName || undefined}
        >
          {t('join')}
          <ArrowRight size={18} aria-hidden />
        </SubmitButton>
      </div>
    </form>
  );
}
