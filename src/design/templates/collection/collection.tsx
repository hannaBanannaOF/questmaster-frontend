import { ChevronDown } from 'lucide-react';
import type { PropsWithChildren, ReactNode } from 'react';

import { Button } from '../../atoms/button/button';
import styles from './collection.module.css';

/**
 * Telas de coleção no padrão HeroUI v3 (Campanhas, Personagens): título com
 * total, barra de filtros, lista, paginação a partir de 48rem e "Mostrar
 * mais" abaixo disso.
 */
export function CollectionPage({ children }: PropsWithChildren) {
  return <div className={styles.page}>{children}</div>;
}

interface CollectionHeaderProps {
  title: string;
  /** Total sem filtros; omitido quando a busca falhou ou não há itens. */
  count?: number;
  countLabel?: string;
  action?: ReactNode;
}

export function CollectionHeader({
  title,
  count,
  countLabel,
  action,
}: CollectionHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h1>{title}</h1>
        {count !== undefined && (
          <span className={styles.count} aria-label={countLabel}>
            {count}
          </span>
        )}
      </div>
      {action}
    </header>
  );
}

/** Busca e filtros; a busca (`CollectionSearch`) ocupa a linha toda até 64rem. */
export function CollectionToolbar({ children }: PropsWithChildren) {
  return <div className={styles.toolbar}>{children}</div>;
}

export function CollectionSearch({ children }: PropsWithChildren) {
  return <div className={styles.search}>{children}</div>;
}

export type CollectionLayout = 'rows' | 'cards';

/** `rows`: 2 colunas só com 440px cada. `cards`: 2 no celular, 220px+ depois. */
export function CollectionList({
  layout,
  children,
}: PropsWithChildren<{ layout: CollectionLayout }>) {
  return <ul className={styles[layout]}>{children}</ul>;
}

interface CollectionResultsProps {
  /** Título oculto da lista, ex.: "Campanhas, página 2 de 4". */
  heading: string;
  /** Paginação por links, só a partir de 48rem. */
  pagination: ReactNode;
}

export function CollectionResults({
  heading,
  pagination,
  children,
}: PropsWithChildren<CollectionResultsProps>) {
  return (
    <section className={styles.results} aria-labelledby="collection-page">
      <h2 id="collection-page" className="visually-hidden">
        {heading}
      </h2>
      {children}
      <div className={styles.pagination}>{pagination}</div>
    </section>
  );
}

interface LoadMoreFooterProps {
  done: boolean;
  pending: boolean;
  failed: boolean;
  onLoadMore: () => void;
  labels: { action: string; loading: string; error: string; summary: string };
}

/** "Mostrar mais" do celular, com o resumo anunciado ao leitor de tela. */
export function LoadMoreFooter({
  done,
  pending,
  failed,
  onLoadMore,
  labels,
}: LoadMoreFooterProps) {
  return (
    <div className={styles.loadMore}>
      {!done && (
        <Button
          variant="secondary"
          className={styles.loadMoreButton}
          icon={<ChevronDown size={18} />}
          loading={pending}
          onClick={onLoadMore}
        >
          {pending ? labels.loading : labels.action}
        </Button>
      )}
      {failed && (
        <p className={styles.loadMoreError} role="alert">
          {labels.error}
        </p>
      )}
      <p className={styles.summary} aria-live="polite">
        {labels.summary}
      </p>
    </div>
  );
}

const Block = ({ w, h }: { w: string; h: string }) => (
  <span className={styles.sk} style={{ width: w, height: h }} />
);

/** Esqueleto com a forma dos itens reais (mesma altura): nada pula quando chegam. */
export function CollectionSkeleton({
  layout,
  loadingLabel,
  count = layout === 'rows' ? 6 : 8,
}: {
  layout: CollectionLayout;
  loadingLabel: string;
  count?: number;
}) {
  return (
    <div aria-busy="true">
      <p className="visually-hidden" role="status">
        {loadingLabel}
      </p>
      <ul className={`${styles[layout]} ${styles.skeleton}`} aria-hidden>
        {Array.from({ length: count }, (_, i) =>
          layout === 'rows' ? (
            <li key={i} className={styles.skRow}>
              <Block w="2.75rem" h="2.75rem" />
              <div>
                <Block w="min(14rem, 70%)" h="1rem" />
                <Block w="8rem" h="0.75rem" />
              </div>
            </li>
          ) : (
            <li key={i} className={styles.skCard}>
              <Block w="7rem" h="0.75rem" />
              <Block w="3rem" h="3rem" />
              <Block w="70%" h="1rem" />
              <Block w="60%" h="0.75rem" />
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
