<script lang="ts">
	export let color: string | null = 'primary';
	export let title: string | null;
	let className = '';
	export { className as class };
</script>

<span class="badge text-bg-{color} {className}">{title}</span>
