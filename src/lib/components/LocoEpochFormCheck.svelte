<script lang="ts">
	import FormCheck from '$lib/components/FormCheck.svelte';

	export let value: string | null | undefined = null;
	export let name: string;

	let epoch2a = false;
	let epoch2b = false;
	let epoch2c = false;
	let epoch3a = false;
	let epoch3b = false;
	let epoch4a = false;
	let epoch4b = false;
	let epoch4c = false;
	let epoch5a = false;
	let epoch5b = false;
	let epoch5c = false;
	let epoch6 = false;

	function toggleEpoch(epoch: string) {
		if (value == null || value == undefined || value == '') {
			value = epoch;
		} else {
			let result: string[] = value.split(',');

			let index = result.indexOf(epoch);
			if (index == -1) {
				result.push(epoch);
			} else {
				result.splice(index, 1);
			}

			let newVal = result.length > 0 ? '' : null;

			for (let i = 0; i < result.length; i++) {
				newVal = newVal + result[i];
				if (i < result.length - 1) {
					newVal = newVal + ',';
				}
			}

			value = newVal;
		}
	}

	$: epoch2a = value !== null && value !== undefined ? value?.indexOf('2a') !== -1 : false;
	$: epoch2b = value !== null && value !== undefined ? value?.indexOf('2b') !== -1 : false;
	$: epoch2c = value !== null && value !== undefined ? value?.indexOf('2c') !== -1 : false;
	$: epoch3a = value !== null && value !== undefined ? value?.indexOf('3a') !== -1 : false;
	$: epoch3b = value !== null && value !== undefined ? value?.indexOf('3b') !== -1 : false;
	$: epoch4a = value !== null && value !== undefined ? value?.indexOf('4a') !== -1 : false;
	$: epoch4b = value !== null && value !== undefined ? value?.indexOf('4b') !== -1 : false;
	$: epoch4c = value !== null && value !== undefined ? value?.indexOf('4c') !== -1 : false;
	$: epoch5a = value !== null && value !== undefined ? value?.indexOf('5a') !== -1 : false;
	$: epoch5b = value !== null && value !== undefined ? value?.indexOf('5b') !== -1 : false;
	$: epoch5c = value !== null && value !== undefined ? value?.indexOf('5c') !== -1 : false;
	$: epoch6 = value !== null && value !== undefined ? value?.indexOf('6') !== -1 : false;
</script>

<input type="hidden" {name} {value} />
<div class="form-label">Epoche</div>
<div class="pb-2">
	<FormCheck
		name="internalEpoch2a"
		label="2a"
		checked={epoch2a}
		inline
		on:click={() => toggleEpoch('2a')}
	/>
	<FormCheck
		name="internalEpoch2b"
		label="2b"
		checked={epoch2b}
		inline
		on:click={() => toggleEpoch('2b')}
	/>
	<FormCheck
		name="internalEpoch2c"
		label="2c"
		checked={epoch2c}
		inline
		on:click={() => toggleEpoch('2c')}
	/>
</div>
<div class="pb-2">
	<FormCheck
		name="internalEpoch3a"
		label="3a"
		checked={epoch3a}
		inline
		on:click={() => toggleEpoch('3a')}
	/>
	<FormCheck
		name="internalEpoch3b"
		label="3b"
		checked={epoch3b}
		inline
		on:click={() => toggleEpoch('3b')}
	/>
</div>
<div class="pb-2">
	<FormCheck
		name="internalEpoch4a"
		label="4a"
		checked={epoch4a}
		inline
		on:click={() => toggleEpoch('4a')}
	/>
	<FormCheck
		name="internalEpoch4b"
		label="4b"
		checked={epoch4b}
		inline
		on:click={() => toggleEpoch('4b')}
	/>
	<FormCheck
		name="internalEpoch4c"
		label="4c"
		checked={epoch4c}
		inline
		on:click={() => toggleEpoch('4c')}
	/>
</div>
<div class="pb-2">
	<FormCheck
		name="internalEpoch5a"
		label="5a"
		checked={epoch5a}
		inline
		on:click={() => toggleEpoch('5a')}
	/>
	<FormCheck
		name="internalEpoch5b"
		label="5b"
		checked={epoch5b}
		inline
		on:click={() => toggleEpoch('5b')}
	/>
	<FormCheck
		name="internalEpoch5c"
		label="5c"
		checked={epoch5c}
		inline
		on:click={() => toggleEpoch('5c')}
	/>
</div>
<div class="pb-2">
	<FormCheck name="internalEpoch6" label="6" checked={epoch6} on:click={() => toggleEpoch('6')} />
</div>
