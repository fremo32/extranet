<script lang="ts">
	export let show: boolean = false;
	export let backdrop: boolean = true;
	export let title: string;
	export let width: string = '400px';
	export let dismissible: boolean = false;

	let body: HTMLDivElement;

	function scrollToTop() {
		body.scroll({ top: 0, behavior: 'auto' });
	}

	$: if (show) {
		scrollToTop();
	}
</script>

{#if show && backdrop}
	<div class="offcanvas-backdrop fade show"></div>
{/if}
<div class="offcanvas offcanvas-end px-3 pt-2" class:show tabindex="-1" style="width: {width};">
	<div class="offcanvas-header border-bottom">
		<h5>{title}</h5>
		{#if dismissible}
			<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
		{/if}
	</div>
	<div class="offcanvas-body" bind:this={body}>
		<slot></slot>
	</div>
</div>
