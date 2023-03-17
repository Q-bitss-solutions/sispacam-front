<template>
	<div :style="height" class="placeholder-component">
		<h3>{{title}}</h3>
		<p>{{description}}</p>
	</div>
</template>

<script>
export default {
	name: "PlaceholderComponent",
	props: {
		title: String,
		height: String,
		description:String,
	}

}
</script>

<style>
.placeholder-component{
	background-color: beige;
	margin: auto;
	text-align: center;
	vertical-align: middle;
}

</style>