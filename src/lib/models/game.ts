import type { Question } from './question';

export interface Game {
	questions: Question[];
	users: string[];
	actions: Action[];
}

export type Action = Start | Fib | Guess;

interface Start {
	type: 'Start';
}

interface Fib {
	type: 'Fib';
	fib: string;
	user: string;
	round: number;
}

type Guess = GuessRight | GuessWrong;

interface GuessBase {
	type: 'Guess';
	user: string;
	round: number;
}

interface GuessRight extends GuessBase {
	correct: true;
}

interface GuessWrong extends GuessBase {
	correct: false;
	fib: string;
}

// rounds are 0 indexed
