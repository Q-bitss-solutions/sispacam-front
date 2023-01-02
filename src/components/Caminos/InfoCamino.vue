<template>
	<div class="row">
		<div class="row col-md-9">
			<div class="col-md-6">Tipo de Camino</div>
			<div class="col-md-6">{{ camino.tipo_camino }}</div>
		</div>
		<div class="row col-md-9">
			<div class="col-md-6">Estado</div>
			<div class="col-md-6">{{ camino.datos_geograficos.nombre_estado }}</div>
		</div>
		<div class="row col-md-9">
			<div class="col-md-6">Municipio</div>
			<div class="col-md-6">{{ camino.datos_geograficos.nombre_municipio }}</div>
		</div>
		<div class="row col-md-9">
			<div class="col-md-6">Localidades</div>
			<div class="col-md-6">{{ camino.datos_geograficos.nombre_localidades }}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "InfoCamino",
	props: {
		camino: Object
	}

}
</script>