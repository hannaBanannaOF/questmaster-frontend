'use client';

import { Microservices, TRpgKind } from "@/src/shared/enums";
import { useHttpClient } from "@/src/shared/useHttpClient";
import { Avatar, Box, Button, Card, Flex, Group, LoadingOverlay, Modal, NumberInput, Select, Skeleton, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";
import { yupResolver } from "mantine-form-yup-resolver";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import * as Yup from 'yup';
import { CharacterSheetListItem } from "../../types";

export function MySheets() {
  
  const client = useHttpClient(Microservices.core);
  const router = useRouter();
  const t = useTranslations('character-sheets');
  const [opened, { close, open }] = useDisclosure();
  const schema = Yup.object().shape({
    characterName: Yup.string().required(t('create.name.required')),
    system: Yup.string().required()
  });
  
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      characterName: "",
      system: TRpgKind.callOfCthulhu,
    },
    validate: yupResolver(schema)
  })
  
  const {data, isFetching } = useQuery({
    queryKey: ['my-character-sheets'],
    queryFn: async () => {
      return await client.get('/me/sheets') as CharacterSheetListItem[];
    },
  });

  const createCharacterMutation = useMutation({
    mutationFn: async ({ data }: { data: { characterName: string, system: TRpgKind, maxHp?: string } }) => {
      return await client.post('/character-sheet', data)
    },
    onSuccess: (data) => {
      notifications.show({
        color: 'green',
        message: t('create.notifications.success'),
        position: 'top-right'
      })
      router.push(`character-sheets/${data.slug}`)
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
        {data.map((s) => <Card key={s.slug}>
          <Group>
            <Avatar>{TRpgKind.getIcon(s.system)}</Avatar>
            <div style={{flex: 1}}>
              <Title order={4}>{s.description}</Title>
              <Text c="dimmed">{TRpgKind.getLabel(s.system)}</Text>
            </div>
            <Button onClick={() => {
              router.push(`character-sheets/${s.slug}`)
            }}>{t('ver')}</Button>
          </Group>
        </Card>)}  
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
              <LoadingOverlay visible={createCharacterMutation.isPending}/>
              <form onSubmit={
                form.onSubmit(values => {
                  return createCharacterMutation.mutate({data: values})
                })
              }>
                <Stack>
                  <TextInput required label={t('create.name.label')} key={form.key('characterName')} {...form.getInputProps('characterName')} />
                  <Select required label={t('create.system.label')} key={form.key('system')} data={TRpgKind.getSelectValues()} {...form.getInputProps('system')}/>
                  <NumberInput label={t('create.maxHp.label')} key={form.key('maxHp')} {...form.getInputProps('maxHp')} />
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