<script lang="ts">
	export let width: string | undefined = undefined;
	export let align: 'left' | 'right' | 'center' | undefined = undefined;

	$: style =
		(width !== undefined ? 'width: ' + width + '; ' : '') +
		(align !== undefined ? 'text-align: ' + align + '; ' : '');
</script>

<th scope="col" {style}><slot /></th>

<style>
	th {
		font-weight: 600;
		font-size: 0.875em;
		color: var(--bs-secondary-color);
		padding: 0.5rem 1.5rem;
		text-transform: uppercase;
	}
</style>
