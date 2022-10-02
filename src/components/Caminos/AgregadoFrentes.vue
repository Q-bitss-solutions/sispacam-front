<template>
	<table class="table">
		<tbody>
			<tr>
				<td>
					<h5>Total de localidades:</h5>
				</td>
				<td>{{total_localidades}}</td>
			</tr>
			<tr>
				<td>
					<h5>Población total de Municipios:</h5>
				</td>
				<td>{{poblacion_municipios}}</td>
			</tr>
			<tr>
				<td>
					<h5>Población total de Localidades:</h5>
				</td>
				<td>{{poblacion_localidades}}</td>
			</tr>
			<tr>
				<td>
					<h5>Población Beneficiada:</h5>
				</td>
				<td>{{poblacion_beneficiada}}</td>
			</tr>
		</tbody>
	</table>

</template>

<script>
import { numeric } from 'vuelidate/lib/validators';

export default {
	name: 'AgregadoFuentes',
	// data: function () {
	// 	return {
	// 		total_localidades: 26,
	// 		poblacion_municipios: 5942,
	// 		poblacion_localidades: 270,
	// 		poblacion_beneficiada: 2390
	// 	}
	// },
	props: {
		total_localidades: Number,
		poblacion_municipios: Number,
		poblacion_localidades: Number,
		poblacion_beneficiada: Number
	}
}
</script>