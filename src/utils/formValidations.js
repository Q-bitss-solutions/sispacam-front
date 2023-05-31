import { extend } from 'vee-validate';
import { required, numeric, double } from 'vee-validate/dist/rules';

extend('decimal', {
  ...double,
  message: `Este campo deberia ser numerico y tener hasta {decimals} decimales.`,
})

extend('required', {
  ...required,
  message: 'Este campo es requerido.',
})

extend('numeric', {
  ...numeric,
  message: 'Este campo deberia ser numerico.',
})

extend('digits', {
  validate(value, args) {
    if (value.length == args.length) {
      return true
    }

    return 'Este campo deberia tener {length} digitos'
  },
  params: ['length'],
})

extend('rfc', (value) => {
  const regexRFC = /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$/
  if (regexRFC.exec(value)) {
    return true
  }

  return 'Formato RFC no valido'
})

extend('curp', (value) => {
  const regexCURP = /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/
  if (regexCURP.exec(value)) {
    return true
  }

  return 'Formato CURP no valido'
})
