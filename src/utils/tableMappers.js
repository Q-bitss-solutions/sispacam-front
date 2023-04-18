const decimalPlaces = 2

const mapPhysicalAdvancesTable = (advances) => advances
  .map((advance) => ({
    roadName: advance.camino.nombre_camino,
    agreementSection: advance.convenio.tramo,
    initDate: advance.residente_asignado.fecha_inicio,
    endDate: advance.residente_asignado.fecha_fin,
    advanceDate: advance.fecha_registro,
    fortnight: advance.quincena,
    percentageProgress: `${advance.avance_quincenal_porcentaje.toFixed(decimalPlaces)} %`,
    fullPercentage: `${advance.avance_acumulado_porcentaje.toFixed(decimalPlaces)} %`,
    status: advance.residente_asignado.estatus ? 'Activo' : 'Inactivo',
  }))

const mapAssignmentsTable = (assignments) => assignments
  .map((assignment) => ({
    id: assignment.id,
    roadKey: assignment.camino.clave_camino,
    roadName: assignment.camino.nombre_camino,
    yearAgreement: assignment.convenio.anio,
    agreementSection: assignment.convenio.tramo,
    initDate: assignment.fecha_inicio,
    endDate: assignment.fecha_fin,
    lastDateRoad: assignment.ultimo_avance_fisico.fecha_registro,
    status: assignment.estatus ? 'Activo' : 'Inactivo',
  }))

const mapRepresentativesTable = (representatives) => representatives
  .map((representative) => ({
    fullName: `${representative.nombre_representante} ${representative.primer_a_representante} ${representative.segundo_a_representante}`,
    rfc: representative.rfc,
    initDate: representative.fecha_inicio,
    endDate: representative.fecha_fin,
  }))

export { mapPhysicalAdvancesTable, mapAssignmentsTable, mapRepresentativesTable }