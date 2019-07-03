const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./Renograde.json');
//const logfile = require('.modlogs.txt');
var prefix = config.bot.prefix;


//loading
client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    //servers
    console.log("Servers:") 
    client.guilds.forEach((guild) => {
    console.log(" - " + guild.name)
    console.log("**Channels**")  
    

    guild.channels.forEach((channel) => {  
    console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`) 
           })
    var generalChannel = client.channels.get("500665868318015489") // channel ID
        generalChannel.send("I is the online")    
        console.log("-----finished loading-----")         
         })
    
       })

client.on('message', async receivedMessage => {
    if (receivedMessage.author == client.user) {
        return
        }

//Commands
var essay = config.bot.essay  
var bwah = config.bot.bwah   
var helptext = `**Commands:** 

**spam <amount> ~~<thing>~~:** Spams a ~~user defined~~ message (x) number to times <- yeah this is very broken and i dont care to fix atm
**ping:** Gets latency.
**help:** Shows this message.

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
      m.edit(`**YEET! Latency is ${m.createdTimestamp - receivedMessage.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms, also <@325667415780360212> ur gay** ||<@431209649069359104>||`);
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
      var timesRun = 1;
      var TimesToRun = receivedMessage.content.split(' ').slice(1);
   // var WhatToSpam = receivedMessage.content.split(' ').slice(2).join(' ')
      var generalChannel = client.channels.get("500665868318015489")
    //  var message = "@everyone i am so sorry for this... Count = **" + timesRun + "**"
      console.log("Author: " + receivedMessage.author + "**Command**: " + receivedMessage)
      
        while (timesRun < TimesToRun) {
            generalChannel.send("@everyone i am so sorry for this... Count = **" + timesRun + ", **Goal = **" + TimesToRun + "**");
            timesRun = timesRun + 1; 
         //   console.log("**Spam Count**: " + timesRun);
        }   
//very broken
      // if (timesRun = TimesToRun - 1) {
      //     generalChannel.send("Spam Ended with** " + timesRun + (" **spams."))
      //     console.log("Spam Ended with** " + TimesToRun + (" **spams."))
      //}
     }
    else if (receivedMessage == prefix + ('')) {
     message.reply("No such command bro")
  }
})

   
client.on('message', message => {
  if (message.author == client.user) return;
  const args = message.content.slice(config.prefix).trim().split(/ +/g);    
  
    if (message.content.startsWith('-yeet')) {
      console.log(message.author + 'issued command: "yeet"')
      const user = message.mentions.users.first() || message.guild.members.get(args[0]);;
      if (user) {
        const member = message.guild.member(user);
        let reason = args.slice(2).join(' ');
        if (member) {
        member.kick(reason).then(() => {
          message.reply(`${user.tag} Was YEETED for: ${reason}`);
          console.log(member + ' was kicked for ' + reason);
        }).catch(err => {
          message.reply('Unable to Yeet the skid, most likely either role hiearchy or no perms');
          console.log('Unable to Yeet the skid');
          console.error(err);
            });
           }
          else {
            message.reply('Skid is not in the server');
            }
           }
      else {
       message.reply('No skid was mentioned');
          }
        }
});
  
    
    
  

client.login(config.bot.token);

