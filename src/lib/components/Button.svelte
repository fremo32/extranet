<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' | undefined | null = 'button';
	export let color: string = 'primary';
	export let title: string = '';
	export let icon: string | undefined = undefined;
	export let wide: boolean = false;
	export let small: boolean = false;
	export let outline: boolean = false;
	let className = '';
	export { className as class };

	$: btnStyleClass = outline ? 'btn-outline-' + color : 'btn-' + color;
</script>

<button
	{type}
	class="btn {btnStyleClass} {className}"
	class:px-4={wide}
	class:btn-sm={small}
	on:click
>
	{#if icon}<i class="bi bi-{icon}"></i>{/if}
	{title}</button
>
