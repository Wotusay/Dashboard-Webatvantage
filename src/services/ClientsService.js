class ClientsService {
  // Gets all the data
  getAll = async () => {
    let data = []; // Empty array for the loop

    const r = await fetch(`../data/clients.json`); //Loads the data
    const json = await r.json(); // Converts it

    json.clients.forEach((i) => {
      // Loops the items
      data.push(i); // Pushes each item to the data array
    });

    return data; // We return the full data array
  };

  getAllNewData = async () => {
    let data = []; // Empty array for the loop

    const r = await fetch(`../newData/clients.json`); //Loads the data
    const json = await r.json(); // Converts it

    json.clients.forEach((i) => {
      // Loops the items
      data.push(i); // Pushes each item to the data array
    });

    return data; // We return the full data array
  };

  getAllAllNewDataTwo = async () => {
    let data = []; // Empty array for the loop

    const r = await fetch(`../newData2/clients.json`); //Loads the data
    const json = await r.json(); // Converts it

    json.clients.forEach((i) => {
      // Loops the items
      data.push(i); // Pushes each item to the data array
    });

    return data; // We return the full data array
  };

  getAllAllNewDataThree = async () => {
    let data = []; // Empty array for the loop

    const r = await fetch(`../newData3/clients.json`); //Loads the data
    const json = await r.json(); // Converts it

    json.clients.forEach((i) => {
      // Loops the items
      data.push(i); // Pushes each item to the data array
    });

    return data; // We return the full data array
  };
}

export default ClientsService;
