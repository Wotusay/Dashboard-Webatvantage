

class ClientsService {

    constructor() { 

    }

    getAll = async () => {
        let data =[]; 
       const r = await fetch(`../data/clients.json`);
       const json = await r.json();
       await json.clients.forEach(i => {
          data.push(i);
       });

       return data;
    }


}

export default ClientsService;