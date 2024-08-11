import {
  Question,
  Answer,
  Money,
  Round,
} from '@/app/lib/types';

export const getRounds = (questions: Question[], answers: Answer[], money: Money[]): Round[] => {
  let rounds: Round[] = [];

  questions.forEach((question: Question): void => {
    if (rounds.some((round: Round): boolean => round.moneyId === question.moneyId)) {
      return;
    }

    const roundAnswers: Answer[] = answers
      .filter((answer: Answer): boolean => answer.questionId === question.id);
    const correctAnswerIds: number[] = [];

    roundAnswers.forEach((answer: Answer): void => {
      if (answer.isCorrect) {
        correctAnswerIds.push(answer.id);
      }
    });

    rounds.push({
      id: rounds.length + 1,
      question: question.title,
      answers: roundAnswers,
      correctAnswersAmount: correctAnswerIds.length,
      correctAnswerIds,
      moneyId: question.moneyId,
      money: money.find((m: Money): boolean => m.id === question.moneyId)?.amount || 0,
    });
  });

  rounds = rounds
    .sort((r1, r2) => r1.money - r2.money)
    .map((round, i) => ({ ...round, id: i + 1 }));

  return rounds;
};

export const compareArrays = (arr1: any[], arr2: any[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const intersectedValues = arr1.filter((value) => arr2.includes(value));

  return arr1.length === intersectedValues.length;
};

export const shuffleArray = (arr: any[]): any[] => {
  const shuffledArray = [...arr];

  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};

export function pause(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const formatNumber = (num: number, locale = 'en-US'): string => new Intl.NumberFormat(locale).format(num);

export const getLetter = (num: number): string | number => {
  if (num < 1 || num > 26) {
    return num;
  }

  return String.fromCharCode(num + 64);
};
