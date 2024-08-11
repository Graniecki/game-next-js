export type Money = {
  id: number;
  amount: number;
};

export type Question = {
  id: number;
  title: string;
  moneyId: number;
};

export type Answer = {
  id: number;
  questionId: number;
  title: string;
  isCorrect: boolean;
};

export type Round = {
  id: number;
  question: string;
  answers: Answer[];
  correctAnswersAmount: number;
  correctAnswerIds: number[];
  moneyId: number;
  money: number;
};

export enum RoundStatus {
  active = 'active',
  pending = 'pending',
  preparation = 'preparation',
  verification = 'verification',
}
