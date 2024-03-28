<script lang="ts">
	import { chooseAnswer } from '$lib/firebase';
	import type { Round } from '$lib/models';
	import { popRadomElements } from '$lib/utils';

	export let gameName: string;
	export let user: string;
	export let round: Round;
	export let roundNum: number;

	$: falseAnswers =
		round.type === 'Fibbage' ? round.fibs.filter((x) => x.user != user).map((x) => x.fib) : []; // remove duplicates
	$: allAnswers = [...falseAnswers, round.question.answer];
	$: shuffledAnswers = popRadomElements(allAnswers, allAnswers.length);
	$: userGuess = round.guesses.find((guess) => guess.user === user);

	function submitAnswer(text: string) {
		const correct = round.question.answer === text;
		const guess = correct ? { user, correct } : { user, correct, value: text };
		chooseAnswer(gameName, guess, roundNum);
	}
</script>

{#if userGuess}
	You answered
{:else}
	Answer the question for {round.question.question}
	{#each shuffledAnswers as text}
		<button on:click={() => submitAnswer(text)}>{text}</button>
	{/each}
{/if}
