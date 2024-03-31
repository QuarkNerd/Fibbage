<script lang="ts">
	export let callback: (a: string) => unknown;
	export let placeholder: string;

	let text = '';

	function validate() {
		callback(text);
	}
</script>

<form on:submit|preventDefault={validate}>
	<input {placeholder} bind:value={text} />
</form>

<style>
	input {
		width: 90%;
		min-width: 200px;
	}
</style>
