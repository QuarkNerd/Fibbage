import type { Game, Question } from '$lib/models';
import { firebassApp } from './firebaseConfig';
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore/lite';

const db = getFirestore(firebassApp);

export async function createGame(name: string, questions: Question[]): Promise<boolean> {
	const ref = doc(db, 'private-games', name);
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
