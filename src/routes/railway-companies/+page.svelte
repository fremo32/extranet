<script lang="ts">
	import ContentHeaderNavbar from '$lib/components/ContentHeaderNavbar.svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import type { InsertRailwayCompanyParams } from '$lib/server/db/schema';
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
	import Badge from '$lib/components/Badge.svelte';
	import BadgeColorFormSelect from '$lib/components/BadgeColorFormSelect.svelte';

	export let data: PageData;
	export let form;

	let railwayCompany: InsertRailwayCompanyParams | undefined;
	let showOffcanvas: boolean = false;

	$: editRailwayCompany = !!railwayCompany?.id;
	$: ({ railwayCompanies } = data);
	$: if (!showOffcanvas) {
		railwayCompany = undefined;
	}
	$: if (form?.success) {
		showOffcanvas = false;
	}
</script>

<ContentHeaderNavbar title="Eisenbahngesellschaften" category="Verzeichnis">
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
	title="Eisenbahngesellschaft {editRailwayCompany ? 'bearbeiten' : 'hinzufügen'}"
	width="500px"
	show={showOffcanvas}
>
	<form
		method="post"
		action={editRailwayCompany ? '?/updateRailwayCompany' : '?/addRailwayCompany'}
		use:enhance
	>
		<FormInput hidden name="id" value={railwayCompany?.id ?? undefined} />
		<FormInput name="name" label="Name" required value={railwayCompany?.name ?? ''} />
		<FormInput name="description" label="Beschreibung" value={railwayCompany?.description ?? ''} />
		<!-- <FormInput name="badgeColor" label="Farbe" required value={railwayCompany?.badgeColor ?? ''} /> -->
		<BadgeColorFormSelect
			name="badgeColor"
			label="Farbe"
			value={railwayCompany?.badgeColor ?? ''}
			required
		/>
		<div class="d-grid gap-2 d-flex justify-content-end">
			<Button title="Abbrechen" color="dark" outline on:click={() => (showOffcanvas = false)} />
			<Button type="submit" title={editRailwayCompany ? 'Speichern' : 'Hinzufügen'} color="dark" />
		</div>
	</form>
</OffcanvasRight>

<DataTable>
	<svelte:fragment slot="header">
		<DataTableHeader>Name</DataTableHeader>
		<DataTableHeader>Beschreibung</DataTableHeader>
		<DataTableHeader align="right">Aktionen</DataTableHeader>
	</svelte:fragment>
	{#each railwayCompanies as row}
		<DataTableRow>
			<DataTableCell><Badge color={row.badgeColor} title={row.name} /></DataTableCell>
			<DataTableCell>{row.description}</DataTableCell>
			<DataTableCell
				><div class="d-grid gap-2 d-flex justify-content-end">
					<ButtonGroup>
						<Button
							icon="pencil"
							color="warning"
							small
							on:click={() => {
								showOffcanvas = true;
								railwayCompany = {
									id: row.id,
									name: row.name,
									description: row.description,
									badgeColor: row.badgeColor
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
