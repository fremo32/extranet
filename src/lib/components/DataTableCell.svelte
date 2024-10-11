<script lang="ts">
	export let colspan: number | undefined = undefined;
	export let wrap = false;
	export let overflow = false;
</script>

<td {colspan} class:wrap class:overflow><slot /></td>

<style>
	td {
		padding: 0.5rem 1.5rem;
		vertical-align: middle;
		white-space: nowrap;
	}
	.wrap {
		white-space: normal;
	}
	.overflow {
		text-overflow: ellipsis;
	}
</style>
