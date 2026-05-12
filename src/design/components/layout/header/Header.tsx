'use client';
import { PropsWithChildren, ReactNode } from 'react';

import { Text } from '../../typography/text/Text';
import { Title } from '../../typography/title/Title';
import { Container } from '../container/Container';
import * as S from './styles';

interface HeaderProps extends PropsWithChildren {
  brand?: ReactNode;
}

export function Header(props: HeaderProps) {
  return (
    <S.Header>
      {props.brand}
      {props.children}
    </S.Header>
  );
}

interface BrandProps {
  brandName: string | ReactNode;
  subtitle?: string | ReactNode;
  icon?: ReactNode;
}

export function Brand(props: BrandProps) {
  return (
    <Container align="center">
      {props.icon && <S.IconWrapper>{props.icon}</S.IconWrapper>}
      <Container direction="column" compact>
        {typeof props.brandName === 'string' ? (
          <Title order={2}>{props.brandName}</Title>
        ) : (
          props.brandName
        )}
        {typeof props.subtitle === 'string' ? (
          <Text variant='muted' small>
            {props.subtitle}
          </Text>
        ) : (
          props.subtitle
        )}
      </Container>
    </Container>
  );
}