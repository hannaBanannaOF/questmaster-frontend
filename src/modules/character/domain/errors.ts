import { DomainError } from '@/src/lib/errors';

// Mensagens são chaves de tradução, resolvidas na apresentação

export class InvalidHpError extends DomainError {
  constructor() {
    super('character.errors.invalidHp');
  }
}

export class CharacterNotEditableError extends DomainError {
  constructor() {
    super('character.errors.notEditable');
  }
}
