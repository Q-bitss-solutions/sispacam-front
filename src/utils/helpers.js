const sumAll = (array) => array.reduce((a, b) => Number(a) + Number(b), 0)

const pesosFormatter = (value) => {
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    minimumFractionDigits: 2,
    currency: 'MXN'
  })

  return formatter.format(value)
}

const capitalizeFirstLetter = (value) => `${value.charAt(0).toUpperCase()}${value.slice(1)}`

export { sumAll, pesosFormatter, capitalizeFirstLetter }
