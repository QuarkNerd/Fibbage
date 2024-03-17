export type Question = FibbageQuestion | QuizQuestion;

export interface FibbageQuestion {
	type: 'Fibbage';
	question: string;
	answer: string;
}

export interface QuizQuestion {
	type: 'Quiz';
	question: string;
	answer: string;
	optons: string[];
}
