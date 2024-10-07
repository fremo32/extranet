<script lang="ts">
	export let label: string | null | undefined = undefined;
	export let name: string;
	export let value: any = undefined;
	export let checked: boolean = false;
	export let inline: boolean = false;

	$: id = name + 'Check';
</script>

<div class="form-check" class:form-check-inline={inline}>
	<input class="form-check-input" type="checkbox" {name} {value} {id} {checked} on:click />
	{#if label !== '' && label !== null && label !== undefined}
		<label class="form-check-label" for={id}>
			{label}
		</label>
	{/if}
</div>
