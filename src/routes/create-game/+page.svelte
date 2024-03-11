<script lang="ts">
	import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
	import Header from '$lib/components/Header.svelte';
	import FileInterface from './file-interface.svelte';
	import type { Question } from '$lib/models';
	import { createGame } from '$lib/firebase';

	async function create() {
		const randomName = uniqueNamesGenerator({
			dictionaries: [adjectives, adjectives, colors, animals],
			separator: '-',
			length: 4
		});
		const success = createGame(randomName, chosenQuestions);
		//redirect
	}

	let chosenQuestions: Question[] = [];
</script>

<Header header="Create Game" />
<FileInterface {chosenQuestions} />

<button on:click={create}>Create</button>

// check enough questions passed in? // create public games // only make create game when valid
