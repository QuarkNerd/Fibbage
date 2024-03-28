<script lang="ts">
	import { login } from '$lib/firebase';
	import SubmitText from '../SubmitText.svelte';

	export let user: string | null;
	export let gameName: string;

	async function submit(tempName: string) {
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

<SubmitText placeholder="Type your name and press enter" callback={submit} />
