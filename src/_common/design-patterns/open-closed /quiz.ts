/**
 * IQuestion
 */
export interface IQuestion {
  type: string;
  description: string;
  options?: string[];
}

const questions: IQuestion[] = [
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

export { questions };

export class Quiz {
  print(questions: IQuestion[]) {
    for (const q of questions) {
      this.descriptionPrint(q.description);
      switch (q.type) {
        case 'boolean':
          this.booleanPrint();
          break;
        case 'multi':
          this.multiPrint(q.options);
          break;
        case 'text':
          this.textPrint();
          break;
        case 'range':
          this.rangePrint();
          break;
      }
    }
  }

  descriptionPrint(description) {
    console.log(description);
  }

  booleanPrint() {
    console.log('1. True');
    console.log('2. False');
  }

  multiPrint(options) {
    options.forEach((o, i) => {
      console.log(`${i}: ${o}`);
    });
  }

  textPrint() {
    console.log('Answer___');
  }

  rangePrint() {
    console.log('Min___');
    console.log('Max___');
  }
}

const q = new Quiz();
q.print(questions);
