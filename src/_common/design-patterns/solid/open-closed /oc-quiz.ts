/**
 * Question
 */
import { IQuestion } from './quiz';

export abstract class Question {
  description = '';
  constructor(description) {
    this.description = description;
  }

  printDescription() {
    console.log(this.description);
  }

  abstract printQuestionChoices();
  print() {
    this.printDescription();
    this.printQuestionChoices();
  }
}

/**
 * Boolean Question
 */
export class BooleanQuestion extends Question {
  printQuestionChoices() {
    console.log('1. True');
    console.log('2. False');
  }
}

/**
 * Text Question
 */
export class TextQuestion extends Question {
  printQuestionChoices() {
    console.log('Answer___');
  }
}

/**
 * Range Question
 */
export class RangeQuestion extends Question {
  printQuestionChoices() {
    console.log('Min___');
    console.log('Max___');
  }
}

/**
 * Multi Question
 */
export class MultiQuestion extends Question {
  options: string[] = [];
  constructor(description, options) {
    super(description);
    this.options = options;
  }

  printQuestionChoices() {
    this.options.forEach((o, i) => {
      console.log(`${i}: ${o}`);
    });
  }
}

const questionsRaw: IQuestion[] = [
  {
    type: 'boolean',
    description: 'description',
  },
  {
    type: 'multi',
    description: 'multi',
    options: ['A', 'B'],
  },
  {
    type: 'text',
    description: 'text',
  },
  {
    type: 'range',
    description: 'Limit speed',
  },
];

/**
 * Convert Question
 */
export class ConvertQuestion {
  questionsRaw: IQuestion[] = [];
  questions: Question[] = [];
  constructor(questionsRaw) {
    this.questionsRaw = questionsRaw;
  }

  convert(): Question[] {
    for (const q of this.questionsRaw) {
      switch (q.type) {
        case 'boolean':
          this.questions.push(new BooleanQuestion(q.description));
          break;
        case 'multi':
          this.questions.push(new MultiQuestion(q.description, q.options));
          break;
        case 'text':
          this.questions.push(new TextQuestion(q.description));
          break;
        case 'range':
          this.questions.push(new RangeQuestion(q.description));
          break;
      }
    }
    return this.questions;
  }
}

const c = new ConvertQuestion(questionsRaw);
c.convert();

const questions = [
  new BooleanQuestion('This video is useful'),
  new MultiQuestion('Favorite languge?', ['CSS', 'HTML', 'JS']),
  new TextQuestion('Text'),
  new RangeQuestion('Limit Speed'),
];

export class OcQuiz {
  questions: Question[] = [];
  constructor(questions) {
    this.questions = questions;
  }

  print() {
    for (const q of this.questions) {
      q.print();
    }
  }
}

const q = new OcQuiz(questions);
q.print();
