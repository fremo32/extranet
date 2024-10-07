<script lang="ts">
	import ContentHeaderNavbar from '$lib/components/ContentHeaderNavbar.svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import type { InsertUserParams } from '$lib/server/db/schema';
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

	let user: InsertUserParams | undefined;
	let showOffcanvas: boolean = false;

	$: editUser = !!user?.id;
	$: ({ users } = data);
	$: if (!showOffcanvas) {
		user = undefined;
	}
	$: if (form?.success) {
		showOffcanvas = false;
	}
</script>

<ContentHeaderNavbar title="Mitglieder" category="Verzeichnis">
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
	title="Mitglied {editUser ? 'bearbeiten' : 'hinzufügen'}"
	width="500px"
	show={showOffcanvas}
>
	<form method="post" action={editUser ? '?/updateUser' : '?/addUser'} use:enhance>
		<FormInput hidden name="id" value={user?.id ?? undefined} />
		<FormInput name="username" label="FREMO Benutzername" required value={user?.username ?? ''} />
		<FormInput name="firstName" label="Vorname" value={user?.firstName ?? ''} />
		<FormInput name="lastName" label="Nachname" value={user?.lastName ?? ''} />
		<FormInput name="memberId" label="FREMO Mitgliedsnummer" value={user?.memberId ?? ''} />
		<div class="d-grid gap-2 d-flex justify-content-end">
			<Button title="Abbrechen" color="dark" outline on:click={() => (showOffcanvas = false)} />
			<Button type="submit" title={editUser ? 'Speichern' : 'Hinzufügen'} color="dark" />
		</div>
	</form>
</OffcanvasRight>

<DataTable>
	<svelte:fragment slot="header">
		<DataTableHeader>FREMO Benutzername</DataTableHeader>
		<DataTableHeader>Vorname</DataTableHeader>
		<DataTableHeader>Nachname</DataTableHeader>
		<DataTableHeader>FREMO Mitgliedsnr.</DataTableHeader>
		<DataTableHeader align="right">Aktionen</DataTableHeader>
	</svelte:fragment>
	{#each users as row}
		<DataTableRow>
			<DataTableCell>{row.username}</DataTableCell>
			<DataTableCell>{row.firstName}</DataTableCell>
			<DataTableCell>{row.lastName}</DataTableCell>
			<DataTableCell>{row.memberId}</DataTableCell>
			<DataTableCell
				><div class="d-grid gap-2 d-flex justify-content-end">
					<ButtonGroup>
						<Button
							icon="pencil"
							color="warning"
							small
							on:click={() => {
								showOffcanvas = true;
								user = {
									id: row.id,
									username: row.username,
									firstName: row.firstName,
									lastName: row.lastName,
									memberId: row.memberId
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
