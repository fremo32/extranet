<script lang="ts">
	import { page } from '$app/stores';
	function pathStartsWidth(prefix: string) {
		return $page.url.pathname.startsWith(prefix);
	}
</script>

<div class="flex-shrink-0 px-4 py-3" style="width: 260px;">
	<div class="py-3">
		<span class="	ex-brand">FREMO:32</span>
	</div>
	<ul class="list-unstyled p-1">
		<li class="mb-2">
			<div class="ex-nav-section">Bahndirektion</div>
			<ul class="nav flex-column">
				<li class="nav-item">
					<a
						href="/meetings"
						class="nav-link"
						class:active={$page.url.pathname.startsWith('/meetings')}>Fahrplantreffen</a
					>
				</li>
				<li class="nav-item">
					<a href="#!" class="nav-link disabled">Fahrzeugeinsatzplanung</a>
				</li>
				<li class="nav-item">
					<a href="#!" class="nav-link disabled">Betriebsstellen</a>
				</li>
			</ul>
		</li>
		<li class="mb-2">
			<div class="ex-nav-section">Betriebswerk</div>
			<ul class="nav flex-column">
				<li class="nav-item">
					<a href="/locos" class="nav-link" class:active={$page.url.pathname.startsWith('/locos')}
						>Lokomotiven</a
					>
				</li>
				<li class="nav-item">
					<a href="#!" class="nav-link disabled">Personenwagen</a>
				</li>
				<li class="nav-item">
					<a href="#!" class="nav-link disabled">Güterwagen</a>
				</li>
			</ul>
		</li>

		<li class="mb-2">
			<div class="ex-nav-section">Verzeichnis</div>
			<ul class="nav flex-column">
				<li class="nav-item">
					<a href="/users" class="nav-link" class:active={$page.url.pathname.startsWith('/users')}
						>Mitglieder</a
					>
				</li>
				<li class="nav-item">
					<a href="#!" class="nav-link disabled" aria-disabled="true">Module</a>
				</li>
				<li class="nav-item">
					<a
						href="/loco-classes"
						class="nav-link"
						class:active={$page.url.pathname.startsWith('/loco-classes')}>Baureihen</a
					>
				</li>
				<li class="nav-item">
					<a
						href="/railway-companies"
						class="nav-link"
						class:active={$page.url.pathname.startsWith('/railway-companies')}
						>Eisenbahngesellschaften</a
					>
				</li>
				<li class="nav-item">
					<a
						href="/model-manufacturers"
						class="nav-link"
						class:active={$page.url.pathname.startsWith('/model-manufacturers')}
						>Modellbahnhersteller</a
					>
				</li>
			</ul>
		</li>

		<!-- <li class="border-top my-3"></li>
		<li class="mb-1">
			<button
				class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
				data-bs-toggle="collapse"
				data-bs-target="#account-collapse"
				aria-expanded="false"
			>
				Mein Konto
			</button>
			<div class="collapse" id="account-collapse">
				<ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
					<li>
						<a href="#!" class="link-body-emphasis d-inline-flex text-decoration-none rounded"
							>New...</a
						>
					</li>
					<li>
						<a href="#!" class="link-body-emphasis d-inline-flex text-decoration-none rounded"
							>Profile</a
						>
					</li>
					<li>
						<a href="#!" class="link-body-emphasis d-inline-flex text-decoration-none rounded"
							>Settings</a
						>
					</li>
					<li>
						<a href="#!" class="link-body-emphasis d-inline-flex text-decoration-none rounded"
							>Sign out</a
						>
					</li>
				</ul>
			</div>
		</li> -->
	</ul>
</div>

<style>
	.ex-brand {
		font-size: 1.25em;
		padding-left: 0.125em;
		font-weight: 700;
	}

	.ex-nav-section {
		font-size: 0.875em;
		font-weight: 600;
		color: var(--bs-secondary-color);
		padding-top: 0.875rem;
		padding-bottom: 0.375rem;
		text-transform: uppercase;
	}

	.nav-link {
		padding: 0.25rem 0;
		margin: 0.125rem 0;
		font-size: 0.875em;
		color: var(--bs-emphasis-color);
	}

	.nav-item .nav-link.active {
		margin-left: -0.75rem;
		padding-left: 0.75rem;
		margin-right: -0.75rem;
		background-color: var(--bs-primary-bg-subtle);
		border-radius: var(--bs-border-radius);
	}

	.nav-item .nav-link:hover {
		margin-left: -0.75rem;
		padding-left: 0.75rem;
		margin-right: -0.75rem;
		background-color: var(--bs-secondary-bg);
		border-radius: var(--bs-border-radius);
	}

	.nav-link.active {
		font-weight: 600;
	}

	.nav-link.disabled {
		color: var(--bs-tertiary-color);
	}
</style>
