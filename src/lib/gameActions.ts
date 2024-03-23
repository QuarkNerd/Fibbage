import type { Game } from './models';

export function stateUpdateLogin(
	game: Game,
	user: string
): Partial<Game> | 'USERNAME_TAKEN' | 'GAME_ALREADY_STARTED' {
	if (game.users.includes(user)) {
		return 'USERNAME_TAKEN';
	}
	if (game.rounds.length > 0) {
		return 'GAME_ALREADY_STARTED';
	}
	return { users: [...game.users, user] };
}

export function stateUpdateStartGame(
	game: Game
): Partial<Game> | 'NOT_ENOUGH_PLAYERS' | 'GAME_ALREADY_STARTED' {
	if (game.users.length < 2) {
		return 'NOT_ENOUGH_PLAYERS';
	}
	if (game.rounds.length > 0) {
		return 'GAME_ALREADY_STARTED';
	}

	if (game.questions[0].type === 'Fibbage') {
		return {
			rounds: [
				{
					type: 'Fibbage',
					fibs: [],
					guesses: [],
					resultConfirmed: []
				}
			]
		};
	}
	throw new Error('Not implemented');
}
