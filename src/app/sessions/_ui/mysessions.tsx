'use client';

import { Microservices, TRpgKind } from "@/src/shared/enums";
import { useHttpClient } from "@/src/shared/useHttpClient";
import { Avatar, Box, Button, Card, Flex, Group, Indicator, LoadingOverlay, Modal, Select, Skeleton, Stack, Text, Textarea, TextInput, Title } from '@mantine/core';
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";
import { yupResolver } from 'mantine-form-yup-resolver';
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import * as Yup from 'yup';
import { SessionListItem } from "../../types";

export function MySessions() {
  
  const client = useHttpClient(Microservices.core);
  const router = useRouter();
  const t = useTranslations('sessions');
  const [opened, { close, open }] = useDisclosure();
  const schema = Yup.object().shape({
    sessionName: Yup.string().required(t('create.name.required')),
    system: Yup.string().required()
  });
  
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      sessionName: "",
      system: TRpgKind.callOfCthulhu,
      sessionOverview: undefined,
    },
    validate: yupResolver(schema)
  })
  
  const {data, isFetching } = useQuery({
    queryKey: ['my-sessions'],
    queryFn: async () => {
      return await client.get('/me/sessions') as SessionListItem[];
    },
  });

  const createSessionMutation = useMutation({
    mutationFn: async ({ data }: { data: { sessionName: string, system: TRpgKind, sessionOverview?: string } }) => {
      return await client.post('/session', data)
    },
    onSuccess: (data) => {
      notifications.show({
        color: 'green',
        message: t('create.notifications.success'),
        position: 'top-right'
      })
      router.push(`sessions/${data.slug}`)
    },
    onError: () => {
      notifications.show({
        color: 'red',
        message: t('create.notifications.error'),
        position: 'top-right'
      })
    }
  })

  return <Stack>
    <Title order={2}>{t('title')}</Title>
    <Skeleton visible={isFetching && !data}>
      {data && data.length > 0 && <Stack>
        {data.map((s) => <Indicator disabled={!s.inPlay} key={s.slug} color="green">
          <Card>
            <Group gap={"xl"}>
              <Indicator disabled={!s.dmed} label="DM" size={16} inline>
                <Avatar>{TRpgKind.getIcon(s.system)}</Avatar>
              </Indicator>
              <div style={{flex: 1}}>
                <Title order={4}>{s.description}</Title>
                <Text c="dimmed">{TRpgKind.getLabel(s.system)}</Text>
              </div>
              <Button onClick={() => {
                router.push(`/sessions/${s.slug}`)
              }}>{t('ver')}</Button>
            </Group>
          </Card>
        </Indicator>)}  
      </Stack>}
      {!data || data.length == 0 && <Box bd="3px dashed questmaster" bdrs={8} p={"md"}>
        <Stack align="center">
          <Title order={2}>{t("empty.title")}</Title>
          <Text>{t("empty.cta")}</Text>
          <Button variant="light" onClick={open}>{t("empty.button")}</Button>
          <Modal opened={opened} onClose={() => {
            close();
            form.reset();
          }} title={t('create.title')} size={"xl"} >
            <Box pos="relative">
              <LoadingOverlay visible={createSessionMutation.isPending}/>
              <form onSubmit={
                form.onSubmit(values => {
                  return createSessionMutation.mutate({data: values})
                })
              }>
                <Stack>
                  <TextInput required label={t('create.name.label')} key={form.key('sessionName')} {...form.getInputProps('sessionName')} />
                  <Select required label={t('create.system.label')} key={form.key('system')} data={TRpgKind.getSelectValues()} {...form.getInputProps('system')}/>
                  <Textarea label={t('create.description.label')} key={form.key('sessionOverview')} {...form.getInputProps('sessionOverview')} />
                  <Flex gap={"md"} justify={{ sm: "stretch", md: "flex-end" }}>
                    <Button type={"submit"}>{t('create.submit')}</Button>
                  </Flex>
                </Stack>
              </form>
            </Box>
          </Modal>
        </Stack>
      </Box>}
    </Skeleton>
  </Stack>
  
}