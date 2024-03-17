<script lang="ts">
	import { page } from '$app/stores';
	import type { Game } from '$lib/models';
    import { onMount } from 'svelte';

    let game: Game | null = null;
    onMount(() => {
        const name = $page.url.searchParams.get('name');
		if (name === null) {};
		console.log(name);
	});

	// create  method in firebase interpo to read things
	// calc state somehow,
	// show component based on state/ pass in calculated state
</script>
