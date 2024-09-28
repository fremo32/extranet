<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	let locoClasses = data.locoClasses;
	let locoTypes = data.locoTypes;
</script>

<form method="post">
	<table class="table">
		<thead>
			<tr>
				<th>Baureihe</th>
				<th>Gattung</th>
				<th>Aktionen</th>
			</tr>
		</thead>
		<tbody>
			{#each locoClasses as locoClass}
				<tr>
					<td>{locoClass.name}</td>
					<td>{locoClass.locoTypeName}</td>
					<td><button class="button" type="button">Löschen</button></td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<td><input class="input" type="text" name="name" style="max-width: 50ch;" /></td>
			<td
				><select name="locoTypeId" style="max-width: 50ch;">
					{#each locoTypes as locoType}
						<option value={locoType.id}>{locoType.name}</option>
					{/each}
				</select></td
			>
			<td
				><button class="button is-primary" type="submit" formaction="?/addLocoClass"
					>Hinzufügen</button
				></td
			>
		</tfoot>
	</table>
</form>
