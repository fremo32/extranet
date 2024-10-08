<script lang="ts">
	import Modal from './Modal.svelte';
	import ModalBody from './ModalBody.svelte';
	import ModalFooter from './ModalFooter.svelte';
	import Button from './Button.svelte';

	export let show = false;
	export let title: string;
	export let closeButtonTitle = 'Verstanden';

	let modal: HTMLDialogElement;
</script>

<Modal bind:show bind:dialog={modal} {title}>
	<ModalBody>
		<slot />
	</ModalBody>
	<ModalFooter>
		<Button title={closeButtonTitle} color="dark" on:click={() => modal.close()} />
	</ModalFooter>
</Modal>
