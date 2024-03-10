<label for="file">Choose a file (overrides text):</label>
<input id="file" name="file" type="file" bind:files={files}/>

<label for="txt">Or paste text:</label>
<textarea id="txt" name="txt" bind:value={input}/>

<button on:click={chooseQuestions}>Submit questions</button>

<script lang="ts">
	import type { Question } from "$lib/models";
	import { download, popRadomElements } from "$lib/utils";
	export let chosenQuestions: Question[];

	const questionsCount = 5;

	let input = "";
	let files: FileList;
	let remainingQuestions: String | null = null;
	$: updateInput(files);
	$input: remainingQuestions = null;

	async function updateInput(files: FileList) {
		if (files && files.length) {
			input = await files[0].text();
		}
	}

	function chooseQuestions(): Question[] {
		const questions: Question[] = [];
		const questionBlocks = input.split(/\r?\n-+\r?\n/);
		const selectedQuestions = popRadomElements(questionBlocks, questionsCount);
		download("remaining-questions.txt", questionBlocks.join("\n-------------\n"));

		for (const questionBlock of selectedQuestions) {
			const trimmed = questionBlock.trim();
			
			const lines = trimmed.split(/\r?\n/);

			if (lines.length === 2) {
				questions.push({
					type: 'Fibbage',
					question: lines[0].trim(),
					answer: lines[1].trim()
				})
			} else {
				// quizQuestions
				// handleBlanks
			}
		}

		return questions;
	}
// Quiz question will have first anser be correct and rest be wrong
</script>
