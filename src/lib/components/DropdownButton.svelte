<script lang="ts">
	export let title: string | null | undefined = undefined;
	export let group: boolean = false;
</script>

{#if group}
	<button
		type="button"
		class="btn btn-sm btn-warning dropdown-toggle dropdown-toggle-split"
		data-bs-toggle="dropdown"
		aria-expanded="false"
	>
		<span class="visually-hidden">Toggle Dropdown</span>
	</button>
	<ul class="dropdown-menu">
		<slot />
	</ul>
{:else}
	<div class="dropdown">
		<button
			type="button"
			class="btn btn-sm btn-warning dropdown-toggle dropdown-toggle-split"
			data-bs-toggle="dropdown"
			aria-expanded="false"
		>
			{#if title === undefined || title === null}
				<span class="visually-hidden">Toggle Dropdown</span>
			{:else}
				{title}
			{/if}
		</button>
		<ul class="dropdown-menu">
			<slot />
		</ul>
	</div>
{/if}
