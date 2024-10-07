<script type="ts">
	export let show = false;
</script>

{#if show}
	<div
		class="alert alert-warning"
		role="alert"
		style="padding-top: 0.375rem; padding-bottom: 0.375rem;"
	>
		<p class="fw-medium mb-2">
			<i class="bi bi-exclamation-circle me-2"></i>Loknummer bereits vergeben
		</p>
		<p class="mb-1" style="font-size: 0.875em;">Du kannst trotzdem diese Loknummer beibehalten.</p>
		<p class="mb-1" style="font-size: 0.875em;">
			Beachte aber, dass identische Loknummern die Verwaltung und Fahrzeugeinsatzplanung erschweren.
		</p>
	</div>
{/if}
