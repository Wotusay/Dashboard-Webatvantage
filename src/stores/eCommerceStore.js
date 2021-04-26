import ClientsService from "../services/ClientsService";
import { computed, decorate, observable } from "mobx";

class eCommerceStore {
    constructor(rootStore) {
        this.rootStore = rootStore; 
        this.eCommerceItems = [];
        this.clientsService = new ClientsService();
    }

    loadAllItems = async () => {
        const items = await this.clientsService.getAll();
        items.forEach(item => {
            this.setItems(item);
    });
    }

    setItems = async (item) => {
        await this.eCommerceItems.push(item);
    }

    get totalEarining() {
        let numbers = [];
        this.eCommerceItems.map(
            item => {
               return numbers.push(item.eCommerceData.totalRevenue)
            }
        )

        let sum = numbers.reduce((a,b) => {
            return a+b;
        },0 ) ;
        return sum.toFixed(2);
    }

    get avgSold() {
        let numbers = []; 
        this.eCommerceItems.map(
            item => {
               return numbers.push(item.eCommerceData.conversions)
            }
        )

        let sum = numbers.reduce((a,b) => {
            return (a+b) / numbers.length
        },0)

        return sum.toFixed(2);
    }
    
    
}

decorate(eCommerceStore, {
    eCommerceItems: observable,
    totalEarining: computed,
    avgSold: computed
  });
export default eCommerceStore;