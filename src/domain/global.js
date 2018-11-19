export const window = (() => {
    if (typeof window !== 'undefined') {
        return window || {};
    }
    return {
        innerHeight: 1000,
        innerWidth: 1000,
        addEventListener: () => new Promise((resolve, reject) => reject()),
        removeEventListener: () => new Promise((resolve, reject) => reject())
    }
})();