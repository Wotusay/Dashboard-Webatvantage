import ClientsService from "../services/ClientsService";
import { decorate, observable, action } from "mobx";

class eCommerceStore {
    constructor(rootStore) {
        this.rootStore = rootStore; 
        this.eCommerceItems = [];
        this.clientsService = new ClientsService();
    }

    loadAllItems = async () => {
        const items = await this.clientsService.getAll();
        items.forEach(item => {
        let itemExists = this.eCommerceItems.findIndex(eCommerceItem => eCommerceItem.name === item.name);
        if(itemExists === -1) {
            this.eCommerceItems.push(item);
        }
        else {
            return;
        }
    });
    }
    
    
}

decorate(eCommerceStore, {
    eCommerceItems: observable,
  });
export default eCommerceStore;