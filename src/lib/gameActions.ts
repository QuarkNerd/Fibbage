import type { Game, Guess } from './models';

export function stateUpdateLogin(
	game: Game,
	user: string
): Partial<Game> | 'USERNAME_TAKEN' | 'GAME_ALREADY_STARTED' {
	if (game.users.includes(user)) {
		return 'USERNAME_TAKEN';
	}
	if (game.currentRound > -1) {
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
	if (game.currentRound > -1) {
		return 'GAME_ALREADY_STARTED';
	}

	return { currentRound: 0 };
}

export function stateUpdateSubmitFib(
	game: Game,
	user: string,
	fib: string,
	roundNumber: number
): Partial<Game> | 'INVALID' | 'NOT_FIBBAGE' | 'FIB_ALREADY_SUBMITTED' {
	if (game.currentRound !== roundNumber || !game.users.includes(user) || game.currentRound < 0) {
		return 'INVALID';
	}
	const currentRound = game.rounds[game.currentRound];
	if (currentRound.type !== 'Fibbage') {
		return 'NOT_FIBBAGE';
	}
	if (currentRound.fibs.find((x) => x.user === user)) {
		return 'FIB_ALREADY_SUBMITTED';
	}

	currentRound.fibs.push({
		user,
		fib
	});

	return { rounds: game.rounds };
}

export function stateUpdateChooseAnswer(
	game: Game,
	guess: Guess,
	roundNumber: number
): Partial<Game> | 'INVALID' | 'GUESS_ALREADY_SUBMITTED' {
	const user = guess.user;
	if (game.currentRound !== roundNumber || !game.users.includes(user) || game.currentRound < 0) {
		return 'INVALID';
	}
	const currentRound = game.rounds[game.currentRound];
	if (currentRound.guesses.find((x) => x.user === user)) {
		return 'GUESS_ALREADY_SUBMITTED';
	}

	currentRound.guesses.push(guess);

	return { rounds: game.rounds };
}

export function calculateScores(game: Game): {user: string, score: number}[] {
	return game.users.map(user => ({user, score: 888}));
}