const version = 'v1.0.1'
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./Renograde.json');
const prefix = config.bot.prefix;
const osu = require('node-os-utils');
const os = require('os');
const fs = require('fs');

// https://www.youtube.com/watch?v=nrD7rzidZ84 <-- fix nuking when internet loss hopefully
// rate limiter gang
const sloTFdownDab = new Set();
const sloTFdownDaily = new Set();
const antiSpam = new Set();
const antiSpamEcon = new Set();
const sloTFdownStalk = new Set();
const sloTFdownSpam = new Set();


function timeStampy() {

  var date = new Date();
  
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;
  var day  = date.getDate();
  day = (day < 10 ? "0" : "") + day;
  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;
  var min  = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;
  var sec  = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  return hour + ":" + min + ":" + sec;
}

// function dateStampy() {

//   var date = new Date();
//   var year = date.getFullYear();
//   var month = date.getMonth() + 1;
//   month = (month < 10 ? "0" : "") + month;
//   var day  = date.getDate();
//   day = (day < 10 ? "0" : "") + day;
//   var hour = date.getHours();
//   hour = (hour < 10 ? "0" : "") + hour;
//   var min  = date.getMinutes();
//   min = (min < 10 ? "0" : "") + min;
//   var sec  = date.getSeconds();
//   sec = (sec < 10 ? "0" : "") + sec;

//   return `${year} ${month} ${day} ${hour} ${min} ${sec} (yyyy-mm-dd-hh-mm-ss)`
// }

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function clientUptime() { 
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





// this monstrocity...

function richEmbed(whichOneToUse, usersName, usersNameURL, title, description, colour, field1Name, field1, field2Name, field2, field3Name, field3, field4Name, field4, field5Name, field5, field6Name, field6) {
  
  if (whichOneToUse == 'desc')  { //desc only
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

  else if (whichOneToUse == 'title') { // title only

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

  else if (whichOneToUse == 'title-desc') { // title and disc

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

  else if (whichOneToUse == 'title-desc-field') { //title, desc, 1 field
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

  else if (whichOneToUse == 'title-field') { //title, NO DESC, 1 field
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

  else if (whichOneToUse == 'title-desc-field-field') { // title, desc, 2 fields
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

  else if (whichOneToUse == 'title-field-field') { // title, NO desc, 2 fields
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

  else if (whichOneToUse == 'title-field-field-field-field') { // title, NO desc, 2 fields
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
  else if (whichOneToUse == 'title-desc-field-field-field-field-field-field') { // title, desc, 6 fields
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






//loading
client.on('ready', () => {
  fs.appendFileSync('logs.txt', `
-----------------------------------------------------------------------------------------------------




The bot has started: ${new Date()}

${version}
Servers:

  `)
  console.log("Connected as " + client.user.tag)
  console.log("Servers:") 
  client.guilds.forEach((guild) => {
  console.log(" - " + guild.name)

  fs.appendFileSync('logs.txt', `- ${guild.name}
  `)
  // console.log("**Channels**")  
  // guild.channels.forEach((channel) => {  
  // console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`) 
  //        })         
  })   
  var generalChannel = client.channels.get(config.bot.testingChannel) // channel ID



generalChannel.send(richEmbed('desc' ,client.user.username, client.user.avatarURL, undefined,'I is the online',3447003))

  console.log(`--------------------------
the prefix is: ${config.bot.prefix}  
bot: ${version}
node: ${process.version}
-----finished loading-----`)
  fs.appendFileSync('logs.txt', `
Boot completed
`)
})



//General commands + meth
client.on('message', async recMsg => {
  if (recMsg.author == client.user) {
    return
  }
  if (antiSpam.has(recMsg.author.id)) { // rate limit the whole thing to 1 sec
    // recMsg.channel.send("No u (Rate limited)");
  } 
  else {

// Kinda unfortunate I can't shove this in the json 

    var helptext = `
The prefix is (${prefix})

----General---
spam <amount> <thing>: Spams user defined message (x) number of times, 100 max (DO NOT SPAM WITHOUT MESSAGE)
ping: Gets latency.
**help:** Shows this message.
~~yeet <member> <reason>: kicks member
ban <member> <reason>: bans member~~ dead until further notice
info: shows bot info
alt f4: just dont...

---Message---

essay: Best roast
bwah: ehhhh.... 
skelly: Totally not NSFW...

---Economy---

reset bal: Resets balance
bal <mention user>: Check balance
gamble <number>: Try your luck...
dab: Hit a dab!
stalk: High risk indecency, high rewards...`
    

    var bytesToMB = 1 / 1048576  
  

    if (recMsg == prefix + ('info')) {
      // var memusg = process.memoryUsage()
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      
      osu.cpu.usage()
      .then(usg => {
        

        recMsg.channel.send(richEmbed('title-field-field-field-field', recMsg.member.user.username, recMsg.member.user.avatarURL, "Bot Info", undefined, 13691445, 'Uptime', clientUptime(), 
        
        'Bot', `Version: ${version}
Node: ${process.version}
Memory Usg: ${Math.round(used * 100) / 100} MB`, 

        'CPU', 
`**CPU:** ${osu.cpu.model()} (${os.arch()}), ${osu.cpu.count()} core(s) 
**Utilization:** ${usg}%`,

        'Other',
`**OS:** ${os.type} (${os.platform()})
**RAM:** ${parseInt(os.totalmem * bytesToMB) - parseInt(os.freemem * bytesToMB)}/${parseInt(os.totalmem * bytesToMB)} MB (${(((parseInt(os.totalmem * bytesToMB) - parseInt(os.freemem * bytesToMB)) / parseInt(os.totalmem * bytesToMB))* 100).toFixed(2)}% usage)
`))
      })
    }

    if (recMsg == prefix + ("essay")) {
        recMsg.channel.send(config.bot.essay)
        fs.appendFileSync('logs.txt', `
  ${timeStampy()}: ${recMsg.author.id} Executed "-essay"`)
        }

    if (recMsg == prefix + ("bwah")) {
        recMsg.channel.send(config.bot.bwah)
        fs.appendFileSync('logs.txt', `
  ${timeStampy()}: ${recMsg.author.id} Executed "-bwah"`)
        }
    if (recMsg == prefix + 'skelly') {
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
    }

    if (recMsg == prefix + "ping") {
      const msg = await recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, 'UwU?', 13691445));
      
      msg.edit(richEmbed('title-field', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, undefined, 13691445,'UwU!', `Client: ${msg.createdTimestamp - recMsg.createdTimestamp}ms. 
API: ${Math.round(client.ping)}ms`))
    
      console.log(`Pong! ${msg.createdTimestamp - recMsg.createdTimestamp}ms, API:${Math.round(client.ping)}ms)`)
      fs.appendFileSync('logs.txt', `
  ${timeStampy()}: ${recMsg.author.id} Executed "-ping" (${msg.createdTimestamp - recMsg.createdTimestamp}ms, API:${Math.round(client.ping)}ms)`)
    }


    if (recMsg == prefix + ("help")) {
      recMsg.channel.send(richEmbed('title-field', recMsg.member.user.username, recMsg.member.user.avatarURL, 'Bot Command Help', undefined, 6053119, 'Seems like you need help', helptext))
    }

    if (recMsg.content.startsWith(prefix + "spam")) {    //spam command
      if (sloTFdownSpam.has(recMsg.author.id)) {
        recMsg.channel.send("You may not abuse my spam command, thank you.");
      } 
      
      else {
        try {
          var suffix = recMsg.content.split(' ').slice(1);
          var timesRun = 0;
          var TimesToRun = suffix[0];
          var WhatToSpam = recMsg.content.split(' ').slice(2).join(' ')  

          console.log(`${recMsg.author.id} Unleashed spam of "${WhatToSpam}" for ${TimesToRun} times!
          `)
          fs.appendFileSync('logs.txt', `
${timeStampy()}: ${recMsg.author.id} Unleashed spam of "${WhatToSpam}" for ${TimesToRun} times`)
            
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
              // console.log(spamEnd)
              fs.appendFileSync('logs.txt', `
${timeStampy()}: ${recMsg.author.id} ${spamEnd}`)
            }
        }

        catch {
          recMsg.channel.send('Invalid command usage')
        }

        sloTFdownSpam.add(recMsg.author.id);
          setTimeout(() => {
          sloTFdownSpam.delete(recMsg.author.id);
          }, 82800000); //23 hrs
      }
    }

    if (recMsg.content == prefix + "alt f4") {
      if (recMsg.author.id == config.bot.owner) { // user id you want to give kill-the-bot perms too, put in json
        console.log('User terminated')
        recMsg.channel.send('au revoir!')
        await sleep(3000)
        process.exit()
      }
      else {
        recMsg.channel.send('haha lol XDDDDDDD you cannot kill the bot.')
      }
      
    }
      

    antiSpam.add(recMsg.author.id);
    setTimeout(() => {
    antiSpam.delete(recMsg.author.id);
    }, 1000); //1sec
  }
})




//moneyyyyyy

client.on('message', async recMsg => {
  // console.log(recMsg)
  // // recMsg = recMsg.toLowerCase()
  if (recMsg.author == client.user) {
    return
  }

  if (antiSpamEcon.has(recMsg.author.id)) { // also 1 sec rate limit
    // recMsg.channel.send("No u (Rate limited)");
  } 
  else {
  
  //   if (recMsg.content == prefix + 'start') {

  //     fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= 0`)
  //     // fs.writeFileSync(`./timer/${recMsg.author.id}.txt`, `lastDaily= ${timeStampy()}`)
  //     recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, 'Account created, use this command again to reset your balance.', 14685520))
        
  //     fs.appendFileSync('logs.txt', `
  // ${timeStampy()}: ${recMsg.author.id} Created account`)
  //   }
      
    if (recMsg.content == prefix + 'reset bal') {

      fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= 0`)
      // fs.writeFileSync(`./timer/${recMsg.author.id}.txt`, `lastDaily= ${timeStampy()}`)
      recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, 'Balence reset.', 14685520))
        
      fs.appendFileSync('logs.txt', `
  ${timeStampy()}: ${recMsg.author.id} Reset Bal`)
    }

    if (recMsg.content.startsWith(prefix + 'bal') || recMsg.content.startsWith(prefix + 'balance') || recMsg.content.startsWith(prefix + 'money')) {
      var getUseriD = (recMsg.content.split(' ').slice(1)).toString(); 
      var useriD = getUseriD.replace('@', '').replace("<", '').replace("!", '').replace(">", '')
    
      if (useriD == undefined, useriD == '') {
        useriD = recMsg.author.id
      }
      // console.log(getUseriD)
      // console.log(useriD)

      var guild = recMsg.guild // is user in the server?
    
      if (guild.member(useriD)) {
        // console.log('yes, teh skid is here')
        fs.stat(`./moneys/${useriD}.txt`, function(err) {  
          if (err) { 
            fs.writeFileSync(`./moneys/${useriD}.txt`, `ur_money= 0`)
            recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `Account created, use **${prefix}bal** reset to reset your balence.`, 14685520))
              
          } else { 
            var lineReader = require('readline').createInterface({
              input: require('fs').createReadStream(`./moneys/${useriD}.txt`)
            });
            lineReader.on('line', function (line) {
              recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `Balance for <@!${useriD}>: $${line.split(' ').slice(1)}`, 14685520))
            })
          }
        })
      }
      else {
        recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `Member not found.`, 14685520))
      }
    }
    
    
    if (recMsg.content.startsWith(prefix + 'backdoor')) { // we dont talk about this...
      var backdoorMoney = parseFloat(0 + recMsg.content.split(' ').slice(1));
      recMsg.channel.send(backdoorMoney)
      if (backdoorMoney > 0) {
        fs.stat(`./moneys/${recMsg.author.id}.txt`, function(err) {  
          if (err) {
            fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= 0`)
            recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `Account created, use **${prefix}bal** reset to reset your balence.`, 14685520))
        

            fs.appendFileSync('logs.txt', `
    ${timeStampy()}: ${recMsg.author.id} Executed "-backdoor" but is retarded and didnt create their account first`)
          } else {
            var lineReader = require('readline').createInterface({
              input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
            });

            lineReader.on('line', function (line) {
              fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= ${backdoorMoney}`)
              
              recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, 'Yes.', 14685520))
            })
            fs.appendFileSync('logs.txt', `
  ${timeStampy()}: ${recMsg.author.id} Paid.`)
          }
        
        });
      }
      else {
        recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, 'No.', 14685520))
      }
    }


    if (recMsg.content == prefix + 'daily') {

      if (sloTFdownDaily.has(recMsg.author.id)) {
        recMsg.channel.send('Boiiii too fast for me! You can only do this once every 23 hours.');
      } 
      else {
        
        fs.stat(`./moneys/${recMsg.author.id}.txt`, function(err) {  
          if (err) {
            fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= 0`)
            recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `Account created, use **${prefix}bal** reset to reset your balence.`, 14685520))
        
    //         fs.appendFileSync('logs.txt', `
    // ${timeStampy()}: ${recMsg.author.id} begged for daily money but didnt create their account first`)
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
                  
        sloTFdownDaily.add(recMsg.author.id);
        setTimeout(() => {
        sloTFdownDaily.delete(recMsg.author.id);
        }, 82800000); // 23 hrs
      }
    }


    if (recMsg.content.startsWith(prefix + 'gamble')) {

      var yesOrNo = Math.floor(Math.random() * Math.floor(101)) //random number...
      var moneyMultiplier = Math.floor(Math.random() * Math.floor(5))
      var moneyBet = Math.floor(parseFloat(0 + recMsg.content.split(' ').slice(1)));
      var moneyWon = Math.round(moneyBet * moneyMultiplier / 3.3827463287482) + moneyBet
      
      // console.log(moneyBet)
      // console.log(yesOrNo)
      await sleep(1000)

      if (moneyBet > 9) {
        
        fs.stat(`./moneys/${recMsg.author.id}.txt`, function(err) {  
          if (err) {
            fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= 0`)
            recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `Account created, use **${prefix}bal** reset to reset your balence.`, 14685520))
              
          } else { 
            var lineReader = require('readline').createInterface({
              input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
            });

            lineReader.on('line', function (line) {
              if (parseFloat(line.split(' ').slice(1)) >= moneyBet) {
            
                if (yesOrNo > 60) {
                  // var lineReader = require('readline').createInterface({
                  //   input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
                  // });
                  lineReader.on('line', function (line) {
                    fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= ${Math.round(parseFloat(line.split(' ').slice(1)) + moneyWon)}`)
                    recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `You somehow won and got ${moneyWon}`, 14685520))
                  })
                }
                else if (yesOrNo == 50) {
                  fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= 0`)
                  recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, 'lol rip ur luck is very bad and u lost literally all ur money', 14685520))
                }

                else {
                  // var lineReader = require('readline').createInterface({
                  //   input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
                  // });

                  lineReader.on('line', function (line) {
                    fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= ${Math.round(parseFloat(line.split(' ').slice(1)) - moneyBet)}`)
                    recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, "lol rip u lost", 14685520))
                  })
                } 
              }
              else {
                recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined,'You dont have enough money', 14685520))
              }
            })
          }
        })
      }
      else {
        recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined,'You must bet at least $10.', 14685520))
      }
    }


    if (recMsg == prefix + 'stalk') {
      // console.log('triggered')

      // var yesOrNo = Math.floor(Math.random() * Math.floor(101)) //random number...
      var addOrTake = Math.floor(Math.random() * Math.floor(34))
      var addOrTakeBonus = Math.floor(Math.random() * Math.floor(287))
      var moneyMultiplier = Math.floor(Math.random() * Math.floor(9))
      var OtherMoneyMultiplier = Math.floor(Math.random() * Math.floor(25))
      var nerfBonus = 1

      if (addOrTakeBonus > 251) { // decide if take away bonus
        nerfBonus = -1
      }
      var moneyBet = 695//Math.floor(parseFloat(0 + recMsg.content.split(' ').slice(1)));
      var moneyWon = Math.round(moneyBet * moneyMultiplier / 3.3827463287482) + Math.round(moneyBet * OtherMoneyMultiplier / 83.9203485763457834) * nerfBonus

      // if (addOrTake < 21) { // decide if take away
      //   moneyWon = moneyWon * -1
      // }

        // console.log(addOrTake)
      //   console.log(moneyBet)
      //   console.log(yesOrNo)
      //   await sleep(1000)



      if (sloTFdownStalk.has(recMsg.author.id)) {
        recMsg.channel.send("You can only stalk someone once every 7 hours");
      } 
      else {
        fs.stat(`./moneys/${recMsg.author.id}.txt`, function(err) {  
          if (err) {
            fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= 0`)
            recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `Account created, use **${prefix}bal** reset to reset your balence.`, 14685520))
          } 
          
          else { 
            var lineReader = require('readline').createInterface({
              input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
            });

            lineReader.on('line', function (line) {
              // pull messages from json
                dabMessage = config.bot.stalkMsg[Math.floor(Math.random() * Math.floor(config.bot.stalkMsg.length))]
                // console.log(dabMessage)
                dabMessageNegative = config.bot.stalkMsgNeg[Math.floor(Math.random() * Math.floor(config.bot.stalkMsgNeg.length))]
            
                if (addOrTake > 19) {
                  // var lineReader = require('readline').createInterface({
                  //   input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
                  // });
                  
                  if (moneyWon < 0) {
                    moneyWon = moneyWon * -1
                  }
                  var lineReader = require('readline').createInterface({
                    input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
                  });

                  lineReader.on('line', function (line) {
                    fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= ${Math.round(parseFloat(line.split(' ').slice(1)) + moneyWon)}`)
                    recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `${dabMessage.replace('{pholder}', moneyWon)}`, 3591188))
                  })
                }

                else {
                  // var lineReader = require('readline').createInterface({
                  //   input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
                  // });

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
            
                  })
                } 
              })
              sloTFdownStalk.add(recMsg.author.id);
              setTimeout(() => {
                sloTFdownStalk.delete(recMsg.author.id);
              }, 25200000); //   25200000 7 hrs
          }
        })
      }
      // sloTFdownStalk.add(recMsg.author.id);
      // setTimeout(() => {
      //   sloTFdownStalk.delete(recMsg.author.id);
      // }, 25200000); //   25200000 7 hrs
  }


  if (recMsg.content.startsWith(prefix + 'dab')) {

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

    // if (addOrTake == 0) { // decide if take away
    //   moneyWon = moneyWon * -1
    // }

      // console.log(addOrTake)
    //   console.log(moneyBet)
    //   console.log(yesOrNo)
    //   await sleep(1000)



    if (sloTFdownDab.has(recMsg.author.id)) {
      recMsg.channel.send("You can only dab once every 4 hours");
    } 
    else {
      
      fs.stat(`./moneys/${recMsg.author.id}.txt`, function(err) {  
        if (err) {
          fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= 0`)
          recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `Account created, use **${prefix}bal** reset to reset your balence.`, 14685520))
        
        } else { 
          var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
          });

          lineReader.on('line', function (line) {
            // pull messages from json
              dabMessage = config.bot.dabMsg[Math.floor(Math.random() * Math.floor(config.bot.dabMsg.length))]
              // console.log(dabMessage)
              dabMessageNegative = config.bot.dabMsgNeg[Math.floor(Math.random() * Math.floor(config.bot.dabMsgNeg.length))]
          
              if (addOrTake > 0) {
                // var lineReader = require('readline').createInterface({
                //   input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
                // });
                
                if (moneyWon < 0) {
                  moneyWon = moneyWon * -1
                }
                var lineReader = require('readline').createInterface({
                  input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
                });

                lineReader.on('line', function (line) {
                  fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= ${Math.round(parseFloat(line.split(' ').slice(1)) + moneyWon)}`)
                  recMsg.channel.send(richEmbed('desc', recMsg.member.user.username, recMsg.member.user.avatarURL, undefined, `${dabMessage.replace('{pholder}', moneyWon)}`, 3591188))
                })
              }

              else {
                // var lineReader = require('readline').createInterface({
                //   input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
                // });

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
                })
              } 
            })
            sloTFdownDab.add(recMsg.author.id);
            setTimeout(() => {
              sloTFdownDab.delete(recMsg.author.id);
            }, 14400000); // 14400000 4 hrs
          }
        })
      }
      // sloTFdownDab.add(recMsg.author.id);
      // setTimeout(() => {
      //   sloTFdownDab.delete(recMsg.author.id);
      // }, 14400000); // 14400000 4 hrs
  }
 









  antiSpamEcon.add(recMsg.author.id);
  setTimeout(() => {
  // Removes the user from the set after a minute
  antiSpamEcon.delete(recMsg.author.id);
  }, 1000); //1sec
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
