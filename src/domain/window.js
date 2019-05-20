const w = (() => {
    if (typeof window !== 'undefined') {
        return window || {};
    }
    return {
        server: true,
        innerHeight: 1023,
        innerWidth: 1023,
        addEventListener: () => new Promise((resolve, reject) => reject()),
        removeEventListener: () => new Promise((resolve, reject) => reject())
    }
})();

export default w;