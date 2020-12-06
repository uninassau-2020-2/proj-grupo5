import { Masks } from './masks.interfaces';


export const masks: Masks = {
  cellPhone: { mask: '(00) 0 0000-0000', prefix: '+55 ' },
  cpf: { mask: '000.000.000-00' },
  financedValue: {
    mask: 'separator.2',
    placeholder: 'R$ 0,00',
    prefix: 'R$ ',
    thousandSeparator: '.',
    maxLength: '17'
  },
  entryValue: {
    mask: 'separator.2',
    placeholder: 'R$ 0,00',
    prefix: 'R$ ',
    thousandSeparator: '.',
    maxLength: '17'
  },
  cep: { mask: '00000-000' },
  cnpj: { mask: '00.000.000/0000-00' }
};
