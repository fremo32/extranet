<script lang="ts">
	export let label: string = '';
	export let name: string;
	export let value;
	export let required: boolean = false;

	let badgeColors = [
		'primary',
		'secondary',
		'success',
		'danger',
		'warning',
		'info',
		'light',
		'dark'
	];

	$: id = name + 'Select';
</script>

<div class="mb-3">
	<label for={id} class="form-label"
		>{label}{#if required}<span class="text-danger required-asterisk">*</span>{/if}</label
	>
	<select class="form-select" {id} {name} {value} {required}>
		{#each badgeColors as option}
			<option value={option}>{option}</option>
		{/each}
	</select>
</div>

<style>
	.required-asterisk {
		margin-left: 0.25rem;
	}
</style>
