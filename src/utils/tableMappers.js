import { typeRoads } from '@/utils/helpers'


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
    borderColorClass: advance.variacion_porcentaje_convenio >= -15
      ? 'border-green'
      : advance.variacion_porcentaje_convenio >= -25
        ? 'border-yellow'
        : 'border-red',
    borderTitle: `Variación del ${advance.variacion_porcentaje_convenio.toFixed(decimalPlaces)} %`,
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

const mapRoadsTable = (roads) => roads
  .map((road) => ({
    ...road,
    type: typeRoads[road.tipo_camino],
  }))

export { mapPhysicalAdvancesTable, mapAssignmentsTable, mapRepresentativesTable, mapRoadsTable }