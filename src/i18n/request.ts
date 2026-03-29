import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? 'pt-BR';

  const namespaces = ['common', 'campaign', 'character'];

  const messages = Object.fromEntries(
    await Promise.all(
      namespaces.map(async (ns) => [
        ns,
        (await import(`./translations/${locale}/${ns}.json`)).default,
      ]),
    ),
  );

  return {
    locale,
    messages,
  };
});
