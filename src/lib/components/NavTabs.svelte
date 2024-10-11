<script lang="ts">
	let className = '';
	export { className as class };
</script>

<ul class="nav nav-underline {className}">
	<slot />
</ul>
