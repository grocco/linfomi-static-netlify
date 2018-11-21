const w = (() => {
    console.log('typ',typeof window)

    if (typeof window !== 'undefined') {
        return window || {};
    }
    return {
        innerHeight: 1024,
        innerWidth: 1024,
        addEventListener: () => new Promise((resolve, reject) => reject()),
        removeEventListener: () => new Promise((resolve, reject) => reject())
    }
})();

export default w;