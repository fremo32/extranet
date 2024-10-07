<script lang="ts">
	export let title: string;
	export let icon: string | undefined | null = undefined;
</script>

<li>
	<a class="dropdown-item" href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal">
		{#if icon !== null && icon !== undefined}<i class="bi bi-{icon}"></i>{/if}
		{title}</a
	>
</li>
