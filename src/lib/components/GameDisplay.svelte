<script lang="ts">
	import type { Game } from '$lib/models';
	import StartGame from './GameDisplay/StartGame.svelte';
	import UserLogin from './GameDisplay/UserLogin.svelte';

	export let game: Game;

	let user = localStorage.getItem(game.name);
	$: currentRound = game.rounds[game.currentRound];
</script>

{#if user === null}
	<UserLogin bind:user gameName={game.name} />
{:else}
	You are {user}
	{#if game.currentRound === -1}
		<StartGame users={game.users} gameName={game.name} />
	{:else if currentRound.type === 'Fibbage' && currentRound.fibs.length < game.users.length}
		Submit lies
	{:else}
		aaaaaaaaaa
	{/if}
{/if}

<div></div>

<style>
</style>
