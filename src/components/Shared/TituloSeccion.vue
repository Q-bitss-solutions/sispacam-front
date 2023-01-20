<template>
	<div class="mt-2">
		<div class="col-md-12">
			<h2>{{ title }}</h2>
			<hr class="red">
		</div>
	</div>

</template>

<script>
export default {
	name: "TituloSeccion",
	props: {
		title: String
	}
}
</script>