//beta 5 
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./Renograde.json');
var prefix = config.bot.prefix;

// const ytdl = require('ytdl-core');
// const queue = new Map();


//loading
client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    console.log("--beta 5--")
    //servers
    console.log("Servers:") 
    client.guilds.forEach((guild) => {
    console.log(" - " + guild.name)
    // console.log("**Channels**")  
  
    // guild.channels.forEach((channel) => {  
    // console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`) 
    //        })
    var generalChannel = client.channels.get("500665868318015489") // channel ID
        generalChannel.send("I is the online")          
         })   
    console.log("-----finished loading-----")       
       })

//Commands
client.on('message', async receivedMessage => {
    if (receivedMessage.author == client.user) {
        return
        }


var essay = config.bot.essay  
var bwah = config.bot.bwah   
var helptext = `**Commands:** 

**The prefix is (-)**

**spam <amount> <thing>:** Spams user defined message (x) number of times, 100 max (DO NOT SPAM WITHOUT MESSAGE)
**ping:** Gets latency.
**help:** Shows this message.
**yeet <member> <reason>:** kicks member
**ban <member> <reason>:** bans member

***----Message Commands----***

**essay** Best roast
**bwah** ehhhh....` 


    if (receivedMessage == prefix + ("essay")) {
        receivedMessage.channel.send(essay)
        console.log("Author: " + receivedMessage.author + "**Command**: " + receivedMessage)
        console.log(`**Output**: " + ${essay}
        `)
        }
    if (receivedMessage == prefix + ("bwah")) {
        receivedMessage.channel.send(bwah)
        console.log("Author: " + receivedMessage.author + "**Command**: " + receivedMessage)
        console.log(`**Output**: " + ${bwah}
        `)
        }
    if (receivedMessage == prefix + "ping") {
    const m = await receivedMessage.channel.send("Ping?");
      m.edit(`**YEET! Latency is ${m.createdTimestamp - receivedMessage.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }

    if (receivedMessage == prefix + ("help")) {
        receivedMessage.channel.send(helptext)
        console.log(`Author: " + ${receivedMessage.author} + "**Command**: " + ${receivedMessage}
        `)
          }
    if (receivedMessage == (prefix + "spam"))  {
        receivedMessage.channel.send("`Do !spam help for arguements`")
        console.log(`Author: " + ${receivedMessage.author} + "**Command**: " + ${receivedMessage}
        `)
         }    
    if (receivedMessage.content.startsWith(prefix + "spam")) {    //spam commands
      var suffix = receivedMessage.content.split(' ').slice(1);
      var timesRun = 0;
      var TimesToRun = suffix[0];
      var WhatToSpam = receivedMessage.content.split(' ').slice(2).join(' ')  
        
        while (timesRun < TimesToRun) {
            if (timesRun == TimesToRun, TimesToRun > 100) {
              break    
            }
            receivedMessage.channel.send(WhatToSpam)
            timesRun = timesRun + 1;    
        }   
    if (timesRun > 0) {   
      receivedMessage.channel.send(`**Spam has ended with: ${timesRun} spams, thank ${receivedMessage.author}**`)
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
