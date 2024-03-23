//Taken from svelteFire, modified to have error handling based on yet unmerged PR
/* eslint @typescript-eslint/no-explicit-any: 0 */ //

import { FirebaseError } from 'firebase/app';
import { onSnapshot, type DocumentReference, type Firestore, doc } from 'firebase/firestore';
import { writable } from 'svelte/store';

type DocValue<T> = {
	data: T | null | undefined;
	error: Error | null;
};

export interface DocStore<T> {
	subscribe: (cb: (value: DocValue<T>) => void) => void | (() => void);
	ref: DocumentReference<T> | null;
	id: string;
}

export function docStore<T = any>(
	firestore: Firestore,
	ref: string | DocumentReference<T>,
	startWith?: T
): DocStore<T> {
	let unsubscribe: any;
	// Fallback for missing SDK
	if (!firestore) {
		console.warn(
			'Firestore is not initialized. Are you missing FirebaseApp as a parent component?'
		);
		const { subscribe } = writable({
			data: null,
			error: new Error(
				'Firestore is not initialized. Are you missing FirebaseApp as a parent component?'
			)
		});
		return {
			subscribe,
			ref: null,
			id: ''
		};
	}
	const docRef: any = typeof ref === 'string' ? doc(firestore, ref) : ref;
	const { subscribe } = writable(
		{ data: startWith as T | null, error: null as null | Error },
		(set) => {
			unsubscribe = onSnapshot(
				docRef,
				(snapshot: any): any => {
					set({ data: snapshot.data() ?? null, error: null });
				},
				(error: FirebaseError): any => {
					set({ data: null, error });
				}
			);
			return () => unsubscribe();
		}
	);
	return {
		subscribe,
		ref: docRef as any,
		id: docRef.id
	};
}
