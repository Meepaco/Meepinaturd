const version = 'beta 10 b2'
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./Renograde.json');
const prefix = config.bot.prefix;
const osu = require('node-os-utils');
const os = require('os');
const fs = require('fs');

// function test(one,two,three) {
//   if (three == undefined) {
//   yesss = one + two 
//   return yesss
//   }
//   else {
//     return 'no'
//   }
// }
// console.log(test('no u','ak'))


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

function dateStampy() {

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

  return `${year} ${month} ${day} ${hour} ${min} ${sec} (yyyy-mm-dd-hh-mm-ss)`
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// function clientUptime() { //incomplete and probs gonna do when i feel like it
//   uptimeInMS = client.uptime

//   if (uptimeInMS > 1000) {
//     uptimeMins = uptimeInMS / 100
//     return uptimeMins + 'Minuites'
//   }

//   console.log(uptimeInMS)
// }

function richEmbed(title, description, colour, field1Name, field1, field2Name, field2, field3Name, field3) {
  
  if (title == undefined && field1Name == undefined)  { //desc only
    embedded = ({embed: {
      color: colour,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
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

  else if (description == undefined && title != undefined && field1Name == undefined) { // title only

    embedded = ({embed: {
      color: colour,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: title,
     
      timestamp: new Date(),
      footer: {
        text: "A sketchy discord bot by Meepco"
      }
    }
  });
  }

else if (field1Name == undefined) { // title and disc

  embedded = ({embed: {
    color: colour,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
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

else if (field2Name == undefined && description != undefined && field3Name == undefined) { //title, desc, 1 field
  embedded = ({embed: {
    color: colour,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
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

else if (description == undefined && field2Name == undefined) { //title, NO DESC, 1 field
  embedded = ({embed: {
    color: colour,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
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

else if (field3Name == undefined && title != undefined && description != undefined) { // title, desc, 2 fields
  embedded = ({embed: {
    color: colour,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
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

else if (field3Name == undefined && title != undefined && description == undefined) { // title, NO desc, 2 fields
  embedded = ({embed: {
    color: colour,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
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
  else { // title, desc, 3 fields
  embedded = ({embed: {
        color: colour,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
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



// function dailyPayout() {
//   lineReader.on('line', function (line) {
//         // console.log('2', activee)
//         fs.writeFileSync(`./timer/${recMsg.author.id}.txt`, `lastDaily= ${dateStampy()}`)
//         fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= ${parseFloat(line.split(' ').slice(1)) + 500}`)
//         recMsg.channel.send(`Here's $500, come back in 23 hours`)
//         fs.appendFileSync('logs.txt', `
// ${timeStampy()}: ${recMsg.author.id} recieved their daily $500`)
//           })
  
// }
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
  var generalChannel = client.channels.get("581873091173548061") // channel ID


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
generalChannel.send(richEmbed(undefined,'I is the online',3447003))
// generalChannel.send({embed: {
//   color: 3447003,
//   author: {
//     name: client.user.username,
//     icon_url: client.user.avatarURL
//   },
//   description: "I is the online",
  
//   timestamp: new Date(),
//   footer: {
//     text: "A sketchy discord bot by Meepco"
//   }
// }
// });

  // generalChannel.send("I is the online") 
  console.log("-----finished loading-----")  
  console.log('the prefix is:', config.bot.prefix)  
  console.log(version)
  fs.appendFileSync('logs.txt', `
Boot completed
`)
})



//General commands + meth
client.on('message', async recMsg => {
  if (recMsg.author == client.user) {
    return
  }
  
  // recMsg.channel.send(richEmbed("title","desc",1,2,3,4,5,6)) // to test the function
// Kinda unfortunate I cant shove this in the json

var helptext = `
The prefix is (${prefix})

----General---
spam <amount> <thing>: Spams user defined message (x) number of times, 100 max (DO NOT SPAM WITHOUT MESSAGE)
ping: Gets latency.
**help:** Shows this message.
~~yeet <member> <reason>: kicks member
ban <member> <reason>: bans member~~
~~meth: shows help for meth commands~~ dead until further notice
info: shows bot info

---Message---

essay Best roast
bwah ehhhh.... 

---Economy---

start: Creates an account
bal: Check your balence
pay me: Gives money (testing purposes)
gamble <number>: Try your luck...`

// var methEX = `__Help for the rarted__
// >>> add: adds givin values ex. -meth add 1 2 3 4
// pyth: does Pythagorean, solves for 0 in the format 'a b c'. ex. -meth pyth 0 4 5
// sin: does sine law, solves for the 0 in the format 'A a B b. ex -meth sin 0 23 30 43

// ---General notes---
// - addition only takes up too 12 values
// - please input pythagorean stuff properly or it derps out
// - A = angle while a = side
// - there is 1 space between values for a reason
// - radians are uber gay`
// var ConvToRan = Math.PI / 180
// var ConvToDeg = 180 / Math.PI

var bytesToMB = 1 / 1048576
var uptimeMS = client.uptime
var milliseconds = parseInt((uptimeMS%1000)/100) // ms is unused
    , seconds = parseInt((uptimeMS/1000)%60)
    , minutes = parseInt((uptimeMS/(1000*60))%60)
    , hours = parseInt((uptimeMS/(1000*60*60))%24)
    , days = parseInt(uptimeMS/(1000*60*60*24))

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

// var infoDump = (`Local Time: ${new Date()}
// Uptime: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds (${client.uptime}ms)


// Running: ${os.type} (${os.platform()}) on ${osu.cpu.model()}, ${osu.cpu.count()} cores (${os.arch()}) 
// Memory usage: ${parseInt(os.freemem * bytesToMB)} MB/${parseInt(os.totalmem * bytesToMB)} MB (${(os.freemem / os.totalmem * 100).toFixed(2)}%)`)
// End of var spam




  if (recMsg == prefix + ('info')) {

    osu.cpu.usage()
    .then(usg => {

      recMsg.channel.send(richEmbed("Bot Info", undefined, 13691445, 'Uptime', 'placeholder', 'System Information', `**OS:** ${os.type} (${os.platform()})
      **CPU:** ${osu.cpu.model()}, ${osu.cpu.count()} core(s) (${os.arch()})

      **RAM:** ${parseInt(os.totalmem * bytesToMB) - parseInt(os.freemem * bytesToMB)}/${parseInt(os.totalmem * bytesToMB)} MB (${(((parseInt(os.totalmem * bytesToMB) - parseInt(os.freemem * bytesToMB)) / parseInt(os.totalmem * bytesToMB))* 100).toFixed(2)}% usage)
      **CPU usage:** ${usg}%`))

//       recMsg.channel.send({embed: {
//         color: 13691445,
//         author: {
//           name: recMsg.member.user.username,
//           icon_url: recMsg.member.user.avatarURL
//         },
//         title: "Bot Info",
      
//          fields: [{ 
//                   name: "Uptime",
//                   value: `placeholder`
//                 },
//                 {
//                   name: "System Information",
//                   value: `**OS:** ${os.type} (${os.platform()})
// **CPU:** ${osu.cpu.model()}, ${osu.cpu.count()} core(s) (${os.arch()})
        
// **RAM:** ${parseInt(os.totalmem * bytesToMB) - parseInt(os.freemem * bytesToMB)}/${parseInt(os.totalmem * bytesToMB)} MB (${(os.freemem / os.totalmem * 100).toFixed(2)}%)
// **CPU usage:** ${usg}%`              
//                 },
//               ],
        
//         timestamp: new Date(),
//         footer: {
//           text: "A sketchy discord bot by Meepco"
//         }
//       }
//       })
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

  if (recMsg == prefix + "ping") {

  const msg = await recMsg.channel.send({embed: {   //recMsg.channel.send(richEmbed('UwU?', undefined, 13691445))
    color: 13691445,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "UwU?",
    timestamp: new Date(),
    footer: {
      text: "A sketchy discord bot by Meepco"
    }
  }
  });
    // msg.edit(richEmbed('UwU!', `Client: ${msg.createdTimestamp - recMsg.createdTimestamp}ms. 
    // API: ${Math.round(client.ping)}ms`, 13691445))
      
    msg.edit({embed: {
      color: 13691445,
      author: {
        name: recMsg.member.user.username,
        icon_url: recMsg.member.user.avatarURL
      },
      title: "UwU!",
      description: `Client: ${msg.createdTimestamp - recMsg.createdTimestamp}ms. 
API: ${Math.round(client.ping)}ms`,
      
      timestamp: new Date(),
      footer: {
        text: "A sketchy discord bot by Meepco"
      }
    }
    });
    
    console.log(`Pong! ${msg.createdTimestamp - recMsg.createdTimestamp}ms, API:${Math.round(client.ping)}ms)`)
    fs.appendFileSync('logs.txt', `
${timeStampy()}: ${recMsg.author.id} Executed "-ping" (${msg.createdTimestamp - recMsg.createdTimestamp}ms, API:${Math.round(client.ping)}ms)`)
  }

  if (recMsg == prefix + ("help")) {
    // recMsg.channel.send(richEmbed('Help', helptext, 6053119))
    
    recMsg.channel.send({embed: {
      color: 6053119,
      author: {
        name: recMsg.member.user.username,
        icon_url: recMsg.member.user.avatarURL
      },
      title: "Help",
      description: helptext,
      
      timestamp: new Date(),
      footer: {
        text: "A sketchy discord bot by Meepco"
      }
    }
    })
  }
  if (recMsg.content.startsWith(prefix + "spam")) {    //spam command
    var suffix = recMsg.content.split(' ').slice(1);
    var timesRun = 0;
    var TimesToRun = suffix[0];
    var WhatToSpam = recMsg.content.split(' ').slice(2).join(' ')  

    console.log(`${recMsg.author.id} Unleashed spam of "${WhatToSpam}" for ${TimesToRun} times!
     `)
    fs.appendFileSync('logs.txt', `
${timeStampy()}: ${recMsg.author.id} Unleashed spam of "${WhatToSpam}" for ${TimesToRun} times!`)
      
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
    console.log(spamEnd)
    fs.appendFileSync('logs.txt', `
${timeStampy()}: ${recMsg.author.id} ${spamEnd}`)
  }
  else {
    recMsg.channel.send("`Do -help for arguements`")
  }
}

//   if (recMsg == prefix + 'meth') {
//     recMsg.channel.send({embed: {
//       color: 13691445,
//       author: {
//         name: recMsg.member.user.username,
//         icon_url: recMsg.member.user.avatarURL
//       },
//       description: "Help with meth commands, Do '-meth ex' for details",
//         fields: [{
//           name: "Opperations",
//           value: `add
// pyth (Pythagorean theorem)
// sin (Sine law)`
//               }
//             ],
//       timestamp: new Date(),
//       footer: {
//         text: "A sketchy discord bot by Meepco"
//       }
//     }
    
//     });
//     // recMsg.channel.send('What would you like to do?')

//     if (recMsg.content == prefix + 'meth add') {
//       recMsg.channel('meth add')
//       var addDump = []
//       while (true) {
//         try {
//         if (recMsg.content == 'stop') {
//           recMsg.channel.send('ok we stop now')
//           break;
//         }
//         else if (owo) {
//           var addNum = parseFloat(0 + recMsg.content.split(' ').slice(1));
//           addDump.push(addNum)
//         }
//       }
//         catch {
//           recMsg.channel.send('Invalid input')
//         }
  
//       }
//       // var addNum1 = parseFloat(0 + recMsg.content.split(' ').slice(1));
//       // var addNum2 = parseFloat(0 + recMsg.content.split(' ').slice(2));
//       // var addNum3 = parseFloat(0 + recMsg.content.split(' ').slice(3));
//       // var addNum4 = parseFloat(0 + recMsg.content.split(' ').slice(4));
//       // var addNum5 = parseFloat(0 + recMsg.content.split(' ').slice(5));
//       // var addNum6 = parseFloat(0 + recMsg.content.split(' ').slice(6));
//       // var addNum7 = parseFloat(0 + recMsg.content.split(' ').slice(7));
//       // var addNum8 = parseFloat(0 + recMsg.content.split(' ').slice(8));
//       // var addNum9 = parseFloat(0 + recMsg.content.split(' ').slice(9));
//       // var addNum10 = parseFloat(0 + recMsg.content.split(' ').slice(10));
//       // var addNum11 = parseFloat(0 + recMsg.content.split(' ').slice(11));
//       // var addNum12 = parseFloat(0 + recMsg.content.split(' ').slice(12));
//       recMsg.channel.send(addDump)
  
//       recMsg.channel.send(addNum1 + addNum2 + addNum3 + addNum4 + addNum5 + addNum6 + addNum7 + addNum8 + addNum9 + addNum10 + addNum11 + addNum12);
//       fs.appendFileSync('logs.txt', `
//   ${timeStampy()}: ${recMsg.author.id} Executed "-meth add"`)
//     }
    


//     fs.appendFileSync('logs.txt', `
// ${timeStampy()}: ${recMsg.author.id} Executed "-meth"`)
//     }

//   if (recMsg == prefix + 'meth ex') {
//     recMsg.channel.send(methEX)
//     fs.appendFileSync('logs.txt', `
// ${timeStampy()}: ${recMsg.author.id} Executed "-meth ex"`)
//   }

  

//   if (recMsg.content.startsWith('-meth pyth')) {
//     var aSide = parseFloat(0 + recMsg.content.split(' ').slice(2));
//     var bSide = parseFloat(0 + recMsg.content.split(' ').slice(3));
//     var cSide = parseFloat(0 + recMsg.content.split(' ').slice(4));
  
//     if (cSide == 0 && bSide > 0 && cSide > 0) {
//       recMsg.channel.send('> Side "c" is: ')
//       recMsg.channel.send((aSide ** 2 + bSide ** 2) ** 0.5)
//     }
//     if (bSide == 0 && aSide > 0 && cSide > 0 && cSide > aSide) {
//       recMsg.channel.send('> Side "b" is: ')
//       recMsg.channel.send((cSide ** 2 - aSide **2) ** 0.5)
//     }
//     if (aSide == 0 && cSide > 0 && bSide > 0 && cSide > bSide) {
//       recMsg.channel.send('> Side "a" is: ')
//       recMsg.channel.send((cSide ** 2 - bSide **2) ** 0.5)
//     }
//     else {
//       recMsg.channel.send('Please learn the basic theory of pythagorean.')
//     }
//     fs.appendFileSync('logs.txt', `
// ${timeStampy()}: ${recMsg.author.id} Executed "-meth pyth"`)
//   }

//   if (recMsg.content.startsWith('-meth sin')) {
//     var aSinAngle = parseFloat(0 + recMsg.content.split(' ').slice(2));
//     var bSinAngle = parseFloat(0 + recMsg.content.split(' ').slice(4));
//     var aSinSide = parseFloat(0 + recMsg.content.split(' ').slice(3));
//     var bSinSide = parseFloat(0 + recMsg.content.split(' ').slice(5));
//     fs.appendFileSync('logs.txt', `
// ${timeStampy()}: ${recMsg.author.id} Executed "-meth sin"`)

//     if (aSinAngle == 0){
//       complicate = ((aSinSide * Math.sin(bSinAngle * ConvToRan)/bSinSide) * ConvToRan);
//       recMsg.channel.send('> Angle "A" in degrees is: ');
//       recMsg.channel.send((Math.asin(complicate * ConvToDeg)) * ConvToDeg)
//     }
//     if (aSinSide == 0) {
//       complicated = ((bSinSide * Math.sin(aSinAngle * ConvToRan))/Math.sin(bSinAngle * ConvToRan))
//       recMsg.channel.send('> Side "a" in degrees is: ');
//       recMsg.channel.send(complicated)
//     }
//   }
})




//moneyyyyyy

client.on('message', async recMsg => {
  if (recMsg.author == client.user) {
    return
  }
  
  if (recMsg.content == prefix + 'start') {
    // fs.readFile(`./moneys/${recMsg.author.id}.txt`, function (err, dataa) {
    //   if (err) throw err;
      // if(dataa.indexOf(recMsg.author.id) == -1){
      //   console.log('Created new entry')
      //   fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= 0`)
      // }   for one big file thingy
    // })
    fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= 0`)
    fs.writeFileSync(`./timer/${recMsg.author.id}.txt`, `lastDaily= ${timeStampy()}`)
    recMsg.channel.send(richEmbed(undefined, 'Account created, use this command again to reset your balence.', 14685520))
      
      
      
      
  //     {embed: {
  //     color: 14685520,
  //     author: {
  //       name: recMsg.member.user.username,
  //       icon_url: recMsg.member.user.avatarURL
  //     },
  //     description: 'Account created, use this command again to reset your balence.',
      
  //     timestamp: new Date(),
  //     footer: {
  //       text: "A sketchy discord bot by Meepco"
  //     }
  //   }
  // }) 
    fs.appendFileSync('logs.txt', `
${timeStampy()}: ${recMsg.author.id} Created account`)
  }

  if (recMsg.content == prefix + 'bal') {
    fs.stat(`./moneys/${recMsg.author.id}.txt`, function(err) {  
      if (err) { //file doesnt exist
        recMsg.channel.send(richEmbed(undefined, 'You need to create an account first.', 14685520))
          
          
        //   {embed: {
        //   color: 14685520,
        //   author: {
        //     name: recMsg.member.user.username,
        //     icon_url: recMsg.member.user.avatarURL
        //   },
        //   description: 'You need to create an account first.',
          
        //   timestamp: new Date(),
        //   footer: {
        //     text: "A sketchy discord bot by Meepco"
        //   }
        // }
        // }) 
      } else { //file does
        var lineReader = require('readline').createInterface({
          input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
        });
        lineReader.on('line', function (line) {
          recMsg.channel.send(richEmbed(undefined, `You have $${line.split(' ').slice(1)}`, 14685520))
          
          
        //   {embed: {
        //     color: 14685520,
        //     author: {
        //       name: recMsg.member.user.username,
        //       icon_url: recMsg.member.user.avatarURL
        //     },
        //     description: `You have $${line.split(' ').slice(1)}`,
            
        //     timestamp: new Date(),
        //     footer: {
        //       text: "A sketchy discord bot by Meepco"
        //     }
        //   }
        //   }) 
        // })
        })
      }
    })
  }
  
  
//   if (recMsg.content == prefix + 'pay me') {
//     fs.stat(`./moneys/${recMsg.author.id}.txt`, function(err) {  
//       if (err) {
//         recMsg.channel.send({embed: {
//           color: 14685520,
//           author: {
//             name: recMsg.member.user.username,
//             icon_url: recMsg.member.user.avatarURL
//           },
//           description: 'You need to create an account first.',
          
//           timestamp: new Date(),
//           footer: {
//             text: "A sketchy discord bot by Meepco"
//           }
//         }
//         }) 
//         fs.appendFileSync('logs.txt', `
// ${timeStampy()}: ${recMsg.author.id} Executed "-pay me" but is retarded and didnt create their account first`)
//       } else {
//         var lineReader = require('readline').createInterface({
//           input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
//         });
//         lineReader.on('line', function (line) {
//           fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= ${parseFloat(line.split(' ').slice(1)) + 100}`)
//           recMsg.channel.send({embed: {
//             color: 14685520,
//             author: {
//               name: recMsg.member.user.username,
//               icon_url: recMsg.member.user.avatarURL
//             },
//             description: "Here's $100.",
            
//             timestamp: new Date(),
//             footer: {
//               text: "A sketchy discord bot by Meepco"
//             }
//           }
//           }) 
//         })
//         fs.appendFileSync('logs.txt', `
// ${timeStampy()}: ${recMsg.author.id} was givin $100`)
//       }
//     });
//   }


  // if (recMsg.content == prefix + 'pulse') {
  //   function myFunc(arg) {
  //     console.log(`arg was => ${arg}`);
  //   }
    
  //   setTimeout(myFunc, 1500, 'funky');
  // }


  if (recMsg.content == prefix + 'daily') {
    // var lineReader = require('readline').createInterface({
    //   input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
    // });
    var lineReader2 = require('readline').createInterface({
      input: require('fs').createReadStream(`./timer/${recMsg.author.id}.txt`)
    });

    fs.stat(`./moneys/${recMsg.author.id}.txt`, function(err) {  
      if (err) {
        recMsg.channel.send({embed: {
          color: 14685520,
          author: {
            name: recMsg.member.user.username,
            icon_url: recMsg.member.user.avatarURL
          },
          description: 'You need to create an account first.',
          
          timestamp: new Date(),
          footer: {
            text: "A sketchy discord bot by Meepco"
          }
        }
        })
        fs.appendFileSync('logs.txt', `
${timeStampy()}: ${recMsg.author.id} begged for daily money but is retarded and didnt create their account first`)
      } 
      else {        
        lineReader2.on('line', function (line) {
          var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
          });
      
          fs.appendFileSync('logs.txt', `
${timeStampy()}: ${recMsg.author.id} has requested their daily cash`)
 
          yr = line.substr(11, 4)
          mh = line.substr(16, 2) 
          dy = line.substr(19, 2)
          hr = line.substr(22, 2)
          min = line.substr(25, 2) 
          sec = line.substr(28, 2)
          
          stamp = dateStampy()
          yr1 = stamp.substr(0, 4)
          mh1 = stamp.substr(5, 2) 
          dy1 = stamp.substr(8, 2)
          hr1 = stamp.substr(11, 2)
          min1 = stamp.substr(14, 2) 
          sec1 = stamp.substr(17, 2)

          // console.log(line) // debugging purpose

          // console.log(dateStampy())
          // console.log(yr)
          // console.log(mh)
          // console.log(dy)
          // console.log(hr)
          // console.log(min)
          // console.log(sec)
          
          // console.log(stamp)
          // console.log('stamp ' + yr1)
          // console.log('stamp ' + mh1)
          // console.log('stamp ' + dy1)
          // console.log('stamp ' + hr1)
          // console.log('stamp ' + min1)
          // console.log('stamp ' + sec1)
          
          

          if (yr1 > yr){ 
            var dailyMoney = 500
            lineReader.on('line', function (line) {
              fs.writeFileSync(`./timer/${recMsg.author.id}.txt`, `lastDaily= ${dateStampy()}`)
              fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= ${parseFloat(line.split(' ').slice(1)) + dailyMoney}`)
              recMsg.channel.send({embed: {
                color: 14685520,
                author: {
                  name: recMsg.member.user.username,
                  icon_url: recMsg.member.user.avatarURL
                },
                description: `Here's ${dailyMoney}`,
                
                timestamp: new Date(),
                footer: {
                  text: "A sketchy discord bot by Meepco"
                }
              }
              })
              fs.appendFileSync('logs.txt', `
${timeStampy()}: ${recMsg.author.id} recieved their daily $500`)
            })
          }
          
          else if (mh1 > mh){
            // dailyPayout()
            lineReader.on('line', function (line) {
              // console.log('2', activee)
              fs.writeFileSync(`./timer/${recMsg.author.id}.txt`, `lastDaily= ${dateStampy()}`)
              fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= ${parseFloat(line.split(' ').slice(1)) + 500}`)
              recMsg.channel.send(`Here's $500, come back in 23 hours`)
              fs.appendFileSync('logs.txt', `
${timeStampy()}: ${recMsg.author.id} recieved their daily $500`)
            })
          }

          else if (dy1 > dy) {
            // dailyPayout()
            lineReader.on('line', function (line) {
              // console.log('2', activee)
              fs.writeFileSync(`./timer/${recMsg.author.id}.txt`, `lastDaily= ${dateStampy()}`)
              fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= ${parseFloat(line.split(' ').slice(1)) + 500}`)
              recMsg.channel.send(`Here's $500, come back in 23 hours`)
              fs.appendFileSync('logs.txt', `
${timeStampy()}: ${recMsg.author.id} recieved their daily $500`)
            })
          }
          // var timer = 1
      //     else if (timer == 1) {
      //       console.log('0', activee)
      //       recMsg.channel.send('triggered')
      //       lineReader.on('line', function (line) {
      //         console.log('2', activee)
      //         fs.writeFileSync(`./timer/${recMsg.author.id}.txt`, `lastDaily= ${dateStampy()}`)
      //         fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= ${parseFloat(line.split(' ').slice(1)) + 500}`)
      //         recMsg.channel.send(`Here's $500, come back in 23 hours`)
      //         fs.appendFileSync('logs.txt', `
      // ${timeStampy()}: ${recMsg.author.id} recieved their daily $500`)
      //       })
      //     }
          else {
            recMsg.channel.send('boiiiii to fast for me! Resets at midnight EST!')
            fs.appendFileSync('logs.txt', `
${timeStampy()}: ${recMsg.author.id} PAYMENT DENIED!`)
          }
          })

          
        
        
      }
    });

  }
  if (recMsg.content.startsWith(prefix + 'gamble')) {
    // recMsg.channel.send('you have a gambling addiction')
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
          recMsg.channel.send(richEmbed(undefined, 'You need to create an account first.', 14685520))
            
          
          //   {embed: {
          //   color: 14685520,
          //   author: {
          //     name: recMsg.member.user.username,
          //     icon_url: recMsg.member.user.avatarURL
          //   },
          //   description: 'You need to create an account first.',
            
          //   timestamp: new Date(),
          //   footer: {
          //     text: "A sketchy discord bot by Meepco"
          //   }
          // }
          // })
        } else { 

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
                  fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= ${parseFloat(line.split(' ').slice(1)) + moneyWon}`)
                  recMsg.channel.send(richEmbed(undefined, `You somehow won and got ${moneyWon}`, 14685520))
                    
                    
                  //   {embed: {
                  //   color: 14685520,
                  //   author: {
                  //     name: recMsg.member.user.username,
                  //     icon_url: recMsg.member.user.avatarURL
                  //   },
                  //   description: `You somehow won and got ${moneyWon}`,
                    
                  //   timestamp: new Date(),
                  //   footer: {
                  //     text: "A sketchy discord bot by Meepco"
                  //   }
                  // }
                  // }) 
                })
              }
              else if (yesOrNo == 50) {
                fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= 0`)
                recMsg.channel.send(richEmbed(undefined, 'lol rip ur luck is very bad and u lost literally all ur money', 14685520))
                 
                //   {embed: {
                //   color: 14685520,
                //   author: {
                //     name: recMsg.member.user.username,
                //     icon_url: recMsg.member.user.avatarURL
                //   },
                //   description: 'lol rip ur luck is very bad and u lost literally all ur money',
                  
                //   timestamp: new Date(),
                //   footer: {
                //     text: "A sketchy discord bot by Meepco"
                //   }
                // }
                // })
              }
              else {
                var lineReader = require('readline').createInterface({
                  input: require('fs').createReadStream(`./moneys/${recMsg.author.id}.txt`)
                });
                lineReader.on('line', function (line) {
                  fs.writeFileSync(`./moneys/${recMsg.author.id}.txt`, `ur_money= ${parseFloat(line.split(' ').slice(1)) - moneyBet}`)
                  recMsg.channel.send(`lol rip u lost`)
                })
              } 
            }
            else {
              recMsg.channel.send(richEmbed(undefined,'You dont have enough money', 14685520))
                
                
              //   {embed: {
              //   color: 14685520,
              //   author: {
              //     name: recMsg.member.user.username,
              //     icon_url: recMsg.member.user.avatarURL
              //   },
              //   description: 'You dont have enough money',
                
              //   timestamp: new Date(),
              //   footer: {
              //     text: "A sketchy discord bot by Meepco"
              //   }
              // }
              // })
            }
          })
        }
      })
    }
    else {
      recMsg.channel.send(richEmbed(undefined,'You must bet at least $10.', 14685520))
    }
  }
})



client.login(config.bot.token);







// fs.stat('path-to-your-file', function(err) {  
//   if (err) {
//      // file does not exist
//   } else {
//       // file exists
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