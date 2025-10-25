import { Alert, Button, Flex, Modal, Text, Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import { TbCheck, TbX } from "react-icons/tb";

export function DeleteModal({ opened, resourceName, message, title, warning, close, onConfirm }: { opened: boolean, resourceName: string, message?: string; title?: string; warning?: string; close: () => void, onConfirm: () => void }) {

  const t = useTranslations("deleteModal")

  return <Modal opened={opened} onClose={close} centered withCloseButton={false} size={"lg"}>
    <Title order={4}>{title ?? t('title')}</Title>
    <Text mt={"md"}>{message ?? t('delete_confirm', {resource: resourceName})}</Text>
    <Alert variant="light" color="red" mt="md">
      <Text size="sm">{warning ?? t('this_action_cant_be_undone')}</Text>  
    </Alert>
    <Flex justify={"space-around"} mt={"md"}>
      <Button color="red" leftSection={<TbX />} onClick={(e) => {
        e.stopPropagation();
        close();
      }}>{t('cancel')}</Button>
      <Button variant="outline" leftSection={<TbCheck />} onClick={(e) => {
        e.stopPropagation();
        close();
        onConfirm();
      }}>{t('confirm')}</Button>
    </Flex>
  </Modal>
}