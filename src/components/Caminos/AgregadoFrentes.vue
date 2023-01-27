<template>
	<table class="table">
		<tbody>
			<tr>
				<td>
					<h5>Total de localidades:</h5>
				</td>
				<td>{{metrics.total_localidades}}</td>
			</tr>
			<tr>
				<td>
					<h5>Población total de Municipios:</h5>
				</td>
				<td>{{metrics.poblacion_municipios}}</td>
			</tr>
			<tr>
				<td>
					<h5>Población total de Localidades:</h5>
				</td>
				<td>{{metrics.poblacion_localidades}}</td>
			</tr>
			<tr>
				<td>
					<h5>Población Beneficiada:</h5>
				</td>
				<td>{{metrics.poblacion_beneficiada}}</td>
			</tr>
		</tbody>
	</table>

</template>

<script>

export default {
	name: 'AgregadoFrentes',
	props: {
		metrics:Object
	}
}
</script>