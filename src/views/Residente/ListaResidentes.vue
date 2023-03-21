<template>
	<div>
		<div class="row mt-4">
			<div class="col-md-6">
				<button class="btn btn-primary active" @click="modalAsignarResidente = true">
					Asignar Residente
				</button>
				<button class="btn btn-primary active" @click="modalEditarResidente = true">
					Editar Asignacion
				</button>
			</div>
		</div>

		<div class="row mt-4">
			<div class="col-md-12">
			</div>
			
		</div>



		<!-- MODALES -->
		<SCTModal v-if="modalAsignarResidente && camino_id">
			<h3 slot="header">Asignar Residente</h3>
			<div slot="body">
				<AsignarResidente :id_camino="camino_id"
					v-on:closeModal="modalAsignarResidente = false"></AsignarResidente>
			</div>
			<div slot="footer">
			</div>
		</SCTModal>

		<SCTModal v-if="modalEditarResidente && camino_id">
			<h3 slot="header">Editar Asignación</h3>
			<div slot="body">
				<EditarAsignacionResidente :id_camino="camino_id" v-on:closeModal="modalEditarResidente = false">
				</EditarAsignacionResidente>
			</div>
			<div slot="footer">
			</div>
		</SCTModal>


	</div>
</template>

<script>
import SCTModal from '@/components/Modals/SCTModal.vue';
import EditarAsignacionResidente from '@/components/Residentes/EditarAsignacionResidente.vue';
import AsignarResidente from '@/components/Residentes/AsignarResidente.vue';
export default {
	name:"ListaResidentes",
	props:{
		camino_id:Number
	},
	components:{
		SCTModal,
		EditarAsignacionResidente,
		AsignarResidente,
		
	},
	data(){
		return{
			modalAsignarResidente:false,
			modalEditarResidente:false
		}
	}


}
</script>

<style></style>