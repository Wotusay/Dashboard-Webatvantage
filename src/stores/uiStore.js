class UIStore {
    constructor(rootStore) {
        this.timeRangeState = 'day';
        this.rootStore = rootStore;
    }

    setTimeRange = (value) => {
        this.timeRangeState = value;
        this.rootStore.clientStore.setTimeRangeData(value);
    }
}

export default UIStore;