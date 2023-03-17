<template>
	<div>
		<div class="row">
			<div class="col-md-12">
				<div style="height: 500px; overflow-y: scroll">
					<ejs-grid ref="grid" :dataSource="tablaResidentes" gridLines="Both" :allowPaging="false" :allowSorting="true"
						:pageSettings="tableConfig.pageSettings" :allowTextWrap="true" >
						<e-columns>
							<e-column v-for="(column, key) in tableConfig.columns" :key="key" :field="column.field"
								:headerText="column.headerText" />
							<!-- <e-column field="clave" :template="editTemplate" headerText="Ver/Editar Obra" textAlign="Center" :visible="flagEdicion" /> -->
							<!-- <e-column field="clave" :template="cancelTemplate" headerText="Cancelar/Reactivar Obra" textAlign="Center" :visible="isNormativeRole" /> -->
						</e-columns>
					</ejs-grid>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PlaceholderComponent from '../PlaceholderComponent.vue'
import { getListaResidentes } from '../../api/residentes';
export default {
	components: { PlaceholderComponent },
	name: "TablaResidentes",
	data() {
		return {
			residentes: [],
			tableConfig: {
				columns: [
					{
						field: "nombre",
						headerText: "Nombre Completo",
					},
					{
						field: "centro_sict",
						headerText: "Centro SICT",
					},
					{
						field: "correo",
						headerText: "Correo",
					},
					{
						field: "no_ext",
						headerText: "No. Extensión",
					},
				],
				pageSettings: {
					pageCount: 5,
					pageSize: 20,
				},
			}
		}

	},
	async created() {
		try {
			this.residentes = await getListaResidentes()
			console.log(this.residentes);
		} catch (error) {
			console.log(error);
		}
	},
	computed: {
		tablaResidentes() {
			var newResidentes = this.residentes.map(r => ({
				nombre: `${r.a_paterno} ${r.a_materno} ${r.nombre}`,
				centro_sict: r.centro_sict,
				correo: r.correo,
				no_ext: r.no_extension
			}))
			return newResidentes
		},
	},





}
</script>

<style></style>