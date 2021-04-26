import eCommerceStore from './eCommerceStore';

class RootStore {
    constructor() {
        this.eCommerceStore = new eCommerceStore(this);

    }
}

export default RootStore; 