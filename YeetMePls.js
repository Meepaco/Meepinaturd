const Discord = require('discord.js')
const client = new Discord.Client()


bot_secret_token = "NTYyMDE0NTgyNDY2NDEyNTY1.XKE_7Q.wCapmUIc2PgTGXrb9K7aRWec7Sk"





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
    generalChannel.send("I is the online <@325667415780360212> also ur gay")             
         })
       })

client.on('message', async receivedMessage => {
        // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
        return
        }

    prefix = ("-")

var essay1 = "shut yo skin tone chicken bone google chrome no home flip phone disowned ice cream cone garden gnome extra chromosome metronome dimmadome genome full blown monochrome student loan indiana jones overgrown flintstone x and y hormone friend zone sylvester stallone sierra leone autozone professionally seen silver patrone ching chong ling long suck my ding dong head ass pubg fortnite flip phone remote control autism down syndrome stage four terminal braind cancer o rielly auto parts silver bronze ash amiibo uv light pen sushi ramen harrison ford gamer bitch ass virgin lamp thermometor lean mean string bean charlie sheen limousine canteen trampoline serpentine antihistamine wolverine submarine unclean nectarine broken gene halloween defective spleen smokescreen james dean putting green tiny peen anti vaccine aquamarine eugene extra green nicotine vaseline jellybean magazine protein lightning-mcqueen vending machine what'chu mean Ocean Man by Ween head ass tf up bitch"
var essay2 = `Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah Bwah bwah bwah bwah bwah`
var helptext = `**Commands:** 

**spam <amount> ~~<thing>~~:** Spams a ~~user defined~~ message (x) number to times

**ping:** Gets latency.

**help:** Shows this message.` 


    if (receivedMessage == prefix + ("essay1")) {
        receivedMessage.channel.send(essay1)
    }
    if (receivedMessage == prefix + ("essay2")) {
      receivedMessage.channel.send(essay2)
  }
    if (receivedMessage == prefix + "ping") {
    const m = await receivedMessage.channel.send("Ping?");
     m.edit(`**YEET! Latency is ${m.createdTimestamp - receivedMessage.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms, 
also <@325667415780360212> ur gay** ||<@431209649069359104>||`);
      }

    if (receivedMessage == prefix + ("help")) {
        receivedMessage.channel.send(helptext)
          }
    if (receivedMessage == (prefix + "spam"))  {
        receivedMessage.channel.send("`Do !spam help for arguements`")
         }    
    if (receivedMessage.content.startsWith(prefix + "spam")) {    //spam commands
      var timesRun = 1;
      var TimesToRun = receivedMessage.content.split(' ').slice(1);
   // var WhatToSpam = receivedMessage.content.split(' ').slice(2).join(' ')
      var generalChannel = client.channels.get("500665868318015489")
    //  var message = "@everyone i am so sorry for this... Count = **" + timesRun + "**"
      
        while (timesRun < TimesToRun) {
            generalChannel.send("@everyone i am so sorry for this... Count = **" + timesRun + ", **Goal = **" + TimesToRun + "**")
            timesRun = timesRun + 1 
        }   

      if (timesRun = TimesToRun - 1) {
          generalChannel.send("Spam Ended with** " + timesRun + (" **spams."))
      }


    
      




    
  }
   
    //else if (receivedMessage == prefix + () {
    //         receivedMessage.channel.send("No such command bro")
   // }   
else  {

  }
})


  









 
            
        



    


        
    
    

    client.login(bot_secret_token)
    
