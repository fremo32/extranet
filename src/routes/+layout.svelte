<script lang="ts">
	import MainNav from '$lib/components/MainNav.svelte';
</script>

<main class="d-flex flex-nowrap" id="wrapper">
	<!-- Sidebar-->
	<div id="sidebar-wrapper" class="sidebar border-end p-0 m-0">
		<MainNav></MainNav>
	</div>
	<div id="content-wrapper" class="content container-fluid p-0 m-0">
		<slot></slot>
	</div>
</main>

<style>
	main {
		height: 100vh;
		/*height: -webkit-fill-available;*/
		max-height: 100vh;
		overflow-x: auto;
		overflow-y: hidden;
		padding: 0;
		margin: 0;
	}

	.content {
		background-color: var(--bs-tertiary-bg);
		overflow-y: auto;
	}
</style>
