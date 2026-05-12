'use client';
import { ReactNode } from 'react';

import { Container } from '../../layout/container/Container';
import { Text } from '../../typography/text/Text';
import { Title } from '../../typography/title/Title';
import * as S from './styles';

interface EmptyStateProps {
  title: string | ReactNode;
  message?: string | ReactNode;
  icon?: ReactNode;
  extra?: ReactNode;
}

export function EmptyState(props: EmptyStateProps) {
  return (
    <Container align="center" direction="column">
      {props.icon && <S.IconWrapper>{props.icon}</S.IconWrapper>}
      {typeof props.title === 'string' ? <Title order={2}>{props.title}</Title> : props.title}
      {props.message &&
        (typeof props.message === 'string' ? <Text variant='muted'>{props.message}</Text> : props.message)}
      {props.extra}
    </Container>
  );
}
