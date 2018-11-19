export const window = (() => {
    if (typeof window !== 'undefined') {
        return {
          innerHeight: 1000,
          innerWidth: 1000
        }
      }
      return window;
})();