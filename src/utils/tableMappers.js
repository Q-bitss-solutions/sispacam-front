import { pesosFormatter, capitalizeFirstLetter } from '@/utils/helpers'
import { typeRoads } from '@/utils/constants'


const decimalPlaces = 2

const mapPhysicalAdvancesTable = (advances) => advances
  .map((advance) => ({
    id: advance.id,
    assignmentId: advance.residente_asignado.id,
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
    borderTitle: `Variación del ${-1.0*advance.variacion_porcentaje_convenio.toFixed(decimalPlaces)} %`,
  }))

const mapAssignmentsTable = (assignments) => assignments
  .map((assignment) => ({
    id: assignment.id,
    roadKey: assignment.camino.clave_camino,
    roadName: assignment.camino.nombre_camino,
    beneficiary: assignment.beneficiario.municipio.nombre || '',
    progressPercentage: `${Number(assignment.ultimo_avance_fisico.avance_acumulado_porcentaje).toFixed(decimalPlaces)}%`,
    amount: Number(assignment.convenio.monto).toFixed(decimalPlaces),
    meta: Number(assignment.convenio.meta).toFixed(decimalPlaces),
    agreementSection: assignment.convenio.tramo,
    lastDateRoad: assignment.ultimo_avance_fisico.fecha_registro,
    status: assignment.estatus ? 'Activo' : 'Inactivo',
    borderColorClass: assignment.variacion_porcentaje_convenio >= -15
      ? 'border-green'
      : assignment.variacion_porcentaje_convenio >= -25
        ? 'border-yellow'
        : 'border-red',
    borderTitle: `Variación del ${-1.0*assignment.variacion_porcentaje_convenio.toFixed(decimalPlaces)} %`,
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

const mapBaseBudgetTable = (paymentConcepts) => paymentConcepts
  .map((paymentConcept) => ({
    paymentConcept: `${capitalizeFirstLetter(paymentConcept.partida.concepto.descripcion.toLowerCase())}: ${capitalizeFirstLetter(paymentConcept.partida.descripcion.toLowerCase())}`,
    quantityPerKm: paymentConcept.cantidad,
    unitMeasurement: paymentConcept.partida.unidad_medida.descripcion,
    amountPerKm: pesosFormatter(paymentConcept.importe_kilometro),
    unitPrice: pesosFormatter(paymentConcept.importe),
    totalAmountAgreementFormatter: pesosFormatter(paymentConcept.importe_longitud),
    totalAmountAgreement: paymentConcept.importe_longitud,
    totalWeightedPercentageFormatter: `${paymentConcept.porcentaje_ponderado.toFixed(decimalPlaces)}%`,
    totalWeightedPercentage: paymentConcept.porcentaje_ponderado,
  }))

export { mapPhysicalAdvancesTable, mapAssignmentsTable, mapRepresentativesTable, mapRoadsTable, mapBaseBudgetTable }