import ClientStore from "./clientStore";
import ServerStore from "./serverStore";

class RootStore {
  constructor() {
    this.clientStore = new ClientStore(this); // Calls the Clients Store
    this.serverStore = new ServerStore(this); // Calls the Server Store
  }
}

export default RootStore;
