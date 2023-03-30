const mapPhysicalAdvancesTable = (advances) => advances
  .map((advance) => ({
    roadName: advance.camino.nombre_camino,
    agreementSection: advance.convenio.tramo,
    initDate: advance.residente_asignado.fecha_inicio,
    endDate: advance.residente_asignado.fecha_fin,
    advanceDate: advance.fecha_registro,
    week: advance.semana,
    percentageProgress: `${advance.avance_semanal_porcentaje}%`,
    fullPercentage: `${advance.avance_acumulado_porcentaje}%`,
    status: advance.residente_asignado.estatus ? 'Activo' : 'Inactivo',
  }))

const mapAssignmentsTable = (roads) => roads
  .map((road) => ({
    roadKey: road.camino.clave_camino,
    roadName: road.camino.nombre_camino,
    yearAgreement: road.convenio.anio,
    agreementSection: road.convenio.tramo,
    initDate: road.fecha_inicio,
    endDate: road.fecha_fin,
    lastDateRoad: road.ultimo_avance_fisico.fecha_registro,
    status: road.estatus ? 'Activo' : 'Inactivo',
  }))

export { mapPhysicalAdvancesTable, mapAssignmentsTable }