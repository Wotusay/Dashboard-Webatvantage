import ServerService from '../services/ServerService';
import { action, computed, decorate, observable } from 'mobx';
import { CATEGORIES } from '../consts';

class ServerStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.servers = [];
    this.serverService = new ServerService();
    this.firstData = [];
    this.newData = [];
    this.newDataTwo = [];
    this.newDataThree = [];
    this.latestData = [];
    this.categories = rootStore.clientStore.categories;
    this.sectorData = [];
    this.sortedData = [];
  }

  loadAllServers = async () => {
    const servers = await this.serverService.getAll(); // Calls the getAll function from the class ClientService
    servers.forEach((server) => {
      this.setServer(server);
      this.latestData.push(server); // We keep this data for a reference point to compare later
    });

    // Here we call the other files that we need to update
    const newData = await this.serverService.getAllNewData(); // Calls the getAllNewData function from the class ClientService
    const newDataTwo = await this.serverService.getAllAllNewDataTwo(); // Calls the getAllAllNewDataTwo function from the class ClientService
    const newDataThree = await this.serverService.getAllAllNewDataThree(); // Calls the getAllAllNewDataThree function from the class ClientService

    servers.forEach((server) => {
      this.setFirstData(server);
    });

    newData.forEach((server) => {
      this.setNewData(server);
    });

    newDataTwo.forEach((server) => {
      this.setNewDataTwo(server);
    });

    newDataThree.forEach((server) => {
      this.setNewDataThree(server);
    });

    this.sectorMapData();
    this.setDifferentData();
    this.sortData();
  };

  sortData = () => {
    this.sortedData = this.servers.slice().sort((a, b) => {
      const colorOrder = ['red', 'orange', 'green'];
      const getIndexColorOrder = (x) => {
        return colorOrder.indexOf(x.status);
      };

      return (
        getIndexColorOrder(a) - getIndexColorOrder(b) ||
        b.load.current - a.load.current
      );
    });
  };

  updateDataSet = () => {
    // Here we compare the arrays to check wich one is active
    const equals = (a, b) => {
      if (JSON.stringify(a) === JSON.stringify(b)) {
        return true;
      } else {
        return false;
      }
    };

    // Here we set all the new data items in the ECommerce list
    switch (true) {
      case equals(this.servers, this.firstData):
        // We copy the old list into the latestdata so we can reference it later
        this.latestData = this.servers.map((a) => ({ ...a }));
        // Here we set all the new data items in the ECommerce list
        this.servers = this.newData;

        break;
      case equals(this.servers, this.newData):
        this.latestData = this.servers.map((a) => ({ ...a }));
        this.servers = this.newDataTwo;

        break;
      case equals(this.servers, this.newDataTwo):
        this.latestData = this.servers.map((a) => ({ ...a }));
        this.servers = this.newDataThree;

        break;
      case equals(this.servers, this.newDataThree):
        this.latestData = this.servers.map((a) => ({ ...a }));
        this.servers = this.firstData;

        break;
      default:
    }

    this.sortData();
    // After each iteration we need to call the best category to update it
  };

  setDifferentData = () => {
    // Here we call the function every x-sec to give it like a realtime effect
    setInterval(() => {
      this.updateDataSet();
    }, 8000);
  };

  sectorMapData = async () => {
    await this.categories.map((i) => {
      return this.setSectorData(i);
    });
  };

  setSectorData = (item) => {
    let tempObj = {};
    tempObj.name = item;
    tempObj.used = '500GB';
    tempObj.amount = '1000GB';
    tempObj.color =
      item === 'Medisch'
        ? CATEGORIES.colors.medic
        : item === 'Schoenen'
        ? CATEGORIES.colors.shoes
        : item === 'Fashion'
        ? CATEGORIES.colors.fashion
        : item === 'Category 1'
        ? CATEGORIES.colors.category1
        : item === 'Category 2'
        ? CATEGORIES.colors.category2
        : item === 'Category 3'
        ? CATEGORIES.colors.category3
        : item === 'Category 4'
        ? CATEGORIES.colors.category4
        : item === 'Category 5'
        ? CATEGORIES.colors.category5
        : item === 'Category 6'
        ? CATEGORIES.colors.category6
        : CATEGORIES.colors.category6;

    this.sectorData.push(tempObj);
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

  setFirstData = async (item) => {
    let itemExists = this.firstData.findIndex((i) => i.name === item.name); // To prevent double items in the aray
    if (itemExists === -1) {
      await this.firstData.push(item);
    } else {
      return;
    }
  };

  setNewData = async (item) => {
    let itemExists = this.newData.findIndex((i) => i.name === item.name); // To prevent double items in the aray
    if (itemExists === -1) {
      await this.newData.push(item); // Push the item if it isn't in it
    } else {
      return;
    }
  };

  setNewDataTwo = async (item) => {
    let itemExists = this.newDataTwo.findIndex((i) => i.name === item.name); // To prevent double items in the aray
    if (itemExists === -1) {
      await this.newDataTwo.push(item); // Push the item if it isn't in it
    } else {
      return;
    }
  };

  setNewDataThree = async (item) => {
    let itemExists = this.newDataThree.findIndex((i) => i.name === item.name); // To prevent double items in the aray
    if (itemExists === -1) {
      await this.newDataThree.push(item); // Push the item if it isn't in it
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

  get totalLength() {
    return this.servers.length;
  }
}

decorate(ServerStore, {
  servers: observable,
  sortedData: observable,
  sectorData: observable,
  firstData: observable,
  categories: observable,
  newData: observable,
  newDataTwo: observable,
  newDataThree: observable,
  latestData: observable,
  loadAllServers: action,
  totalStorage: computed,
  totalStorageUsed: computed,
  totalAvg5Load: computed,
});

export default ServerStore;
