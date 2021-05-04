import ClientsService from '../services/ClientsService';
import { computed, decorate, observable } from 'mobx';

// Store for the clients
class ClientStore {
  constructor(rootStore) {
    this.rootStore = rootStore; // To connect to other stores
    this.eCommerceItems = []; // Array where all items will be in
    this.clientsService = new ClientsService(); // Service for loading all the data
  }

  loadAllItems = async () => {
    const items = await this.clientsService.getAll(); // Calls the getAll function from the class ClientService
    items.forEach((item) => {
      this.setItems(item);
    });
  };

  setItems = async (item) => {
    let itemExists = this.eCommerceItems.findIndex((i) => i.name === item.name); // To prevent double items in the aray
    if (itemExists === -1) {
      await this.eCommerceItems.push(item); // Push the item if it isn't in it
    } else {
      return;
    }
  };

  get totalEarining() {
    let numbers = []; // Arrray for all the nunmbers
    this.eCommerceItems.map((item) => {
      return numbers.push(item.eCommerceData.totalRevenue); // To get all te numbers out of it
    });

    let sum = numbers.reduce((a, b) => {
      // Calculates the sum of all the numbers
      return a + b;
    }, 0);

    return sum.toFixed(2); // Gives the sum with 0.00
  }

  get avgSold() {
    // Calculates the avg sold
    let numbers = [];
    this.eCommerceItems.map((item) => {
      return numbers.push(item.eCommerceData.conversions);
    });

    let sum = numbers.reduce((a, b) => {
      return (a + b) / numbers.length;
    }, 0);

    return sum.toFixed(0);
  }

  get totalEariningMonth() {
    // Calculates earnings for the whole month
    let numbers = [];
    this.eCommerceItems.map((item) => {
      return numbers.push(item.eCommerceData.lastMonthData.totalRevenue);
    });

    let sum = numbers.reduce((a, b) => {
      return a + b;
    }, 0);

    return sum.toFixed(2);
  }

  get avgSoldMonth() {
    // Calculates avg sold for the whole month
    let numbers = [];
    this.eCommerceItems.map((item) => {
      return numbers.push(item.eCommerceData.lastMonthData.conversions);
    });

    let sum = numbers.reduce((a, b) => {
      return (a + b) / numbers.length;
    }, 0);

    return sum.toFixed(0);
  }

  get lengthOfArray() {
    // Gives the lenght of the array
    return this.eCommerceItems.length;
  }

  get totalViews() {
    let numbers = []; // Arrray for all the nunmbers
    this.eCommerceItems.map((item) => {
      return numbers.push(item.analyticsData.pageviews); // To get all te numbers out of it
    });

    let sum = numbers.reduce((a, b) => {
      // Calculates the sum of all the numbers
      return a + b;
    }, 0);

    return sum.toFixed(0); // Gives the sum with 0.00
  }

  get totalUsers() {
    let numbers = []; // Arrray for all the nunmbers
    this.eCommerceItems.map((item) => {
      return numbers.push(item.analyticsData.totalUsers); // To get all te numbers out of it
    });

    let sum = numbers.reduce((a, b) => {
      // Calculates the sum of all the numbers
      return a + b;
    }, 0);

    return sum.toFixed(0); // Gives the sum with 0.00
  }

  get totalSessions() {
    let numbers = []; // Arrray for all the nunmbers
    this.eCommerceItems.map((item) => {
      return numbers.push(item.analyticsData.totalSessions); // To get all te numbers out of it
    });

    let sum = numbers.reduce((a, b) => {
      // Calculates the sum of all the numbers
      return a + b;
    }, 0);

    return sum.toFixed(0); // Gives the sum with 0.00
  }


  get totalLastMonthViews() {
    let numbers = []; // Arrray for all the nunmbers
    this.eCommerceItems.map((item) => {
      return numbers.push(item.analyticsData.lastMonthData.pageviews); // To get all te numbers out of it
    });

    let sum = numbers.reduce((a, b) => {
      // Calculates the sum of all the numbers
      return a + b;
    }, 0);

    return sum.toFixed(0); // Gives the sum with 0.00
  }

  get totalLastMonthUsers() {
    let numbers = []; // Arrray for all the nunmbers
    this.eCommerceItems.map((item) => {
      return numbers.push(item.analyticsData.lastMonthData.totalUsers); // To get all te numbers out of it
    });

    let sum = numbers.reduce((a, b) => {
      // Calculates the sum of all the numbers
      return a + b;
    }, 0);

    return sum.toFixed(0); // Gives the sum with 0.00
  }

  get totalLastMonthSessions() {
    let numbers = []; // Arrray for all the nunmbers
    this.eCommerceItems.map((item) => {
      return numbers.push(item.analyticsData.lastMonthData.totalSessions); // To get all te numbers out of it
    });

    let sum = numbers.reduce((a, b) => {
      // Calculates the sum of all the numbers
      return a + b;
    }, 0);

    return sum.toFixed(0); // Gives the sum with 0.00
  }

  truncateString(str) {
    let num = 13;
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= num) {
      return str;
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + '...';
  }
}

decorate(ClientStore, {
  eCommerceItems: observable,
  totalEarining: computed,
  avgSold: computed,
  totalEariningMonth: computed,
  avgSoldMonth: computed,
  lengthOfArray: computed,
  totalSessions: computed,
  totalUsers: computed,
  totalViews: computed,
  totalLastMonthSessions: computed,
  totalLastMonthUsers: computed,
  totalLastMonthViews: computed,
});

export default ClientStore;
