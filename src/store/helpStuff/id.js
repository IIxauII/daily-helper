function createId() {
    return `DH_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}

export {
    createId,
};
