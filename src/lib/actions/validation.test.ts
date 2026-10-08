import { describe, expect, it } from 'vitest';

import { formValues } from './validation';

describe('formValues', () => {
  it('lê só os campos pedidos que são texto', () => {
    const formData = new FormData();
    formData.set('name', 'Harvey');
    formData.set('hp', '12');
    formData.set('avatar', new Blob(['x']));
    formData.set('extra', 'ignorado');

    expect(formValues(formData, ['name', 'hp', 'avatar', 'missing'])).toEqual({
      name: 'Harvey',
      hp: '12',
    });
  });
});
