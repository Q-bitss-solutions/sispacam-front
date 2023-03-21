<template>
	<div>
		<div class="row">
			<div class="col-md-12">
				<label for="tramo">*Convenio:</label>
				<select name="convenios" id="convenio_dropdown" class="form-control" v-model="form.id_convenio">
					<option value="" disabled>Seleccionar...</option>
					<option v-for="(convenio, index) in convenios" :key="index" :value="convenio.id">
						{{ convenio.anio }}
					</option>
				</select>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<label for="tramo">*Residente a Asignar:</label>
				<select name="residentes" id="residente_dropdown" class="form-control" v-model="form.id_residente">
					<option value="" disabled>Seleccionar...</option>
					<option v-for="(residente, index) in residentes" :key="index" :value="residente.id">
						{{ residente.nombre }} {{ residente.a_paterno }} {{ residente.a_materno }} | {{ residente.centro_sict }}
					</option>
				</select>
			</div>
		</div>

		<div class="row">
			<div class="col-md-6">
				<label for="tramo">*Fecha de Inicio:</label>
				<div class="col-md_12">
					<input class="form-control" type="date" name="f-oficio" id="f-oficio" v-model="form.fecha_inicio" />
				</div>
			</div>
			<div class="col-md-6">
				<label for="tramo">Fecha de Fin:</label>
				<div class="col-md_12">
					<input class="form-control" type="date" name="f-oficio" id="f-oficio" v-model="form.fecha_fin" />
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-4 float-right">
				<button class="btn btn-danger" @click="closeModal">Cerrar</button>
				<button v-if="ValidForm" class="btn btn-primary active" @click="postResidente">
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
import { getDropdownResidentes, agregaAsignacionAConvenio } from '@/api/residentes';
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
			form: {
				id_convenio: null,
				id_residente: null,
				fecha_inicio: null,
				fecha_fin: null,
			}

		}
	},
	computed: {
		ValidForm() {
			if (this.form.id_convenio &&
				this.form.id_residente &&
				this.form.fecha_inicio
			) {
				return true
			} else {
				return false
			}
		},

		payload() {
			let p = {
				'id_residente': this.form.id_residente,
				'fecha_inicio': this.form.fecha_inicio,
			}
			if (this.form.fecha_fin) {
				p.fecha_fin = this.form.fecha_fin
			}
			return p
		}
	},

	methods: {

		closeModal() {
			this.$emit("closeModal");
		},

		async postResidente() {
			try {
				const response = await agregaAsignacionAConvenio(this.form.id_convenio, this.payload)
				this.closeModal()
				this.$swal("", "La asignación se creó con éxito", 'success')
			} catch (err) {
				this.closeModal()
				this.$swal('ERROR', JSON.stringify(err), "warning")
			}
		}
	},

	async created() {


		try {
			this.residentes = await getDropdownResidentes()
			this.convenios = await getConveniosGet(this.id_camino)
		} catch (error) {
			console.log(error);
		}
	},







}
</script>

<style></style>