const fs = require('fs');




function timeStampy() {
    // ` Gets the current time
  
    // returns:
    //   string: The time
    // `
    // var date = new Date();
    
    // var year = date.getFullYear();
    // var month = date.getMonth() + 1;
    // month = (month < 10 ? "0" : "") + month;
    // var day  = date.getDate();
    // day = (day < 10 ? "0" : "") + day;
    // var hour = date.getHours();
    // hour = (hour < 10 ? "0" : "") + hour;
    // var min  = date.getMinutes();
    // min = (min < 10 ? "0" : "") + min;
    // var sec  = date.getSeconds();
    // sec = (sec < 10 ? "0" : "") + sec;
  
  
    var date = new Date();
    var dateStr =
      date.getFullYear() + "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
      ("00" + date.getDate()).slice(-2) + " " +
      
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" +
      ("00" + date.getSeconds()).slice(-2);
    // console.log(dateStr);
  
    // return hour + ":" + min + ":" + sec;
    return dateStr
  }



class ChatLogMeDaddy {
    constructor(server, channel, dood, stuffToLog) {

        this.server = server;
        this.channel = channel;
        this.dood = dood;
        this.stuffToLog = stuffToLog;
    }
    /** 
    This function handles logging
     
    parameters:
      level:
        level of logging (DEBUG, WARNING, INFO, ERROR, CRITICAL)
      stuffToLog:
        content to be logged
        */
  
    // var date = new Date();
    // var dateStr =
    //   date.getFullYear() + "-" +
    //   ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
    //   ("00" + date.getDate()).slice(-2) + " " +
      
    //   ("00" + date.getHours()).slice(-2) + ":" +
    //   ("00" + date.getMinutes()).slice(-2) + ":" +
    //   ("00" + date.getSeconds()).slice(-2);
    // console.log(dateStr);
  
    // fs.stat(`./${server}`, function(err) {  
    //   if (err) {
    //      // file does not exist
    //   } else {
    //       // file exists
    //   }



    
  
   logMeDaddy () {
    try {
      fs.appendFileSync(`chatLogs/${this.server}/chatLogs.txt`, `${timeStampy()} - ${this.server} - ${this.channel} - ${this.dood}: ${this.stuffToLog}
  `)
    }
    catch {
      if (!fs.existsSync(`./${this.server}`)){
        fs.mkdirSync(`./${this.server}`);
      }
  
      fs.appendFileSync(`chatLogs/${this.server}/chatLogs.txt`, `${timeStampy()} - ${this.server} - ${this.channel} - ${this.dood}: ${this.stuffToLog}
  `)
      }
    }
    
    
    
  
  
    
    
  // fs.appendFileSync(`${server}/chatLogs.txt`, `${timeStampy()} - ${channel} - ${dood} - ${stuffToLog}
  // `)
  

}

module.exports = ChatLogMeDaddy;