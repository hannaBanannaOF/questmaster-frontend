'use client'

import { Microservices } from "@/src/shared/enums";
import { useHttpClient } from "@/src/shared/useHttpClient";
import { ActionIcon, Avatar, Container, Group, Stack, Text, Title } from "@mantine/core";
import { Calendar as MantineCalendar } from "@mantine/dates";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { CalendarItem } from "../types";

export function Calendar() {  
  const client = useHttpClient(Microservices.core);
  const t = useTranslations("home");
  const [actualMonth, setActualMonth] = useState(dayjs());
  const [nextMonth, setNextMonth] = useState(actualMonth.add(1, "M"));

  const actualMonthData = useQuery({
    queryKey: ['calendar', actualMonth.month(), actualMonth.year()],
    queryFn: async () => {
      return await client.get(`/me/sessions/calendar?year=${actualMonth.year()}&month=${actualMonth.month()+1}`) as CalendarItem[];
    },
  });

  const nextMonthData = useQuery({
    queryKey: ['calendar', nextMonth.month(), nextMonth.year()],
    queryFn: async () => {
      return await client.get(`/me/sessions/calendar?year=${nextMonth.year()}&month=${nextMonth.month()+1}`) as CalendarItem[];
    },
  });

  const renderDay = (date: string, data: CalendarItem[]) => {
    let session = data.find(elem => dayjs(elem.date).isSame(dayjs(date), 'date'));
    return session ? <Avatar color="questmaster">{dayjs(date).date()}</Avatar> : <div>{dayjs(date).date()}</div>
  }

  const capitalize = (str: string) => {
    if (str.length === 0) {
      return str; // Handle empty strings
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return <Stack gap={"xl"}>
    <Title>{t('calendario')}</Title>
    <Container>
      <Group justify="center" gap={"xl"} align="start">
        <Stack>
          <Group visibleFrom="md">
            <ActionIcon onClick={() => {
              setActualMonth(actualMonth.subtract(2, 'M'))
              setNextMonth(nextMonth.subtract(2, "M"));
            }} size={"lg"}>
              <TbChevronLeft size={24}/>
            </ActionIcon>
            <Text w={'80%'} ta={'center'} fw={500} size={"xl"}>{capitalize(actualMonth.format('MMMM, YYYY'))}</Text>
          </Group>
          <Group justify="space-between" hiddenFrom="md">
            <ActionIcon onClick={() => {
              setActualMonth(actualMonth.subtract(1, 'M'))
              setNextMonth(nextMonth.subtract(1, "M"));
            }} size={"lg"}>
              <TbChevronLeft size={24}/>
            </ActionIcon>
            <Text w={'60%'} ta={'center'} fw={500} size={"xl"}>{capitalize(actualMonth.format('MMMM, YYYY'))}</Text>
            <ActionIcon onClick={() => {
              setActualMonth(actualMonth.add(1, 'M'))
              setNextMonth(nextMonth.add(1, "M"));
            }} size={"lg"}>
              <TbChevronRight size={24}/>
            </ActionIcon>
          </Group>
          <MantineCalendar
            size="xl"
            headerControlsOrder={[]}
            weekdayFormat={'ddd'}
            hideOutsideDates
            weekendDays={[]}
            renderDay={(date) => renderDay(date, actualMonthData.data ?? [])}
            date={actualMonth.startOf('M').toDate()} />
        </Stack>
        <Stack visibleFrom="md">
          <Group justify="end">
            <Text w={'80%'} ta={'center'} fw={500} size={"xl"}>{capitalize(nextMonth.format('MMMM, YYYY'))}</Text>
            <ActionIcon onClick={() => {
              setActualMonth(actualMonth.add(2, 'M'));
              setNextMonth(nextMonth.add(2, "M"));
            }} size={"lg"}>
              <TbChevronRight size={24}/>
            </ActionIcon>
          </Group>
          <MantineCalendar
            size="xl"
            headerControlsOrder={[]}
            weekdayFormat={'ddd'}
            hideOutsideDates
            weekendDays={[]}
            renderDay={(date) => renderDay(date, nextMonthData.data ?? [])}
            date={nextMonth.startOf('M').toDate()} />
        </Stack>
      </Group>
    </Container>
  </Stack>
}