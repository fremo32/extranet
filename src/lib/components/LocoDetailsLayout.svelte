<script lang="ts">
	import ContentHeaderNavbar from '$lib/components/ContentHeaderNavbar.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import NavTabs from '$lib/components/NavTabs.svelte';
	import NavTabLink from '$lib/components/NavTabLink.svelte';
	import { page } from '$app/stores';

	export let meetingTitle: string;
	export let meetingId: string;
	export let meetingLocoTurnaroundsLength: number;
	export let meetingLocoRegistrationsLength: number;

	let generalTabActive = false;
	let locoTurnaroundTabActive = false;
	let locoRegistrationTabActive = false;

	$: generalTabActive = $page.url.pathname == '/meetings/' + meetingId;
	$: locoTurnaroundTabActive =
		$page.url.pathname === '/meetings/' + meetingId + '/loco-turnarounds';
	$: locoRegistrationTabActive =
		$page.url.pathname === '/meetings/' + meetingId + '/loco-registrations';
</script>

<ContentHeaderNavbar title={meetingTitle} category="Bahndirektion / Fahrplantreffen">
	<slot name="headerButtons" />
</ContentHeaderNavbar>

<NavTabs class="border-bottom mb-3">
	<NavTabLink link="/meetings/{meetingId}" class="ms-3" active={generalTabActive}
		>Allgemein</NavTabLink
	>
	<NavTabLink link="/meetings/{meetingId}/loco-turnarounds" active={locoTurnaroundTabActive}>
		Lokumläufe <Badge
			color="secondary"
			title={meetingLocoTurnaroundsLength.toString()}
			class="ms-2"
		/>
	</NavTabLink>
	<NavTabLink link="/meetings/{meetingId}/loco-registrations" active={locoRegistrationTabActive}
		>Fahrzeuganmeldungen<Badge
			color="secondary"
			title={meetingLocoRegistrationsLength.toString()}
			class="ms-2"
		/></NavTabLink
	>
</NavTabs>

<slot />
