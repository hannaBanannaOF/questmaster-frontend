import type { PropsWithChildren, ReactNode } from 'react';

import { Surface } from '../../atoms/surface/surface';
import { TextLink } from '../../atoms/text-link/text-link';
import styles from './detail-page.module.css';

/**
 * Páginas de detalhe no padrão HeroUI v3 (campanha, ficha): uma coluna em
 * todas as larguras — voltar, cabeçalho-destaque e seções.
 */
export function DetailPage({
  back,
  children,
}: PropsWithChildren<{ back?: { href: string; label: string } }>) {
  return (
    <div className={styles.page}>
      {back && (
        <nav aria-label={back.label} className={styles.back}>
          <TextLink href={back.href} back>
            {back.label}
          </TextLink>
        </nav>
      )}
      {children}
    </div>
  );
}

interface DetailHeroProps {
  /** Id do `DetailTitle`, que nomeia a seção. */
  labelledBy: string;
  /** Marca d'água do sistema, cortada no canto. */
  watermark?: ReactNode;
  /** Identidade e título, à esquerda. */
  main: ReactNode;
  /** `DetailActions`: à direita a partir de 48rem, dividindo a linha no celular. */
  actions?: ReactNode;
}

/** O destaque da página: identidade, título e ações; o resto vem abaixo. */
export function DetailHero({
  labelledBy,
  watermark,
  main,
  actions,
  children,
}: PropsWithChildren<DetailHeroProps>) {
  return (
    <Surface
      as="section"
      variant="secondary"
      className={styles.hero}
      aria-labelledby={labelledBy}
    >
      {watermark}
      <div className={styles.heroTop}>
        <div className={styles.heroMain}>{main}</div>
        {actions}
      </div>
      {children}
    </Surface>
  );
}

/** O único `h1` da página. */
export function DetailTitle({
  id,
  children,
}: PropsWithChildren<{ id: string }>) {
  return (
    <h1 id={id} className={styles.title}>
      {children}
    </h1>
  );
}

/** Ações do cabeçalho, como grupo nomeado; acima da marca d'água. */
export function DetailActions({
  label,
  children,
}: PropsWithChildren<{ label: string }>) {
  return (
    <div className={styles.actions} role="group" aria-label={label}>
      {children}
    </div>
  );
}

export function DetailSection({
  labelledBy,
  children,
}: PropsWithChildren<{ labelledBy: string }>) {
  return (
    <section className={styles.section} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
