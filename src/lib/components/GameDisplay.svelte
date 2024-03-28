<script lang="ts">
	import type { Game } from '$lib/models';
	import ChooseAnswer from './GameDisplay/ChooseAnswer.svelte';
	import StartGame from './GameDisplay/StartGame.svelte';
	import SubmitFib from './GameDisplay/SubmitFib.svelte';
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
		<SubmitFib gameName={game.name} {user} round={currentRound} roundNum={game.currentRound} />
	{:else if currentRound.guesses.length < game.users.length}
		<ChooseAnswer gameName={game.name} {user} round={currentRound} roundNum={game.currentRound} />
	{:else}
		aaaaaaaaaa
	{/if}
{/if}

<div></div>

<style>
</style>
