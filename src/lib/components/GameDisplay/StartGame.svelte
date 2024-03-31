<script lang="ts">
	import { startGame } from '$lib/firebase';
	import Header from '../Header.svelte';

	export let users: string[];
	export let gameName: string;
</script>

<Header header="Lobby" />
<div class="main">
	Share the URL to invite friends to play.
	<h3>Users</h3>
	{#each users as user}
		<p>{user}</p>
	{/each}

	{#if users.length > 1}
		<button on:click={() => startGame(gameName)}>Everybody is in, start game</button>
	{/if}
</div>
