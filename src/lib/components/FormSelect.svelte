<script lang="ts" context="module">
	export type FormSelectOption = { value: any; text: string };
</script>

<script lang="ts">
	export let label: string = '';
	export let name: string;
	export let value: string | null | undefined;
	export let required: boolean = false;
	export let options: FormSelectOption[];

	$: id = name + 'Select';
</script>

<div class="mb-3">
	<label for={id} class="form-label"
		>{label}{#if required}<span class="text-danger required-asterisk">*</span>{/if}</label
	>
	<select class="form-select" {id} {name} bind:value {required} on:input on:change>
		{#each options as option}
			<option value={option.value}>{option.text}</option>
		{/each}
	</select>
</div>

<style>
	.required-asterisk {
		margin-left: 0.25rem;
	}
</style>
