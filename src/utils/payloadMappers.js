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

const mapPhysicalAdvancePayload = (physicalAdvance) => ({
  rodera1_izq: physicalAdvance.firstRutToLeft,
  rodera2_izq: physicalAdvance.secondRutToLeft,
  empedrado_izq: physicalAdvance.cobbledToLeft,
  rodera1_der: physicalAdvance.firstRutToRight,
  rodera2_der: physicalAdvance.secondRutToRight,
  empedrado_der: physicalAdvance.cobbledToRight,
  empedrado_central: physicalAdvance.cobbledToCenter,
})

export { mapRepresentativePayload, mapPhysicalAdvancePayload }
