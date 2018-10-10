class generateGuid {
    static newGuid() {
        let d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now();; //use high-precision timer if available
        }
        let uuid = 'xxxxxxxxxxxxyxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    static newGuid16() {
        let guid32 = generateGuid.newGuid();
        return guid32.substr(0, 16);
    }
}
export default generateGuid;