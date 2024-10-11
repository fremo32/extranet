<script lang="ts">
	export let link: string;
	export let active = false;
	let className = '';
	export { className as class };
</script>

<li class="nav-item {className}">
	<a class="nav-link px-2" class:active href={link}><slot /></a>
</li>

<style>
	.nav-link {
		font-size: 0.875rem;
		color: var(--bs-secondary-color);
		text-transform: uppercase;
	}
</style>
