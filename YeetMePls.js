const Discord = require('discord.js');
const client = new Discord.Client();
var config = require('./Renograde.json');
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
        // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
        return
        }

//Commands
var essay = config.bot.essay  
var bwah = config.bot.bwah   
var helptext = `**Commands:** 

**spam <amount> ~~<thing>~~:** Spams a ~~user defined~~ message (x) number to times
**ping:** Gets latency.
**help:** Shows this message.

***----Message Commands----***

**essay** Best roast
**bwah** ehhhh....` 


    if (receivedMessage == prefix + ("essay")) {
        receivedMessage.channel.send(essay)
        console.log("Author: " + receivedMessage.author + "**Command**: " + receivedMessage)
        console.log("**Output**: " + essay)
    }
    if (receivedMessage == prefix + ("bwah")) {
        receivedMessage.channel.send(bwah)
        console.log("Author: " + receivedMessage.author + "**Command**: " + receivedMessage)
        console.log("**Output**: " + bwah)
  }
    if (receivedMessage == prefix + "ping") {
    const m = await receivedMessage.channel.send("Ping?");
     m.edit(`**YEET! Latency is ${m.createdTimestamp - receivedMessage.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms, 
also <@325667415780360212> ur gay** ||<@431209649069359104>||`);
      }

    if (receivedMessage == prefix + ("help")) {
        receivedMessage.channel.send(helptext)
        console.log("Author: " + receivedMessage.author + "**Command**: " + receivedMessage)
          }
    if (receivedMessage == (prefix + "spam"))  {
        receivedMessage.channel.send("`Do !spam help for arguements`")
        console.log("Author: " + receivedMessage.author + "**Command**: " + receivedMessage)
         }    
    if (receivedMessage.content.startsWith(prefix + "spam")) {    //spam commands
      var timesRun = 1;
      var TimesToRun = receivedMessage.content.split(' ').slice(1);
   // var WhatToSpam = receivedMessage.content.split(' ').slice(2).join(' ')
      var generalChannel = client.channels.get("500665868318015489")
    //  var message = "@everyone i am so sorry for this... Count = **" + timesRun + "**"
      console.log("Author: " + receivedMessage.author + "**Command**: " + receivedMessage)
      
        while (timesRun < TimesToRun) {
            generalChannel.send("@everyone i am so sorry for this... Count = **" + timesRun + ", **Goal = **" + TimesToRun + "**")
            timesRun = timesRun + 1 
            console.log("**Spam Count**: " + timesRun)
        }   

      if (timesRun = TimesToRun - 1) {
          generalChannel.send("Spam Ended with** " + timesRun + (" **spams."))
          console.log("Spam Ended with** " + timesRun + (" **spams."))
      }

  }
   
    //else if (receivedMessage == prefix + () {
    //         receivedMessage.channel.send("No such command bro")
   // }   
else  {

  }
  
})

client.login(config.bot.token);

