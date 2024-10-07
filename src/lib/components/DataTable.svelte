<script lang="ts">
</script>

<table class="table table-hover">
	{#if $$slots.header}
		<thead>
			<tr>
				<slot name="header" />
			</tr>
		</thead>
	{/if}
	<tbody>
		<slot />
	</tbody>
</table>

<style>
	table {
		--bs-table-bg: var(--bs-tertiary-bg);
	}
</style>
