<script lang="ts">
	import type { Game } from '$lib/models';
	import StartGame from './GameDisplay/StartGame.svelte';
	import UserLogin from './GameDisplay/UserLogin.svelte';

	export let game: Game;
	export let gameName: string;

	type State = 'WAITING_FOR_LOGINS' | 'GOOP'; // change to the titles for each screen

	let user = localStorage.getItem(gameName);

	$: state = calculateState(game);

	function calculateState(game: Game): State {
		if (!game.rounds.length) return 'WAITING_FOR_LOGINS';
		return 'GOOP';
	}
</script>

{#if user === null}
	<UserLogin bind:user {gameName} />
{:else}
	You are {user}
	{#if state == 'WAITING_FOR_LOGINS'}
		<StartGame users={game.users} {gameName} />
	{:else}
		aaaaaaaaaa
	{/if}
{/if}

<div></div>

<style>
</style>
