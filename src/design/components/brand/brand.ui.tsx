'use client';
import { ReactNode } from 'react';

import Container from '../container/container.ui';
import Text from '../text/text.ui';
import Title from '../title/title.ui';
import * as S from './brand.styles';

export default function Brand({
  brandName,
  subtitle,
  icon,
}: {
  brandName: string | ReactNode;
  subtitle?: string | ReactNode;
  icon?: ReactNode;
}) {
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
          <Text muted small>
            {subtitle}
          </Text>
        ) : (
          subtitle
        )}
      </Container>
    </Container>
  );
}
