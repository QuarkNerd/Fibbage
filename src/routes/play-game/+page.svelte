<script lang="ts">
	import { onMount } from 'svelte';

	import { page } from '$app/stores';
	import type { Game } from '$lib/models';
	import { firestore, docStore, type DocStore } from '$lib/firebase';
	import GameDisplay from '$lib/components/GameDisplay.svelte';

	let game: DocStore<Game> | null = null as DocStore<Game> | null;
	onMount(() => {
		const name = $page.url.searchParams.get('name');
		if (name === null) {
		}
		game = docStore<Game>(firestore, 'private-games/' + name);
	});
</script>

{#if $game}
	{#if $game.error}
		an error occurred please check the url or make a new game
	{:else if $game.data}
		<GameDisplay game={$game.data} />
	{:else}
		error
	{/if}
{:else}
	loading
{/if}
