<script lang="ts">
	export let label: string = '';
	export let name: string;
	export let value;
	export let required: boolean = false;
	export let rows: number = 3;

	$: id = name + 'TextArea';
</script>

<div class="mb-3">
	<label for={id} class="form-label"
		>{label}{#if required}<span class="text-danger required-asterisk">*</span>{/if}</label
	>
	<textarea class="form-control" {id} {name} {value} {required} {rows} />
</div>

<style>
	.required-asterisk {
		margin-left: 0.25rem;
	}
</style>
