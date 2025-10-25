import { Container, Stack } from "@mantine/core";
import { Calendar } from "./_ui/calendar";
import { Upcoming } from "./_ui/upcoming";

export default function HomePage() {
  return <Container>
    <Stack>
      <Calendar />
      <Upcoming />
    </Stack>
  </Container>
}
