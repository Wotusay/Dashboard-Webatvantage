import ClientsService from '../services/ClientsService';
import { action, computed, decorate, observable } from 'mobx';

// Store for the clients
class ClientStore {
  constructor(rootStore) {
    this.rootStore = rootStore; // To connect to other stores
    this.eCommerceItems = []; // Array where all items will be in
    this.clientsService = new ClientsService(); // Service for loading all the data
    this.categoryTotal = [];
    this.firstData = [];
    this.newData = [];
    this.newDataTwo = [];
    this.newDataThree = [];
    this.latestData = [];
    this.categories = [];
    this.loaded = false;
    this.latestNumbers = [];
  }

  loadAllItems = async () => {
    // This is our start datt
    const items = await this.clientsService.getAll(); // Calls the getAll function from the class ClientService

    items.forEach((item) => {
      this.setItems(item);
      this.setCategories(item);
      this.latestData.push(item); // We keep this data for a reference point to compare later
    });

    // Here we call the other files that we need to update
    const newData = await this.clientsService.getAllNewData(); // Calls the getAllNewData function from the class ClientService
    const newDataTwo = await this.clientsService.getAllAllNewDataTwo(); // Calls the getAllAllNewDataTwo function from the class ClientService
    const newDataThree = await this.clientsService.getAllAllNewDataThree(); // Calls the getAllAllNewDataThree function from the class ClientService

    items.forEach((item) => {
      this.setFirstData(item);
    });

    newData.forEach((item) => {
      this.setNewData(item);
    });

    newDataTwo.forEach((item) => {
      this.setNewDataTwo(item);
    });

    newDataThree.forEach((item) => {
      this.setNewDataThree(item);
    });

    this.setDifferentData();
    this.getAllLatestNumbers();
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
    if (this.loaded) {
      // Here we set all the new data items in the ECommerce list
      switch (true) {
        case equals(this.eCommerceItems, this.firstData):
          // We copy the old list into the latestdata so we can reference it later
          this.latestData = this.eCommerceItems.map((a) => ({ ...a }));
          // Here we set all the new data items in the ECommerce list
          this.eCommerceItems = this.newData;
          break;
        case equals(this.eCommerceItems, this.newData):
          this.latestData = this.eCommerceItems.map((a) => ({ ...a }));
          this.eCommerceItems = this.newDataTwo;
          break;
        case equals(this.eCommerceItems, this.newDataTwo):
          this.latestData = this.eCommerceItems.map((a) => ({ ...a }));
          this.eCommerceItems = this.newDataThree;
          break;
        case equals(this.eCommerceItems, this.newDataThree):
          this.latestData = this.eCommerceItems.map((a) => ({ ...a }));
          this.eCommerceItems = this.firstData;
          break;
        default:
      }
    } else {
      return;
    }

    // After each iteration we need to call the best category to update it
    this.bestEaringCategory();
    this.getAllLatestNumbers();
  };

  setCategories = async (item) => {
    let itemExists = this.categories.findIndex((i) => i === item.category); // To prevent double items in the aray
    if (itemExists === -1) {
      await this.categories.push(item.category);
    } else {
      return;
    }
  };

  setDifferentData = () => {
    // Here we call the function every x-sec to give it like a realtime effect
    this.interval = setInterval(() => {
      this.updateDataSet();
    }, 7000);
  };


  setTimeRangeData = (value) => {
    clearInterval(this.interval);

    switch (true) {
      case value === 'day':
        // We copy the old list into the latestdata so we can reference it later
        this.latestData = this.eCommerceItems.map((a) => ({ ...a }));
        // Here we set all the new data items in the ECommerce list
        this.eCommerceItems = this.firstData;
        break;
      case value === 'week':
        this.latestData = this.eCommerceItems.map((a) => ({ ...a }));
        this.eCommerceItems = this.newDataTwo;
        break;
      case value === 'month':
        this.latestData = this.eCommerceItems.map((a) => ({ ...a }));
        this.eCommerceItems = this.newDataThree;
        break;
      default:
    }

    this.bestEaringCategory();
    this.getAllLatestNumbers();
    this.setDifferentData()
    
  };

  setItems = async (item) => {
    let itemExists = this.eCommerceItems.findIndex((i) => i.name === item.name); // To prevent double items in the aray
    if (itemExists === -1) {
      await this.eCommerceItems.push(item); // Push the item if it isn't in it
    } else {
      return;
    }

    this.bestEaringCategory();
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

  bestEaringCategory = async () => {
    const fashion = []; // Hier komen alle waarde in terecht
    const shoes = [];
    const medic = [];
    // Dit object sturen we dan terug naar de globale
    let biggestOne = { category: '', total: 0 };

    // Hier zitten dan alle totale nummers in
    let fashionTotal;
    let shoesTotal;
    let medicTotal;

    // Hier kijken we welke category  het item heeft en sturen we heel het object mee
    await this.eCommerceItems.map((i) => {
      switch (i.category) {
        case 'Schoenen':
          shoes.push(i);
          break;
        case 'Medisch':
          medic.push(i);
          break;
        case 'Fashion':
          fashion.push(i);
          break;
        default:
        // code block
      }

      return ''; //We moeten altijd een return sturern met de map omn geen errors
      // inde console te maken
    });

    // Hier bereken we de waardes samen met de volledige array die we juist
    // Hebbben gevuld
    fashionTotal = await this.sum(fashion);
    shoesTotal = await this.sum(shoes);
    medicTotal = await this.sum(medic);

    // Hier kijken we welke er groter is zodat we de juist data kunnen doorsturen
    switch (true) {
      case fashionTotal > shoesTotal && fashionTotal > medicTotal:
        biggestOne.category = 'Fashion';
        biggestOne.total = fashionTotal;
        break;
      case shoesTotal > fashionTotal && shoesTotal > medicTotal:
        biggestOne.category = 'Fashion';
        biggestOne.total = fashionTotal;
        break;

      case medicTotal > shoesTotal && medicTotal > fashionTotal:
        biggestOne.category = 'Medic';
        biggestOne.total = medicTotal;
        break;
      default:
    }
    // Hier zorgen we err voor dat er altijd maar 1 item in de globale zit.
    if (this.categoryTotal.length >= 1) {
      this.categoryTotal = [];
      this.categoryTotal = biggestOne;
    } else {
      this.categoryTotal = biggestOne;
    }
  };

  getAllLatestNumbers = () => {
    let totalConversionsNumbers = [];
    let totalEarningNumbers = [];
    let totalPageViewsNumbers = [];
    let totalSessionsNumbers = [];
    let totalUsersNumbers = [];

    this.latestData.map((item) => {
      return totalEarningNumbers.push(item.eCommerceData.totalRevenue);
    });

    this.latestData.map((item) => {
      return totalPageViewsNumbers.push(item.analyticsData.pageviews);
    });

    this.latestData.map((item) => {
      return totalSessionsNumbers.push(item.analyticsData.totalSessions);
    });

    this.latestData.map((item) => {
      return totalUsersNumbers.push(item.analyticsData.totalUsers);
    });

    this.latestData.map((item) => {
      return totalConversionsNumbers.push(item.eCommerceData.conversions);
    });

    const sum = (array) => {
      let s = array.reduce((a, b) => {
        return a + b;
      }, 0);

      return s.toFixed(2);
    };

    const sumForAnalytics = (array) => {
      let s = array.reduce((a, b) => {
        return a + b;
      }, 0);

      return s.toFixed(0);
    };

    const avg = (array) => {
      let s = array.reduce((a, b) => {
        return (a + b) / array.length;
      }, 0);

      return s.toFixed(0);
    };

    const totalLatestEarnings = sum(totalEarningNumbers);
    const totalLatestConversions = avg(totalConversionsNumbers);
    const totalLatestUsers = sumForAnalytics(totalUsersNumbers);
    const totalLatestSessions = sumForAnalytics(totalSessionsNumbers);
    const totalLatestViews = sumForAnalytics(totalPageViewsNumbers);

    let tempObj = {
      totalLatestEarnings: parseInt(totalLatestEarnings),
      totalLatestConversions: parseInt(totalLatestConversions),
      totalLatestUsers: parseInt(totalLatestUsers),
      totalLatestSessions: parseInt(totalLatestSessions),
      totalLatestViews: parseInt(totalLatestViews),
    };

    this.latestNumbers = tempObj;
  };

  sum = async (array) => {
    let numbers = []; // Arrray for all the nunmbers
    array.map((item) => {
      return numbers.push(item.eCommerceData.totalRevenue); // To get all te numbers out of it
    });

    let sum = await numbers.reduce((a, b) => {
      return a + b;
    }, 0);

    return sum;
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
  latestData: observable,
  latestNumbers: observable,
  loaded: observable,
  categories: observable,
  eCommerceItems: observable,
  firstData: observable,
  newData: observable,
  newDataTwo: observable,
  newDataThree: observable,
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
  bestEaringCategory: action,
  categoryTotal: observable,
});

export default ClientStore;
