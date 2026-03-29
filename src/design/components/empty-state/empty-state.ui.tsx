'use client';
import { ReactNode } from 'react';

import Container from '../container/container.ui';
import Text from '../text/text.ui';
import Title from '../title/title.ui';
import * as S from './empty-state.styles';

export default function EmptyState({
  title,
  message,
  icon,
  extra,
}: {
  title: string | ReactNode;
  message?: string | ReactNode;
  icon?: ReactNode;
  extra?: ReactNode;
}) {
  return (
    <Container align="center" direction="column">
      {icon && <S.IconWrapper>{icon}</S.IconWrapper>}
      {typeof title === 'string' ? <Title order={2}>{title}</Title> : title}
      {message &&
        (typeof message === 'string' ? <Text muted>{message}</Text> : message)}
      {extra}
    </Container>
  );
}
