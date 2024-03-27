export type Question = FibbageQuestion | QuizQuestion;

export interface FibbageQuestion {
	question: string;
	answer: string;
}

export interface QuizQuestion {
	question: string;
	answer: string;
	optons: string[];
}
