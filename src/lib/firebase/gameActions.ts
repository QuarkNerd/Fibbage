import {
	stateUpdateChooseAnswer,
	stateUpdateLogin,
	stateUpdateStartGame,
	stateUpdateSubmitFib
} from '$lib/gameActions';
import type { Game, Guess, Round } from '$lib/models';
import { firestore } from './firebaseConfig';
import {
	getDoc,
	doc,
	setDoc,
	runTransaction,
	Transaction,
	DocumentReference
} from 'firebase/firestore';

export async function createGame(name: string, emptyRounds: Round[]): Promise<boolean> {
	const ref = getDocRef(name);
	try {
		// Current rules should cause error to be thrown when doc does not exist
		const gameDoc = await getDoc(ref);
		if (gameDoc.exists()) return false;
	} catch {}
	const game: Game = {
		name,
		currentRound: -1,
		users: [],
		rounds: emptyRounds
	};
	setDoc(ref, game);
	return true;
}

export async function login(gameName: string, user: string) {
	return await applyTransaction(stateUpdateLogin, gameName, user);
}

export async function startGame(gameName: string) {
	return await applyTransaction(stateUpdateStartGame, gameName);
}

export async function submitFib(gameName: string, user: string, fib: string, roundNum: number) {
	return await applyTransaction(stateUpdateSubmitFib, gameName, user, fib, roundNum);
}

export async function chooseAnswer(gameName: string, guess: Guess, roundNum: number) {
	return await applyTransaction(stateUpdateChooseAnswer, gameName, guess, roundNum);
}

export async function applyTransaction<T extends any[], R extends string>(
	stateMachine: (game: Game, ...args: T) => Partial<Game> | R,
	gameName: string,
	...args: T
) {
	const ref = getDocRef(gameName);
	return await runTransaction(firestore, async (transaction) => {
		const game = await getGameFromTransaction(transaction, ref);
		const result = stateMachine(game, ...args);
		if (typeof result === 'string') {
			return result;
		}
		transaction.update(ref, result);
		return 'SUCCESS';
	});
}

async function getGameFromTransaction(
	transaction: Transaction,
	ref: DocumentReference
): Promise<Game> {
	const doc = await transaction.get(ref);
	if (!doc.exists()) {
		throw 'Document does not exist!';
	}
	return doc.data() as Game;
}

function getDocRef(game: string) {
	return doc(firestore, 'private-games', game);
}
