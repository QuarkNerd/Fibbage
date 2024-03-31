<script lang="ts">
	import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
	import { goto } from '$app/navigation';

	import { Header } from '$lib/components';
	import FileInterface from './file-interface.svelte';
	import type { Round } from '$lib/models';
	import { createGame } from '$lib/firebase';

	import '../style.css'

	async function create() {
		const randomName = uniqueNamesGenerator({
			dictionaries: [adjectives, adjectives, colors, animals],
			separator: '',
			length: 4,
			style: 'capital'
		});
		const success = await createGame(randomName, chosenQuestions);

		// add waiting and add redirecting timeout
		if (success) {
			goto('./play-game?name=' + randomName);
		} else {
		}
	}

	let chosenQuestions: Round[] = [];
</script>

<Header header="Create Game" />
<div class="main">	
	<h3>Instrucutions</h3>
		<div class="box">
			To create a game you need to supply a list of possible questions. Use the file selector or textbox below.
			<br><br>
			The format is to have the questions and answers seperated by a new line, with each set seperated by a line containing only '-'s. There is an example below.
			<br><br>
			Add at least 5 questions.
			<br><br>
			Click submt questions and the game will choose 5 questions from the list at random and download a file of the remaining questions for future games.
			<br><br>
			Click 'create' to create the game
			<br><br>
			Share the url with friends to start playing
		</div>

	<h3>Create game</h3>
	<div class="box">
		<FileInterface bind:chosenQuestions />
		<br>
		<button disabled={chosenQuestions.length === 0} on:click={create}>Create</button>
	</div>
	<h3>Example set of questions</h3>
		<div class="box">
		What is the value of pi?<br>
		3.14<br>
		--<br>
		What is name of the Robot in Furturama?<br>
		Bender Bending Rodríguez<br>
		------<br>
		Can he swing from a web?<br>
		No he can't, he's a pig<br>
		--<br>
		What is the full form of T.A.R.D.I.S?<br>
		Time and Relative Dimensions in Space<br>
		------<br>
		Who's a "Hairy baaaabyyyy"?<br>
		Mochi the cat<br>
		---<br>
		It's evil, it's diabolical it's....<br>
		Lemon Scented!
	</div>
</div>