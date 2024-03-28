<script lang="ts">
	import type { Game, Round } from '$lib/models';
	import ChooseAnswer from './GameDisplay/ChooseAnswer.svelte';
	import RoundOver from './GameDisplay/RoundOver.svelte';
	import StartGame from './GameDisplay/StartGame.svelte';
	import SubmitFib from './GameDisplay/SubmitFib.svelte';
	import UserLogin from './GameDisplay/UserLogin.svelte';

	export let game: Game;

	let user = localStorage.getItem(game.name);
	let currentRound: Round | undefined;
	$: currentRound = game.rounds[game.currentRoundNumber];
</script>

{#if user === null}
	<UserLogin bind:user gameName={game.name} />
{:else}
	You are {user}
	It is {game.currentRoundNumber}
	{#if game.currentRoundNumber === -1}
		<StartGame users={game.users} gameName={game.name} />
	{:else if !currentRound}
		gameOver
	{:else if currentRound.type === 'Fibbage' && currentRound.fibs.length < game.users.length}
		<SubmitFib
			gameName={game.name}
			{user}
			round={currentRound}
			roundNum={game.currentRoundNumber}
		/>
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
{/if}

<div></div>

<style>
</style>
