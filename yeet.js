const version = 'v1.3b1'
const whatTheJsonVersionShouldBeForThisVersonOfTheBot = '1.2'
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./Renograde.json');
const prefix = config.bot.prefix;
const osu = require('node-os-utils');
const os = require('os');
const fs = require('fs');

// Setting Up
// install node, then: 
// npm install discord.js
// npm install node-os-utils 

// Go to Retrograde.json and do your token, owner id, channel id stuff.
// https://www.youtube.com/watch?v=nrD7rzidZ84 <-- fix nuking when internet loss hopefully
// return this.reconnect()          dsicord.js/scr/client/websocket/packets/websocketconnections.js

// rate limiter gang
const sloTFdownDab = new Set();
const sloTFdownDaily = new Set();
const antiSpam = new Set();
const antiSpamEcon = new Set();
const sloTFdownStalk = new Set();
// const sloTFdownSpam = new Set();



function timer(callback, delay) {
  var id, started, remaining = delay, running

  this.start = function() {
      running = true
      started = new Date()
      id = setTimeout(callback, remaining)
  }
  this.pause = function() {
      running = false
      clearTimeout(id)
      remaining -= new Date() - started
  }
  this.getTimeLeft = function() {
      if (running) {
          this.pause()
          this.start()
      }
      return remaining

  }
  this.getStateRunning = function() {
      return running
  }
  this.start()
}


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


function sleep(ms) {
  `This function haults execution for a defined amount of time
  
  parameters: 
    ms: time in ms
    
    returns:
      a promise`
  return new Promise(resolve => setTimeout(resolve, ms));
}

function clientUptime() { 
  `This function gets the uptime of the bot
  
  returns:
    day, hour, min, sec
      uptime
    hour, min, sec
      uptime
    min, sec
      uptime
    sec
      uptime`

  var totalSeconds = (client.uptime / 1000);
  var days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  var hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = totalSeconds % 60;
  
  if (client.uptime >= 86400000) { //day
    return `${days} days, ${hours} hr, ${minutes} min, ${Math.round(seconds)} sec`
  }

  else if (client.uptime >= 3600000) { //hour
    return `${hours} hr, ${minutes} min, ${Math.round(seconds)} sec`
  }

  else if (client.uptime >= 60000) { // minute
    return `${minutes} min, ${Math.round(seconds)} sec`
  }

  else if (client.uptime >= 1000) { //second
    return `${Math.round(seconds)} sec`
  }
}

function timeParse(time) { 

  var totalSeconds = (time / 1000);
  var days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  var hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = totalSeconds % 60;

  if (time >= 86400000) { //day
    return `${days} days, ${hours} hr, ${minutes} min, ${Math.round(seconds)} sec`
  }

  else if (time >= 3600000) { //hour
    return `${hours} hr, ${minutes} min, ${Math.round(seconds)} sec`
  }

  else if (time >= 60000) { // minute
    return `${minutes} min, ${Math.round(seconds)} sec`
  }

  else if (time >= 1000) { //second
    return `${Math.round(seconds)} sec`
  }
}


// this monstrocity...


// function richEmbed(whichOneToUse, usersName, usersNameURL, title, description, colour, field1Name, field1, field2Name, field2, field3Name, field3, field4Name, field4, field5Name, field5, field6Name, field6) {
//   `This function handles the formatting of rich embed messages
  
//   Parameters:
//     whichOneToUse:
//       define which of the formats to use
//     userName:
//       user to display
//     usersNameURL:
//       user's profile picture/picture
//     title:
//       title of msg
//     description
//       the message, usually when there is no fields in use
//     colour:
//       colour number code thingy of teh righ embed
//     field#Name: 
//       title of the field
//     field#:
//       the message

//     returns:
//       alot to type here that i dont want to. A better system is needed here...
//     `

//   if (whichOneToUse == 'desc')  { //desc only
//     embedded = ({embed: {
//       color: colour,
//       author: {
//         name: usersName,
//         icon_url: usersNameURL
//       },
//       description: description,
      
//       timestamp: new Date(),
//       footer: {
//         text: "A sketchy discord bot by Meepco"
//         }
//       }
//     });
//     return embedded
//   }

//   else if (whichOneToUse == 'title') { // title only

//     embedded = ({embed: {
//       color: colour,
//       author: {
//         name: usersName,
//         icon_url: usersNameURL
//       },
//       title: title,
     
//       timestamp: new Date(),
//       footer: {
//         text: "A sketchy discord bot by Meepco"
//       }
//     }
//   });
//   }

//   else if (whichOneToUse == 'title-desc') { // title and disc

//     embedded = ({embed: {
//       color: colour,
//       author: {
//         name: usersName,
//         icon_url: usersNameURL
//       },
//       title: title,
//       description: description,
    
//       timestamp: new Date(),
//       footer: {
//         text: "A sketchy discord bot by Meepco"
//       }
//     }
//   });
//   }

//   else if (whichOneToUse == 'title-desc-field') { //title, desc, 1 field
//     embedded = ({embed: {
//       color: colour,
//       author: {
//         name: usersName,
//         icon_url: usersNameURL
//       },
//       title: title,

//       description: description,
//       fields: [{
//           name: field1Name,
//           value: field1
//         },
//       ],
//       timestamp: new Date(),
//       footer: {
//         text: "A sketchy discord bot by Meepco"
//       }
//     }
//   });
//   return embedded
//   }

//   else if (whichOneToUse == 'title-field') { //title, NO DESC, 1 field
//     embedded = ({embed: {
//       color: colour,
//       author: {
//         name: usersName,
//         icon_url: usersNameURL
//       },
//       title: title,

//       fields: [{
//           name: field1Name,
//           value: field1
//         },
//       ],
//       timestamp: new Date(),
//       footer: {
//         text: "A sketchy discord bot by Meepco"
//       }
//     }
//   });
//   return embedded
//   }

//   else if (whichOneToUse == 'title-desc-field-field') { // title, desc, 2 fields
//     embedded = ({embed: {
//       color: colour,
//       author: {
//         name: usersName,
//         icon_url: usersNameURL
//       },
//       title: title,
//       // url: "",
//       description: description,
//       fields: [{
//           name: field1Name,
//           value: field1
//         },
//         {
//           name: field2Name,
//           value: field2
//         },
//       ],
//       timestamp: new Date(),
//       footer: {
//         text: "A sketchy discord bot by Meepco"
//       }
//     }
//   });
//   return embedded

//   }

//   else if (whichOneToUse == 'title-field-field') { // title, NO desc, 2 fields
//     embedded = ({embed: {
//       color: colour,
//       author: {
//         name: usersName,
//         icon_url: usersNameURL
//       },
//       title: title,
    
//       fields: [{
//           name: field1Name,
//           value: field1
//         },
//         {
//           name: field2Name,
//           value: field2
//         },
//       ],
//       timestamp: new Date(),
//       footer: {
//         text: "A sketchy discord bot by Meepco"
//       }
//     }
//   });
//   return embedded

//   }

//   else if (whichOneToUse == 'title-field-field-field-field') { // title, NO desc, 2 fields
//     embedded = ({embed: {
//       color: colour,
//       author: {
//         name: usersName,
//         icon_url: usersNameURL
//       },
//       title: title,
    
//       fields: [{
//           name: field1Name,
//           value: field1
//         },
//         {
//           name: field2Name,
//           value: field2
//         },
//         {
//           name: field3Name,
//           value: field3
//         },
//         {
//           name: field4Name,
//           value: field4
//         },
//       ],
//       timestamp: new Date(),
//       footer: {
//         text: "A sketchy discord bot by Meepco"
//       }
//     }
//   });
//   return embedded

//   }

//   else if (whichOneToUse == 'title-desc-field-field-field') { // title, NO desc, 2 fields
//     embedded = ({embed: {
//       color: colour,
//       author: {
//         name: usersName,
//         icon_url: usersNameURL
//       },
//       title: title,
//       description: description,
    
//       fields: [{
//           name: field1Name,
//           value: field1
//         },
//         {
//           name: field2Name,
//           value: field2
//         },
//         {
//           name: field3Name,
//           value: field3
//         },
//       ],
//       timestamp: new Date(),
//       footer: {
//         text: "A sketchy discord bot by Meepco"
//       }
//     }
//   });
//   return embedded

//   }

//   else if (whichOneToUse == 'title-desc-field-field-field-field') { // title, NO desc, 2 fields
//     embedded = ({embed: {
//       color: colour,
//       author: {
//         name: usersName,
//         icon_url: usersNameURL
//       },
//       title: title,
//       description: description,
    
//       fields: [{
//           name: field1Name,
//           value: field1
//         },
//         {
//           name: field2Name,
//           value: field2
//         },
//         {
//           name: field3Name,
//           value: field3
//         },
//         {
//           name: field4Name,
//           value: field4
//         },
//       ],
//       timestamp: new Date(),
//       footer: {
//         text: "A sketchy discord bot by Meepco"
//       }
//     }
//   });
//   return embedded

//   }
//   else if (whichOneToUse == 'title-desc-field-field-field-field-field-field') { // title, desc, 6 fields
//   embedded = ({embed: {
//         color: colour,
//         author: {
//           name: usersName,
//           icon_url: usersNameURL
//         },
//         title: title,
//         // url: "",
//         description: description,
//         fields: [{
//             name: field1Name,
//             value: field1
//           },
//           {
//             name: field2Name,
//             value: field2
//           },
//           {
//             name: field3Name,
//             value: field3
//           },
//           {
//             name: field4Name,
//             value: field4
//           },
//           {
//             name: field5Name,
//             value: field5
//           },
//           {
//             name: field6Name,
//             value: field6
//           }
//         ],
//         timestamp: new Date(),
//         footer: {
//           text: "A sketchy discord bot by Meepco"
//         }
//       }
//     });
//   return embedded
//   }
// }


function richEmbed(whichOneToUse, usersName, usersNameURL, title, description, colour, field1Name, field1, field2Name, field2, field3Name, field3, field4Name, field4, field5Name, field5, field6Name, field6) {
  `This function handles the formatting of rich embed messages
  
  Parameters:
    whichOneToUse:
      define which of the formats to use
    userName:
      user to display
    usersNameURL:
      user's profile picture/picture
    title:
      title of msg
    description
      the message, usually when there is no fields in use
    colour:
      colour number code thingy of teh righ embed
    field#Name: 
      title of the field
    field#:
      the message

    returns:
      alot to type here that i dont want to. A better system is needed here...
    `

  if (description != undefined && title == undefined && field1Name == undefined && field1 == undefined && field2Name == undefined && field2 == undefined && field3Name == undefined && field3 == undefined && field4Name == undefined && field4 == undefined && field5Name == undefined && field5 == undefined && field6Name == undefined && field6 == undefined)  { //desc only
    embedded = ({embed: {
      color: colour,
      author: {
        name: usersName,
        icon_url: usersNameURL
      },
      description: description,
      
      timestamp: new Date(),
      footer: {
        text: "A sketchy discord bot by Meepco"
        }
      }
    });
    return embedded
  }

  else if (title != undefined && description == undefined && field1Name == undefined && field1 == undefined && field2Name == undefined && field2 == undefined && field3Name == undefined && field3 == undefined && field4Name == undefined && field4 == undefined && field5Name == undefined && field5 == undefined && field6Name == undefined && field6 == undefined) { // title only

    embedded = ({embed: {
      color: colour,
      author: {
        name: usersName,
        icon_url: usersNameURL
      },
      title: title,
     
      timestamp: new Date(),
      footer: {
        text: "A sketchy discord bot by Meepco"
      }
    }
  });
  }

  else if (title != undefined && description != undefined && field1Name == undefined && field1 == undefined && field2Name == undefined && field2 == undefined && field3Name == undefined && field3 == undefined && field4Name == undefined && field4 == undefined && field5Name == undefined && field5 == undefined && field6Name == undefined && field6 == undefined) { // title and disc

    embedded = ({embed: {
      color: colour,
      author: {
        name: usersName,
        icon_url: usersNameURL
      },
      title: title,
      description: description,
    
      timestamp: new Date(),
      footer: {
        text: "A sketchy discord bot by Meepco"
      }
    }
  });
  }

  else if (title != undefined && description != undefined && field1Name != undefined && field1 != undefined && field2Name == undefined && field2 == undefined && field3Name == undefined && field3 == undefined && field4Name == undefined && field4 == undefined && field5Name == undefined && field5 == undefined && field6Name == undefined && field6 == undefined) { //title, desc, 1 field
    embedded = ({embed: {
      color: colour,
      author: {
        name: usersName,
        icon_url: usersNameURL
      },
      title: title,

      description: description,
      fields: [{
          name: field1Name,
          value: field1
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "A sketchy discord bot by Meepco"
      }
    }
  });
  return embedded
  }

  else if (title != undefined && field1 != undefined && field1Name != undefined && description == undefined && field2Name == undefined && field2 == undefined && field3Name == undefined && field3 == undefined && field4Name == undefined && field4 == undefined && field5Name == undefined && field5 == undefined && field6Name == undefined && field6 == undefined) { //title, NO DESC, 1 field
    embedded = ({embed: {
      color: colour,
      author: {
        name: usersName,
        icon_url: usersNameURL
      },
      title: title,

      fields: [{
          name: field1Name,
          value: field1
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "A sketchy discord bot by Meepco"
      }
    }
  });
  return embedded
  }

  else if (title != undefined && description != undefined && field1 != undefined && field1Name != undefined && field2 != undefined && field2Name != undefined && field3Name == undefined && description == undefined && field3 == undefined && field4Name == undefined && field4 == undefined && field5Name == undefined && field5 == undefined && field6Name == undefined && field6 == undefined ) { // title, desc, 2 fields
    embedded = ({embed: {
      color: colour,
      author: {
        name: usersName,
        icon_url: usersNameURL
      },
      title: title,
      // url: "",
      description: description,
      fields: [{
          name: field1Name,
          value: field1
        },
        {
          name: field2Name,
          value: field2
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "A sketchy discord bot by Meepco"
      }
    }
  });
  return embedded

  }

  else if (title != undefined && field1Name != undefined && field1 != undefined && field2Name != undefined && field2 != undefined && field3Name == undefined && field3 == undefined && field4Name == undefined && field4 == undefined && field5Name == undefined && field5 == undefined && field6Name == undefined && field6 == undefined) { // title, NO desc, 2 fields
    embedded = ({embed: {
      color: colour,
      author: {
        name: usersName,
        icon_url: usersNameURL
      },
      title: title,
    
      fields: [{
          name: field1Name,
          value: field1
        },
        {
          name: field2Name,
          value: field2
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "A sketchy discord bot by Meepco"
      }
    }
  });
  return embedded

  }

  else if (title != undefined && field1Name != undefined && field1 != undefined && field2Name != undefined && field2 != undefined && field3Name != undefined && field3 != undefined && field4Name != undefined && field4 != undefined && description == undefined && field5Name == undefined && field5 == undefined && field6 == undefined && field6Name == undefined) { // title, NO desc, 2 fields
    embedded = ({embed: {
      color: colour,
      author: {
        name: usersName,
        icon_url: usersNameURL
      },
      title: title,
    
      fields: [{
          name: field1Name,
          value: field1
        },
        {
          name: field2Name,
          value: field2
        },
        {
          name: field3Name,
          value: field3
        },
        {
          name: field4Name,
          value: field4
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "A sketchy discord bot by Meepco"
      }
    }
  });
  return embedded

  }

  else if (title != undefined && description != undefined && field1Name != undefined && field1 != undefined && field2Name != undefined && field2 != undefined && field3Name != undefined && field3 != undefined && field5Name == undefined && field5 == undefined && field6 == undefined && field6Name == undefined && field4 == undefined && field4Name == undefined) { // title, NO desc, 2 fields
    embedded = ({embed: {
      color: colour,
      author: {
        name: usersName,
        icon_url: usersNameURL
      },
      title: title,
      description: description,
    
      fields: [{
          name: field1Name,
          value: field1
        },
        {
          name: field2Name,
          value: field2
        },
        {
          name: field3Name,
          value: field3
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "A sketchy discord bot by Meepco"
      }
    }
  });
  return embedded

  }

  else if (title != undefined && description != undefined && field1Name != undefined && field1 != undefined && field2Name != undefined && field2 != undefined && field3Name != undefined && field3 != undefined && field4 != undefined && field4Name != undefined && field5Name == undefined && field5 == undefined && field6 == undefined && field6Name == undefined) { // title, NO desc, 2 fields
    embedded = ({embed: {
      color: colour,
      author: {
        name: usersName,
        icon_url: usersNameURL
      },
      title: title,
      description: description,
    
      fields: [{
          name: field1Name,
          value: field1
        },
        {
          name: field2Name,
          value: field2
        },
        {
          name: field3Name,
          value: field3
        },
        {
          name: field4Name,
          value: field4
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "A sketchy discord bot by Meepco"
      }
    }
  });
  return embedded

  }
  else if (title != undefined && description != undefined && field1Name, field1 != undefined && field2Name != undefined && field2 != undefined && field3Name != undefined && field3 != undefined && field4 != undefined && field4Name != undefined && field5Name != undefined && field5 != undefined && field6 != undefined && field6Name != undefined) { // title, desc, 6 fields
  embedded = ({embed: {
        color: colour,
        author: {
          name: usersName,
          icon_url: usersNameURL
        },
        title: title,
        // url: "",
        description: description,
        fields: [{
            name: field1Name,
            value: field1
          },
          {
            name: field2Name,
            value: field2
          },
          {
            name: field3Name,
            value: field3
          },
          {
            name: field4Name,
            value: field4
          },
          {
            name: field5Name,
            value: field5
          },
          {
            name: field6Name,
            value: field6
          }
        ],
        timestamp: new Date(),
        footer: {
          text: "A sketchy discord bot by Meepco"
        }
      }
    });
  return embedded
  }
}


function logme(level, stuffToLog) {
  `This function handles logging
  
  parameters:
    level:
      level of logging (DEBUG, WARNING, INFO, ERROR, CRITICAL)
    stuffToLog:
      content to be logged`

  var date = new Date();
  var dateStr =
    date.getFullYear() + "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
    ("00" + date.getDate()).slice(-2) + " " +
    
    ("00" + date.getHours()).slice(-2) + ":" +
    ("00" + date.getMinutes()).slice(-2) + ":" +
    ("00" + date.getSeconds()).slice(-2);
  // console.log(dateStr);
  
fs.appendFileSync('logs.txt', `${dateStr} - ${level} - ${stuffToLog}
`)
}


function chatLogme(server, channel, dood, stuffToLog) {
  `This function handles logging
   
  parameters:
    level:
      level of logging (DEBUG, WARNING, INFO, ERROR, CRITICAL)
    stuffToLog:
      content to be logged`

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

  try {
    fs.appendFileSync(`${server}/chatLogs.txt`, `${timeStampy()} - ${server} - ${channel} - ${dood}: ${stuffToLog}
`)
  }
  catch {
    if (!fs.existsSync(`./${server}`)){
      fs.mkdirSync(`./${server}`);
    }

    fs.appendFileSync(`${server}/chatLogs.txt`, `${timeStampy()} - ${server} - ${channel} - ${dood}: ${stuffToLog}
`)
    }


  
  
  


  
  
// fs.appendFileSync(`${server}/chatLogs.txt`, `${timeStampy()} - ${channel} - ${dood} - ${stuffToLog}
// `)
}
// function balReset(usriD) {
//   `this function is used to reset balence so i dont have to spam this everywhere in econ`
//   fs.writeFileSync(`./moneys/${usriD}.txt`, `ur_money= 0`)
//   recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `Account created, use **${prefix}bal** reset to reset your balence.`, 2727567))
//   logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Created account`)
// }











//loading
client.on('ready', () => {

  fs.appendFileSync('logs.txt', `

`)
  logme('INFO', `Booting... 

Bot Version:  ${version}
JSON Version: ${config.bot.jsonVersion} (expected: ${whatTheJsonVersionShouldBeForThisVersonOfTheBot})
Node Version:  ${process.version}
Servers:`)

  console.log("Connected as " + client.user.tag)
  console.log("Servers:")  
  client.guilds.cache.forEach((guild) => {
  console.log(" - " + guild.name)

  fs.appendFileSync('logs.txt', `- ${guild.name}
`)

  // console.log("**Channels**")  
  // guild.channels.forEach((channel) => {  
  // console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`) 
  //        })         
  })   


  var generalChannel = client.channels.cache.get(config.bot.testingChannel) // testing channel ID
  generalChannel.send(richEmbed('desc' ,client.user.username, client.user.avatarURL, undefined,'I is the online',3447003))

  console.log(`--------------------------
the prefix is: ${config.bot.prefix}  
bot: ${version}
JSON: ${config.bot.jsonVersion} (expected: ${whatTheJsonVersionShouldBeForThisVersonOfTheBot})
node: ${process.version}
-----finished loading-----`)

  if (config.bot.jsonVersion != whatTheJsonVersionShouldBeForThisVersonOfTheBot) {
    generalChannel.send('JSON version mismatch, you may run into issues')
    logme('ERROR', 'JSON version mismatch, you may run into issues')
  }

  if (config.bot.usePresense == "true") {
    logme('DEBUG', 'Setting up presense')
    client.user.setStatus('available')
      client.user.setPresence({
          game: {
              name: config.bot.presenseMsg,
              type: "PLAYING",
              // url: "https://www.google.ca"
          }
      });
    logme('DEBUG', 'Done setting up presense')
    console.log('Presense enabled')
  }

  logme('INFO', 'Boot completed')
})



//General commands
client.on('message', async recMsg => {
  if (recMsg.author == client.user) {
    return
  }
  if (antiSpam.has(recMsg.author.id)) { // rate limit the whole thing, 1 sec
    // recMsg.channel.send("No u (Rate limited)");
  } 
  else {


    var helpGaneral = `
**ping:** Gets latency.
**help:** Shows this message.
**info:** shows bot info
**alt f4:** just dont...
**invite:** Get a bot invite link`
    var helpMessage = `**essay:** Best roast
**bwah:** A simple wall of text
**skelly:** Totally not NSFW...`
    var helpEcon = `**reset bal:** Resets balance
**bal <user>:** Check balance
**pay <user> <amount>:** Pay someone
**gamble <number>:** Try your luck...
**dab:** Hit a dab!
**stalk:** A high risk indecency, for high rewards...`
    
    if (recMsg.content.toLowerCase() == prefix + ('help-depricated')) {
      recMsg.channel.send("**Removed/disable commands** \n`yeet <member> <reason>: kicks member\nban <member> <reason>: bans member\n**spam <amount> <thing>:** Spams user defined message (x) number of times, 100 max (DO NOT SPAM WITHOUT MESSAGE)`")

    }
    
  
    if (recMsg.content.toLowerCase() == prefix + ('info')) {
      var bytesToMB = 1 / 1048576  
      // var memusg = process.memoryUsage()
      // console.log(os.loadavg())
      // console.log(os.hostname())
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      
      osu.cpu.usage()
      .then(usg => {
        
        recMsg.channel.send(richEmbed('title-field-field-field-field', recMsg.member.user.username, recMsg.member.user.avatarURL, "Bot Info", undefined, 13691445, 'Uptime', clientUptime(), 
        
        'Bot', `Version: ${version}
Node: ${process.version}
Memory Usg: ${Math.round(used * 100) / 100} MB`, 

        'CPU', 
`**CPU:** ${osu.cpu.model()} (${os.arch()}), ${osu.cpu.count()} core(s) 
**Utilization:** ${usg}% (${os.loadavg()})
`,

        'Other',
`**OS:** ${os.type} (${os.platform()})
**RAM:** ${parseInt(os.totalmem * bytesToMB) - parseInt(os.freemem * bytesToMB)}/${parseInt(os.totalmem * bytesToMB)} MB (${(((parseInt(os.totalmem * bytesToMB) - parseInt(os.freemem * bytesToMB)) / parseInt(os.totalmem * bytesToMB))* 100).toFixed(2)}% usage)
`))
      })
    }

    if (recMsg.content.toLowerCase() == prefix + ("essay")) {
        recMsg.channel.send(config.bot.essay)
        logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "essay"`)
    }

    if (recMsg.content.toLowerCase() == prefix + ("bwah")) {
        recMsg.channel.send(config.bot.bwah)
        logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "bwah"`)
    }

    if (recMsg.content.toLowerCase() == prefix + 'skelly') {
      recMsg.channel.send(`░░░░░░▄▄▄░░▄██▄░░░ 
░░░░░▐▀█▀▌░░░░▀█▄░░░ 
░░░░░▐█▄█▌░░░░░░▀█▄░░ 
░░░░░░▀▄▀░░░▄▄▄▄▄▀▀░░ 
░░░░▄▄▄██▀▀▀▀░░░░░░░ 
░░░█▀▄▄▄█░▀▀░░ 
░░░▌░▄▄▄▐▌▀▀▀░░ 
▄░▐░░░▄▄░█░▀▀ ░░ 
▀█▌░░░▄░▀█▀░▀ ░░
░░░░░░░▄▄▐▌▄▄░░░ 
░░░░░░░▀███▀█░▄██░                                        ██
░░░░░░▐▌▀▄████████████████████████
░░░░░░▐▀░░░░░░▐▌██░                                     ██
░░░░░░█░░░░░░░░█░░░░░░░
░░░░░░█░░░░░░░░█░░░░░░░
░░░░░░█░░░░░░░░█░░░░░░░░░
░░░░ ▄██▄░░░░░ ▄██▄░░░░░░░`)
      logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "skelly"`)
    }

    if (recMsg.content.toLowerCase() == prefix + ("essay")) {
      recMsg.channel.send(config.bot.essay)
      logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "essay"`)
  }

    if (recMsg.content.toLowerCase() == prefix + "ping") {
      const msg = await recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, 'HoW baD iS yOuR IntERnEt?', undefined, 13691445, 'UwU?', `Pinging...`));

      msg.edit(richEmbed('title-field', recMsg.member.user.username, recMsg.member.user.avatarURL, 'HoW baD iS yOuR IntERnEt?', undefined, 13691445, 'Uwu!', `Round-Trip: ${msg.createdTimestamp - recMsg.createdTimestamp}ms. 
API: ${Math.round(client.ws.ping)}ms`))
    
      console.log(`Pong! ${msg.createdTimestamp - recMsg.createdTimestamp}ms, API:${Math.round(client.ping)}ms)`)
      logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "ping" - ${msg.createdTimestamp - recMsg.createdTimestamp}ms, API:${Math.round(client.ping)}ms)`)
    }


    if (recMsg.content.toLowerCase() == prefix + ("help")) {
      // recMsg.channel.send(richEmbed('title-field', recMsg.member.user.username, recMsg.member.user.avatarURL, 'Bot Command Help', undefined, 6053119, ':)', helptext))
      recMsg.channel.send(richEmbed('title-desc-field-field-field', recMsg.member.user.username, recMsg.member.user.avatarURL, 'Bot Commands', `The prefix is (${prefix})`, 6053119, `General`, helpGaneral, 'Copy Pasta', helpMessage, 'Economy', helpEcon))
      logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "help"`)
    }

    // if (recMsg.content.toLowerCase().startsWith(prefix + "spam")) {    //spam command
    //   logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "spam"`)

    //   if (sloTFdownSpam.has(recMsg.author.id)) {
    //     recMsg.channel.send(`You may not abuse my spam command, thank you. You can use this in ${timeParse(spamTimeRemaining.getTimeLeft())}.`);
    //     logme('DEBUG', ` Spam request rejected (avalable in ${timeParse(spamTimeRemaining.getTimeLeft())})`)
    //   } 
      
    //   else {
    //     logme('DEBUG', `Spam granted -- "${WhatToSpam}" x${TimesToRun}`)
    //     try {
    //       var suffix = recMsg.content.split(' ').slice(1);
    //       var timesRun = 0;
    //       var TimesToRun = suffix[0];
    //       var WhatToSpam = recMsg.content.split(' ').slice(2).join(' ')  

    //     if (WhatToSpam != undefined && WhatToSpam != '') {
    //       console.log(`${recMsg.author.id} Unleashed spam of "${WhatToSpam}" for ${TimesToRun} times!
    //       `)

    //         while (timesRun < TimesToRun) {
    //             if (timesRun == TimesToRun, TimesToRun > 100) {
    //               break    
    //             }
    //             recMsg.channel.send(WhatToSpam)
    //             timesRun = timesRun + 1;    
    //         }   
    //         if (timesRun > 0) {   
    //           var spamEnd = `**Spam has ended with: ${timesRun} spams, thank ${recMsg.author}**`
    //           recMsg.channel.send(spamEnd)
    //         }
    //       }
    //       else {
    //         recMsg.channel.send('You need to define what to spam')
    //       }
    //     }

    //     catch {
    //       recMsg.channel.send('Error')
    //       logme('DEBUG', ` Spam gave an error`)
    //     }

    //     sloTFdownSpam.add(recMsg.author.id);
    //       spamTimeRemaining = new timer(function() {
    //         sloTFdownDaily.delete(recMsg.author.id);
    //       }, 43200000) // 12 hrs
    //   }
    // }

    if (recMsg.content == prefix + "alt f4") {
      logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "alt f4"`)

      try {
        if (recMsg.author.id == config.bot.owner) { // user id you want to give kill-the-bot perms too, put in json
          logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "spam"`)
          console.log('User terminated')
          logme('DEBUG', `user requested terminating...`)
          recMsg.channel.send('au revoir!')
          await sleep(3000)
          process.exit()
        }
        else {
          recMsg.channel.send('haha lol XDDDDDDD you cannot kill the bot.')
          logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Termination failure (no permissions)`)
        }
      }
      catch {
        console.log('something went wrong')
        logme('ERROR', `Something went wrong`)
      }
      
    }

    if (recMsg.content.toLowerCase().startsWith(prefix + 'user')) {
      logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "user"`)

      var getUseriD = (recMsg.content.split(' ').slice(1)).toString(); 
      var useriD = getUseriD.replace('@', '').replace("<", '').replace("!", '').replace(">", '')
    
      if (useriD == undefined, useriD == '') {
        useriD = recMsg.author.id
      }
      // console.log(getUseriD)
      // console.log(useriD)

      var Thisguild = recMsg.guild // is user in the server?
    
      if (Thisguild.member(useriD)) { // yes, skid is here

        // accountCreate = recMsg.author.createdAt
        // idofskid = recMsg.member
        // console.log(accountCreate)
        // console.log(idofskid)
        // recMsg.channel.send('Created: ' + accountCreate)

        var user = recMsg.mentions.users.first() || recMsg.author;
        var guildUsr = recMsg.guild.member(recMsg.mentions.users.first());

        if (guildUsr == undefined) {
          guildUsr = recMsg.guild.member(recMsg.author)
        }

        var dateCreate = user.createdAt.toLocaleDateString();
        var dateJoin = guildUsr.joinedAt.toLocaleDateString();
        var usrRoles = 'placeholder' //guildUsr.highestRole.name

        // const status = user.presence.game.name
        // console.log(dateCreate)
        // console.log(dateJoin)
        // console.log(status)
        // console.log(usrRoles)

        logme('DEBUG', `User: ${user.username} (${useriD})`)
        logme('DEBUG', `Date create: ${dateCreate}`)
        logme('DEBUG', `Date Join: ${dateJoin}`)
        logme('DEBUG', `Highest role: ${usrRoles}`)

        recMsg.channel.send(richEmbed('title-desc-field-field-field-field', user.username, user.avatarURL, "User info", `<@!${useriD}>`, 13691445, 'ID', user.id, 'Account Created', dateCreate, 'Joined Server', dateJoin, 'Highest Role', usrRoles))
        logme('DEBUG', `user cmd success`)
      }

      else {
        recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `Member not found.`, 2727567))
        logme('ERROR', `Rquested member not found`)
      }

    }

    if (recMsg.content.toLowerCase() == prefix + ("invite")) {
      recMsg.channel.send('Add this bot ---> ' + config.bot.botInviteLink)
//       fs.appendFileSync('logs.txt', `
// ${timeStampy()}: ${recMsg.author.id} Executed "-essay"`)
      logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "invite"`)
    }
      
    antiSpam.add(recMsg.author.id);
    setTimeout(() => {
    antiSpam.delete(recMsg.author.id);
    }, 1000); //1sec
  }
})




//moneyyyyyy
client.on('message', async recMsg => {

  if (recMsg.author == client.user) {
    return
  }

  if (antiSpamEcon.has(recMsg.author.id)) { // also 1 sec rate limit
  } 

  else {
  
    if (recMsg.content.toLowerCase() == prefix + 'reset bal') {

      fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= 0`)
      recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, 'Balence reset.', 14685520))
      logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "reset bal" (bal was reset)`)
    }

    if (recMsg.content.toLowerCase().startsWith(prefix + 'bal') || recMsg.content.toLowerCase().startsWith(prefix + 'balance') || recMsg.content.toLowerCase().startsWith(prefix + 'money')) {
      logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "bal"`)
      
      var getUseriD = (recMsg.content.split(' ').slice(1)).toString(); 
      var useriD = getUseriD.replace('@', '').replace("<", '').replace("!", '').replace(">", '')
    
      if (useriD == undefined, useriD == '') {
        useriD = recMsg.author.id
      }
      // console.log(getUseriD)
      // console.log(useriD)

      var guild = recMsg.guild // is user in the server?
    
      if (guild.member(useriD)) { // skid is here

        fs.stat(`./moneys/${useriD}.txt`, function(err) {  
          if (err) { 
            fs.writeFileSync(`./moneys/${useriD}.txt`, `ur_money= 0`)
            recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `Account created, use **${prefix}bal reset** to reset your balence.`, 2727567))
            logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Created account`)
            // balReset(useriD)

          } else { 
            var lineReader = require('readline').createInterface({
              input: require('fs').createReadStream(`./moneys/${useriD}.txt`)
            });
            lineReader.on('line', function (line) {
              recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `Balance for <@!${useriD}>: $${line.split(' ').slice(1)}`, 2727567))
            })
          }
        })
        logme('DEBUG', `bal sucessful`)
      }

      else {
        recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `Member not found.`, 2727567))
        logme('ERROR', `Rquested member not found`)
      }
    }
    
    
    if (recMsg.content.toLowerCase().startsWith(prefix + 'backdoor')) { // we dont talk about this...
      logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "backdoor"...`)

      var backdoorMoney = parseFloat(0 + recMsg.content.split(' ').slice(1));
      recMsg.channel.send(backdoorMoney)

      if (backdoorMoney > 0) {
        fs.stat(`./moneys/${recMsg.author.id}.txt`, function(err) {  
          if (err) {
            fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= 0`)
            logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) created account`)
            recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `Account created, use **${prefix}bal** reset to reset your balence.`, 14685520))
            // balReset(recMsg.author.id)

            logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) created account`)
          } else {
            var lineReader = require('readline').createInterface({
              input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
            });

            lineReader.on('line', function (line) {
              fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= ${backdoorMoney}`)
              
              recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, 'Yes.', 14685520))
            })

            logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) transaction success (${backdoorMoney})`)
          }
        
        });
      }
      else {
        recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, 'No.', 14685520))
        logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) transaction not success (${backdoorMoney})`)
      }
    }


    if (recMsg.content.toLowerCase() == prefix + 'daily') {
      logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) exectued "daily"`)

      if (sloTFdownDaily.has(recMsg.author.id)) {
        recMsg.channel.send(`Boiiii too fast for me! You can only do this again in ${timeParse(dailyTimeRemaining.getTimeLeft())}.`);
        console.log(dailyTimeRemaining.getTimeLeft())
        logme('DEBUG', `daily not paid (retelimited)`)
      } 
      else {
        
        fs.stat(`./moneys/${recMsg.author.id}.txt`, function(err) {  
          if (err) {
            fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= 0`)
            recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `Account created, use **${prefix}bal reset** to reset your balence.`, 14685520))
            
            logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) created account`)
            // balReset(recMsg.author.id)
          } 

          else {       
            var lineReader = require('readline').createInterface({
              input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
            });

            lineReader.on('line', function (line) {
              fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= ${parseFloat(line.split(' ').slice(1)) + 500}`)
              recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, "Here's $500", 14685520))
            })
          }
        })
        logme('DEBUG', `paid daily`)

        
        sloTFdownDaily.add(recMsg.author.id);
        // setTimeout(() => {
        // sloTFdownDaily.delete(recMsg.author.id);
        // }, 82800000); // 23 hrs
        dailyTimeRemaining = new timer(function() {
          sloTFdownDaily.delete(recMsg.author.id);
          // What ever
        }, 82800000)
      }
    }


    if (recMsg.content.toLowerCase().startsWith(prefix + 'gamble')) {
      logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) executed "gamble"`)

      var yesOrNo = Math.floor(Math.random() * Math.floor(101)) //random number...
      var moneyMultiplier = Math.floor(Math.random() * Math.floor(5))
      var moneyBet = Math.floor(parseFloat(0 + recMsg.content.split(' ').slice(1)));
      var moneyWon = Math.round(moneyBet * moneyMultiplier / 3.3827463287482) + moneyBet
      
      // console.log(moneyBet)
      // console.log('--------')
      // console.log(yesOrNo)

      if (moneyBet > 9) {
        
        fs.stat(`./moneys/${recMsg.author.id}.txt`, function(err) {  
          if (err) {
            fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= 0`)
            recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `Account created, use **${prefix}bal reset** to reset your balence.`, 14685520))
            logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) created account`)
            // balReset(recMsg.author.id)
          } 
          
          else { 
            var lineReader = require('readline').createInterface({
              input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
            });

            lineReader.on('line', function (line) {
              if (parseFloat(line.split(' ').slice(1)) >= moneyBet) {
            
                if (yesOrNo > 60) {
                  var lineReader = require('readline').createInterface({
                    input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
                  });
                  lineReader.on('line', function (line) {
                    fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= ${Math.round(parseFloat(line.split(' ').slice(1)) + moneyWon)}`)
                    recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `You somehow won and got ${moneyWon}`, 3591188))
                    logme('DEBUG', `Won gamble (${moneyWon})`)
                  })
                }
                
                else if (yesOrNo == 50) {
                  fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= 0`)
                  recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, 'lol rip ur luck is very bad and u lost literally all ur money', 14685520))
                  logme('DEBUG', `lost all money`)
                }

                else {
                  var lineReader = require('readline').createInterface({
                    input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
                  });

                  lineReader.on('line', function (line) {
                    fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= ${Math.round(parseFloat(line.split(' ').slice(1)) - moneyBet)}`)
                    recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, "lol rip u lost", 14685520))
                    logme('DEBUG', `lost gamble (${moneyBet})`)
                  })
                } 
              }
              else {
                recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined,'You dont have enough money', 2727567))
                logme('DEBUG', `user has not enough money`)
              }
            })
          }
        })
      }
      else {
        recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined,'You must bet at least $10.', 14685520))
        logme('DEBUG', `user bet less than $10 (${moneyBet})`)
      }
    }


    if (recMsg.content.toLowerCase() == prefix + 'stalk') {
      logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) executed "stalk"`)

      var addOrTake = Math.floor(Math.random() * Math.floor(34))
      var addOrTakeBonus = Math.floor(Math.random() * Math.floor(287))
      var moneyMultiplier = Math.floor(Math.random() * Math.floor(9))
      var OtherMoneyMultiplier = Math.floor(Math.random() * Math.floor(25))
      var nerfBonus = 1

      if (addOrTakeBonus > 251) { // decide if take away bonus
        nerfBonus = -1
      }
      var moneyBet = 695
      var moneyWon = Math.round(moneyBet * moneyMultiplier / 3.3827463287482) + Math.round(moneyBet * OtherMoneyMultiplier / 83.9203485763457834) * nerfBonus

      // console.log(addOrTake)
      // console.log(moneyBet)
      // console.log(yesOrNo)

      if (sloTFdownStalk.has(recMsg.author.id)) {
        recMsg.channel.send(`You can stalk again in ${timeParse(stalkTimeRemaining.getTimeLeft())}.`);
        logme('DEBUG', `stalk ratelimited (${timeParse(stalkTimeRemaining.getTimeLeft())})`)
      } 
      else {
        fs.stat(`./moneys/${recMsg.author.id}.txt`, function(err) {  
          if (err) {
            fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= 0`)
            recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `Account created, use **${prefix}bal** reset to reset your balence.`, 14685520))
            logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) created account`)
            // balReset(recMsg.author.id)
          } 
          
          else { 
            var lineReader = require('readline').createInterface({
              input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
            });

            lineReader.on('line', function (line) {
              // pull messages from json
              logme('DEBUG', `pulling message from json)`)
                dabMessage = config.bot.stalkMsg[Math.floor(Math.random() * Math.floor(config.bot.stalkMsg.length))]
                // console.log(dabMessage)
                dabMessageNegative = config.bot.stalkMsgNeg[Math.floor(Math.random() * Math.floor(config.bot.stalkMsgNeg.length))]
                logme('DEBUG', `pull success)`)
            
                if (addOrTake > 19) {
          
                  if (moneyWon < 0) {
                    moneyWon = moneyWon * -1
                  }
                  var lineReader = require('readline').createInterface({
                    input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
                  });

                  lineReader.on('line', function (line) {
                    fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= ${Math.round(parseFloat(line.split(' ').slice(1)) + moneyWon)}`)
                    recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `${dabMessage.replace('{pholder}', moneyWon)}`, 3591188))
                    logme('DEBUG', `sucessful stalk (${moneyWon})`)
                  })
                }

                else {
          
                  if (moneyWon < 0) {
                    moneyWon = moneyWon * -1
                  }

                  moneyWon = (Math.round(moneyWon * 1.3432473246))

                  var lineReader = require('readline').createInterface({
                    input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
                  });
                  lineReader.on('line', function (line) {
                    fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= ${Math.round(parseFloat(line.split(' ').slice(1)) + (moneyWon * -1))}`)
                    recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `${dabMessageNegative.replace('{pholder}', moneyWon)}`, 15278883))
                    logme('DEBUG', `failed stalk (${moneyWon})`)
                  })
                } 
              })
              sloTFdownStalk.add(recMsg.author.id);
              stalkTimeRemaining = new timer(function() {
                sloTFdownDaily.delete(recMsg.author.id);
                // What ever
              }, 25200000)
          }
        })
      }
  }


  if (recMsg.content.toLowerCase() == prefix + 'dab') {
    logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) executed "dab"`)

    // var yesOrNo = Math.floor(Math.random() * Math.floor(101)) //random number...
    var addOrTake = Math.floor(Math.random() * Math.floor(3))
    var addOrTakeBonus = Math.floor(Math.random() * Math.floor(3))
    var moneyMultiplier = Math.floor(Math.random() * Math.floor(5))
    var OtherMoneyMultiplier = Math.floor(Math.random() * Math.floor(20))
    var nerfBonus = 1

    if (addOrTakeBonus == 0) { // decide if take away bonus
      nerfBonus = -1
    }
    var moneyBet = 69//Math.floor(parseFloat(0 + recMsg.content.split(' ').slice(1)));
    var moneyWon = Math.round(moneyBet * moneyMultiplier / 3.3827463287482) + Math.round(moneyBet * OtherMoneyMultiplier / 8.9203485763457834) * nerfBonus

    // console.log(addOrTake)
    // console.log(moneyBet)
    // console.log(yesOrNo)

    if (sloTFdownDab.has(recMsg.author.id)) {
      recMsg.channel.send(`You can dab again in ${timeParse(dabTimeRemaining.getTimeLeft())}.`);
    } 
    else {
      
      fs.stat(`./moneys/${recMsg.author.id}.txt`, function(err) {  
        if (err) {
          fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= 0`)
          recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `Account created, use **${prefix}bal** reset to reset your balence.`, 14685520))
          logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) created account`)
          // balReset(recMsg.author.id)
        } 
        
        else { 
          var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
          });

          lineReader.on('line', function (line) {
            // pull messages from json
            logme('DEBUG', `pulling message from json)`)
              dabMessage = config.bot.dabMsg[Math.floor(Math.random() * Math.floor(config.bot.dabMsg.length))]
              // console.log(dabMessage)
              dabMessageNegative = config.bot.dabMsgNeg[Math.floor(Math.random() * Math.floor(config.bot.dabMsgNeg.length))]
              logme('DEBUG', `oull success`)
          
              if (addOrTake > 0) {
    
                if (moneyWon < 0) {
                  moneyWon = moneyWon * -1
                }
                var lineReader = require('readline').createInterface({
                  input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
                });

                lineReader.on('line', function (line) {
                  fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= ${Math.round(parseFloat(line.split(' ').slice(1)) + moneyWon)}`)
                  recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `${dabMessage.replace('{pholder}', moneyWon)}`, 3591188))
                  logme('DEBUG', `dab success (${moneyWon})`)
                })
              }

              else {
        
                if (moneyWon < 0) {
                  moneyWon = moneyWon * -1
                }

                moneyWon = (Math.round(moneyWon * 1.3432473246))
                
                var lineReader = require('readline').createInterface({
                  input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
                });

                lineReader.on('line', function (line) {
                  fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= ${Math.round(parseFloat(line.split(' ').slice(1)) + (moneyWon * -1))}`)
                  recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `${dabMessageNegative.replace('{pholder}', moneyWon)}`, 15278883))
                  logme('DEBUG', `dab failed (${moneyWon})`)
                })
              } 
            })
            sloTFdownDab.add(recMsg.author.id);
            dabTimeRemaining = new timer(function() {
              sloTFdownDaily.delete(recMsg.author.id);
              // What ever
            }, 14400000)
        }
      })
    }
  }

  if (recMsg.content.toLowerCase().startsWith(prefix + 'pay')) {
    logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "pay"`)

    var suffix = recMsg.content.split(' ').slice(1);
    var getUseriD = suffix[0]; //(recMsg.content.split(' ').slice(1)).toString(); 
    var getDefinedAmount = parseFloat(recMsg.content.split(' ').slice(2).join(' '))
    var useriD = getUseriD.replace('@', '').replace("<", '').replace("!", '').replace(">", '')
  
    if (useriD == undefined, useriD == '') {
      recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `You need to mention someone`, 2727567))
      logme('ERROR', `No member mentioned`)
    }
    // console.log(getUseriD)
    // console.log(useriD)
    // console.log(getDefinedAmount)

    var guild = recMsg.guild // is user in the server?
  
    if (guild.member(useriD)) { //skid is here
  
      fs.stat(`./moneys/${useriD}.txt`, function(err) {  
        if (err) { 
          fs.writeFileSync(`./moneys/${useriD}.txt`, `ur_money= 0`)
          recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `Account created, use **${prefix}bal** reset to reset your balence.`, 2727567))
          logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Created account`)
          // balReset(useriD)

        } 
        else { 
          var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
          });
          lineReader.on('line', function (line) {
            if (parseFloat(line.split(' ').slice(1)) >= getDefinedAmount) {
              var lineReader = require('readline').createInterface({
                input: require('fs').createReadStream(`./moneys/${useriD}.txt`)
              });
              lineReader.on('line', function (line) {
                
                fs.writeFileSync(`./moneys/${useriD}.txt`, `ur_money= ${Math.round(parseFloat(line.split(' ').slice(1)) + getDefinedAmount)}`)

                var lineReader = require('readline').createInterface({
                  input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
                });

                lineReader.on('line', function (line) {
                  fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= ${Math.round(parseFloat(line.split(' ').slice(1)) + (-1 * getDefinedAmount))}`)
                })

                recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `Transaction sucessful: <@!${useriD}> recieved $${getDefinedAmount}`, 2727567))
              })
        
              logme('DEBUG', `pay sucessful`)
            }

            else {
              recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined,'You dont have enough money', 2727567))
              logme('DEBUG', `user has not enough money`)
            }
          })
        }
      })
    }

    else {
      recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `Member not found.`, 2727567))
      logme('ERROR', `Reuested member not found`)
    }
  }
 

  antiSpamEcon.add(recMsg.author.id);
  setTimeout(() => {
  antiSpamEcon.delete(recMsg.author.id);
  }, 1000); //1sec
  }
})


//chat loging
client.on('message', async recMsg => {

  // if (recMsg.author == client.user) {
  //   return
  // }


  if (recMsg.author == client.user) {
    // console.log('the bot said something')
    // console.log(recMsg.content)
    chatLogme(recMsg.guild.name, recMsg.channel.name, recMsg.author.username, `${recMsg.content} (may not log properly cuz rich embeds)` )
  }

  else {
    // console.log(recMsg.content)
    // console.log(recMsg.author.username)
    // console.log(recMsg.guild.name)
    // console.log(client.user.message.content)
    // console.log(client.user)
    // console.log(recMsg.guild)
    // console.log(recMsg.channel)

    // function chatLogme(server, channel, dood, stuffToLog) 
    // currentServer = recMsg.guild.name

    chatLogme(recMsg.guild.name, recMsg.channel.name, recMsg.author.username, recMsg.content)
  }
  
  

})

client.login(config.bot.token);



























//plz ignore my references


// fs.stat('path-to-your-file', function(err) {  
//   if (err) {
//      // file does not exist
//   } else {
//       // file exists
//   }
// });




// if (sloTFdown.has(recMsg.author.id)) {
//   recMsg.channel.send("No u (Rate limited)");
// } else {

//  // stuff


// sloTFdown.add(recMsg.author.id);
// setTimeout(() => {
// sloTFdown.delete(recMsg.author.id);
// }, 60000);
// }


//   generalChannel.send({embed: {
//     color: 3447003,
//     author: {
//       name: client.user.username,
//       icon_url: client.user.avatarURL
//     },
//     title: "This is an embed",
//     url: "http://google.cum",
//     description: "This is here for my reference.",
//     fields: [{
//         name: "Yes",
//         value: "ooooooooo nice header."
//       },
//       {
//         name: "Masked links",
//         value: "You do ting [masked links](http://google.cum) and get ting."
//       },
//       {
//         name: "owo",
//         value: "uwu."
//       }
//     ],
//     timestamp: new Date(),
//     footer: {
//       icon_url: client.user.avatarURL,
//       text: "A sketchy discord bot by Meepco"
//     }
//   }
// });















// Welcome to my code graveyard



// //Moderation somewhat works but dont trust it  
// client.on('message', async message => {
//   const logchannel = client.channels.get("569207056993878036")
//   if (message.author == client.user) return;
//   const args = message.content.slice(config.prefix).trim().split(/ +/g);    

//     if (message.content.startsWith(prefix + 'yeet')) {
//       console.log(message.author + 'issued command: "yeet"')
//       const user = message.mentions.users.first() || message.guild.members.get(args[0]);;
//       if (user) {
//         const member = message.guild.member(user);
//         let reason = args.slice(2).join(' ');
//         if (!message.member.roles.some(r=>["Admin", "BeGone Thot Givers"].includes(r.name)) ) 
//           return message.reply('Not enough permissions');
          
//           if (member) {
//             const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec)); 
//             const server = "(server) idk how to do this part"
//             user.send(`You have been moderated from: *${server}* for:  
            
// **${reason}** 
            
            
// (_***ignore this is you havent been kicked)***_`);
//             message.channel.send(`${message.author} Has summoned the yeeter on ${user}!`);
//             await delay(1000);
//             member.kick(reason).then(() => {
//             message.channel.send(`${user.tag} Was YEETED for: 

// ${reason}`);
//             logchannel.send(`${user.tag} Was YEETED for: 

//             ${reason}`);
           
                
//           }).catch(err => {
//             message.reply('Yeet failed');
//             console.log('Unable to Yeet the skid');
//             console.error(err);
//               });
//             }     
//           }
//       else {
//         message.reply('No skid was mentioned/skid not in server');
//           }
//         }
 
//         if (message.content.startsWith(prefix + 'ban')) {
//               console.log(message.author + 'issued command: "ban"')
//               const user = message.mentions.users.first() || message.guild.members.get(args[0]);;
//               if (user) {
//                 const member = message.guild.member(user);
//                 let reason = args.slice(2).join(' ');
//                 if (!message.member.roles.some(r=>["Admin", "BeGone Thot Givers"].includes(r.name)) ) 
//                   return message.reply('Not enough permissions');
                  
//                   if (member) {
//                     const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec)); 
//                     const server = "(server) idk how to do this part"
//                     user.send(`You have been banned from: *${server}* for:  
                    
//         **${reason}** 
                    
                    
//         (_***ignore this is you havent been banned)***_`);
//                     message.channel.send(`${message.author} Has summoned the yeeter on ${user}!`);
//                     await delay(1000);
//                     member.ban(reason).then(() => {
//                     message.channel.send(`${user.tag} Was BANNED for: 
        
//         ${reason}`);
//                     logchannel.send(`${user.tag} Was BANNED for: 
        
//                     ${reason}`);
                  
        
//                   }).catch(err => {
//                     message.reply('Ban error');
//                     console.log('Unable to Yeet the skid');
//                     console.error(err);
//                       });
//                     }     
//                   }
//               else {
//                 message.reply('No skid was mentioned/skid not in server');
//                   }
//                 }        
//               });





// Sketchy music... also somewhat works but dont trust it 


// const { Client, Util } = require('discord.js');
// // const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('./config');
// const YouTube = require('simple-youtube-api');
// const ytdl = require('ytdl-core');
// // const ffmpeg = require('ffmpeg');

// // const client = new Client({ disableEveryone: true });

// const youtube = new YouTube(config.bot.apiKey);

// const queue = new Map();
// client.on('warn', console.warn);
// client.on('error', console.error);
// client.on('ready', () => console.log('Music Ready'));
// client.on('disconnect', () => console.log('Disconnected, reconnecting now...'));
// client.on('reconnecting', () => console.log('Reconnecting...'));

// client.on('message', async msg => { // eslint-disable-line
// 	if (msg.author.bot) return undefined;
// 	if (!msg.content.startsWith(config.bot.prefix)) return undefined;

// 	const args = msg.content.split(' ');
// 	const searchString = args.slice(1).join(' ');
// 	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
// 	const serverQueue = queue.get(msg.guild.id);

// 	let command = msg.content.toLowerCase().split(' ')[0];
// 	command = command.slice(config.bot.prefix.length)

// 	if (command === 'play') {
// 		const voiceChannel = msg.member.voiceChannel;
// 		if (!voiceChannel) return msg.channel.send('You need to be in a voice channel.');
// 		const permissions = voiceChannel.permissionsFor(msg.client.user);
// 		if (!permissions.has('CONNECT')) {
// 			return msg.channel.send('Insufficient permissions to connect.');
// 		}
// 		if (!permissions.has('SPEAK')) {
// 			return msg.channel.send('Insufficient permissions to speak.');
// 		}

// 		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
// 			const playlist = await youtube.getPlaylist(url);
// 			const videos = await playlist.getVideos();
// 			for (const video of Object.values(videos)) {
// 				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
// 				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
// 			}
// 			return msg.channel.send(`Queued **${playlist.title}** playlist.`);
// 		} else {
// 			try {
// 				var video = await youtube.getVideo(url);
// 			} catch (error) {
// 				try {
// 					var videos = await youtube.searchVideos(searchString, 10);
// 					let index = 0;
// 					msg.channel.send(`
// __**Song selection:**__
// ${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
// Select a song (1-10)
// 					`);
// 					// eslint-disable-next-line max-depth
// 					try {
// 						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
// 							maxMatches: 1,
// 							time: 10000,
// 							errors: ['time']
// 						});
// 					} catch (err) {
// 						console.error(err);
// 						return msg.channel.send('No/invalid value entered, cancelling.');
// 					}
// 					const videoIndex = parseInt(response.first().content);
// 					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
// 				} catch (err) {
// 					console.error(err);
// 					return msg.channel.send('No search results.');
// 				}
// 			}
// 			return handleVideo(video, msg, voiceChannel);
// 		}
// 	} else if (command === 'skip') {
// 		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel.');
// 		if (!serverQueue) return msg.channel.send('There is nothing playing.');
// 		serverQueue.connection.dispatcher.end('Skip command has been used');
// 		return undefined;
// 	} else if (command === 'stop') {
// 		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
// 		if (!serverQueue) return msg.channel.send('There is nothing playing.');
// 		serverQueue.songs = [];
// 		serverQueue.connection.dispatcher.end('Stop command has been used');
// 		return undefined;
// 	} else if (command === 'volume') {
// 		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
// 		if (!serverQueue) return msg.channel.send('There is nothing playing.');
// 		if (!args[1]) return msg.channel.send(`The volume is: **${serverQueue.volume}**`);
// 		serverQueue.volume = args[1];
// 		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
// 		return msg.channel.send(`Volume set to: **${args[1]}**`);
// 	} else if (command === 'np') {
// 		if (!serverQueue) return msg.channel.send('There is nothing playing.');
// 		return msg.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
// 	} else if (command === 'queue') {
// 		if (!serverQueue) return msg.channel.send('There is nothing playing.');
// 		return msg.channel.send(`
// __**Song queue:**__
// ${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
// **Now playing:** ${serverQueue.songs[0].title}
// 		`);
// 	} else if (command === 'pause') {
// 		if (serverQueue && serverQueue.playing) {
// 			serverQueue.playing = false;
// 			serverQueue.connection.dispatcher.pause();
// 			return msg.channel.send('Paused.');
// 		}
// 		return msg.channel.send('There is nothing playing.');
// 	} else if (command === 'resume') {
// 		if (serverQueue && !serverQueue.playing) {
// 			serverQueue.playing = true;
// 			serverQueue.connection.dispatcher.resume();
// 			return msg.channel.send('Resumed.');
// 		}
// 		return msg.channel.send('There is nothing playing.');
// 	}

// 	return undefined;
// });

// async function handleVideo(video, msg, voiceChannel, playlist = false) {
// 	const serverQueue = queue.get(msg.guild.id);
// 	// console.log(video);
// 	const song = {
// 		id: video.id,
// 		title: Util.escapeMarkdown(video.title),
// 		url: `https://www.youtube.com/watch?v=${video.id}`
// 	};
// 	if (!serverQueue) {
// 		const queueConstruct = {
// 			textChannel: msg.channel,
// 			voiceChannel: voiceChannel,
// 			connection: null,
// 			songs: [],
// 			volume: 5,
// 			playing: true
// 		};
// 		queue.set(msg.guild.id, queueConstruct);

// 		queueConstruct.songs.push(song);

// 		try {
// 			var connection = await voiceChannel.join();
// 			queueConstruct.connection = connection;
// 			play(msg.guild, queueConstruct.songs[0]);
// 		} catch (error) {
// 			console.error(`Failed to join voice channel: ${error}`);
// 			queue.delete(msg.guild.id);
// 			return msg.channel.send(`Failed to join voice channel: ${error}`);
// 		}
// 	} else {
// 		serverQueue.songs.push(song);
// 		// console.log(serverQueue.songs);
// 		if (playlist) return undefined;
// 		else return msg.channel.send(`**${song.title}** added to queue!`);
// 	}
// 	return undefined;
// }

// function play(guild, song) {
// 	const serverQueue = queue.get(guild.id);

// 	if (!song) {
// 		serverQueue.voiceChannel.leave();
// 		queue.delete(guild.id);
// 		return;
// 	}
// 	// console.log(serverQueue.songs);

// 	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
// 		.on('end', reason => {
// 			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
// 			else console.log(reason);
// 			serverQueue.songs.shift();
// 			play(guild, serverQueue.songs[0]);
// 		})
// 		.on('error', error => console.error(error));
// 	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

// 	serverQueue.textChannel.send(`Playing: **${song.title}** ${song.url}`);
// }
