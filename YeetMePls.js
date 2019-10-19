const version = 'beta 7'
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./Renograde.json');
var prefix = config.bot.prefix;

// const ytdl = require('ytdl-core');
// const queue = new Map();


//loading
client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    console.log("Servers:") 
    client.guilds.forEach((guild) => {
    console.log(" - " + guild.name)
    // console.log("**Channels**")  
    // guild.channels.forEach((channel) => {  
    // console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`) 
    //        })         
      })   
    var generalChannel = client.channels.get("581873091173548061") // channel ID
    generalChannel.send("I is the online") 
    console.log("-----finished loading-----")    
    console.log(version)   
       })

//General commands + meth
client.on('message', async recMsg => {
    if (recMsg.author == client.user) {
        return
        }


var essay = config.bot.essay  
var bwah = config.bot.bwah   
var helptext = `**Commands:** 
>>> **The prefix is (-)**

***----General Commands---***
**spam <amount> <thing>:** Spams user defined message (x) number of times, 100 max (DO NOT SPAM WITHOUT MESSAGE)
**ping:** Gets latency.
**help:** Shows this message.
**yeet <member> <reason>:** kicks member
**ban <member> <reason>:** bans member
**meth: ** shows help for meth commands

***---Message Commands---***

**essay** Best roast
**bwah** ehhhh....` 
var methEX = `**__Help for the rart__**
>>> add: adds givin values ex. -meth add 1 2 3 4
pyth: does Pythagorean, solves for 0 in the format 'a b c'. ex. -meth pyth 0 4 5
sin: does sine law, solves for the 0 in the format 'A a B b. ex -meth sin 0 23 30 43

**---General notes---**
- addition only takes up too 12 values
- A = angle **while** a = side
- there is 1 space between values for a reason
- radians are uber gay
`
var ConvToRan = Math.PI / 180
var ConvToDeg = 180 / Math.PI


    if (recMsg == prefix + ("essay")) {
        recMsg.channel.send(essay)
        }
    if (recMsg == prefix + ("bwah")) {
        recMsg.channel.send(bwah)
        }
    if (recMsg == prefix + "ping") {
    const m = await recMsg.channel.send("Ping?");
      m.edit(`**YEET! Latency is ${m.createdTimestamp - recMsg.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms**`);
    }

    if (recMsg == prefix + ("help")) {
        recMsg.channel.send(helptext)
          }
    if (recMsg == (prefix + "spam"))  {
        recMsg.channel.send("`Do !spam help for arguements`")
        console.log(`Author: " + ${recMsg.author} + "**Command**: " + ${recMsg}
        `)
         }    
    if (recMsg.content.startsWith(prefix + "spam")) {    //spam commands
      var suffix = recMsg.content.split(' ').slice(1);
      var timesRun = 0;
      var TimesToRun = suffix[0];
      var WhatToSpam = recMsg.content.split(' ').slice(2).join(' ')  
        
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
    }
  }
    if (recMsg == prefix + 'meth') {
      recMsg.channel.send(`Help with meth commands, Do '-meth ex' for details 
      >>> ***---Opperations---***  
      add
      pyth (Pythagorean theorem)
      sin (Sine law)`)
      }
    if (recMsg == prefix + 'meth ex') {
      recMsg.channel.send(methEX)
    }

    if (recMsg.content.startsWith('-meth add')) {
      var addNum1 = parseFloat(0 + recMsg.content.split(' ').slice(1));
      var addNum2 = parseFloat(0 + recMsg.content.split(' ').slice(2));
      var addNum3 = parseFloat(0 + recMsg.content.split(' ').slice(3));
      var addNum4 = parseFloat(0 + recMsg.content.split(' ').slice(4));
      var addNum5 = parseFloat(0 + recMsg.content.split(' ').slice(5));
      var addNum6 = parseFloat(0 + recMsg.content.split(' ').slice(6));
      var addNum7 = parseFloat(0 + recMsg.content.split(' ').slice(7));
      var addNum8 = parseFloat(0 + recMsg.content.split(' ').slice(8));
      var addNum9 = parseFloat(0 + recMsg.content.split(' ').slice(9));
      var addNum10 = parseFloat(0 + recMsg.content.split(' ').slice(10));
      var addNum11 = parseFloat(0 + recMsg.content.split(' ').slice(11));
      var addNum12 = parseFloat(0 + recMsg.content.split(' ').slice(12));

      recMsg.channel.send(addNum1 + addNum2 + addNum3 + addNum4 + addNum5 + addNum6 + addNum7 + addNum8 + addNum9 + addNum10 + addNum11 + addNum12);
      }

    if (recMsg.content.startsWith('-meth pyth')) {
      var aSide = parseFloat(0 + recMsg.content.split(' ').slice(2));
      var bSide = parseFloat(0 + recMsg.content.split(' ').slice(3));
      var cSide = parseFloat(0 + recMsg.content.split(' ').slice(4));

      if (cSide == 0) {
        recMsg.channel.send('> Side "c" is: ')
        recMsg.channel.send(aSide ** 2 + bSide ** 2)
      }

      if (bSide == 0) {
        recMsg.channel.send('> Side "b" is: ')
        recMsg.channel.send((cSide ** 2 - aSide **2) ** 0.5)
      }
      if (aSide == 0) {
        recMsg.channel.send('> Side "a" is: ')
        recMsg.channel.send((cSide ** 2 - bSide **2) ** 0.5)
      }
    }
    if (recMsg.content.startsWith('-meth sin')) {
      var aSinAngle = parseFloat(0 + recMsg.content.split(' ').slice(2));
      var bSinAngle = parseFloat(0 + recMsg.content.split(' ').slice(4));
      var aSinSide = parseFloat(0 + recMsg.content.split(' ').slice(3));
      var bSinSide = parseFloat(0 + recMsg.content.split(' ').slice(5));

      if (aSinAngle == 0){
        complicate = ((aSinSide * Math.sin(bSinAngle * ConvToRan)/bSinSide) * Math.PI / 180);
        recMsg.channel.send('> Angle "A" in degrees is: ');
        recMsg.channel.send((Math.asin(complicate * ConvToDeg)) * ConvToDeg)
      }
    }




    
      
  
})



client.login(config.bot.token);





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
