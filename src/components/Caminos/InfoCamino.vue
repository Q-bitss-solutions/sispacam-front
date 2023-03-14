<template>
	<div class="row">
		<div class="row col-md-9">
			<div class="col-md-6">Tipo de Camino</div>
			<div class="col-md-6">{{ datosCamino.tipo_camino}}</div>
		</div>
		<div class="row col-md-9">
			<div class="col-md-6">Estado</div>
			<div class="col-md-6">{{ datosCamino.nombre_estado }}</div>
		</div>
		<div class="row col-md-9">
			<div class="col-md-6">Municipio</div>
			<div class="col-md-6">{{ datosCamino.nombre_mun }}</div>
		</div>
		<div class="row col-md-9">
			<div class="col-md-6">Localidades</div>
			<div class="col-md-6">{{ localidades }}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "InfoCamino",
	props: {
		datosCamino: {
			type:Object,
			default:{
				tipo_camino:'',
				nombre_estado:'',
				nombre_mun:'',
				nombres_localidades:''
			}
		}
	},
	computed:{
		localidades(){
			if (this.datosCamino.nombres_localidades){
				return this.datosCamino.nombres_localidades.join(",")
			}else{
				return ""
			}
		}
	}

}
</script>