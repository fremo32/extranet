<script lang="ts">
	import ContentHeaderNavbar from '$lib/components/ContentHeaderNavbar.svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import OffcanvasRight from '$lib/components/OffcanvasRight.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import DataTableHeader from '$lib/components/DataTableHeader.svelte';
	import DataTableRow from '$lib/components/DataTableRow.svelte';
	import DataTableCell from '$lib/components/DataTableCell.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';
	import DropdownButton from '$lib/components/DropdownButton.svelte';
	import DropdownButtonMenuItem from '$lib/components/DropdownButtonMenuItem.svelte';
	import Time from 'svelte-time';
	import { goto } from '$app/navigation';
	import { rowId } from 'drizzle-orm/sqlite-core/expressions';

	export let data: PageData;
	export let form;

	let showForm: boolean = false;

	let formId: string | null = null;
	let formTitle: string | null = null;
	let formStartDate: string | null = null;
	let formEndDate: string | null = null;

	function resetForm() {
		formId = null;
		formTitle = null;
		formStartDate = null;
		formEndDate = null;
	}

	function onEditMeeting(id: string) {
		let meeting = meetings.find((meeting) => meeting.id == id);
		if (meeting == undefined) return;

		formId = meeting.id;
		formTitle = meeting.title;
		formStartDate = meeting.startDate.toISOString().slice(0, 10);
		formEndDate = meeting.endDate.toISOString().slice(0, 10);

		showForm = true;
	}

	function onCancelMeeting(id: string) {}

	$: formModeEdit = formId !== null;

	$: ({ meetings } = data);
	$: if (!showForm) {
		resetForm();
	}
	$: if (form?.success) {
		showForm = false;
	}
</script>

<ContentHeaderNavbar title="Fahrplantreffen" category="Bahndirektion">
	<Button color="dark" title="Hinzufügen" icon="plus" wide on:click={() => (showForm = true)} />
</ContentHeaderNavbar>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<OffcanvasRight
	title="Fahrplantreffen {formModeEdit ? 'bearbeiten' : 'hinzufügen'}"
	width="500px"
	show={showForm}
>
	<form method="post" action={formModeEdit ? '?/updateMeeting' : '?/addMeeting'} use:enhance>
		<FormInput hidden name="id" value={formId} />
		<FormInput name="startDate" label="Von" type="date" required bind:value={formStartDate} />
		<FormInput name="endDate" label="Bis" type="date" required bind:value={formEndDate} />
		<FormInput name="title" label="Bezeichnung" required bind:value={formTitle} />
		<div class="d-grid gap-2 d-flex justify-content-end">
			<Button title="Abbrechen" color="light" on:click={() => (showForm = false)} />
			<Button type="submit" title={formModeEdit ? 'Speichern' : 'Hinzufügen'} color="dark" />
		</div>
	</form>
</OffcanvasRight>

<DataTable>
	<svelte:fragment slot="header">
		<DataTableHeader width="1%">Von</DataTableHeader>
		<DataTableHeader width="1%">Bis</DataTableHeader>
		<DataTableHeader>Bezeichnung</DataTableHeader>
		<DataTableHeader align="right">Aktionen</DataTableHeader>
	</svelte:fragment>
	{#each meetings as row}
		<DataTableRow clickable on:click={() => goto('/meetings/' + row.id)}>
			<DataTableCell><Time timestamp={row.startDate} format="DD.MM.YYYY" /></DataTableCell>
			<DataTableCell><Time timestamp={row.endDate} format="DD.MM.YYYY" /></DataTableCell>
			<DataTableCell
				><a class="meeting-title" href="/meetings/{row.id}">{row.title}</a></DataTableCell
			>
			<DataTableCell
				><div class="d-grid gap-2 d-flex justify-content-end">
					<ButtonGroup>
						<Button icon="pencil" color="warning" small on:click={() => onEditMeeting(row.id)} />
						<DropdownButton group title="Aktionen">
							<DropdownButtonMenuItem
								title="Treffen absagen"
								icon="x-circle"
								on:click={() => onCancelMeeting(row.id)}
							/>
						</DropdownButton>
					</ButtonGroup>
				</div>
			</DataTableCell>
		</DataTableRow>
	{/each}
</DataTable>

<style>
	.meeting-title {
		color: inherit;
	}
</style>
