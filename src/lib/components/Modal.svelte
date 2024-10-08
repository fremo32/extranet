<script lang="ts">
	export let show: boolean; // boolean
	export let title: string;
	export let closable = true;
	export let dialog: HTMLDialogElement; // HTMLDialogElement

	$: if (dialog && show) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close={() => (show = false)} on:click|self={() => dialog.close()}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="modal" tabindex="-1" style="display: block !important;">
		<div class="modal-dialog" on:click|stopPropagation>
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">{title}</h5>
					{#if closable}
						<button type="button" class="btn-close" on:click={() => dialog.close()}></button>
					{/if}
				</div>
				<slot />
				<!-- svelte-ignore a11y-autofocus -->
				<!-- <button autofocus on:click={() => dialog.close()}>close modal</button> -->
			</div>
		</div>
	</div>
</dialog>

<style>
	/*
	.modal-backdrop.show
opacity: var(--bs-backdrop-opacity);

.modal-backdrop
--bs-backdrop-zindex: 1050;
--bs-backdrop-bg: #000;
--bs-backdrop-opacity: 0.5;
position: fixed;
top: 0;
left: 0;
z-index: var(--bs-backdrop-zindex);
width: 100vw;
height: 100vh;	
background-color: var(--bs-backdrop-bg);*/

	dialog {
		/*max-width: 32em;*/
		border-radius: 0;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		/*background: rgba(0, 0, 0, 0.3);*/
		--bs-backdrop-zindex: 1050;
		--bs-backdrop-bg: #000;
		--bs-backdrop-opacity: 0.5;
		position: fixed;
		top: 0;
		left: 0;
		z-index: var(--bs-backdrop-zindex);
		width: 100vw;
		height: 100vh;
		background-color: var(--bs-backdrop-bg);
		opacity: var(--bs-backdrop-opacity);
	}
	/*dialog > div {
		padding: 1em;
	}*/
	/*button {
		display: block;
	}*/
</style>
