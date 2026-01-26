import { Box, Button, Flex, LoadingOverlay, Modal, Stack, Text } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { yupResolver } from "mantine-form-yup-resolver";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import * as Yup from 'yup';
import { useHttpClient } from "../hooks/useHttpClient";
import { Microservices } from "../types/services";

function ScheduleSessionModal({ opened, campaingId, close }: { opened: boolean, campaingId?: number; close: () => void }) {

  const t = useTranslations("scheduleSessionModal")
  const client = useHttpClient(Microservices.core)

  const schema = Yup.object().shape({
    dateTime: Yup.date().required(t('form.dateTime.required'))
  });
    
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      dateTime: "",
      campaingId: campaingId
    },
    validate: yupResolver(schema),
    transformValues: (values) => ({
      ...values, 
      dateTime: values.dateTime ? dayjs(values.dateTime).toDate() : undefined
    })
  })

  const scheduleSessionMutation = useMutation({
    mutationFn: async ({ data }: { data: { dateTime?: Date, campaingId?: number } }) => {
      return await client.post(`/campaing/${data.campaingId}/schedule`, { dateTime: data.dateTime })
    },
    onSuccess: (data) => {
      notifications.show({
        color: 'green',
        message: t('notifications.success'),
        position: 'top-right'
      })
      close();
    },
    onError: () => {
      notifications.show({
        color: 'red',
        message: t('notifications.error'),
        position: 'top-right'
      })
    }
  })

  return <Modal opened={opened} onClose={close} title={<Text size="md" fw={700}>{t('title')}</Text>}>
    <Box pos="relative">
      <LoadingOverlay />
      <form onSubmit={
        form.onSubmit(values => {
          scheduleSessionMutation.mutate({data: values})
        })
      }>
        <Stack>
          <DateTimePicker timePickerProps={{
            withDropdown: true,
            popoverProps: { withinPortal: false },
          }} required label={t('form.dateTime.label')} key={form.key('dateTime')} {...form.getInputProps('dateTime')}/>
          <Flex gap={"md"} justify={{ sm: "stretch", md: "flex-end" }}>
            <Button type={"submit"}>{t('form.submit')}</Button>
          </Flex>
        </Stack>
      </form>
    </Box>
  </Modal>
}

export function ScheduleSessionController({ children, campaingId } : { children: (open: () => void) => ReactNode; campaingId?: number }) {
  const [opened, { open, close }] = useDisclosure();
  return <>
    {children(open)}
    <ScheduleSessionModal opened={opened} close={close} campaingId={campaingId}/>
  </>
}