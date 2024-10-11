<script lang="ts">
	import ContentHeaderNavbar from '$lib/components/ContentHeaderNavbar.svelte';
	import Button from '$lib/components/Button.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import DataTableHeader from '$lib/components/DataTableHeader.svelte';
	import DataTableRow from '$lib/components/DataTableRow.svelte';
	import DataTableCell from '$lib/components/DataTableCell.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';
	import DropdownButton from '$lib/components/DropdownButton.svelte';
	import DropdownButtonMenuItem from '$lib/components/DropdownButtonMenuItem.svelte';
	import NavTabs from '$lib/components/NavTabs.svelte';
	import NavTabLink from '$lib/components/NavTabLink.svelte';
	import LocoDetailsLayout from '$lib/components/LocoDetailsLayout.svelte';

	export let data;

	$: ({ meeting, meetingLocoTurnarounds, meetingLocoRegistrations } = data);
</script>

<LocoDetailsLayout
	meetingId={meeting.id}
	meetingTitle={meeting.title}
	meetingLocoTurnaroundsLength={meetingLocoTurnarounds.length}
	meetingLocoRegistrationsLength={meetingLocoRegistrations.length}
>
	<svelte:fragment slot="headerButtons">
		<Button color="dark" title="Bearbeiten" icon="pencil" wide />
	</svelte:fragment>

	<div class="px-3 py-2">
		<p>Hier folgen die Details zum Fahrplantreffen</p>
	</div>
</LocoDetailsLayout>
