<script lang="ts">
	import { submitFib } from '$lib/firebase';
	import type { FibbageRound } from '$lib/models';
	import { Header } from '..';
	import SubmitText from '../SubmitText.svelte';

	export let gameName: string;
	export let user: string;
	export let round: FibbageRound;
	export let roundNum: number;

	$: userFib = round.fibs.find((fib) => fib.user === user);
</script>

<Header header="Submit a lie" />
<div class="main">
	{#if userFib === undefined}
		Submit a lie for the quesion: <br />
		{round.question.question}
		<SubmitText
			placeholder="type your lie and hit enter"
			callback={(fib) => submitFib(gameName, user, fib, roundNum)}
		/>
	{:else}
		For {round.question.question} <br />
		You said: <br />
		{userFib.fib}
	{/if}
</div>
