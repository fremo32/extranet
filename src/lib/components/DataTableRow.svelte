<script lang="ts">
	export let clickable = false;
</script>

<tr class:clickable on:click>
	<slot />
</tr>

<style>
	.clickable {
		cursor: pointer;
	}
</style>
