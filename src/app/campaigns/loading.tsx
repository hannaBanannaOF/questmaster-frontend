import { Loader } from "@/src/design";
import { getTranslations } from "next-intl/server";

export default async function Loading() {
  const t = await getTranslations('campaign.list');
  return (
    <Loader size="lg" message={t('loading')} />
  );
}