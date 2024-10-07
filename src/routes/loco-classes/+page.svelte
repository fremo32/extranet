<script lang="ts">
	import ContentHeaderNavbar from '$lib/components/ContentHeaderNavbar.svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import type { InsertLocoClassParams } from '$lib/server/db/schema';
	import Button from '$lib/components/Button.svelte';
	import OffcanvasRight from '$lib/components/OffcanvasRight.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import FormSelect from '$lib/components/FormSelect.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import DataTableHeader from '$lib/components/DataTableHeader.svelte';
	import DataTableRow from '$lib/components/DataTableRow.svelte';
	import DataTableCell from '$lib/components/DataTableCell.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';
	import DropdownButton from '$lib/components/DropdownButton.svelte';
	import DropdownButtonMenuItem from '$lib/components/DropdownButtonMenuItem.svelte';

	export let data: PageData;
	export let form;

	let locoClass: InsertLocoClassParams | undefined;
	let showOffcanvas: boolean = false;

	$: editLocoClass = !!locoClass?.id;
	$: ({ locoClasses } = data);
	$: if (!showOffcanvas) {
		locoClass = undefined;
	}
	$: if (form?.success) {
		showOffcanvas = false;
	}
	$: locoTypeOptions = data.locoTypes.map((locoType) => ({
		value: locoType.id,
		text: locoType.name
	}));
	$: railwayCompanyOptions = data.railwayCompanies.map((railwayCompany) => ({
		value: railwayCompany.id,
		text: railwayCompany.name
	}));
</script>

<ContentHeaderNavbar title="Baureihen" category="Verzeichnis">
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
	title="Baureihe {editLocoClass ? 'bearbeiten' : 'hinzufügen'}"
	width="500px"
	show={showOffcanvas}
>
	<form method="post" action={editLocoClass ? '?/updateLocoClass' : '?/addLocoClass'} use:enhance>
		<FormInput hidden name="id" value={locoClass?.id ?? undefined} />
		<FormSelect
			name="railwayCompanyId"
			label="Eisenbahngesellschaft"
			required
			value={locoClass?.railwayCompanyId ?? null}
			options={railwayCompanyOptions}
		/>
		<FormInput name="name" label="Baureihe" required value={locoClass?.name ?? ''} />
		<FormInput name="genre" label="Länderbahn Gattung" value={locoClass?.genre ?? ''} />
		<FormSelect
			name="locoTypeId"
			label="Betriebsgattung"
			required
			value={locoClass?.locoTypeId ?? null}
			options={locoTypeOptions}
		/>
		<div class="d-grid gap-2 d-flex justify-content-end">
			<Button title="Abbrechen" color="dark" outline on:click={() => (showOffcanvas = false)} />
			<Button type="submit" title={editLocoClass ? 'Speichern' : 'Hinzufügen'} color="dark" />
		</div>
	</form>
</OffcanvasRight>

<DataTable>
	<svelte:fragment slot="header">
		<DataTableHeader width="1%">Eisenbg.</DataTableHeader>
		<DataTableHeader>Baureihe</DataTableHeader>
		<DataTableHeader>Länderbahn Gattung</DataTableHeader>
		<DataTableHeader>Betriebsgattung</DataTableHeader>
		<DataTableHeader align="right">Aktionen</DataTableHeader>
	</svelte:fragment>
	{#each locoClasses as row}
		<DataTableRow>
			<DataTableCell
				><Badge
					color={row.railwayCompanyBadgeColor}
					title={row.railwayCompanyName}
				/></DataTableCell
			>
			<DataTableCell>{row.name}</DataTableCell>
			<DataTableCell><Badge color="secondary" title={row.genre} /></DataTableCell>
			<DataTableCell>{row.locoTypeName}</DataTableCell>
			<DataTableCell
				><div class="d-grid gap-2 d-flex justify-content-end">
					<ButtonGroup>
						<Button
							icon="pencil"
							color="warning"
							small
							on:click={() => {
								showOffcanvas = true;
								locoClass = {
									id: row.id,
									railwayCompanyId: row.railwayCompanyId,
									name: row.name,
									genre: row.genre,
									locoTypeId: row.locoTypeId
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
