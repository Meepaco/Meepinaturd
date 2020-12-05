// Welcome to my sketchy code
const version = 'v1.3b6 (1302)'
const whatTheJsonVersionShouldBeForThisVersonOfTheBot = '1.3b3'
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./Renograde.json');
const prefix = config.bot.prefix;
const osu = require('node-os-utils');
const os = require('os');
const fs = require('fs');

const editJsonFile = require("edit-json-file");
const si = require('systeminformation');
const { Recoverable } = require('repl');

// Modules
// const generalCmds = require('./generalCmds');
const ChatLogMeDaddy = require('./chatLog')
// const econ = require('./econ.js')


// rate limiter gang
// const sloTFdownDab = new Set();
// const sloTFdownDaily = new Set();
const antiSpam = new Set();
// const antiSpamEcon = new Set();
// const sloTFdownStalk = new Set();
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

/*
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
*/

function sleep(ms) {
  `This function haults execution for a defined amount of time
  
  parameters: 
    ms: time in ms
    
    returns:
      a promise`
  return new Promise(resolve => setTimeout(resolve, ms));
}

function uptime(whatUptime) { 
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

  var totalSeconds = 0
  var totalSecondsCopy = 0

  if (whatUptime == 'bot') {
    totalSeconds = (client.uptime / 1000);
    totalSecondsCopy = (client.uptime / 1000);
  }
  else if (whatUptime == 'os') {
    totalSeconds = (os.uptime);
    totalSecondsCopy = (os.uptime);

  }

  var days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  var hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = totalSeconds % 60;
  

  if (totalSecondsCopy >= 86400) { //day
    return `${days} days, ${hours} hr, ${minutes} min, ${Math.round(seconds)} sec`
  }

  else if (totalSecondsCopy >= 3600) { //hour
    return `${hours} hr, ${minutes} min, ${Math.round(seconds)} sec`
  }

  else if (totalSecondsCopy >= 60) { // minute
    return `${minutes} min, ${Math.round(seconds)} sec`
  }

  else if (totalSecondsCopy >= 1) { //second
    return `${Math.round(seconds)} sec`
  }
  
}
/*
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
*/

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
        name: `Requested by ${usersName}`,
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
        name: `Requested by ${usersName}`,
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
        name: `Requested by ${usersName}`,
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
        name: `Requested by ${usersName}`,
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
        name: `Requested by ${usersName}`,
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
        name: `Requested by ${usersName}`,
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
        name: `Requested by ${usersName}`,
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
        name: `Requested by ${usersName}`,
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
        name: `Requested by ${usersName}`,
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
        name: `Requested by ${usersName}`,
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
          name: `Requested by ${usersName}`,
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
  if (config.bot.botLogging == 'true') { //temporary thing... need to remember to do permanent solution
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
}

/**
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
*/
// function balReset(usriD) {
//   `this function is used to reset balence so i dont have to spam this everywhere in econ`
//   fs.writeFileSync(`./moneys/${usriD}.txt`, `ur_money= 0`)
//   recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL({ format: 'png', dynamic: true}), undefined, `Account created, use **${prefix}bal** reset to reset your balence.`, 2727567))
//   logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Created account`)
// }

function confEditor(thingyToEdit, thingyToPut) {
  let configFile = editJsonFile('./Renograde.json')

    configFile.set(`bot.${thingyToEdit}`, thingyToPut)
    configFile.save()
    // console.log(configFile.get());
    // recMsg.channel.send(`${thingyToEdit} has been changed to "${thingyToPut}".`)
}









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
  generalChannel.send(richEmbed('desc' ,client.user.username, client.user.avatarURL({ format: 'png', dynamic: true}), undefined,'I is the online',3447003))

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



    

//main commands
  switch (recMsg.content.toLowerCase()) {

    case prefix + 'help':
      var helpGaneral = `
      **help-depricated:** Show depricated cmds
      **ping:** Gets latency
      **help:** Shows this message.
      **info:** shows bot info
      !!!info-ext: shows more bot info
      **alt f4:** just dont...
      **invite:** Get a bot invite link
      !!!remind <time> <time unit> <message>
      !!!settings: Do not touch. Period.`
          var helpMessage = `**essay:** Best roast
      **bwah:** A simple wall of text
      **skelly:** Totally not NSFW...
      **Android commands:** acc, uevent, vanced, ssh, twrp`
          var helpEcon = `WHOLE ECONOMY IS DEAD BC MY BRAIN TOO SMALL
      **reset bal:** Resets balance
      **bal <user>:** Check balance
      **pay <user> <amount>:** Pay someone
      **gamble <number>:** Try your luck...
      **dab:** Hit a dab!
      **stalk:** A high risk indecency, for high rewards...
      !!!blackjack: A game of blackjack
      
      !!!Experemental/WIP`


      // recMsg.channel.send(richEmbed('title-field', recMsg.member.user.username, recMsg.member.user.avatarURL({ format: 'png', dynamic: true}), 'Bot Command Help', undefined, 6053119, ':)', helptext))
      recMsg.channel.send(richEmbed('title-desc-field-field-field', recMsg.member.user.username, recMsg.member.user.avatarURL({ format: 'png', dynamic: true}), 'Bot Commands', `The prefix is (${prefix})`, 6053119, `General`, helpGaneral, 'Copy Pasta', helpMessage, 'Economy', helpEcon))
      logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "help"`)
      break;

    case prefix + 'help-depricated':
      recMsg.channel.send("**Removed/disabled commands** \n`yeet <member> <reason>: kicks member\nban <member> <reason>: bans member\n**spam <amount> <thing>:** Spams user defined message (x) number of times, 100 max (DO NOT SPAM WITHOUT MESSAGE) \n The entirety of economy`")
      break;

    case prefix + 'info':
      var bytesToMB = 1 / 1048576  
      // var memusg = process.memoryUsage()
      // console.log(os.loadavg())
      // console.log(os.hostname())
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
    
      osu.cpu.usage()
      .then(usg => {

        recMsg.channel.send(richEmbed('title-field-field-field-field', recMsg.member.user.username, recMsg.member.user.avatarURL({ format: 'png', dynamic: true}), "Bot Info", undefined, 13691445, 'Uptime', uptime('bot'), 
        
      'Bot', 
`Version: ${version}
Node: ${process.version}
Memory Usg: ${Math.round(used * 100) / 100} MB`, 

      'CPU', 
`**CPU:** ${osu.cpu.model()} (${os.arch()}), ${osu.cpu.count()} core(s) 
**Utilization:** ${usg}% (${os.loadavg()})
`,

      'Other',
`**OS:** ${os.type} (${os.platform()})
**RAM:** ${parseInt(os.totalmem * bytesToMB) - parseInt(os.freemem * bytesToMB)}/${parseInt(os.totalmem * bytesToMB)} MB (${(((parseInt(os.totalmem * bytesToMB) - parseInt(os.freemem * bytesToMB)) / parseInt(os.totalmem * bytesToMB))* 100).toFixed(2)}% usage)
**Uptime:** ${uptime('os')}`))
      

    })
      break;
    
    case prefix + 'info-ext':
      si.cpuTemperature()
      .then(temp => {

        si.cpu()
        .then(processor => {
          si.battery()
            .then(batt => {
              si.osInfo()
                .then(OSInfo => {



    recMsg.channel.send(richEmbed('', recMsg.member.user.username, recMsg.member.user.avatarURL({ format: 'png', dynamic: true}), " Extra Bot Info", undefined, 13691445, 
    
    'CPU', 
    `**Temp:** ${temp.main} ${temp.cores} ${temp.max}
    **Family:* ${processor.family}
    **Govonor:* ${processor.governor}
    **Cores: ** ${processor.physicalCores}C ${processor.cores}T
    **Speed:** ${processor.speed}GHz`, 
      
    'Battery', 
`**Batery:** ${batt.hasbattery}
${batt.cyclecount} Cycle(s), ${batt.currentcapacity}/${batt.maxcapacity} mWh (${batt.designedcapacity} mWh design) capacity unit????: ${batt.capacityUnit} mWh, ${batt.model} (${batt.manufacturer})
**AC Connected:** ${batt.acconnected} (${batt.percent}%)



**OS info:** ${OSInfo.platform} ${OSInfo.distro} ${OSInfo.release} (${OSInfo.codename}) service pack ${OSInfo.servicepack} ${OSInfo.kernel} (${OSInfo.arch}) ${OSInfo.codepage}? ${OSInfo.build}? ${OSInfo.uefi}


`, 

//       'OS', 
// `**Random info:** ${OSInfo.platform} ${OSInfo.distro} ${OSInfo.release} (${OSInfo.codename}) service pack ${OSInfo.servicepack} ${OSInfo.kernel} (${OSInfo.arch}) ${OSInfo.codepage}? ${OSInfo.build}? ${OSInfo.uefi}
// **Utilization:** 
// `,

//       'Other',
// `**OS:** ${os.type} (${os.platform()})
// **RAM:** ${parseInt(os.totalmem * bytesToMB) - parseInt(os.freemem * bytesToMB)}/${parseInt(os.totalmem * bytesToMB)} MB (${(((parseInt(os.totalmem * bytesToMB) - parseInt(os.freemem * bytesToMB)) / parseInt(os.totalmem * bytesToMB))* 100).toFixed(2)}% usage)
// **Uptime:** ${uptime('os')}`
))
  }) //temp
}) //processor
}) //battery
      }) //OS

      break;
  
    case prefix + 'ping':
      const msg = await recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL({ format: 'png', dynamic: true}), 'HoW baD iS yOuR IntERnEt?', undefined, 13691445, 'UwU?', `Pinging...`));

      msg.edit(richEmbed('title-field', recMsg.member.user.username, recMsg.member.user.avatarURL({ format: 'png', dynamic: true}), 'HoW baD iS yOuR IntERnEt?', undefined, 13691445, 'Uwu!', `Round-Trip: ${msg.createdTimestamp - recMsg.createdTimestamp}ms. 
API: ${Math.round(client.ws.ping)}ms`))
    
      console.log(`Pong! ${msg.createdTimestamp - recMsg.createdTimestamp}ms, API:${Math.round(client.ping)}ms)`)
      logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "ping" - ${msg.createdTimestamp - recMsg.createdTimestamp}ms, API:${Math.round(client.ping)}ms)`)
      break;

      v
    
    case prefix + 'alt f4':
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
    
      break;

    case prefix + 'invite':
      recMsg.channel.send('Add this bot ---> ' + config.bot.botInviteLink)
      //       fs.appendFileSync('logs.txt', `
      // ${timeStampy()}: ${recMsg.author.id} Executed "-essay"`)
      logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "invite"`)
      break;
// copypasta below
    case prefix + 'essay':
      recMsg.channel.send(config.bot.essay)
      logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "essay"`)
      break;

    case prefix + 'bwah':
      recMsg.channel.send(config.bot.bwah)
      logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "bwah"`)
      break;              

    case prefix + 'skelly':
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
      break; 

    case prefix + 'acc':
      recMsg.channel.send('acc --set --current 500')
      recMsg.channel.send('acc -s v 3920')
      break;

    case prefix + 'uevent':
      recMsg.channel.send('cat /sys/class/power_supply/bms/uevent')
      break;  

    case prefix + 'vanced':
      recMsg.channel.send('chcon -R u:object_r:system_file:s0 /data/app/com.google.android.youtube-whatever')
      break;  

    case prefix + 'ssh':
      recMsg.channel.send('/data/adb/modules/ssh/opensshd.init start')
      break;

    case prefix + 'twrp':
      recMsg.channel.send('adb backup -f aug12_2020 --twrp --compress data boot')
      break;   

      // case prefix + 'help':
      //   recMsg.channel.send('yes')
      //   break; 
      
  }

  switch (recMsg.content.toLowerCase().startsWith) {


    case prefix + 'user':
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

        recMsg.channel.send(richEmbed('title-desc-field-field-field-field', user.username, user.avatarURL({ format: 'png', dynamic: true}), "User info", `<@!${useriD}>`, 13691445, 'ID', user.id, 'Account Created', dateCreate, 'Joined Server', dateJoin, 'Highest Role', usrRoles))
        logme('DEBUG', `user cmd success`)
      }

      else {
        recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL({ format: 'png', dynamic: true}), undefined, `Member not found.`, 2727567))
        logme('ERROR', `Rquested member not found`)
      }
      break; 

    case prefix + 'settings', prefix + 'set', prefix + 's' :      // config and settings editor, very very very wip
      recMsg.channel.send('WARNING: This command is *heavilly* unfinished')
      // if(recMsg.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
      //   recMsg.channel.send('yes')
      // }
      // console.log(recMsg.member.guild.me)
      if (bot.config.useJsonEditor == 'true') {
        var thingyToEdit = recMsg.content.split(' ').slice(1)[0];
        var thingyToPut = recMsg.content.split(' ').slice(2).join(' ')

        if (config.bot.skidsAllowedToEditJson.includes(recMsg.author.id)) {
          console.log('reeeeee')

          var editableOptions = ['usepresense', 'presensemsg', 'botinvitelink', 'testingchannel', 'owner']
          // var acceptedValues = []

          if (editableOptions.includes(thingyToEdit.toLowerCase) && thingyToPut != undefined) {
            console.log('dfusfghsdfuisdhfuisdhfsuidhfuid')
            if (thingyToEdit.toLowerCase() == 'usepresense') {
              // thingyToEdit = 'usePresense'
              if (thingyToPut.toLowerCase() == 'true') {
                confEditor('usePresense', 'true')
                recMsg.send(`presenseMsg has been updated to "true"`)
              } 
              else if (thingyToPut.toLowerCase() == 'false') {
                confEditor('usePresense', 'false')
                recMsg.send(`presenseMsg has been updated to "false"`)
              }
              else {
                recMsg.channel.send('Invalid value. Must be `true/false`')
              }
            }

            if (thingyToEdit.toLowerCase() == 'presensemsg') {
              confEditor('presenseMsg', thingyToPut)
              recMsg.send(`presenseMsg has been updated to "${thingyToPut}"`)
              }
            

            if (thingyToEdit.toLowerCase() == 'botinvitelink') {
              confEditor('botInviteLink', thingyToPut)
              recMsg.send(`botInviteLink has been updated to "${thingyToPut}"`)
            }

            if (thingyToEdit.toLowerCase() == 'owner') {
              if (thingyToPut.isInteger()) {
                confEditor('owner', thingyToPut)
                recMsg.send(`owner has been updated to "${thingyToPut}"`)
              }
              else {
                recMsg.send('You must provide a valid discord use ID.')
              }
            }

            if (thingyToEdit.toLowerCase() == 'testingChannel') {

            }

            if (thingyToEdit.toLowerCase() == 'perm to use dis') {

            }
          }
          

          
          // if (thingyToEdit.toLowerCase() == 'usepresense' || thingyToEdit.toLowerCase() == 'presensemsg' || thingyToEdit.toLowerCase() == 'botinvitelink' || thingyToEdit.toLowerCase() == 'testingchannel' || thingyToEdit.toLowerCase() == 'owner') {
          //   recMsg.channel.send('yeah uh.... this part is wip. So... uh... just use the slow way...')
          // }

          else if (thingyToEdit == undefined) { //make if thingy to edit is defiend but thingy tio put is not

            recMsg.channel.send(`You can edit the following settings. If you know what you are doing and want a faster way use ${prefix}(set)tings <item> <your change here>

        usePresense
        presenseMsg
        botInviteLink
        owner
        testingChannel
        permissions to use this
          `)
            // console.log('sdfsdfsfsd')
            
            recMsg.channel.send('Enter a setting to edit')
            recMsg.channel.awaitMessages(m => m.author.id == recMsg.author.id, {max: 1, time: 30000}).then(collected => {
                      // only accept messages by the user who sent the command
                      // accept only 1 message, and return the promise after 30000ms = 30s
        
                      // first (and, in this case, only) message of the collection
              if (collected.first().content.toLowerCase() == 'usepresense') {
                thingyToEdit = 'usePresense'

                recMsg.channel.send('Enter the new value (true/false)')
                recMsg.channel.awaitMessages(m => m.author.id == recMsg.author.id, {max: 1, time: 30000}).then(collected => {
                  if (collected.first().content.toLowerCase() == 'true') {
                    thingyToPut = 'true'
                    confEditor('usePresense', 'true')
                    recMsg.reply(`${thingyToEdit} has been changed to "${thingyToPut}".`)
                  }

                  else if (collected.first().content.toLowerCase() == 'false') {
                    thingyToPut = 'false'
                    confEditor('usePresense', 'false')
                    recMsg.reply(`${thingyToEdit} has been changed to "${thingyToPut}".`)
                  }

                  else {
                    recMsg.reply('Not a valid value.');   
                  }   
                }).catch(() => {
                  recMsg.reply('No answer after 30 seconds, operation canceled.');
                });
              }

























              else {
                recMsg.reply('Not a valid setting to edit.');   
              }   
            }).catch(() => {
              recMsg.reply('No answer after 30 seconds, operation canceled.');
            });
        
        
            
          }
          else {
            recMsg.channel.send("Invalid Command usage")
          }

    }

      else {
        recMsg.channel.send('You do not have authority to edit the bot configuration.')
      }

      }
      else {
        recMsg.channel.send('JSON editor is disabled.')
      }



      


      
      console.log(thingyToEdit)
      console.log('yeet')
      console.log(thingyToPut)




    //   if (thingyToEdit == 'usePresense') {
    //     if (thingyToPut == 'true' || thingyToPut == 'false') {
    //     let configFile = editJsonFile('./Renograde.json')
  
    //     configFile.set("bot.usePresense", thingyToPut)
    //     configFile.save()
    //     console.log(configFile.get());


    //     }
    //     else {
    //       recMsg.channel.send('Invalid option. Options are (true/false)')
    //     }




    // }

    









      break; 

    case prefix + 'remind':
      var suffix = recMsg.content.split(' ').slice(1);
      var timesUnit = suffix[1];
      var time = suffix[0];
      var WhatToRemind = recMsg.content.split(' ').slice(3).join(' ') 

      timeToWait = 0
      // console.log(timesUnit)
      // console.log(time)
      // console.log(WhatToRemind)

      if (time > 0 && !isNaN(time) && isNaN(timesUnit)) {
        // console.log('yes')
       
        function reminderThingy() {
          recMsg.reply(`Ok, reminding you in ${timeToWait}ms`)
          sleep(timeToWait).then(() => {
            recMsg.reply(WhatToRemind)
          })
        }

        if (timesUnit.toLowerCase() == 'sec') {
          timeToWait = timeToWait + (time * 1000)
          reminderThingy()
        }
        else if (timesUnit.toLowerCase() == 'min') {
          timeToWait = timeToWait + (time * 1000 * 60)
          reminderThingy()
        }
        else if (timesUnit.toLowerCase() == 'hr') {
          timeToWait = timeToWait + (time * 1000 * 60 * 60)
          reminderThingy()
        }
        else if (timesUnit.toLowerCase() == 'day') {
          timeToWait = timeToWait + (time * 1000 * 60 * 60 * 24)
          reminderThingy()
        }
        else {
          recMsg.reply(`Invalid time unit.`)
        }
      }

      else {
        recMsg.channel.send('Invalid command usage')
      }


      break; 
      
  }





  




/**
spam command
    if (recMsg.content.toLowerCase().startsWith(prefix + "spam")) {    
      logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "spam"`)

      if (sloTFdownSpam.has(recMsg.author.id)) {
        recMsg.channel.send(`You may not abuse my spam command, thank you. You can use this in ${timeParse(spamTimeRemaining.getTimeLeft())}.`);
        logme('DEBUG', ` Spam request rejected (avalable in ${timeParse(spamTimeRemaining.getTimeLeft())})`)
      } 
      
      else {
        logme('DEBUG', `Spam granted -- "${WhatToSpam}" x${TimesToRun}`)
        try {
          var suffix = recMsg.content.split(' ').slice(1);
          var timesRun = 0;
          var TimesToRun = suffix[0];
          var WhatToSpam = recMsg.content.split(' ').slice(2).join(' ')  

        if (WhatToSpam != undefined && WhatToSpam != '') {
          console.log(`${recMsg.author.id} Unleashed spam of "${WhatToSpam}" for ${TimesToRun} times!
          `)

            while (timesRun < TimesToRun) {
                if (timesRun == TimesToRun, TimesToRun > 100) {
                  break    
                }
                recMsg.channel.send(WhatToSpam)
                timesRun = timesRun + 1;    
            }   
            if (timesRun > 0) {   
              var spamEnd = `**Spam has ended with: ${timesRun} spams, thank ${recMsg.author}**`
              recMsg.channel.send(spamEnd)
            }
          }
          else {
            recMsg.channel.send('You need to define what to spam')
          }
        }

        catch {
          recMsg.channel.send('Error')
          logme('DEBUG', ` Spam gave an error`)
        }

        sloTFdownSpam.add(recMsg.author.id);
          spamTimeRemaining = new timer(function() {
            sloTFdownDaily.delete(recMsg.author.id);
          }, 43200000) // 12 hrs
      }
    }
*/

  
      
    antiSpam.add(recMsg.author.id);
    setTimeout(() => {
    antiSpam.delete(recMsg.author.id);
    }, 1000); //1sec
  }



  // Chat logging
  if (config.bot.enableChatlogging == 'true') {


    if (recMsg.author == client.user) {
      // console.log('the bot said something')
      // console.log(recMsg.content)
      var doIt = new ChatLogMeDaddy(recMsg.guild.name, recMsg.channel.name, recMsg.author.username, `${recMsg.content} (may not log properly cuz rich embeds)` )
      doIt.logMeDaddy()
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

      var doIt_1 = new ChatLogMeDaddy(recMsg.guild.name, recMsg.channel.name, recMsg.author.username, recMsg.content)
      doIt_1.logMeDaddy()
    }
    
  
  }

})


client.login(config.bot.token);

var Yeet = function Yeet() {}
module.exports.Yeet = Yeet;