'use client';

import { RpgKind } from "@/src/domain/rpg-kind";
import { useHttpClient } from "@/src/shared/hooks/useHttpClient";
import { Microservices } from "@/src/shared/types/services";
import { getRpgKindSelectValues } from "@/src/shared/ui/rpg-kind.ui";
import { Box, Button, Flex, LoadingOverlay, Modal, Select, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "mantine-form-yup-resolver";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import * as Yup from 'yup';

function CreateCampaingModal({ opened, close }: { opened: boolean; close: () => void }) {

  const client = useHttpClient(Microservices.core);
  const t = useTranslations('createCampaingModal');
  const router = useRouter();

  const schema = Yup.object().shape({
    name: Yup.string().required(t('form.name.required')),
    system: Yup.string().required(t('form.system.required'))
  });
  
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: "",
      system: RpgKind.CALL_OF_CTHULHU,
      overview: undefined,
    },
    validate: yupResolver(schema)
  })

  const createCampaingMutation = useMutation({
    mutationFn: async ({ data }: { data: { name: string, system: RpgKind, overview?: string } }) => {
      return await client.post('/campaing', data)
    },
    onSuccess: (data) => {
      notifications.show({
        color: 'green',
        message: t('notifications.success'),
        position: 'top-right'
      })
      close();
      router.push(`campaings/${data.slug}`)
    },
    onError: () => {
      notifications.show({
        color: 'red',
        message: t('notifications.error'),
        position: 'top-right'
      })
    }
  })

  return <Modal opened={opened} onClose={() => {
    close();
  }} title={<Text size="md" fw={700}>{t('title')}</Text>} size={"xl"} >
    <Box pos="relative">
      <LoadingOverlay visible={createCampaingMutation.isPending}/>
      <form onSubmit={
        form.onSubmit(values => {
          return createCampaingMutation.mutate({data: values})
        })
      }>
        <Stack>
          <TextInput required label={t('form.name.label')} key={form.key('name')} {...form.getInputProps('name')} />
          <Select required label={t('form.system.label')} key={form.key('system')} data={getRpgKindSelectValues()} {...form.getInputProps('system')}/>
          <Textarea label={t('form.overview.label')} key={form.key('overview')} {...form.getInputProps('overview')} />
          <Flex gap={"md"} justify={{ sm: "stretch", md: "flex-end" }}>
            <Button type={"submit"}>{t('form.submit')}</Button>
          </Flex>
        </Stack>
      </form>
    </Box>
  </Modal>
}

export function CreateCampaingController({ children } : { children: (open: () => void) => ReactNode }) {
  const [opened, { open, close }] = useDisclosure();
  return <>
    {children(open)}
    <CreateCampaingModal opened={opened} close={close} />
  </>
}