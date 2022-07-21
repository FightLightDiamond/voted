/**
 * Thiết lập vòng lặp
 * @param start
 * @param end
 * @param step
 */
function range(start: number, end: number, step = 1) {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (start < end) {
        // do some thing
        start += step;
        return { value: start, done: false };
      }
      return {
        done: true,
        value: end,
      };
    },
  };
}

export { range };
