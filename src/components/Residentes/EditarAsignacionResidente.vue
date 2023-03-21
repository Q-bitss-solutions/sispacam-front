<template>
	<div>
		<div class="row">
			<div class="col-md-12">
				<label >Convenio:</label>
				<select name="convenios" id="convenio_dropdown" class="form-control" v-model="id_convenio_selected" @change="getResidentesAsignados(id_convenio_selected)">
					<option value="" disabled>Seleccionar...</option>
					<option v-for="(convenio, index) in convenios" :key="index" :value="convenio.id">
						{{ convenio.anio }}
					</option>
				</select>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12">
				<label >Residente:</label>
				<select name="residentes" id="residente_dropdown" class="form-control" v-model="selected_residente" @change="elegirResidente(selected_residente)">
					<option value="" disabled>Seleccionar...</option>
					<option v-for="(residente, index) in residentes" :key="index" :value="residente.id">
						{{ residente.id_residente.nombre }} {{ residente.id_residente.a_paterno }} {{ residente.id_residente.a_materno }} | {{ residente.id_residente.centro_sict }}
					</option>
				</select>
			</div>
		</div>


		<div class="row">
			<div class="col-md-6">
				<label >Fecha de Inicio:</label>
				<div class="col-md_12">
					<input class="form-control" type="date"  v-model="residente.fecha_inicio" :disabled="true" />
				</div>
			</div>
			<div class="col-md-6">
				<label >Fecha de Fin:</label>
				<div class="col-md_12">
					<input class="form-control" type="date"  v-model="residente.fecha_fin" />
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-1">
				<label >Activo:</label>
				<div class="col-md_12">
					<input class="form-control" type="checkbox"  v-model="residente.estatus" />
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-4 float-right">
				<button class="btn btn-danger" @click="closeModal">Cerrar</button>
				<button v-if="ValidForm" class="btn btn-primary active" @click="updateResidente">
					Aceptar
				</button>
				<button v-if="!ValidForm" class="btn btn-primary disabled">
					Aceptar
				</button>
			</div>
		</div>



	</div>
</template>

<script>
import PlaceholderComponent from '@/components/PlaceholderComponent.vue';
import { getDropdownResidentes, updateAsignacionById, getResidentesAsignadosByConvenio } from '@/api/residentes';
import { getConveniosGet } from '@/api/convenio';

export default {
	components: { PlaceholderComponent },
	name: "AsignarResidente",
	props: {
		id_camino: Number,
	},
	data() {
		return {
			residentes: [],
			convenios: [],
			id_convenio_selected: null,
			selected_residente: null,
			residente:{
				fecha_inicio:'',
				fecha_fin:'',
				estatus:''
			}


		}
	},
	computed: {
		ValidForm() {
			return (
				this.residente.fecha_fin &&
				this.residente.fecha_inicio
			) 
		},
		payload(){
			return this.residente
		}
	},

		methods: {

			closeModal() {
				this.$emit("closeModal");
			},

			async getResidentesAsignados(id_convenio){
				this.residentes = await getResidentesAsignadosByConvenio(id_convenio)
			},

			elegirResidente(id_residente){
				let res = this.residentes.find(e => e.id == id_residente)
				this.residente.fecha_inicio = res.fecha_inicio
				this.residente.fecha_fin = res.fecha_fin
				this.residente.estatus = res.estatus
			},


			async updateResidente() {

				try{
					const response = await updateAsignacionById(this.id_convenio_selected, this.selected_residente,  this.residente)
					this.$swal("","La asignación se editó con éxito", 'success')
					this.closeModal();
				}catch(err){
					this.$swal('ERROR',JSON.stringify(err), "error")
				}
			}
		},

		async created() {

			try {
				this.convenios = await getConveniosGet(this.id_camino)
			} catch (error) {
				console.log(error);
			}
		},







	}
</script>

<style></style>