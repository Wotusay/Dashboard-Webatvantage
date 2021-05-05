import ServerService from '../services/ServerService';
import { action, computed, decorate, observable } from 'mobx';

class ServerStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.servers = [];
    this.serverService = new ServerService();
  }

  loadAllServers = async () => {
    const servers = await this.serverService.getAll(); // Calls the getAll function from the class ClientService
    servers.forEach((server) => {
      this.setServer(server);
    });
  };

  setServer = async (server) => {
    let itemExists = this.servers.findIndex((i) => i.name === server.name);
    // To prevent double items in the aray
    if (itemExists === -1) {
      await this.servers.push(server); // Push the item if it isn't in it
    } else {
      return;
    }
  };

  get totalStorage() {
    // Calculates earnings for the whole month
    let numbers = [];
    this.servers.map((server) => {
      return numbers.push(server.diskSpace.available);
    });

    let sum = numbers.reduce((a, b) => {
      return a + b;
    }, 0);

    return sum.toFixed(0);
  }

  get totalStorageUsed() {
    // Calculates earnings for the whole month
    let numbers = [];
    this.servers.map((server) => {
      return numbers.push(server.diskSpace.used);
    });

    let sum = numbers.reduce((a, b) => {
      return a + b;
    }, 0);

    return sum.toFixed(0);
  }

  get totalAvg5Load() {
    let numbers = [];
    this.servers.map((server) => {
      return numbers.push(server.load.avg5);
    });

    let sum = numbers.reduce((a, b) => {
      return (a + b) / numbers.length;
    }, 0);

    return sum.toFixed(2);
  }

  truncateString(str) {
    let num = 4;
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= num) {
      return str;
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + '...';
  }
}

decorate(ServerStore, {
  servers: observable,
  loadAllServers: action,
  totalStorage: computed,
  totalStorageUsed: computed,
  totalAvg5Load: computed
});

export default ServerStore;
