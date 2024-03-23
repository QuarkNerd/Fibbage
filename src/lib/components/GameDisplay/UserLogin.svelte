<script lang="ts">
	import { login } from '$lib/firebase';

	export let user: string | null;
	export let gameName: string;
	let tempName = '';

	async function submit() {
		const result = await login(gameName, tempName);
		if (result === 'USERNAME_TAKEN') {
			//show error
		} else if (result === 'GAME_ALREADY_STARTED') {
			//show error
		} else {
			localStorage.setItem(gameName, tempName);
			user = tempName;
		}
	}
</script>

<input type="text" bind:value={tempName} />
<button on:click={submit}> Submit name</button>
