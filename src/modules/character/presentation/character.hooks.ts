import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { useToast } from '@/src/design';

import { GameSystem } from '../../rpg/domain/game-system.types';
import {
  createCharacterUseCase,
  deleteCharacterUseCase,
  getCharacterDetailUseCase,
  getCharactersUseCase,
  updateCharacterHpUseCase,
} from '../application';
import { Character } from '../domain/character.types';
import { CharacterListFilters } from '../infra/dto.types';

export function useCharacters(filters?: CharacterListFilters) {
  const t = useTranslations('character.toast');
  const { addToast } = useToast();

  const query = useQuery({
    queryKey: filters ? ['characters', filters] : ['characters'],
    queryFn: async () => getCharactersUseCase(filters),
  });

  const { error, isError } = query;

  useEffect(() => {
    if (isError) {
      addToast(t('error.list'), error.message, 'error');
    }
  }, [isError, error, addToast, t]);

  return query;
}

export function useCharacterDetail(id: number) {
  return useQuery({
    queryKey: ['characters', id],
    queryFn: () => getCharacterDetailUseCase(id),
    placeholderData: (prev) =>
      prev ?? {
        id: 0,
        slug: 'placeholder',
        name: 'Placeholder',
        system: GameSystem.CALL_OF_CTHULHU,
        currentHp: 0,
        maxHp: 0,
        isPlayer: false,
      },
  });
}

export function useCreateCharacter() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const t = useTranslations('character.toast');
  return useMutation({
    mutationFn: createCharacterUseCase,
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['characters'] });
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
    onSuccess: async (_, variables) => {
      const { id } = variables;
      queryClient.removeQueries({ queryKey: ['characters', id] });
      await queryClient.invalidateQueries({ queryKey: ['characters'] });
      await queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      addToast(
        t('success.delete.title'),
        t('success.delete.message', { name: variables.name }),
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
      updateCharacterHpUseCase(newHp, id),

    onMutate: async ({ newHp, id }) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ['characters', id] }),
        queryClient.cancelQueries({ queryKey: ['characters'] }),
      ]);

      const previousCharacter = queryClient.getQueryData<Character>([
        'characters',
        id,
      ]);
      const previousList = queryClient.getQueryData<Character[]>([
        'characters',
      ]);

      queryClient.setQueryData(
        ['characters', id],
        (oldCharacter?: Character) =>
          oldCharacter ? { ...oldCharacter, currentHp: newHp } : undefined,
      );

      if (previousCharacter?.slug) {
        queryClient.setQueriesData(
          { queryKey: ['characters'] },
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
      if (context?.previousCharacter) {
        queryClient.setQueryData(
          ['characters', variables.id],
          context.previousCharacter,
        );
      }
      if (context?.previousList) {
        queryClient.setQueryData(['characters'], context.previousList);
      }
      addToast(t('error.update'), error.message, 'error');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['characters'] });
    },
  });
}
