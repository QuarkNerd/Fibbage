import type { Game, Guess, Round } from './models';

export function stateUpdateLogin(
	game: Game,
	user: string
): Partial<Game> | 'USERNAME_TAKEN' | 'GAME_ALREADY_STARTED' {
	if (game.users.includes(user)) {
		return 'USERNAME_TAKEN';
	}
	if (game.currentRoundNumber > -1) {
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
	if (game.currentRoundNumber > -1) {
		return 'GAME_ALREADY_STARTED';
	}

	return { currentRoundNumber: 0 };
}

export function stateUpdateSubmitFib(
	game: Game,
	user: string,
	fib: string,
	roundNumber: number
): Partial<Game> | 'INVALID' | 'NOT_FIBBAGE' | 'FIB_ALREADY_SUBMITTED' {
	if (
		game.currentRoundNumber !== roundNumber ||
		!game.users.includes(user) ||
		game.currentRoundNumber < 0
	) {
		return 'INVALID';
	}
	const currentRound = game.rounds[game.currentRoundNumber];
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
	if (
		game.currentRoundNumber !== roundNumber ||
		!game.users.includes(user) ||
		game.currentRoundNumber < 0
	) {
		return 'INVALID';
	}
	const currentRound = game.rounds[game.currentRoundNumber];
	if (currentRound.guesses.find((x) => x.user === user)) {
		return 'GUESS_ALREADY_SUBMITTED';
	}

	currentRound.guesses.push(guess);

	return { rounds: game.rounds };
}

export function stateUpdateResultConfirmed(
	game: Game,
	user: string,
	roundNumber: number
): Partial<Game> | 'INVALID' | 'ALREADY_CONFIRMED' {
	if (
		game.currentRoundNumber !== roundNumber ||
		!game.users.includes(user) ||
		game.currentRoundNumber < 0
	) {
		return 'INVALID';
	}
	const currentRound = game.rounds[game.currentRoundNumber];
	if (currentRound.resultConfirmed.find((x) => x === user)) {
		return 'ALREADY_CONFIRMED';
	}

	currentRound.resultConfirmed.push(user);
	const currentRoundNumber =
		currentRound.resultConfirmed.length === game.users.length ? roundNumber + 1 : roundNumber;
	return { rounds: game.rounds, currentRoundNumber };
}

const correctScore = 100;
const foolScore = 25;

export function calculateScores(game: Game): [string, number][] {
	const score = Object.fromEntries(game.users.map((user) => [user, 0]));
	game.rounds.forEach((round) => updateScoreForRound(score, round));
	return Object.entries(score).sort((a, b) => a[1] - b[1]);
}

interface Scores {
	[user: string]: number;
}

function updateScoreForRound(score: Scores, round: Round) {
	if (round.type === 'Fibbage') {
		round.guesses.forEach((guess) => {
			if (guess.correct) {
				score[guess.user] += correctScore;
				return;
			}
			round.fibs
				.filter((fib) => fib.fib === guess.value)
				.forEach((fib) => (score[fib.user] += foolScore));
		});
		return;
	}

	throw new Error('Not implemented');
}
