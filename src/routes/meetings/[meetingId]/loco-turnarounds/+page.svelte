<script lang="ts">
	import ContentHeaderNavbar from '$lib/components/ContentHeaderNavbar.svelte';
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

	export let data;
	export let form;

	let showForm: boolean = false;

	let formId: string | null = null;
	let formName: string | null = null;
	let formLocoClasses: string | null = null;
	let formStartPosition: string | null = null;
	let formTrainNumber: string | null = null;

	function resetForm() {
		formId = null;
		formName = null;
		formLocoClasses = null;
		formStartPosition = null;
		formTrainNumber = null;
	}

	function onEditLocoTurnaround(id: string) {
		let locoTurnaround = meetingLocoTurnarounds.find((r) => r.id == id);
		if (locoTurnaround == undefined) return;

		formId = locoTurnaround.id;
		formName = locoTurnaround.name;
		formLocoClasses = locoTurnaround.locoClasses;
		formStartPosition = locoTurnaround.startPosition;
		formTrainNumber = locoTurnaround.trainNumber;

		showForm = true;
	}

	function onDeleteLocoTurnaround(id: string) {}

	$: ({ meeting, meetingLocoTurnarounds, meetingLocoRegistrations } = data);

	$: formModeEdit = formId !== null;

	$: if (!showForm) {
		resetForm();
	}
	$: if (form?.success) {
		showForm = false;
	}
</script>

<LocoDetailsLayout
	meetingId={meeting.id}
	meetingTitle={meeting.title}
	meetingLocoTurnaroundsLength={meetingLocoTurnarounds.length}
	meetingLocoRegistrationsLength={meetingLocoRegistrations.length}
>
	<svelte:fragment slot="headerButtons">
		<Button color="dark" title="Hinzufügen" icon="plus" wide on:click={() => (showForm = true)} />
	</svelte:fragment>

	<DataTable>
		<svelte:fragment slot="header">
			<DataTableHeader width="1%">Umlauf</DataTableHeader>
			<DataTableHeader width="15%">Baureihe</DataTableHeader>
			<DataTableHeader width="15%">Startaufstellung</DataTableHeader>
			<DataTableHeader>Zug</DataTableHeader>
			<DataTableHeader align="right">Aktionen</DataTableHeader>
		</svelte:fragment>
		{#each meetingLocoTurnarounds as row}
			<DataTableRow>
				<DataTableCell>{row.name}</DataTableCell>
				<DataTableCell>{row.locoClasses ?? '-'}</DataTableCell>
				<DataTableCell>{row.startPosition ?? '-'}</DataTableCell>
				<DataTableCell>{row.trainNumber ?? '-'}</DataTableCell>
				<DataTableCell
					><div class="d-grid gap-2 d-flex justify-content-end">
						<ButtonGroup>
							<Button
								icon="pencil"
								color="warning"
								small
								on:click={() => onEditLocoTurnaround(row.id)}
							/>
							<DropdownButton group title="Aktionen">
								<DropdownButtonMenuItem
									title="Löschen"
									icon="trash"
									on:click={() => onDeleteLocoTurnaround(row.id)}
								/>
							</DropdownButton>
						</ButtonGroup>
					</div>
				</DataTableCell>
			</DataTableRow>
		{/each}
	</DataTable>
</LocoDetailsLayout>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<OffcanvasRight
	title="Lokumlauf {formModeEdit ? 'bearbeiten' : 'hinzufügen'}"
	width="500px"
	show={showForm}
>
	<form
		method="post"
		action={formModeEdit ? '?/updateLocoTurnaround' : '?/addLocoTurnaround'}
		use:enhance
	>
		<FormInput hidden name="id" value={formId} />
		<FormInput name="name" label="Name" required bind:value={formName} />
		<FormInput name="locoClasses" label="Baureihe" bind:value={formLocoClasses} />
		<FormInput name="startPosition" label="Startaufstellung" bind:value={formStartPosition} />
		<FormInput name="trainNumber" label="Zug" bind:value={formTrainNumber} />
		<div class="d-grid gap-2 d-flex justify-content-end">
			<Button title="Abbrechen" color="light" on:click={() => (showForm = false)} />
			<Button type="submit" title={formModeEdit ? 'Speichern' : 'Hinzufügen'} color="dark" />
		</div>
	</form>
</OffcanvasRight>
