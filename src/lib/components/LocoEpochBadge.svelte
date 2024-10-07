<script lang="ts">
	export let color: string | null = 'secondary';
	export let epoch: string | null | undefined;

	let badges: string[];

	$: badges = epoch !== null && epoch !== undefined ? epoch.split(',') : [];
</script>

{#each badges as badge}
	<span class="badge text-bg-{color} me-1">{badge}</span>
{/each}
