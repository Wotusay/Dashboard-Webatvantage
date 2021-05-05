class ServerService {

    getAll = async () => {
        let data = []; // Empty array for the loop
    
        const r = await fetch(`../data/servers.json`); //Loads the data
        const json = await r.json(); // Converts it
    
        json.servers.forEach((i) => {
          // Loops the items
          data.push(i); // Pushes each item to the data array
        });
    
        return data; // We return the full data array
      };
}

export default ServerService;