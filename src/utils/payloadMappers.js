const mapRepresentativePayload = (representative) => ({
  id_convenio: representative.agreementId,
  nombre_representante: representative.name,
  primer_a_representante: representative.firstSurname,
  segundo_a_representante: representative.secondSurname,
  fecha_nacimiento: representative.birthday,
  fecha_inicio: representative.initDate,
  fecha_fin: representative.endDate,
  curp: representative.curp,
  rfc: representative.rfc,
  clabe: representative.clabe,
  genero: representative.gender,
  calle: representative.street,
  num_ext: representative.externalNumber,
  colonia: representative.colony,
  cp: representative.cp,
})

export { mapRepresentativePayload }
