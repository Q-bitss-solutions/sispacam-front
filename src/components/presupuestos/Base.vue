<template>
    <div class="row">
    <div class="col-md-12">
        <table class="table table-responsive table-bordered data">
        <thead>
            <tr>
            <th>CONCEPTOS Y PARTIDAS</th>
            <th>CANTIDAD TOTAL</th>
            <th>UNIDAD</th>
            <th>PRECIO UNITARIO</th>
            <th>IMPORTE TOTAL POR LONGITUD</th>
            <th>PORCENTAJE PONDERADO</th>
            </tr>
        </thead>
        <tbody>
            <tr class="concepto">
            <td colspan="4">TERRACERÍAS</td>
            <td>$74,130.40</td>
            <td>2.7%</td>
            </tr>
            <tr class="terracerias" ref="terracerias">
            <td>Limpieza de la superficie de rodamiento para la ejecución de los trabajos de conservación.</td>
            <td>0.55</td>
            <td>HA</td>
            <td>$11,578</td>
            <td>$6,373.38</td>
            <td>0.24%</td>
            </tr>
            <tr class="terracerias" ref="terracerias"> 
            <td>Escarificación por medios manuales de la superficie compactada para recibir una nueva capa.</td>
            <td>450.00</td>
            <td>M3</td>
            <td>$43.26</td>
            <td>$19,467.00</td>
            <td>0.72%</td>
            </tr>
            <tr class="terracerias">
            <td>Extracción de derrumbes ocasionados por causas no imputables al contratista cualquiera que sea su clasificación, el material se transporta al banco de desperdicio, incluye carga a unidades de ransporte, por unidad de obra
                terminada.</td>
            <td>28.00</td>
            <td>M3</td>
            <td>$213.67</td>
            <td>$5,982.76</td>
            <td>0.22%</td>
            </tr>
            <tr class="terracerias">
            <td>Afinamiento para perfilar las secciones de construcción, utilizando el material producto del afinamiento, para su ejecución se incluye mano de obra y herramienta menor, por unidad de obra terminada.</td>
            <td>266.00</td>
            <td>M3</td>
            <td>$2,790.00</td>
            <td>$42,307.30</td>
            <td>1.57%</td>
            </tr>

            <tr class="concepto">
            <td colspan="4">OBRAS DE DRENAJE Y ESTRUCTURAS</td>
            <td>$566,464.5</td>
            <td>21.0%</td>
            </tr>
            <tr class="subconcepto">
            <td colspan="6">PRELIMINARES</td>
            </tr>
            <tr>
            <td>Excavación para estructuras u obras de drenaje, cualquiera que sea su clasificación, con una profundidad mayor de 1,5 hasta 3,0 m, el material producto de la excavación se desperdicia en el banco que se indique, por unidad
                de obra terminada.</td>
            <td>110.00</td>
            <td>M3</td>
            <td>$1164.81</td>
            <td>$18,129.10</td>
            <td>0.67%</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
            <td colspan="4">TOTAL</td>
            <td>$2,700,104.60</td>
            <td>100%</td>
            </tr>
        </tfoot>
        </table>
    </div>
    </div>
</template>

<script>
    export default {
        name:'PresupuestoBase',
        data(){
            return {
                datos:[ 
   {
      "id_presupuesto_base": 2,
      "id_ancho": 1,
      "id_partida": 1,
      "cantidad": 0.55,
      "importe": 6373.38,
      "id_concepto": 1,
      "descripcion1": "LIMPIEZA DE LA SUPERFICIE DE RODAMIENTO PARA LA EJECUCIÓN DE LOS TRABAJOS DE CONSERVACIÓN.",
      "subconcepto": false,
      "codigo": "A",
      "descripcion": "TERRACERIAS"
   },
   {
      "id_presupuesto_base": 3,
      "id_ancho": 1,
      "id_partida": 2,
      "cantidad": 450,
      "importe": 19467,
      "id_concepto": 1,
      "descripcion1": "ESCARIFICACIÓN POR MEDIOS MANUALES DE LA SUPERFICIE COMPACTADA PARA RECIBIR UNA NUEVA CAPA.",
      "subconcepto": false,
      "codigo": "A",
      "descripcion": "TERRACERIAS"
   },
   {
      "id_presupuesto_base": 4,
      "id_ancho": 1,
      "id_partida": 3,
      "cantidad": 28,
      "importe": 5982.76,
      "id_concepto": 1,
      "descripcion1": "EXTRACCIÓN DE DERRUMBES OCASIONADOS POR CAUSAS NO IMPUTABLES AL CONTRATISTA CUALQUIERA QUE SEA SU CLASIFICACIÓN, EL MATERIAL SE TRANSPORTA AL BANCO DE DESPERDICIO, INCLUYE CARGA A UNIDADES DE RANSPORTE, POR UNIDAD DE OBRA TERMINADA.",
      "subconcepto": false,
      "codigo": "A",
      "descripcion": "TERRACERIAS"
   },
   {
      "id_presupuesto_base": 5,
      "id_ancho": 1,
      "id_partida": 4,
      "cantidad": 266,
      "importe": 42307.3,
      "id_concepto": 1,
      "descripcion1": "AFINAMIENTO PARA PERFILAR LAS SECCIONES DE CONSTRUCCIÓN, UTILIZANDO EL MATERIAL PRODUCTO DEL AFINAMIENTO, PARA SU EJECUCIÓN SE INCLUYE MANO DE OBRA Y HERRAMIENTA MENOR, POR UNIDAD DE OBRA TERMINADA.",
      "subconcepto": false,
      "codigo": "A",
      "descripcion": "TERRACERIAS"
   },
   {
      "id_presupuesto_base": 6,
      "id_ancho": 1,
      "id_partida": 6,
      "cantidad": 110,
      "importe": 18129.1,
      "id_concepto": 2,
      "descripcion1": "EXCAVACIÓN PARA ESTRUCTURAS U OBRAS DE DRENAJE, CUALQUIERA QUE SEA SU CLASIFICACIÓN, CON UNA PROFUNDIDAD MAYOR DE 1,5 HASTA 3,0 M, EL MATERIAL PRODUCTO DE LA EXCAVACIÓN SE DESPERDICIA EN EL BANCO QUE SE INDIQUE, POR UNIDAD DE OBRA TERMINADA.",
      "subconcepto": false,
      "codigo": "B",
      "descripcion": "OBRAS DE DRENAJE Y ESTRUCTURAS"
   },
   {
      "id_presupuesto_base": 7,
      "id_ancho": 1,
      "id_partida": 8,
      "cantidad": 19.1,
      "importe": 23356.05,
      "id_concepto": 2,
      "descripcion1": "CABEZAL PARA ALCANTARILLA A BASE DE ZAMPEADO DE MAMPOSTERÍA DE PIEDRA PARA CUALQUIER ALTURA, DE TERCERA CLASE JUNTEADA CON MORTERO DE CEMENTO, POR UNIDAD DE OBRA TERMINADA.",
      "subconcepto": false,
      "codigo": "B",
      "descripcion": "OBRAS DE DRENAJE Y ESTRUCTURAS"
   },
   {
      "id_presupuesto_base": 8,
      "id_ancho": 1,
      "id_partida": 9,
      "cantidad": 50,
      "importe": 61141.5,
      "id_concepto": 2,
      "descripcion1": "MUROS DE CONTENCIÓN A BASE DE MAMPOSTERÍA DE PIEDRA DE TERCERA CLASE JUNTEADA CON MORTERO DE CEMENTO, PARA CUALQUIER ALTURA, POR UNIDAD DE OBRA TERMINADA.",
      "subconcepto": false,
      "codigo": "B",
      "descripcion": "OBRAS DE DRENAJE Y ESTRUCTURAS"
   },
   {
      "id_presupuesto_base": 9,
      "id_ancho": 1,
      "id_partida": 10,
      "cantidad": 25,
      "importe": 19631.25,
      "id_concepto": 2,
      "descripcion1": "FORMACION DE PEDRAPLEN EN RELLENOS DE CAJAS CON MATERIAL DE LOS BANCOS, POR UNIDAD DE OBRA TERMINADA, PARA ABATIMIENTO DE NIVEL DE AGUAS FREATICAS.",
      "subconcepto": false,
      "codigo": "B",
      "descripcion": "OBRAS DE DRENAJE Y ESTRUCTURAS"
   },
   {
      "id_presupuesto_base": 10,
      "id_ancho": 1,
      "id_partida": 11,
      "cantidad": 2000,
      "importe": 209860,
      "id_concepto": 2,
      "descripcion1": "GUARNICIÓN DE CONCRETO",
      "subconcepto": false,
      "codigo": "B",
      "descripcion": "OBRAS DE DRENAJE Y ESTRUCTURAS"
   },
   {
      "id_presupuesto_base": 11,
      "id_ancho": 1,
      "id_partida": 13,
      "cantidad": 25,
      "importe": 72762.75,
      "id_concepto": 2,
      "descripcion1": "ALCANTARILLAS DE LÁMINA CORRUGADA DE ACERO DE SECCIÓN ANIDABLE DE TUBO CIRCULAR SIN RECUBRIMIENTO, DE 120 CM DE DIÁMETRO Y CALIBRE NO.12, POR UNIDAD DE OBRA TERMINADA.",
      "subconcepto": false,
      "codigo": "B",
      "descripcion": "OBRAS DE DRENAJE Y ESTRUCTURAS"
   },
   {
      "id_presupuesto_base": 12,
      "id_ancho": 1,
      "id_partida": 14,
      "cantidad": 45,
      "importe": 145901.25,
      "id_concepto": 2,
      "descripcion1": "CUNETAS REVESTIDAS DE CONCRETO HIDRAULICO DE F`C=100 KG/CM2. P.U.O.T.",
      "subconcepto": false,
      "codigo": "B",
      "descripcion": "OBRAS DE DRENAJE Y ESTRUCTURAS"
   },
   {
      "id_presupuesto_base": 13,
      "id_ancho": 1,
      "id_partida": 15,
      "cantidad": 63,
      "importe": 15682.59,
      "id_concepto": 2,
      "descripcion1": "RELLENO Y COMPACTACIÓN CON PIZÓN CON EL MATERIAL PRODUCTO DE EXCAVACIÓN EN LAS OBRAS DE DRENAJE, INCLUYE MANO DE OBRA, Y HERRAMIENTA MENOR.",
      "subconcepto": false,
      "codigo": "B",
      "descripcion": "OBRAS DE DRENAJE Y ESTRUCTURAS"
   },
   {
      "id_presupuesto_base": 14,
      "id_ancho": 1,
      "id_partida": 16,
      "cantidad": 320,
      "importe": 1168307.2,
      "id_concepto": 3,
      "descripcion1": "RODERAS DE CONCERETO HIDRAULICO DE F¸'C= 200 KG/CM2, POR UNIDAD DE OBRA TERMINADA",
      "subconcepto": false,
      "codigo": "C",
      "descripcion": "SUPERFICIE DE RODAMIENTO"
   },
   {
      "id_presupuesto_base": 15,
      "id_ancho": 1,
      "id_partida": 17,
      "cantidad": 800,
      "importe": 408592,
      "id_concepto": 3,
      "descripcion1": "CONSTRUCCION DE SUBRASANTE, DE 20 CM. DE  ESPESOR COMPACTO, COMPACTADA AL CIEN POR CIENTO (90%), INCLUYE ACARREOS.",
      "subconcepto": false,
      "codigo": "C",
      "descripcion": "SUPERFICIE DE RODAMIENTO"
   },
   {
      "id_presupuesto_base": 16,
      "id_ancho": 1,
      "id_partida": 18,
      "cantidad": 440,
      "importe": 398952.4,
      "id_concepto": 3,
      "descripcion1": "EMPEDRADO A BASE DE CONCRETO Y PIEDRA BRAZA PARA CAMINO.",
      "subconcepto": false,
      "codigo": "C",
      "descripcion": "SUPERFICIE DE RODAMIENTO"
   },
   {
      "id_presupuesto_base": 17,
      "id_ancho": 1,
      "id_partida": 19,
      "cantidad": 3,
      "importe": 2870.28,
      "id_concepto": 4,
      "descripcion1": "SUMINISTRO Y COLOCACION DE SEÑALAMIENTO PREVENTIVO (SP) DE 71 X 71 CMS,   P.U.O.T.",
      "subconcepto": false,
      "codigo": "D",
      "descripcion": "SEÑALAMIENTO"
   },
   {
      "id_presupuesto_base": 18,
      "id_ancho": 1,
      "id_partida": 20,
      "cantidad": 3,
      "importe": 2870.28,
      "id_concepto": 4,
      "descripcion1": "SUMINISTRO Y COLOCACION DE SEÑALAMIENTO DE INFORMACION RESTRICTIVO (SR) DE 71X 71 CMS, P.U.O.T.",
      "subconcepto": false,
      "codigo": "D",
      "descripcion": "SEÑALAMIENTO"
   },
   {
      "id_presupuesto_base": 19,
      "id_ancho": 1,
      "id_partida": 21,
      "cantidad": 150,
      "importe": 77917.5,
      "id_concepto": 4,
      "descripcion1": "SUMINISTRO Y COLOCACION DE BARRERAS DE PROTECCION (OD-4) QUE CUMPLAN CON EL NIVEL DE SEGURIDAD 4 O SUPERIOR DEL REPORTE NCHRP-350 Y LA NORMA NOM-037-SCT2-2012, FORMAN CON VIGAS ACANALADAS DE ACERO GALVANIZADO DE TRES CRESTAS POR INMERSION EN CALIENTE CON ACCESORIOS ( MENSULAS CON REFLEJANTE ALTA INTENSIDAD Y TUERCAS Y/O SISTEMA DE SOLDADURA ANTIVANDALISMO) INCLUYE TERMINALES (OD/4.4.2/S), P.U.O.T.",
      "subconcepto": false,
      "codigo": "D",
      "descripcion": "SEÑALAMIENTO"
   }
]
            }
        },
        computed:{
            data(){
                console.log(this.data)
                return this.data
            },
            data2(){

            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>