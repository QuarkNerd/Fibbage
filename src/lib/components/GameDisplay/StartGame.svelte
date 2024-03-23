<script lang="ts">
	import { startGame } from '$lib/firebase';

	export let users: string[];
	export let gameName: string;
</script>

Users = {users}
<button on:click={() => startGame(gameName)}>Everybody is in</button>
