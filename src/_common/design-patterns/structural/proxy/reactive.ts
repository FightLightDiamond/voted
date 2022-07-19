const original = { name: 'Reactive...' };

/**
 * Bọc 1 object lại, kiểm soát các phương thức bên trong chúng theo ý muốn
 */
const reactive = new Proxy(original, {
  get(target: { name: string }, key) {
    console.log('Tracking: ', key);
    return target[key];
  },

  set(target: { name: string }, p: string | symbol, value: any): boolean {
    console.log('Update UI');
    return Reflect.set(target, p, value);
  },
});

export { reactive };
