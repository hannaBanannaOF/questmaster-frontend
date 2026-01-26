import { Container, Stack } from "@mantine/core";
import { Calendar } from "./_ui/calendar";
import { Upcoming } from "./_ui/upcoming";

export default function HomePage() {
  return <Container>
    <Stack gap={"xl"}>
      <Upcoming />
      <Calendar />
    </Stack>
  </Container>
}
