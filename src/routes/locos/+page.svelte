<script lang="ts">
	import ContentHeaderNavbar from '$lib/components/ContentHeaderNavbar.svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import OffcanvasRight from '$lib/components/OffcanvasRight.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import FormSelect from '$lib/components/FormSelect.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import DataTableHeader from '$lib/components/DataTableHeader.svelte';
	import DataTableRow from '$lib/components/DataTableRow.svelte';
	import DataTableCell from '$lib/components/DataTableCell.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';
	import DropdownButton from '$lib/components/DropdownButton.svelte';
	import DropdownButtonMenuItem from '$lib/components/DropdownButtonMenuItem.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import LocoEpochFormCheck from '$lib/components/LocoEpochFormCheck.svelte';
	import LocoEpochBadge from '$lib/components/LocoEpochBadge.svelte';
	import FormTextArea from '$lib/components/FormTextArea.svelte';
	import FormCheck from '$lib/components/FormCheck.svelte';
	import LocoDuplicateSerialFormAlert from '$lib/components/LocoDuplicateSerialFormAlert.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import ModalBody from '$lib/components/ModalBody.svelte';
	import ModalFooter from '$lib/components/ModalFooter.svelte';

	export let data: PageData;
	export let form;

	let showForm: boolean = false;

	let formId: string | null = null;
	let formRailwayCompanyId: string | null = null;
	let formLocoClassId: string | null = null;
	let formSerial: string | null = null;
	let formEpoch: string | null = null;
	let formRailwayGaugeId: string | null = null;
	let formNotes: string | null = null;
	let formModelManufacturerId: string | null = null;
	let formHasWeathering = false;
	let formHasFredi = false;
	let formHasCard = false;
	let formUserId: string | null = null;
	let formDccAddress: string | null = null;

	let isDuplicateSerial = false;

	let showModal = false;
	let modal: HTMLDialogElement;
	let modalFormId: string | null = null;
	let modalFormFullLocoName: string | null = null;

	function resetForm() {
		formId = null;
		formRailwayCompanyId = null;
		formLocoClassId = null;
		formSerial = null;
		formEpoch = null;
		formRailwayGaugeId = null;
		formNotes = null;
		formModelManufacturerId = null;
		formHasWeathering = false;
		formHasFredi = false;
		formHasCard = false;
		formUserId = null;
		formDccAddress = null;
	}

	function onEditLoco(id: string) {
		let loco = locos.find((loco) => loco.id == id);
		if (loco == undefined) return;

		formId = loco.id;
		formRailwayCompanyId = loco.railwayCompanyId;
		formLocoClassId = loco.locoClassId;
		formSerial = loco.serial;
		formEpoch = loco.epoch;
		formRailwayGaugeId = loco.railwayGaugeId;
		formNotes = loco.notes;
		formModelManufacturerId = loco.modelManufacturerId;
		formHasWeathering = loco.hasWeathering == '1' ? true : false;
		formHasFredi = loco.hasFredi == '1' ? true : false;
		formHasCard = loco.hasCard == '1' ? true : false;
		formUserId = loco.userId;
		formDccAddress = loco.dccAddress;

		showForm = true;
	}

	function resetModalForm() {
		modalFormId = null;
		modalFormFullLocoName = null;
	}

	function onDeleteLoco(id: string) {
		let loco = locos.find((loco) => loco.id == id);
		if (loco == undefined) return;

		modalFormId = loco.id;
		modalFormFullLocoName = loco.railwayCompanyName + ' ' + loco.serial;

		showModal = true;
	}

	function checkForDuplicateSerial(id: string | null) {
		if (formSerial == null || formSerial == '' || formRailwayCompanyId == null) {
			return false;
		}

		const result = data.locos.find(
			(l) => l.serial == formSerial && l.railwayCompanyId == formRailwayCompanyId
		);

		if (result !== undefined && result.id !== id) {
			return true;
		}
		return false;
	}

	$: formModeEdit = formId !== null;

	$: ({ locos } = data);
	$: if (!showForm) {
		resetForm();
	}
	$: if (form?.success) {
		showForm = false;
	}
	$: if (!showModal) {
		resetModalForm();
	}
	$: railwayCompanyOptions = data.railwayCompanies.map((railwayCompany) => ({
		value: railwayCompany.id,
		text: railwayCompany.name
	}));
	$: locoClassOptions = data.locoClasses.map((locoClass) => ({
		value: locoClass.id,
		text:
			locoClass.railwayCompanyName +
			' ' +
			locoClass.name +
			(locoClass.genre !== '' && locoClass.genre !== null && locoClass.genre !== undefined
				? ' (' + locoClass.genre + ')'
				: '')
	}));
	$: railwayGaugeOptions = data.railwayGauges.map((railwayGauge) => ({
		value: railwayGauge.id,
		text: railwayGauge.name
	}));
	$: modelManufacturerOptions = data.modelManufacturers.map((modelManufacturer) => ({
		value: modelManufacturer.id,
		text: modelManufacturer.name
	}));
	$: userOptions = data.users.map((user) => ({
		value: user.id,
		text: user.firstName + ' ' + user.lastName
	}));
	$: isDuplicateSerial = checkForDuplicateSerial(formId);
</script>

<ContentHeaderNavbar title="Lokomotiven" category="Betriebswerk">
	<Button color="dark" title="Hinzufügen" icon="plus" wide on:click={() => (showForm = true)} />
</ContentHeaderNavbar>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<OffcanvasRight
	title="Lokomotive {formModeEdit ? 'bearbeiten' : 'hinzufügen'}"
	width="500px"
	show={showForm}
>
	<form method="post" action={formModeEdit ? '?/updateLoco' : '?/addLoco'} use:enhance>
		<FormInput hidden name="id" value={formId} />
		<FormSelect
			name="railwayCompanyId"
			label="Eisenbahngesellschaft"
			required
			bind:value={formRailwayCompanyId}
			options={railwayCompanyOptions}
			on:change={() => {
				isDuplicateSerial = checkForDuplicateSerial(formId);
			}}
		/>
		<FormInput
			name="serial"
			label="Loknummer"
			required
			bind:value={formSerial}
			on:input={() => {
				isDuplicateSerial = checkForDuplicateSerial(formId);
			}}
		/>
		<LocoDuplicateSerialFormAlert show={isDuplicateSerial} />
		<FormSelect
			name="locoClassId"
			label="Baureihe"
			required
			value={formLocoClassId}
			options={locoClassOptions}
		/>
		<FormSelect
			name="railwayGaugeId"
			label="Spurweite"
			required
			value={formRailwayGaugeId}
			options={railwayGaugeOptions}
		/>
		<LocoEpochFormCheck name="epoch" value={formEpoch} />
		<FormTextArea name="notes" label="Hinweise" value={formNotes} />
		<FormSelect name="userId" label="Besitzer" required value={formUserId} options={userOptions} />
		<FormInput name="dccAddress" label="DCC-Adresse" bind:value={formDccAddress} />
		<FormSelect
			name="modelManufacturerId"
			label="Hersteller"
			value={formModelManufacturerId}
			options={modelManufacturerOptions}
		/>
		<div class="form-label">Sonstiges</div>
		<div class="pb-3">
			<FormCheck
				name="hasWeathering"
				label="Alterung vorhanden?"
				value="1"
				checked={formHasWeathering}
			/>
			<FormCheck name="hasFredi" label="FREDi vorhanden?" value="1" checked={formHasFredi} />
			<FormCheck name="hasCard" label="Lokkarte vorhanden?" value="1" checked={formHasCard} />
		</div>
		<div class="d-grid gap-2 d-flex justify-content-end">
			<Button title="Abbrechen" color="light" on:click={() => (showForm = false)} />
			<Button type="submit" title={formModeEdit ? 'Speichern' : 'Hinzufügen'} color="dark" />
		</div>
	</form>
</OffcanvasRight>

<Modal bind:show={showModal} bind:dialog={modal} title="Lokomotive löschen">
	<form method="post" action="?/deleteLoco" use:enhance>
		<FormInput hidden name="id" value={modalFormId} />
		<ModalBody>
			<p>
				Möchtest du sicher die Lokomotive <span class="fw-medium">{modalFormFullLocoName}</span> löschen?
			</p>
			<p>Beachte, dieser Vorgang kann nicht mehr rückgängig gemacht werden.</p>
		</ModalBody>
		<ModalFooter>
			<Button title="Abbrechen" color="light" on:click={() => modal.close()} />
			<Button type="submit" title="Löschen" color="danger" on:click={() => modal.close()} />
		</ModalFooter>
	</form>
</Modal>

<DataTable>
	<svelte:fragment slot="header">
		<DataTableHeader width="1%">Eisenbg.</DataTableHeader>
		<DataTableHeader>Loknummer</DataTableHeader>
		<DataTableHeader>Baureihe</DataTableHeader>
		<DataTableHeader>Spurweite</DataTableHeader>
		<DataTableHeader>Epoche</DataTableHeader>
		<DataTableHeader>Besitzer</DataTableHeader>
		<DataTableHeader>DCC-Adresse</DataTableHeader>
		<DataTableHeader>Hersteller</DataTableHeader>
		<DataTableHeader align="right">Aktionen</DataTableHeader>
	</svelte:fragment>
	{#each locos as row}
		<DataTableRow>
			<DataTableCell
				><Badge
					color={row.railwayCompanyBadgeColor}
					title={row.railwayCompanyName}
				/></DataTableCell
			>
			<DataTableCell>{row.serial}</DataTableCell>
			<DataTableCell
				>{row.locoClassName}
				<Badge color="success" class="ms-1" title={row.locoClassGenre} /></DataTableCell
			>
			<DataTableCell
				><Badge color={row.railwayGaugeBadgeColor} title={row.railwayGaugeName} /></DataTableCell
			>
			<DataTableCell><LocoEpochBadge epoch={row.epoch} /></DataTableCell>
			<DataTableCell>{row.userFirstName} {row.userLastName}</DataTableCell>
			<DataTableCell>{row.dccAddress ?? '-'}</DataTableCell>
			<DataTableCell>{row.modelManufacturerName ?? '-'}</DataTableCell>
			<DataTableCell
				><div class="d-grid gap-2 d-flex justify-content-end">
					<Button icon="share" color="success" small />
					<ButtonGroup>
						<Button icon="pencil" color="warning" small on:click={() => onEditLoco(row.id)} />
						<DropdownButton group title="Aktionen">
							<DropdownButtonMenuItem
								title="Löschen"
								icon="trash"
								on:click={() => onDeleteLoco(row.id)}
							/>
						</DropdownButton>
					</ButtonGroup>
				</div>
			</DataTableCell>
		</DataTableRow>
	{/each}
</DataTable>
