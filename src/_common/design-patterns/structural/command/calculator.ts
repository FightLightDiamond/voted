export class Calculator {
  currentValue = 0;
  /**
   * Lưu lại các phép tính toán
   */
  history = [];

  execute(command: ICommand) {
    /**
     * Thực thi phép tính toán
     */
    this.currentValue = command.execute(this.currentValue);
    /**
     * Lưu lại
     */
    this.history.push(command);
  }

  undo() {
    /**
     * Lấy ra phép tính toán gần nhất
     */
    const command: ICommand = this.history.pop();
    /**
     * Thực hiện rollback lại
     */
    this.currentValue = command.undo(this.currentValue);
  }

  add(value) {
    console.log(value, this.currentValue);
    this.currentValue += value;
  }

  subtract(value) {
    this.currentValue -= value;
  }

  multiply(value) {
    this.currentValue *= value;
  }

  divide(value) {
    if (value === 0) throw Error('Can not divide zero');
    this.currentValue /= value;
  }
}

export interface ICommand {
  execute(valueToAdd: number);
  undo(valueToAdd: number);
}

export class AddCommand {
  valueToAdd = 0;

  /**
   * Thực tế có thể nhiều tham số hơn
   * @param valueToAdd
   */
  constructor(valueToAdd: number) {
    this.valueToAdd = valueToAdd;
  }

  /**
   * Một loạt các phép tính toán
   * @param currentValue
   */
  execute(currentValue: number): number {
    return (currentValue += this.valueToAdd);
  }

  /**
   * Rollback lại 1 loạt các phép tính toán
   * @param currentValue
   */
  undo(currentValue: number): number {
    return (currentValue -= this.valueToAdd);
  }
}

export class SubtractCommand {
  valueToAdd = 0;
  constructor(valueToAdd: number) {
    this.valueToAdd = valueToAdd;
  }

  execute(currentValue: number): number {
    return (currentValue -= this.valueToAdd);
  }

  undo(currentValue: number): number {
    return (currentValue += this.valueToAdd);
  }
}

export class DivideCommand {
  valueToAdd = 0;
  constructor(valueToAdd: number) {
    this.valueToAdd = valueToAdd;
  }

  execute(currentValue: number): number {
    return (currentValue /= this.valueToAdd);
  }

  undo(currentValue: number): number {
    return (currentValue *= this.valueToAdd);
  }
}

export class MultiplyCommand {
  valueToAdd = 0;
  constructor(valueToAdd: number) {
    this.valueToAdd = valueToAdd;
  }

  execute(currentValue: number): number {
    return (currentValue *= this.valueToAdd);
  }

  undo(currentValue: number): number {
    return (currentValue /= this.valueToAdd);
  }
}
