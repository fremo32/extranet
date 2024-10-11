<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import DataTableHeader from '$lib/components/DataTableHeader.svelte';
	import DataTableRow from '$lib/components/DataTableRow.svelte';
	import DataTableCell from '$lib/components/DataTableCell.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';
	import DropdownButton from '$lib/components/DropdownButton.svelte';
	import DropdownButtonMenuItem from '$lib/components/DropdownButtonMenuItem.svelte';
	import LocoDetailsLayout from '$lib/components/LocoDetailsLayout.svelte';
	import OffcanvasRight from '$lib/components/OffcanvasRight.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import { enhance } from '$app/forms';
	import Time from 'svelte-time';
	import Modal from '$lib/components/Modal.svelte';
	import ModalBody from '$lib/components/ModalBody.svelte';
	import ModalFooter from '$lib/components/ModalFooter.svelte';

	export let data;

	let showModalDelete = false;
	let modalDelete: HTMLDialogElement;
	let modalDeleteFormId: string | null = null;
	let modalDeleteFormFullLocoName: string | null = null;

	$: ({ meeting, meetingLocoTurnarounds, meetingLocoRegistrations } = data);
	$: if (!showModalDelete) {
		resetModalDeleteForm();
	}

	function onDelete(id: string) {
		let locoReg = meetingLocoRegistrations.find((locoReg) => locoReg.id == id);
		if (locoReg == undefined) return;

		modalDeleteFormId = locoReg.id;
		modalDeleteFormFullLocoName =
			locoReg.locoSerial +
			' (Besitzer ' +
			locoReg.locoOwner +
			', DCC-Adresse ' +
			locoReg.locoDccAddress +
			')';

		showModalDelete = true;
	}

	function resetModalDeleteForm() {
		modalDeleteFormId = null;
		modalDeleteFormFullLocoName = null;
	}
</script>

<LocoDetailsLayout
	meetingId={meeting.id}
	meetingTitle={meeting.title}
	meetingLocoTurnaroundsLength={meetingLocoTurnarounds.length}
	meetingLocoRegistrationsLength={meetingLocoRegistrations.length}
>
	<DataTable>
		<svelte:fragment slot="header">
			<DataTableHeader width="5%">Loknummer</DataTableHeader>
			<DataTableHeader width="10%">DCC-Adresse</DataTableHeader>
			<DataTableHeader>Besitzer</DataTableHeader>
			<DataTableHeader>Hinweise</DataTableHeader>
			<DataTableHeader>Angemeldet am</DataTableHeader>
			<DataTableHeader align="right">Aktionen</DataTableHeader>
		</svelte:fragment>
		{#each meetingLocoRegistrations as row}
			<DataTableRow>
				<DataTableCell>{row.locoSerial}</DataTableCell>
				<DataTableCell>{row.locoDccAddress ?? '-'}</DataTableCell>
				<DataTableCell>{row.locoOwner ?? '-'}</DataTableCell>
				<DataTableCell>{row.notes ?? '-'}</DataTableCell>
				<DataTableCell><Time timestamp={row.createdAt} format="DD.MM.YYYY hh:mm" /></DataTableCell>
				<DataTableCell
					><div class="d-grid gap-2 d-flex justify-content-end">
						<Button icon="ban" color="danger" small on:click={() => onDelete(row.id)} />
					</div></DataTableCell
				>
			</DataTableRow>
		{/each}
		{#if meetingLocoRegistrations.length == 0}
			<DataTableRow>
				<DataTableCell colspan={6}>Es liegen bisher keine Fahrzeuganmeldungen vor</DataTableCell>
			</DataTableRow>
		{/if}
	</DataTable>
</LocoDetailsLayout>

<Modal bind:show={showModalDelete} bind:dialog={modalDelete} title="Fahrzeug abmelden">
	<form method="post" action="?/deleteLocoRegistration" use:enhance>
		<FormInput hidden name="id" value={modalDeleteFormId} />
		<ModalBody>
			<p>Möchtest du sicher das gemeldete Fahrzeug</p>
			<p class="fw-medium">{modalDeleteFormFullLocoName}</p>
			<p>vom Fahrplantreffen abmelden?</p>
		</ModalBody>
		<ModalFooter>
			<Button title="Abbrechen" color="light" on:click={() => modalDelete.close()} />
			<Button type="submit" title="Abmelden" color="danger" on:click={() => modalDelete.close()} />
		</ModalFooter>
	</form>
</Modal>
