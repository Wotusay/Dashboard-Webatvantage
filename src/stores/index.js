import ClientStore from './clientStore';

class RootStore {
    constructor() {
        this.clientStore = new ClientStore(this); // Calls the Clients Store
    }
}

export default RootStore; 