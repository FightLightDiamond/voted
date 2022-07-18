abstract class Shape {
  width = 0;
  height = 0;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  abstract area();
}

export class Rectangle extends Shape {
  area() {
    return this.width * this.height;
  }
}

export class Square extends Rectangle {
  length = 0;

  constructor(length) {
    super(length, length);
    this.length = length;
  }

  /**
   * Cần override để đảm tính đúng đắn của function
   * @param height
   */
  setHeight(height) {
    this.length = height;
  }

  /**
   * Cần override để đảm tính đúng đắn của function
   * @param width
   */
  setWidth(width) {
    this.length = width;
  }

  area() {
    return Math.pow(this.length, 2);
  }
}
