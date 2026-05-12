
import { Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
  Button,
  Container,
  Text,
} from '@/src/design';

import * as S from './status-bar.styles';

interface StatusBarProps {
  value: number;
  max: number;
  title: string;
  onUpdate: (newValue: number) => void
  isUpdating?: boolean;
}

export function StatusBar(props: StatusBarProps) {
  
  const [current, setCurrent] = useState<number>(props.value);
  const percent = Math.max(0, Math.min(100, (current / props.max) * 100));

  useEffect(() => {
    setCurrent(props.value);
  }, [props.value]);

  useEffect(() => {
    if (current === props.value) return;

    const handler = setTimeout(() => {
      props.onUpdate(current);
    }, 500);

    return () => clearTimeout(handler);
  }, [current, props.value, props.onUpdate]);

  return (
    <Container direction="column" align="stretch" compact>
      <Container justify="space-between">
        <Text variant='muted'>{props.title}</Text>
        <S.HpBarLabel>
          {current} / {props.max}
        </S.HpBarLabel>
      </Container>
      <S.HpBarContainer>
        <S.HpBarFill $percent={percent} $isUpdating={props.isUpdating}/>
      </S.HpBarContainer>
      <Container justify='center'>
        <Button variant='muted' text='' icon={<Minus display='flex' size={14}/>} disabled={current <= 0} onClick={() => {
          setCurrent(prev => prev -1);
        }}/>
        <Button variant='muted' text='' icon={<Plus display='flex' size={14}/>} disabled={current == props.max} onClick={() => {
          setCurrent(prev => prev + 1);
        }}/>
      </Container>
    </Container>
  );
}
