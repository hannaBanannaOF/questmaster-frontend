'use client';
import { PropsWithChildren, ReactNode } from 'react';

import { Text } from '../../typography/text/Text';
import { Title } from '../../typography/title/Title';
import { Container } from '../container/Container';
import * as S from './styles';

interface HeaderProps extends PropsWithChildren {
  brand?: ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ brand, children }) => {
  return (
    <S.Header>
      {brand}
      {children}
    </S.Header>
  );
};

interface BrandProps {
  brandName: string | ReactNode;
  subtitle?: string | ReactNode;
  icon?: ReactNode;
}

export const Brand: React.FC<BrandProps> = ({ brandName, subtitle, icon }) => {
  return (
    <Container align="center">
      {icon && <S.IconWrapper>{icon}</S.IconWrapper>}
      <Container direction="column" compact>
        {typeof brandName === 'string' ? (
          <Title order={2}>{brandName}</Title>
        ) : (
          brandName
        )}
        {typeof subtitle === 'string' ? (
          <Text variant="muted" small>
            {subtitle}
          </Text>
        ) : (
          subtitle
        )}
      </Container>
    </Container>
  );
};
