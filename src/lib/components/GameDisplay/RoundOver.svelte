<script lang="ts">
	import { confirmResult } from '$lib/firebase';
	import { calculateScores } from '$lib/gameActions';
	import type { FibbageRound, Game, Round } from '$lib/models';

	export let game: Game;
	export let user: string;

	$: scores = calculateScores(game);
	$: currentRound = game.rounds[game.currentRoundNumber] as FibbageRound;
	$: confirmed = currentRound?.resultConfirmed.find((x) => x === user);

	function getResultText(round: Round) {
		let text = '';
		const userGuess = round.guesses.find((guess) => guess.user === user);

		if (!userGuess) {
			text = "You didn't guess.";
		} else if (userGuess.correct) {
			text = "Well done, that's correct!";
		} else {
			const foolers = currentRound.fibs
				.filter((fib) => fib.fib === userGuess.value)
				.map((fib) => fib.user)
				.join(',');

			text = 'You are wrong, you were fooled by ' + foolers;
		}

		if (round.type === 'Fibbage') {
			const userFib = round.fibs.find((guess) => guess.user === user);
			if (userFib) {
				const fooled = round.guesses
					.filter((guess) => !guess.correct && guess.value === userFib.fib)
					.map((guess) => guess.user);

				if (fooled.length) text += '\n You fooled' + fooled;
			}
		}

		return text;
	}
</script>

{#if !confirmed}
	<button on:click={() => confirmResult(game.name, user, game.currentRoundNumber)}>Confirm</button>
{/if}

{#if currentRound.type === 'Fibbage'}
	{getResultText(currentRound)}
{/if}

Scores
{#if scores}
	{#each scores as [user, score]}
		<div>
			{user}: {score}
		</div>
	{/each}
{/if}
