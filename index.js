const { Client, GatewayIntentBits, } = require('discord.js');
const client = new Client({
    intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    ]
});
const dotenv = require('dotenv')
dotenv.config();
const { START_MESSAGE, STOP_MESSAGE } = require('./config.json');

let isEnableNotify = false;
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg => {
    if (msg.author.bot) return;

    if (msg.content === "-+bot") {
        isEnableNotify = !isEnableNotify
        let noti = {
            hour: [
                3, 4, 9, 10, 15, 16, 21, 22
            ],
            min: [
                55, 25
            ]
        }

        let loop = setInterval(() => {
            var currentdate = new Date();
            let hourIndex = noti.hour.findIndex(hour => hour == currentdate.getHours())
            let minIndex = noti.min.findIndex(min => min == currentdate.getMinutes())
            console.log(`Bot Always Work! Start At ${currentdate.getHours()} : ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`);
            if (currentdate.getSeconds() % 10 == 0) {
                if (hourIndex != -1 && minIndex != -1) {
                    if (noti.hour[hourIndex] % 2 == 0 && noti.min[minIndex] % 25 == 0) {
                        console.log("เคออส");
                        msg.channel.send('@here อิก 5 นาที เคออสบอสจะมาแล้ว :rabbit: ')
                    }

                    if (noti.hour[hourIndex] % 3 == 0 && noti.min[minIndex] % 55 == 0) {
                        console.log("ฟิล");
                        msg.channel.send('@here อิก 5 นาที ฟิลบอสจะมาแล้ว :frog: ')
                    }
                }
            }
            console.log("Bot Always Work! End");
            if (!isEnableNotify) {
                clearInterval(loop)
            }
        }, 2000)
        msg.channel.send(isEnableNotify ? START_MESSAGE : STOP_MESSAGE)
    }

})


client.login(process.env.TOKEN);