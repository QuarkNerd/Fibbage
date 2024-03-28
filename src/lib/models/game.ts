import type { FibbageQuestion, QuizQuestion } from './question';

export interface Game {
	name: string;
	currentRoundNumber: number;
	users: string[];
	rounds: Round[];
	// if rounds is empty then waiting for names
	// game over is questions === rounds and last round is done, show final scores
}

export type Round = FibbageRound | QuizRound;

interface BaseRound {
	guesses: Guess[];
	resultConfirmed: string[];
}

export interface FibbageRound extends BaseRound {
	type: 'Fibbage';
	fibs: Fib[];
	question: FibbageQuestion;
}

interface QuizRound extends BaseRound {
	type: 'Quiz';
	question: QuizQuestion;
}

export interface Fib {
	fib: string;
	user: string;
}

export type Guess = GuessRight | GuessWrong;

interface GuessBase {
	user: string;
}

interface GuessRight extends GuessBase {
	correct: true;
}

interface GuessWrong extends GuessBase {
	correct: false;
	value: string;
}

// rounds are 0 indexed
