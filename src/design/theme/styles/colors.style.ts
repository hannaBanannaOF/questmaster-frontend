export type ThemeColors = {
  background: {
    primary: string;
  };
  text: {
    primary: string;
    muted: string;
    contrast: string;
  };
  card: {
    background: string;
    foreground: string;
    border: string;
  };
  primary: {
    default: string;
    soft: string;
  };
  gameSystem: {
    dnd: string;
    coc: string;
    cpr: string;
    op: string;
  };
  status: {
    playing: {
      default: string;
      soft: string;
    };
    draft: {
      default: string;
      soft: string;
    };
    paused: {
      default: string;
      soft: string;
    };
    archived: {
      default: string;
      soft: string;
    };
  };
};

export const themeColors: ThemeColors = {
  background: {
    primary: 'var(--color-bg-primary)',
  },
  text: {
    primary: 'var(--color-text-primary)',
    muted: 'var(--color-text-muted)',
    contrast: 'var(--color-text-contrast)',
  },
  primary: {
    default: 'var(--color-primary)',
    soft: 'var(--color-primary-soft)',
  },
  card: {
    background: 'var(--color-card-bg)',
    foreground: 'var(--color-card-fg)',
    border: 'var(--color-card-border)',
  },
  gameSystem: {
    dnd: 'var(--color-system-dnd)',
    coc: 'var(--color-system-coc)',
    cpr: 'var(--color-system-cpr)',
    op: 'var(--color-system-op)',
  },
  status: {
    archived: {
      default: 'var(--color-status-archived)',
      soft: 'var(--color-status-archived-soft)',
    },
    draft: {
      default: 'var(--color-status-draft)',
      soft: 'var(--color-status-draft-soft)',
    },
    playing: {
      default: 'var(--color-status-playing)',
      soft: 'var(--color-status-playing-soft)',
    },
    paused: {
      default: 'var(--color-status-paused)',
      soft: 'var(--color-status-paused-soft)',
    },
  },
};
