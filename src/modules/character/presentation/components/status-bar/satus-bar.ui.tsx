import { Minus, Plus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { Button, Container, Text } from '@/src/design';

import * as S from './status-bar.styles';

interface StatusBarProps {
  value: number;
  max: number;
  title: string;
  onUpdate: (newValue: number) => void;
  isUpdating?: boolean;
  showControls: boolean;
}

export function StatusBar({
  value,
  max,
  title,
  onUpdate,
  isUpdating,
  showControls,
}: StatusBarProps) {
  const [current, setCurrent] = useState<number>(value);
  const percent = Math.max(0, Math.min(100, (current / max) * 100));

  useEffect(() => {
    setCurrent(value);
  }, [value]);

  useEffect(() => {
    if (current === value) return;

    const handler = setTimeout(() => {
      onUpdate(current);
    }, 500);

    return () => clearTimeout(handler);
  }, [current, value, onUpdate]);

  const increaseValue = useCallback(() => {
    setCurrent((prev) => prev + 1);
  }, []);

  const decreaseValue = useCallback(() => {
    setCurrent((prev) => prev - 1);
  }, []);

  return (
    <Container direction="column" align="stretch" compact>
      <Container justify="space-between">
        <Text variant="muted">{title}</Text>
        <S.HpBarLabel>
          {current} / {max}
        </S.HpBarLabel>
      </Container>
      <S.HpBarContainer>
        <S.HpBarFill $percent={percent} $isUpdating={isUpdating} />
      </S.HpBarContainer>
      {showControls && (
        <Container justify="center">
          <Button
            variant="muted"
            text=""
            icon={<Minus display="flex" size={14} />}
            disabled={current <= 0}
            onClick={decreaseValue}
          />
          <Button
            variant="muted"
            text=""
            icon={<Plus display="flex" size={14} />}
            disabled={current == max}
            onClick={increaseValue}
          />
        </Container>
      )}
    </Container>
  );
}
