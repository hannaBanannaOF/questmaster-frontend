'use client';

import { Container, Text, Title } from '../design';

export default function HomePage() {
  return (
    <Container direction="column" align="center">
      <Title>Welcome to Questmaster</Title>
      <Text variant='muted'>Your RPG campaign management hub.</Text>
    </Container>
  );
}
