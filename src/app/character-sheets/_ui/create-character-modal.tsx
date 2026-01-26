'use client'

import { RpgKind } from "@/src/domain/rpg-kind";
import { useHttpClient } from "@/src/shared/hooks/useHttpClient";
import { Microservices } from "@/src/shared/types/services";
import { getRpgKindSelectValues } from "@/src/shared/ui/rpg-kind.ui";
import { Box, Button, Flex, LoadingOverlay, Modal, NumberInput, Select, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "mantine-form-yup-resolver";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import * as Yup from 'yup';

function CreateCharacterModal({ opened, close, onCreate }: { opened: boolean; close: () => void; onCreate?: (newData: any) => void }) {

  const client = useHttpClient(Microservices.core);
  const t = useTranslations('createCharacterModal');
  const router = useRouter();

  const schema = Yup.object().shape({
    name: Yup.string().required(t('form.name.required')),
    system: Yup.string().required()
  });
  
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: "",
      system: RpgKind.CALL_OF_CTHULHU,
    },
    validate: yupResolver(schema)
  })

  const createCharacterMutation = useMutation({
    mutationFn: async ({ data }: { data: { name: string, system: RpgKind, maxHp?: number } }) => {
      return await client.post('/character-sheet', data)
    },
    onSuccess: (data) => {
      notifications.show({
        color: 'green',
        message: t('notifications.success'),
        position: 'top-right'
      })
      close();
      if (onCreate) {
        onCreate(data);
      } else {
        router.push(`character-sheets/${data.slug}`)
      }
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
  }} title={<Text size="md" fw={700}  >{t('title')}</Text>} size={"xl"} >
    <Box pos="relative">
      <LoadingOverlay visible={createCharacterMutation.isPending}/>
      <form onSubmit={
        form.onSubmit(values => {
          return createCharacterMutation.mutate({data: values})
        })
      }>
        <Stack>
          <TextInput required label={t('form.name.label')} key={form.key('name')} {...form.getInputProps('name')} />
          <Select required label={t('form.system.label')} key={form.key('system')} data={getRpgKindSelectValues()} {...form.getInputProps('system')}/>
          <NumberInput label={t('form.maxHp.label')} key={form.key('maxHp')} {...form.getInputProps('maxHp')} />
          <Flex gap={"md"} justify={{ sm: "stretch", md: "flex-end" }}>
            <Button type={"submit"}>{t('form.submit')}</Button>
          </Flex>
        </Stack>
      </form>
    </Box>
  </Modal>
}

export function CreateCharacterController({ children, onCreate } : { children: (open: () => void) => ReactNode; onCreate?: (newData: any) => void }) {
  const [opened, { open, close }] = useDisclosure();
  return <>
    {children(open)}
    <CreateCharacterModal opened={opened} close={close} onCreate={onCreate} />
  </>
}