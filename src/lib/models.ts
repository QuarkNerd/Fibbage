export type Question = FibbageQuestion

export interface FibbageQuestion {
    type: "Fibbage";
    question: string;
    answer: string;
}