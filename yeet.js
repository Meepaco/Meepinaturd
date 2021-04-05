// Welcome to my sketchy code
const version = 'v1.3-rc1 (1307)'
const whatTheJsonVersionShouldBeForThisVersonOfTheBot = '1.3'

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./Renograde.json');
const prefix = config.bot.prefix;
const osu = require('node-os-utils');
const os = require('os');
const fs = require('fs');
// var ping = require('ping');

// const editJsonFile = require("edit-json-file");
// const si = require('systeminformation');
// const { Recoverable } = require('repl');

// Modules
// const generalCmds = require('./generalCmds');
const ChatLogMeDaddy = require('./chatLog')
const Pasteboard = require('./pasteboard.js');
// const { receiveMessageOnPort } = require('node:worker_threads');
// const econ = require('./econ.js')


// rate limiter gang
const antiSpam = new Set();
// const antiSpamEcon = new Set();
// const sloTFdownStalk = new Set();
// const sloTFdownSpam = new Set();
// const sloTFdownDab = new Set();
// const sloTFdownDaily = new Set();




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


function richEmbed(whichOneToUse, usersName, usersNameURL, title, description, colour, field1Name, field1, field2Name, field2, field3Name, field3, field4Name, field4, field5Name, field5, field6Name, field6) {
  /** 
  This function handles the formatting of rich embed messages 
  This is awful in every way possible and I may or may not 
  get around to make this less unreliable and awful
  
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
    */

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
  /** This function handles logging
  
  parameters:
    level:
      level of logging (DEBUG, WARNING, INFO, ERROR, CRITICAL)
    stuffToLog:
      content to be logged
      */
  if (config.bot.botLogging == 'true') { // on/off swtich
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



// ----------------------------------------------------------------------------------------------------


function helpMsg(variant, recMsgDummy) {
  /**
   * Compiles help text(s)
   */

  var helpGeneral = `
  **help-depricated:** Show depricated cmds
  **ping:** Get bot latency
  **help:** Shows this message.
  **info:** shows bot info
  **alt f4:** just dont...
  **invite:** Get a bot invite link
  **remind** <time> <time unit> <message> (time valid time units sec min hr day)`
      var helpMessage = `**pb** <name> <content>: Adds a paste to the pasteboard
      pb-<list/del/info> <name>`
      var helpEcon = `WHOLE ECONOMY IS DSIABLED, WILL RETURN AT LATER DATE
  **reset bal:** Resets balance
  **bal <user>:** Check balance
  **pay <user> <amount>:** Pay someone
  **gamble <number>:** Try your luck...
  **dab:** Hit a dab!
  **stalk:** A high risk indecency, for high rewards...
  !!!blackjack: A game of blackjack
  
  !!!Experemental/WIP`


  if (variant == "depricated") {
    return "**Removed/disabled commands** \n`yeet <member> <reason>: kicks member\nban <member> <reason>: bans member\n**spam <amount> <thing>:** Spams user defined message (x) number of times, 100 max (DO NOT SPAM WITHOUT MESSAGE) \n The entirety of economy \n settings \n info-ext"
  }
  else {
    return richEmbed('title-desc-field-field-field', recMsgDummy.member.user.username, recMsgDummy.member.user.avatarURL({ format: 'png', dynamic: true}), 'Bot Commands', `The prefix is (${prefix})`, 6053119, `General`, helpGeneral, 'Pasteboard', helpMessage, 'Economy', helpEcon)
    // recMsgDummy.channel.send(richEmbed('title-desc-field-field-field', recMsgDummy.member.user.username, recMsgDummy.member.user.avatarURL({ format: 'png', dynamic: true}), 'Bot Commands', `The prefix is (${prefix})`, 6053119, `General`, helpGeneral, 'Pasteboard', helpMessage, 'Economy', helpEcon))
    // logme('DEBUG', `${recMsgDummy.author.id} (${recMsgDummy.member.user.username}) Executed "help"`)
  }
}

function getInfo(callback, embedSwitch, recMsgDummy) {
  /**
   * return system and bot nerd stats
   */

  return new Promise(function(resolve, reject) {
    let infoMsg = ''
    
    osu.cpu.usage()
    .then(usg => {
      let bytesToMB = 1 / 1048576  
      let botVersion = version
      let nodePlatform = process.platform
      let nodeVersion = process.version
      let memUsg = process.memoryUsage().heapUsed / 1024 / 1024;
      let botMemUsg = `${Math.round(memUsg * 100) / 100} MB`
      let botUptime = uptime('bot')
      let botConfigFile = `${config.bot.jsonVersion} (expected: ${whatTheJsonVersionShouldBeForThisVersonOfTheBot})`

      let hostCPU = `${osu.cpu.model()} (${os.arch()}), ${osu.cpu.count()} core(s)`
      let cpuUilization = `${usg}% (${os.loadavg()})`
      let hostOS = `${os.type} (${os.platform()})`
      let hostMemUsg = `${parseInt(os.totalmem * bytesToMB) - parseInt(os.freemem * bytesToMB)}/${parseInt(os.totalmem * bytesToMB)} MB (${(((parseInt(os.totalmem * bytesToMB) - parseInt(os.freemem * bytesToMB)) / parseInt(os.totalmem * bytesToMB))* 100).toFixed(2)}% usage)`
      let hostUptime = uptime('os')

      if (embedSwitch == 'embed') { 
        infoMsg = richEmbed('title-field-field-field', recMsgDummy.member.user.username, recMsgDummy.member.user.avatarURL({ format: 'png', dynamic: true}), "Bot Info", undefined, 13691445, 
          'Bot', `**Version:** ${botVersion}
**Platform:** ${nodePlatform}
**Node:** ${nodeVersion}
**Memory Usg:** ${botMemUsg} MB
**Uptime:** ${botUptime}
**Prefix:** ${config.bot.prefix}
**Config**: ${botConfigFile}`, 

          'Host Device', `**CPU:** ${hostCPU}
**Utilization:** ${cpuUilization}
**OS:** ${hostOS}
**RAM:** ${hostMemUsg}
**Uptime:** ${hostUptime}
`)
        callback(infoMsg)
      }


      else {
        infoMsg = `
            --Bot--
            Version: ${botVersion}
            Platform: ${nodePlatform}
            Node: ${nodeVersion}
            Memory Usg: ${botMemUsg} MB
            Uptime: ${botUptime}
            Prefix: ${config.bot.prefix}
            Config: ${botConfigFile}

            --Host Device--
            CPU: ${hostCPU}
            Utilization: ${cpuUilization}
            OS: ${hostOS}
            RAM: ${hostMemUsg}
            Uptime: ${hostUptime}`
        callback(infoMsg)
      }

    })
  })

}








//loading

client.on('ready', () => {
  /**
   * bot boot process
   */
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

//   fs.appendFileSync('logs.txt', `- ${guild.name}
// `)

  // console.log("**Channels**")  
  // guild.channels.forEach((channel) => {  
  // console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`) 
  //        })         
  })   

  try { // post a bot wake message to testing channel
    if (Number.isInteger(config.bot.testingChannel)) {
      var generalChannel = client.channels.cache.get(config.bot.testingChannel) // testing channel ID
      generalChannel.send(richEmbed('desc' ,client.user.username, client.user.avatarURL({ format: 'png', dynamic: true}), undefined,'I is the online',3447003))
    }
    else {
      console.log('Not sending wake message')
    }
  }
  catch (e) {
    console.log('--Invalid channel ID specified--')
    console.log('Not sending wake message')
  }

//   console.log(`--------------------------
// the prefix is: ${config.bot.prefix}  
// bot: ${version}
// JSON: ${config.bot.jsonVersion} (expected: ${whatTheJsonVersionShouldBeForThisVersonOfTheBot})
// node: ${process.version}
// -----finished loading-----`)


console.log('--------------------------')
getInfo(function(infoMsg) {
  console.log(infoMsg)



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
              url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          }
      });
    logme('DEBUG', 'Done setting up presense')
    console.log('Presense enabled')
  }
  console.log('-----finished loading-----')
})

  logme('INFO', 'Boot completed')
})



//General commands
client.on('message', async recMsg => {
  /**
   * main bot code
   */
  if (recMsg.author == client.user) {
    return
  }
  else if (antiSpam.has(recMsg.author.id)) { // rate limit the whole thing, 1 sec
  } 
  else {



//main commands
  switch (recMsg.content.toLowerCase()) {

    case prefix + 'help':
      recMsg.channel.send(helpMsg(undefined, recMsg))
     
      break;

    case prefix + 'help-depricated':
      recMsg.channel.send(helpMsg('depricated'))
      break;

    case prefix + 'info':
      getInfo(function(infoMsg) {
        recMsg.channel.send(infoMsg); 
      },'embed', recMsg)
      break;
 
    case prefix + 'ping':
      const msg = await recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL({ format: 'png', dynamic: true}), 'HoW baD iS mY IntERnEt?', undefined, 13691445, 'UwU?', `Pinging...`));

      msg.edit(richEmbed('title-field', recMsg.member.user.username, recMsg.member.user.avatarURL({ format: 'png', dynamic: true}), 'HoW baD iS mY IntERnEt?', undefined, 13691445, 'Uwu!', `Round-Trip: ${msg.createdTimestamp - recMsg.createdTimestamp}ms. 
API: ${Math.round(client.ws.ping)}ms`))
    
      console.log(`Pong! ${msg.createdTimestamp - recMsg.createdTimestamp}ms, API:${Math.round(client.ping)}ms)`)
      logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "ping" - ${msg.createdTimestamp - recMsg.createdTimestamp}ms, API:${Math.round(client.ping)}ms)`)
      break;

    
    case prefix + 'alt f4':
      logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "alt f4"`)
      console.log(`${recMsg.author.id} (${recMsg.member.user.username}) Executed "alt f4"`)

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
      logme('DEBUG', `${recMsg.author.id} (${recMsg.member.user.username}) Executed "invite"`)
      break;









    default: // all the commands that take arguments

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
          var usrRoles = guildUsr.roles.highest //guildUsr.highestRole.name
  

          // const status = user.presence.game.name
          // console.log(dateCreate)
          // console.log(dateJoin)
          // console.log(status)
          // console.log(usrRoles)
          // console.log(guildUsr.roles.cache)
          // aaaaaa.concat(guildUsr.roles.cache)

          // get all user's roles
          let allRoles = []
          guildUsr.roles.cache.each(role => allRoles.push(role.name))

            
          // logme('DEBUG', `User: ${user.username} (${useriD})`)
          // logme('DEBUG', `Date create: ${dateCreate}`)
          // logme('DEBUG', `Date Join: ${dateJoin}`)
          // logme('DEBUG', `Highest role: ${usrRoles}`)

          // recMsg.channel.send(richEmbed('title-desc-field-field-field-field', user.username, user.avatarURL({ format: 'png', dynamic: true}), "User info", `<@!${useriD}>`, 13691445, 'ID', user.id, 'Account Created', dateCreate, 'Joined Server', dateJoin, 'Highest Role', usrRoles), "Roles", toString("roles:\n`"+ allRoles + "`"))
          recMsg.channel.send(richEmbed('title-desc-field-field-field-field', user.username, user.avatarURL({ format: 'png', dynamic: true}), "User info", `<@!${useriD}>`, 13691445, 'ID', user.id, 'Account Created', dateCreate, 'Joined Server', dateJoin, 'Highest Role', usrRoles))
          recMsg.channel.send("roles:\n`"+ allRoles + "`")
          logme('DEBUG', `user cmd success`)
        }

        else {
          recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL({ format: 'png', dynamic: true}), undefined, `Member not found.`, 2727567))
          logme('ERROR', `Rquested member not found`)
        }
      }

  
      else if (recMsg.content.toLowerCase().startsWith(prefix + 'remind')) {
        console.log('yeet')
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

      }
        
        else if (recMsg.content.toLowerCase().startsWith(prefix + 'pb-del')) {
          let suffix = recMsg.content.split(' ').slice(1);
          let alias = suffix[0];
          let content = recMsg.content.split(' ').slice(2).join(' ')
          let personWHoAdd = `${recMsg.author.username} (${recMsg.author.id})`
          let currentGuild = `${recMsg.guild.name} (${recMsg.guild.id})`
          let dateAdded = Date().Parse()
          let yes = new Pasteboard(alias, dateAdded, currentGuild, personWHoAdd, content)

          
          if (recMsg.author.id == config.bot.owner) {   // whitelist
    
            recMsg.channel.send(`Confirm delete paste "${alias}"? (Y/N)`)
            recMsg.channel.awaitMessages(m => m.author.id == recMsg.author.id, {max: 1, time: 30000}).then(collected => {
              
              if (collected.first().content.toLowerCase() == 'y') {
                recMsg.channel.send(yes.evict())
              }

              else if (collected.first().content.toLowerCase() == 'n') {
                
                recMsg.reply('Pasteboard addition canceled.');   
              }

              else {
                recMsg.reply('Not a valid value.');   
              }   


            }).catch(() => {
              recMsg.reply('No answer after 30 seconds, operation canceled.');
            });
          }

          else {
            recMsg.channel.send('You do not have authority to edit the pasteboard')
          }
        }


        else if (recMsg.content.toLowerCase() == prefix + 'pb-list') {
          yes = new Pasteboard('', new Date(), 'personWHoAdd', 'descriptor', 'content')

              // recMsg.channel.send( yes.copy())



              recMsg.channel.send(yes.listPastes())
        }

        else if (recMsg.content.toLowerCase().startsWith(prefix + 'pb-info')) {

          let suffix = recMsg.content.split(' ').slice(1);
          let alias = suffix[0];
          let content = recMsg.content.split(' ').slice(2).join(' ')
          let personWHoAdd = `${recMsg.author.username} (${recMsg.author.id})`
          let currentGuild = `${recMsg.guild.name} (${recMsg.guild.id})`
          let dateAdded = new Date()

          let yes = new Pasteboard(alias, dateAdded, currentGuild, personWHoAdd, content)
          recMsg.channel.send(yes.getInfo())
        }


        else if (recMsg.content.toLowerCase() == prefix + 'pb-backup') {
          recMsg.channel.send("Here are the paste contents.", {
            files: [
              "./pasteboardContent.json"]
          });
        }

        else if (recMsg.content.toLowerCase().startsWith(prefix + 'pb')) { // main command, paste and copy
    
          try {
            
            let suffix = recMsg.content.split(' ').slice(1);
            let alias = suffix[0];
            let content = recMsg.content.split(' ').slice(2).join(' ')
            let personWHoAdd = `${recMsg.author.username} (${recMsg.author.id})`
            let currentGuild = `${recMsg.guild.name} (${recMsg.guild.id})`
            let date = new Date();
            let dateAdded = date.getFullYear() + "-" + ("00" + (date.getMonth() + 1)).slice(-2) + "-" + ("00" + date.getDate()).slice(-2) + ' ' + ("00" + date.getHours()).slice(-2) + ":" + ("00" + date.getMinutes()).slice(-2) + ":" + ("00" + date.getSeconds()).slice(-2);
            

            let yes = new Pasteboard(alias, dateAdded, currentGuild, personWHoAdd, content)
            
            if (content == '' && alias != undefined) { // paste
              recMsg.channel.send(yes.paste())
            }

            else if (alias != undefined && content != undefined) { // copy
              // console.log('coyping')
              recMsg.channel.send(`No paste entry with such name, add to pasteboard? "${alias}"? (Y/N)`)
              recMsg.channel.awaitMessages(m => m.author.id == recMsg.author.id, {max: 1, time: 30000}).then(collected => {
                
                if (collected.first().content.toLowerCase() == 'y') {

                  if (recMsg.author.id == config.bot.owner) {   // whitelist
                  recMsg.channel.send(yes.copy())
                  }
              
                  else {
                    recMsg.channel.send('You do not have authority to edit the pasteboard')
                  }
                }
              
            
                else if (collected.first().content.toLowerCase() == 'n') {
                  recMsg.reply('Pasteboard addition canceled.');   
                }
      
                else {
                  recMsg.reply('Not a valid value.');   
                }   


            }).catch(() => {
              recMsg.reply('No answer after 30 seconds, operation canceled.');
            });
            }
          }
          
          catch(e) {
            console.log(e)
            console.log('something went wrong')
            // logme('ERROR', `Something went wrong`)
            recMsg.channel.send('something went wrong')
          }
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
  }
  
      
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