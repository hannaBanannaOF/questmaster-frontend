'use client'

import { CalendarItem } from "@/src/domain/calendar";
import { useHttpClient } from "@/src/shared/hooks/useHttpClient";
import { Microservices } from "@/src/shared/types/services";

import { ActionIcon, Box, Container, Group, Stack, Text, Title } from "@mantine/core";
import { Calendar as MantineCalendar } from "@mantine/dates";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

export function Calendar() {  
  const client = useHttpClient(Microservices.core);
  const t = useTranslations("calendar");
  const [actualMonth, setActualMonth] = useState(dayjs());
  const [nextMonth, setNextMonth] = useState(actualMonth.add(1, "M"));

  const actualMonthData = useQuery({
    queryKey: ['calendar', actualMonth.month(), actualMonth.year()],
    queryFn: async () => {
      return await client.get(`/me/calendar?year=${actualMonth.year()}&month=${actualMonth.month()+1}`) as CalendarItem[];
    },
  });

  const nextMonthData = useQuery({
    queryKey: ['calendar', nextMonth.month(), nextMonth.year()],
    queryFn: async () => {
      return await client.get(`/me/calendar?year=${nextMonth.year()}&month=${nextMonth.month()+1}`) as CalendarItem[];
    },
  });

  const renderDay = (date: string, data: CalendarItem[]) => {
    let session = data.find(elem => dayjs(elem.date).isSame(dayjs(date), 'date'));
    return <Box
    style={(theme) => {
      const isToday = dayjs(date).isToday();
  
      return {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        color: isToday
          ? theme.colors.questmaster[2]
          : theme.colors.gray[6],
        fontWeight: isToday ? 600 : 400,
      };
    }}
  >
    <Box>{dayjs(date).date()}</Box>
  
    {session && (
      <Box
        style={(theme) => ({
          width: 14,
          height: 2,
          borderRadius: 2,
          backgroundColor: theme.colors.questmaster[5],
          opacity: 0.7,
        })}
      />
    )}
  </Box>
  }

  const capitalize = (str: string) => {
    if (str.length === 0) {
      return str; // Handle empty strings
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return <Stack gap={"md"}>
    <Title order={3}>{t('title')}</Title>
    <Container>
      <Group justify="center" gap={"xl"} align="start">
        <Stack>
          <Group visibleFrom="md">
            <ActionIcon variant="subtle" onClick={() => {
              setActualMonth(actualMonth.subtract(2, 'M'))
              setNextMonth(nextMonth.subtract(2, "M"));
            }} size={"lg"}>
              <TbChevronLeft size={24}/>
            </ActionIcon>
            <Text w={'80%'} ta={'center'} fw={500} size={"lg"}>{capitalize(actualMonth.format('MMMM, YYYY'))}</Text>
          </Group>
          <Group justify="space-between" hiddenFrom="md">
            <ActionIcon variant="subtle" onClick={() => {
              setActualMonth(actualMonth.subtract(1, 'M'))
              setNextMonth(nextMonth.subtract(1, "M"));
            }} size={"lg"}>
              <TbChevronLeft size={24}/>
            </ActionIcon>
            <Text w={'60%'} ta={'center'} fw={500} size={"lg"}>{capitalize(actualMonth.format('MMMM, YYYY'))}</Text>
            <ActionIcon variant="subtle" onClick={() => {
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
            <Text w={'80%'} ta={'center'} fw={500} size={"lg"}>{capitalize(nextMonth.format('MMMM, YYYY'))}</Text>
            <ActionIcon variant="subtle" onClick={() => {
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