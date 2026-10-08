import { Card, DetailPage, Skeleton, Stack } from '@/src/design';

// Fallback de loading.tsx das páginas de detalhe: imita o layout real para não haver salto.
// Listas usam o Loader: o tamanho delas não é previsível.

export function DetailPageSkeleton() {
  return (
    <div aria-busy>
      <DetailPage
        breadcrumb={<Skeleton width={240} />}
        hero={
          <Card hero>
            <Stack direction="column" align="stretch">
              <Stack align="center">
                <Skeleton width={48} height={48} radius="md" />
                <Stack direction="column" gap="xs">
                  <Skeleton width={260} height="1.5em" />
                  <Skeleton width={140} />
                </Stack>
              </Stack>
              <Skeleton height="4em" />
            </Stack>
          </Card>
        }
      />
    </div>
  );
}
