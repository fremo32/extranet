<script lang="ts">
	import ContentHeaderNavbar from '$lib/components/ContentHeaderNavbar.svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import type { InsertModelManufacturerParams } from '$lib/server/db/schema';
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

	export let data: PageData;
	export let form;

	let modelManufacturer: InsertModelManufacturerParams | undefined;
	let showOffcanvas: boolean = false;

	$: editModelManufacturer = !!modelManufacturer?.id;
	$: ({ modelManufacturers } = data);
	$: if (!showOffcanvas) {
		modelManufacturer = undefined;
	}
	$: if (form?.success) {
		showOffcanvas = false;
	}
</script>

<ContentHeaderNavbar title="Modellbahnhersteller" category="Verzeichnis">
	<Button
		color="dark"
		title="Hinzufügen"
		icon="plus"
		wide
		on:click={() => (showOffcanvas = true)}
	/>
</ContentHeaderNavbar>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<OffcanvasRight
	title="Modellbahnhersteller {editModelManufacturer ? 'bearbeiten' : 'hinzufügen'}"
	width="400px"
	show={showOffcanvas}
>
	<form
		method="post"
		action={editModelManufacturer ? '?/updateModelManufacturer' : '?/addModelManufacturer'}
		use:enhance
	>
		<FormInput hidden name="id" value={modelManufacturer?.id ?? undefined} />
		<FormInput name="name" label="Name" required value={modelManufacturer?.name ?? ''} />
		<div class="d-grid gap-2 d-flex justify-content-end">
			<Button title="Abbrechen" color="dark" outline on:click={() => (showOffcanvas = false)} />
			<Button
				type="submit"
				title={editModelManufacturer ? 'Speichern' : 'Hinzufügen'}
				color="dark"
			/>
		</div>
	</form>
</OffcanvasRight>

<DataTable>
	<svelte:fragment slot="header">
		<DataTableHeader>Name</DataTableHeader>
		<DataTableHeader align="right">Aktionen</DataTableHeader>
	</svelte:fragment>
	{#each modelManufacturers as row}
		<DataTableRow>
			<DataTableCell>{row.name}</DataTableCell>
			<DataTableCell
				><div class="d-grid gap-2 d-flex justify-content-end">
					<ButtonGroup>
						<Button
							icon="pencil"
							color="warning"
							small
							on:click={() => {
								showOffcanvas = true;
								modelManufacturer = {
									id: row.id,
									name: row.name
								};
							}}
						/>
						<DropdownButton group title="Aktionen">
							<DropdownButtonMenuItem title="Löschen" icon="trash" />
						</DropdownButton>
					</ButtonGroup>
				</div>
			</DataTableCell>
		</DataTableRow>
	{/each}
</DataTable>
