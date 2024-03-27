<script lang="ts">
	import { onMount } from 'svelte';

	import { page } from '$app/stores';
	import type { Game } from '$lib/models';
	import { firestore, docStore, type DocStore } from '$lib/firebase';
	import { GameDisplay } from '$lib/components';

	let game: DocStore<Game> | null = null as DocStore<Game> | null;
	let name: string | null = '';
	onMount(() => {
		name = $page.url.searchParams.get('name');
		if (name === null) {
		}
		game = docStore<Game>(firestore, 'private-games/' + name);
	});
</script>

{#if name}
	{#if $game}
		{#if $game.error}
			an error occurred please check the url or make a new game. REFRESH
		{:else if $game.data}
			<GameDisplay game={$game.data} />
		{:else}
			error
		{/if}
	{:else}
		loading
	{/if}
{:else}
	check the url
{/if}
