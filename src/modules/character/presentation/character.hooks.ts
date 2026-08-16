'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { useToast } from '@/src/design';

import {
  createCharacterUseCase,
  deleteCharacterUseCase,
  updateCharacterHpUseCase,
} from '../application';
import { Character, CharacterDetail } from '../domain';
import { CharacterListFilters } from '../infra/dto.types';
import { characterQueries } from './character.queries';

export function useCharacters(filters?: CharacterListFilters) {
  const t = useTranslations('character.toast');
  const { addToast } = useToast();

  const query = useQuery(characterQueries.list(filters));

  const { error, isError } = query;

  useEffect(() => {
    if (isError) {
      addToast(t('error.list'), error.message, 'error');
    }
  }, [isError, error, addToast, t]);

  return query;
}

export function useCharacterDetail(id: number) {
  return useQuery(characterQueries.detail(id));
}

export function useCreateCharacter() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const t = useTranslations('character.toast');

  return useMutation({
    mutationFn: createCharacterUseCase,
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: characterQueries.all(),
      });
      addToast(
        t('success.create.title'),
        t('success.create.message', { name: variables.name }),
        'success',
      );
    },
    onError: (error) => {
      addToast(t('error.create'), error.message, 'error');
    },
  });
}

export function useDeleteCharacter() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const t = useTranslations('character.toast');

  return useMutation({
    mutationFn: ({ id }: { id: number; name: string }) =>
      deleteCharacterUseCase(id),
    onSuccess: async (_, { id, name }) => {
      queryClient.removeQueries({
        queryKey: characterQueries.detail(id).queryKey,
      });
      await queryClient.invalidateQueries({
        queryKey: characterQueries.all(),
      });
      await queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      addToast(
        t('success.delete.title'),
        t('success.delete.message', { name }),
        'success',
      );
    },
    onError: (error) => {
      addToast(t('error.delete'), error.message, 'error');
    },
  });
}

export function useUpdateHP() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const t = useTranslations('character.toast');

  return useMutation({
    mutationFn: ({ newHp, id }: { newHp: number; id: number }) =>
      updateCharacterHpUseCase(id, newHp),

    onMutate: async ({ newHp, id }) => {
      const detailQueryKey = characterQueries.detail(id).queryKey;
      const listQueryKey = characterQueries.all();

      await Promise.all([
        queryClient.cancelQueries({ queryKey: detailQueryKey }),
        queryClient.cancelQueries({ queryKey: listQueryKey }),
      ]);

      const previousCharacter =
        queryClient.getQueryData<CharacterDetail>(detailQueryKey);
      const previousList = queryClient.getQueryData<Character[]>(listQueryKey);

      queryClient.setQueryData(
        detailQueryKey,
        (oldCharacter?: CharacterDetail) =>
          oldCharacter ? { ...oldCharacter, currentHp: newHp } : undefined,
      );

      if (previousCharacter?.slug) {
        queryClient.setQueriesData(
          { queryKey: listQueryKey },
          (oldList?: Character[]) => {
            if (!Array.isArray(oldList)) return oldList;
            return oldList.map((char: Character) =>
              char.slug === previousCharacter.slug
                ? { ...char, currentHp: newHp }
                : char,
            );
          },
        );
      }

      return { previousCharacter, previousList };
    },
    onError: (error, variables, context) => {
      const detailQueryKey = characterQueries.detail(variables.id).queryKey;
      const listQueryKey = characterQueries.all();

      if (context?.previousCharacter) {
        queryClient.setQueryData<CharacterDetail>(detailQueryKey, context.previousCharacter);
      }
      if (context?.previousList) {
        queryClient.setQueryData(listQueryKey, context.previousList);
      }
      addToast(t('error.update'), error.message, 'error');
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: characterQueries.detail(variables.id).queryKey,
      });
      queryClient.invalidateQueries({ queryKey: characterQueries.all() });
    },
  });
}
