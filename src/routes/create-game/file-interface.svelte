<script lang="ts">
	import type { Round } from '$lib/models';
	import { download, popRadomElements } from '$lib/utils';
	export let chosenQuestions: Round[];

	const questionsCount = 5;

	let input = '';
	let files: FileList;
	$: updateInput(files);

	async function updateInput(files: FileList) {
		if (files && files.length) {
			input = await files[0].text();
		}
	}

	function chooseQuestions() {
		const questions: Round[] = [];
		const questionBlocks = input.split(/\r?\n-+\r?\n/);
		const selectedQuestions = popRadomElements(questionBlocks, questionsCount);
		download('remaining-questions.txt', questionBlocks.join('\n-------------\n'));

		for (const questionBlock of selectedQuestions) {
			const trimmed = questionBlock.trim();

			const lines = trimmed.split(/\r?\n/);

			if (lines.length === 2) {
				questions.push({
					type: 'Fibbage',
					question: {
						question: lines[0].trim(),
						answer: lines[1].trim()
					},
					fibs: [],
					guesses: [],
					resultConfirmed: []
				});
			} else {
				// quizQuestions
				// handleBlanks
			}
		}

		chosenQuestions = questions;
	}
	// Quiz question will have first anser be correct and rest be wrong
</script>

<label for="file">Choose a file:</label>
<input id="file" name="file" type="file" bind:files />

<label for="txt">Or enter text:</label>
<textarea id="txt" name="txt" bind:value={input} />
<br />
<button on:click={chooseQuestions}>Submit questions</button>

<style>
	textarea {
		width: 100%;
		height: 100px;
	}
</style>
