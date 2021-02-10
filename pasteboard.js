const fs = require('fs');

function linearSearch(array, thingToSearch) {
  /**
   * Searches for a thing inside a given array with the linear search method
   * 
   * @param {array} An array
   * @param {float} The number to search for
   * 
   * @return {number} The index of the item in the array
   * @return {number} -1 if the item is not found
   * 
   */
  console.log('linear search activated')
  // console.log(array)
  for (const i in array) {
    // console.log('linear charas')
    // console.log(i)
    // console.log(array[i].alias)
    if (array[i].alias == thingToSearch) {
      return parseInt(i)
    }
  }
  return -1
}

class Pasteboard {
  constructor(alias, date, personWHoAdded, descriptor, content) {
    this.alias = alias;
    this.personWHoAdded = personWHoAdded;
    this.date = date;
    this.descriptor = descriptor;
    this.content = content;
  }

  

  evict () {
    /**
     * deletes a paste from the pasteboard
     * read from json, search for entry. Delete the entry, modify the array, then write back to json
     */
    try {
      let obj = {
        table: []
      };
      
      obj = JSON.parse(fs.readFileSync('pasteboardContent.json', 'utf-8'));

      let evicting = linearSearch(obj.table, this.alias)
      // console.log(evicting)
      if (evicting <= -1) { 
        return 'Paste does not exist'
      }
      else {
        // console.log('deleting')
        // console.log(obj.table)
        obj.table.splice(evicting, 1)
        // console.log(obj.table)
        // console.log('deleted')


        fs.writeFile("./pasteboardContent.json", JSON.stringify(obj, null, 2), (err) => {
          if (err) {
              console.error(err);
              return;
          };
          // console.log("File has been created");
      });

        return 'Successfully deleted from pasteboard'
      }
    }

    catch(err) {
      return err
    }
  }




  paste() {
    /**
     * finds the paste on the pasteboard, send the content
     */
    let obj = {
      table: []
    };

    try {
      obj = JSON.parse(fs.readFileSync('pasteboardContent.json', 'utf-8'));
      // let searchArray = obj.table.find(a => a.alias = "test")
  
      let searchArray = linearSearch(obj.table, this.alias)
      // console.log(this.alias)
      // console.log(obj.table)
      // console.log(searchArray)
      // console.log(obj.table[searchArray].content)

      try { // i might want to revise this part in the future
        return obj.table[searchArray].content
      }
      catch (err) {
        // console.log(err)
        return 'paste does not exist' 
      }
      // return obj.table[searchArray].content
    }

    catch (err) {
      console.log(err)
      return (err)
    }
  }





  copy() {
    /**
     * add a paste to pasteboard
     */

    let obj = {
      table: []
    };
      
    let pasteObject = {
      alias: this.alias,
      date: this.date,
      descriptor: this.descriptor,
      content: this.content
    };

      
    try {
      obj = JSON.parse(fs.readFileSync('pasteboardContent.json', 'utf-8')); 

      let searchArray = linearSearch(obj.table, this.alias)
      // console.log(this.alias)
      // console.log(searchArray)

      if (searchArray <= -1) {
          // console.log(obj)
          // console.log(pasteObject)
        obj.table.push(pasteObject); 
        
        fs.writeFile("./pasteboardContent.json", JSON.stringify(obj, null, 2), (err) => {
          if (err) {
              console.error(err);
              return;
          };
          // console.log("File has been created");
        });
        return 'Added to pasteboard'
      }
      else {
        return 'Paste already exists'
      }
    }

    catch(err) {
      let sampleObject = {
        alias: 'alias',
        date: 'date',
        descriptor: 'descripto',
        content: "content"
      };

      obj.table.push(sampleObject)

      fs.writeFile("./pasteboardContent.json", JSON.stringify(obj, null, 2), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("Pasteboard json has been reset");
      });

      // console.log(err)
      return 'First initilization thingy, please add ur paste again lol'
    }
  }




  listPastes() {
    /**
     * list all avalible pastes
     */
    let obj = {
      table: []
    };
    let avaliblePastes = ''

    obj = JSON.parse(fs.readFileSync('pasteboardContent.json', 'utf-8')); 
 
    for (const i in obj.table) { // throw alias of each paste in json database into one variable
      avaliblePastes = avaliblePastes + (obj.table[i].alias + '\n')
    }
    return 'Avalible pastes:\n' + avaliblePastes
  }
}




module.exports = Pasteboard;