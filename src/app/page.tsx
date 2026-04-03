'use client';

import { Container, Text, Title } from '../design/design-system';

export default function HomePage() {
  return (
    <Container direction="column" align="center">
      <Title>Welcome to Questmaster</Title>
      <Text muted>Your RPG campaign management hub.</Text>
    </Container>
  );
}
