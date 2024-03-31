<script lang="ts">
	import type { Game, Round } from '$lib/models';
	import ChooseAnswer from './GameDisplay/ChooseAnswer.svelte';
	import RoundOver from './GameDisplay/RoundOver.svelte';
	import StartGame from './GameDisplay/StartGame.svelte';
	import SubmitFib from './GameDisplay/SubmitFib.svelte';
	import UserLogin from './GameDisplay/UserLogin.svelte';

	export let game: Game;

	let user = localStorage.getItem(game.name);
	let currentRound: Round;
	$: currentRound = game.rounds[game.currentRoundNumber];
</script>

{#if user === null}
	{#if game.currentRoundNumber === -1}
		<UserLogin bind:user gameName={game.name} />
	{:else}
		The game has already started.
	{/if}
{:else if game.currentRoundNumber === -1}
	<StartGame users={game.users} gameName={game.name} />
{:else if currentRound.type === 'Fibbage' && currentRound.fibs.length < game.users.length}
	<SubmitFib gameName={game.name} {user} round={currentRound} roundNum={game.currentRoundNumber} />
{:else if currentRound.guesses.length < game.users.length}
	<ChooseAnswer
		gameName={game.name}
		{user}
		round={currentRound}
		roundNum={game.currentRoundNumber}
	/>
{:else}
	<RoundOver {game} {user} />
{/if}

<div></div>

<style>
</style>
