<script lang="ts">
	export let category: string | undefined = undefined;
	export let title: string;
</script>

<nav class="navbar ex-content-header-navbar p-0 sticky-top">
	<div class="container-fluid p-4">
		<span class="navbar-brand">
			{#if category}
				<span class="text-muted">{category}&nbsp;&nbsp;/&nbsp;&nbsp;</span>
			{/if}
			<span style="font-weight: 600;">{title}</span></span
		>
		<form class="d-grid gap-2 d-flex justify-content-end">
			<slot></slot>
		</form>
	</div>
</nav>

<style>
	.ex-content-header-navbar {
		background-color: inherit;
	}

	.ex-content-header-navbar .navbar-brand {
		font-size: 1.25em;
	}
</style>
