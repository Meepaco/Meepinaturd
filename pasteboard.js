const fs = require('fs');
const pbDataVersion = '1'

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
  // console.log('linear search activated')
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
  constructor(alias, date, currentGuild, personWHoAdded, content) {
    this.alias = alias;
    this.date = date;
    // this.descriptor = descriptor;
    this.currentGuild = currentGuild
    this.personWHoAdded = personWHoAdded;
    this.content = content;
  }

  

  evict () {
    /**
     * deletes a paste from the pasteboard
     * read from json, search for entry. Delete the entry, modify the array, then write back to json
     */
    try {
      let obj = {
        version: pbDataVersion,
        table: []
      };
      
      obj = JSON.parse(fs.readFileSync('pasteboardContent.json', 'utf-8'));

      let indexOfPaste = linearSearch(obj.table, this.alias)
      // console.log(indexOfPaste)
      if (indexOfPaste <= -1) { 
        return 'Paste does not exist'
      }
      else {
        // console.log('deleting')
        // console.log(obj.table)
        obj.table.splice(indexOfPaste, 1)
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
      version: pbDataVersion,
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
      version: pbDataVersion,
      table: []
    };
      
    let pasteObject = {
      alias: this.alias,
      date: this.date,
      currentGuild: this.currentGuild,
      author : this.personWHoAdded,
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
        currentGuild: 'guild id',
        author : 'author',
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
      version: pbDataVersion,
      table: []
    };
    let avaliblePastes = ''

    obj = JSON.parse(fs.readFileSync('pasteboardContent.json', 'utf-8')); 
 
    for (const i in obj.table) { // throw alias of each paste in json database into one variable
      avaliblePastes = avaliblePastes + (obj.table[i].alias + '\n')
    }
    return 'Avalible pastes:\n' + avaliblePastes
  }


getInfo () {
  /**
   * retrieves information about a paste from the pasteboard
   */
  try {
    let obj = {
      version: pbDataVersion,
      table: []
    };
    
    obj = JSON.parse(fs.readFileSync('pasteboardContent.json', 'utf-8'));

    let indexOfPaste = linearSearch(obj.table, this.alias)
    // console.log(indexOfPaste)
    if (indexOfPaste <= -1) { 
      return 'Paste does not exist'
    }
    else {
      let infoSpam = `Name: ${obj.table[indexOfPaste].alias} \n Date: ${obj.table[indexOfPaste].date} \n Author: ${(obj.table[indexOfPaste].author).split(' ').slice(0)[0]}`
      return infoSpam
    }
  }

  catch(err) {
    return err
  }
}
}


module.exports = Pasteboard;