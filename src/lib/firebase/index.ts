import type { Game, Question } from '$lib/models';
import { firestore } from './firebaseConfig';
import { getDoc, doc, setDoc } from 'firebase/firestore/lite';

export async function createGame(name: string, questions: Question[]): Promise<boolean> {
	const ref = doc(firestore, 'private-games', name);
	try {
		// Current rules cause error to be thrown when doc does not exist
		const gameDoc = await getDoc(ref);
		if (gameDoc.exists()) return false;
	} catch {}
	const game: Game = {
		questions,
		users: [],
		rounds: []
	};
	setDoc(ref, game);
	return true;
}

export { firestore } from './firebaseConfig';
export * from './docStore';
