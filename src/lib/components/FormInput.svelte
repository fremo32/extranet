<script lang="ts">
	export let type: 'text' | 'password' = 'text';
	export let label: string = '';
	export let name: string;
	export let value: string | null | undefined;
	export let required: boolean = false;
	export let hidden: boolean = false;
	const inputProps = { type, name, required };

	$: id = name + 'Input';
</script>

{#if hidden}
	<input type="hidden" {name} {value} />
{:else}
	<div class="mb-3">
		<label for={id} class="form-label"
			>{label}{#if required}<span class="text-danger required-asterisk">*</span>{/if}</label
		>
		<input class="form-control" {...inputProps} {id} bind:value on:input on:change />
	</div>
{/if}

<style>
	.required-asterisk {
		margin-left: 0.25rem;
	}
</style>
