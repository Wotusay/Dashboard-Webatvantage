import ClientStore from "./clientStore";
import ServerStore from "./serverStore";
import UIStore from "./uiStore";

class RootStore {
  constructor() {
    this.clientStore = new ClientStore(this); // Calls the Clients Store
    this.serverStore = new ServerStore(this); // Calls the Server Store
    this.uiStore = new UIStore(this);
  }
}

export default RootStore;
