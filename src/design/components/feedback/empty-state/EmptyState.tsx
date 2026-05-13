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

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  icon,
  extra,
}) => {
  return (
    <Container align="center" direction="column">
      {icon && <S.IconWrapper>{icon}</S.IconWrapper>}
      {typeof title === 'string' ? <Title order={2}>{title}</Title> : title}
      {message &&
        (typeof message === 'string' ? (
          <Text variant="muted">{message}</Text>
        ) : (
          message
        ))}
      {extra}
    </Container>
  );
};
