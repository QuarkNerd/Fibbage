<script lang="ts">
	import type { Question } from "$lib/models";
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

	function chooseQuestions() {
		
		// split into lines
		// choose random
		//  parse
		// download
	}
// ".split(/\r?\n/)
// seperate types by -------------
// auto download remaining
</script>

<label for="file">Choose a file (overrides text):</label>
<input id="file" name="file" type="file" bind:files={files}/>

<label for="txt">Or paste text:</label>
<textarea id="txt" name="txt" bind:value={input}/>

<button on:click={chooseQuestions}>Submit questions</button>